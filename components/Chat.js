import React, {useState, useEffect, useRef} from 'react';
import io from 'socket.io-client';
import {Button, Textarea} from "@nextui-org/react";
import {createClient} from "@/utils/supabase/client";

import {SendIcon} from "@/components/ui/SendIcon"
import {Trash} from "lucide-react";
import {wait} from "next/dist/lib/wait";

const socket = io('http://localhost:3000');


const Chat = ({isVisible}) => {
    const [user, setUser] = useState({
        email: '',
    });
    const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('chatMessages')) || []);
    const [message, setMessage] = useState("");
    const messageInputRef = useRef(null);

    const handleFocus = () => {
        if (messageInputRef.current) {
            messageInputRef.current.focus(); // Focus the textarea
        }
    };
    const clearMessages = () => {
        setMessages([]);
        localStorage.removeItem('chatMessages');
    };
    const fetchUser = async () => {
        const supabase = createClient()
        const {data: {user}} = await supabase.auth.getUser();
        setUser(user);
    };
    useEffect(() => {
        fetchUser()
       handleFocus()
        const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        setMessages(storedMessages);

        socket.on('initialMessages', (initialMessages) => {
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, ...initialMessages];
                localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
                return updatedMessages;
            });
        });

        socket.on('message', (message) => {
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, message];
                localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
                return updatedMessages;
            });
        });

        return () => {
            socket.off('initialMessages');
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        if (user && message)
        {
            const newMessage = { name: user.email, text: message };
            socket.emit('message', newMessage);
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, newMessage];
                localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
                return updatedMessages;
            });
            setMessage('');
        }
    };

    return (
        <main className={` chat-container ${isVisible ? "visible" : "hidden"}`} role="dialog" aria-labelledby="chat-header">
            <div className="chat-header">
                <div className="flex flex-row my-2 justify-between">
                    <p className="border-3 rounded-2xl text-xl w-fit hover:bg-foreground font-bold">Chatul General</p>
                    <button className="border-3 p-1 rounded-2xl bg-content1" onClick={clearMessages}
                            aria-label="Clear messages"><Trash/></button>
                </div>
                <div>
                    <textarea
                        value={messages
                            .map(msg => `${msg.name} \n ${msg.text}`)
                            .join('\n')}
                        rows="15"
                        cols="50"
                        style={{
                            padding: "7px",
                            borderRadius: "10px",
                            border:"1px solid blue",
                            width: '100%',
                            height: '600px',
                            resize: "none"}}
                        readOnly
                        className="chat-bubble own-message"
                    />
                </div>
                <div className="flex mt-2 flex-row border-2 rounded-2xl">
                   <textarea
                       rows="10"
                       ref={messageInputRef}
                       onFocus={handleFocus}
                       value={message}
                       onChange={e => setMessage(e.target.value)}
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
                        <SendIcon/>
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default Chat;
