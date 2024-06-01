import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { SendIcon } from "@/components/ui/SendIcon";
import { Trash } from "lucide-react";

const supabase = createClient();

const Chat = ({ isVisible } : {isVisible : boolean}) => {
    const [user, setUser] = useState({ email: '', name: '' });
    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState("");
    const messageInputRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        fetchUser();
        fetchMessages();
       handleFocus();
        const subscription = supabase
            .channel('realtime:public:messages')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, payload => {
                fetchMessages();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);


    const clearMessages = async () => {
        await supabase.from('messages').delete().eq("chat_id",1);
        setMessages([]);
    }

    const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            const {data: profile} = await supabase
                .from('users')
                .select('name')
                .eq('email', user.email)
                .single();

            if (profile) {
                // @ts-ignore
                setUser({email: user.email, name: profile.name});
            }
        }
    }

    const fetchMessages = async () => {
        const { data: messages } = await supabase.from('messages').select('*');
        // @ts-ignore
        setMessages(messages);
    }
    const handleFocus = () => {
        if (messageInputRef.current) {
            messageInputRef.current.focus(); // Focus the textarea
        }
    }

    const sendMessage = async () => {
       const { error } = await supabase
           .from('messages')
           .insert({
               chat_id: 1, author_name: user.name, content: message, created_at: new Date().toISOString()});

        if (messageInputRef.current) {
            messageInputRef.current.value = ''; // Manually clear textarea
        }
        setMessage("")
    }
    const formatTime = (created_at: any) => {
        const date = new Date(created_at);
        return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    }

    return (
        <main className={`chat-container ${isVisible ? "visible" : "hidden"}`} role="dialog" aria-labelledby="chat-header">
            <div className="chat-header">
                <div className="flex flex-row my-2 justify-between">
                    <p className="border-1 p-2 rounded-2xl text-xl w-fit font-bold">Chatul General</p>
                    <button className="border-3 p-1 rounded-2xl bg-content1" onClick={clearMessages} aria-label="Clear messages"><Trash /></button>
                </div>
            </div>
            <div id="chat-area"
                 style={{
                     width: '100%',
                     height: '600px',
                     whiteSpace: 'nowrap'
                 }}
                 className="bg-content1 flex flex-col p-2 items-start rounded-medium overflow-auto"
            >
                <div id="messages" className="flex flex-col self-start w-full">
                    {messages.map((msg, index) => (
                        <div id="message-block"
                             className="border-2 p-2 my-2 bg-content3 w-[50%] rounded-medium"
                             key={index}
                             style={{
                                 textAlign: msg.author_name === user.name ? "left" : "right",
                                 alignSelf: msg.author_name === user.name ? "flex-end" : "flex-start",
                                 wordBreak: 'break-word',
                                 whiteSpace: 'nowrap'
                             }}
                        >
                            <div id="message-content" className="flex flex-col gap-1">
                                <div className="font-bold">
                                    {msg.author_name}
                                    <span className="font-light ml-[10px] justify-center text-[10px]">
                                        {formatTime(msg.created_at)}
                                    </span>
                                </div>
                                <p>{msg.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex mt-2 flex-row border-2 rounded-2xl">
                <textarea
                    name="message"
                    ref={messageInputRef}
                    value={message}
                    onFocus={(e) => handleFocus()}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Scrie un mesaj..."
                    style={{
                        padding: "10px",
                        border: "2px solid blue",
                        borderRadius: "10px",
                        width: '100%',
                        height: "120px",
                        marginRight: '3px',
                        resize: "none"
                    }}
                />
                <Button isIconOnly onClick={sendMessage} className="h- w-" aria-label="Send message">
                    <SendIcon size={undefined} height={undefined} width={undefined} />
                </Button>
            </div>
        </main>
    );
};

export default Chat;
