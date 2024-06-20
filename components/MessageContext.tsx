"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

interface MessageContextType {
    unseenMessages: number;
    setUnseenMessages: React.Dispatch<React.SetStateAction<number>>;
}

const defaultContextValue: MessageContextType = {
    unseenMessages: 0,
    setUnseenMessages: () => {},
};

const MessageContext = createContext<MessageContextType>(defaultContextValue);

export const useMessageContext = () => useContext(MessageContext);

// @ts-ignore
export const MessageProvider = ({ children }) => {
    const [unseenMessages, setUnseenMessages] = useState(0);

    useEffect(() => {
        const fetchUnseenMessages = async () => {
            const { data: messages, error } = await supabase
                .from("messages")
                .select("*")
                .eq("seen", false); // Assuming you have a 'seen' field to mark seen/unseen messages

            if (error) {
                console.error("Error fetching messages:", error);
            } else {
                setUnseenMessages(messages.length);
            }
        };

        fetchUnseenMessages();

        const subscription = supabase
            .channel("realtime:public:messages")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "messages" },
                (payload) => {
                    fetchUnseenMessages(); // Fetch unseen messages again
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    return (
        <MessageContext.Provider value={{ unseenMessages, setUnseenMessages }}>
            {children}
        </MessageContext.Provider>
    );
};
