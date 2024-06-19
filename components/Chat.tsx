import React, { useState, useEffect, useRef } from 'react';
import { Button, Textarea } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { SendIcon } from "@/components/ui/SendIcon";
import { Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMessageContext } from "@/components/MessageContext";

const supabase = createClient();

// @ts-ignore
const Chat = ({ isVisible }) => {
    const [user, setUser] = useState({email: '', name: ''});
    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState("");
    const {setUnseenMessages} = useMessageContext();
    const [selectedMessageId, setSelectedMessageId] = useState(null); // State to track selected message
    const messageInputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        fetchUser();
        fetchMessages();
        const subscription = supabase
            .channel("realtime:public:messages")
            .on(
                "postgres_changes",
                {event: "*", schema: "public", table: "messages"},
                (payload) => {
                    fetchMessages();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const fetchUser = async () => {
        const {data: {user}} = await supabase.auth.getUser()
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
        const {data: messages, error} = await supabase
            .from("messages")
            .select("*")
            .order('created_at', {ascending: true});
        if (error) {
            console.error("Error fetching messages:", error);
        } else {
            setMessages(messages);
            await supabase
                .from("messages")
                .update({seen: true})
                .eq("seen", false);
            setUnseenMessages(0);
        }
    }

    const handleFocus = () => {
        if (messageInputRef.current) {
            messageInputRef.current.focus();
        }
    }

    const sendMessage = async () => {
        const {error} = await supabase
            .from('messages')
            .insert({
                chat_id: 1,
                author_name: user.name,
                content: message,
                created_at: new Date().toISOString(),
                seen: false
            });

        if (messageInputRef.current) {
            messageInputRef.current.value = '';
        }
        setMessage("")
    }

    const deleteMessage = async (messageId: any) => {
        const {error} = await supabase.from('messages').delete().eq('id', messageId);
        if (error) {
            console.error("Error deleting message:", error);
        } else {
            fetchMessages(); // Refresh the messages list
            setSelectedMessageId(null); // Deselect the message after deletion
        }
    }

    const formatTime = (created_at: string | number | Date) => {
        const date = new Date(created_at);
        return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    }

    const handleRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, messageId: null) => {
        e.preventDefault(); // Prevent the default context menu from appearing
        setSelectedMessageId(prev => prev === messageId ? null : messageId); // Toggle selection
    }


    const pathName = usePathname();
    if (pathName != "/login") {
        return (
            <main className={`chat-container ${isVisible ? "visible" : "hidden"}`} role="dialog"
                  aria-labelledby="chat-header">
                <div className="chat-header">
                    <div className="flex flex-row my-2 justify-between">
                        <p className="border-1 p-2 rounded-2xl text-xl w-fit font-bold">Chatul General</p>
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
                                 className="border-2 p-2 my-2 bg-content3 w-[55%] rounded-medium"
                                 key={index}
                                 style={{
                                     textAlign: msg.author_name === user.name ? "left" : "right",
                                     alignSelf: msg.author_name === user.name ? "flex-end" : "flex-start",
                                     wordBreak: 'break-word',
                                     whiteSpace: 'nowrap',
                                     border: selectedMessageId === msg.id ? '6px solid blue' : '1px solid gray'
                                 }}
                                 onContextMenu={(e) => handleRightClick(e, msg.id)}
                            >
                                <div id="message-content" className="flex flex-col gap-1">
                                    {msg.author_name === user.name ? (
                                        <div className="font-bold">
                                            <span className="font-light mr-4 text-[10px]">
                                                {formatTime(msg.created_at)}
                                            </span>
                                            {msg.author_name}
                                        </div>
                                    ) : (
                                        <div className="font-bold">
                                            {msg.author_name}
                                            <span className="font-light ml-4 text-[10px]">
                                                {formatTime(msg.created_at)}
                                            </span>
                                        </div>
                                    )}
                                    <p>{msg.content}</p>
                                    {selectedMessageId === msg.id && msg.author_name === user.name && ( // Conditionally render the delete icon
                                        <button onClick={() => deleteMessage(msg.id)} aria-label="Delete message">
                                            <Trash/>
                                        </button>
                                    )}
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
                        <SendIcon size={undefined} height={undefined} width={undefined}/>
                    </Button>
                </div>
            </main>
        );
    }
};

export default Chat;
