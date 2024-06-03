import React, {useEffect, useState} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input
} from "@nextui-org/react";

import { createClient } from "@/utils/supabase/client";

export default function EditData({updateSessions}:{updateSessions: ()=> Promise<void>}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [sessionData, setSessionData] = useState({
        attendance: "",
        grade: "",
        session_id: 1  // Assuming a default session_id of 1, adjust as needed
    });

    const supabase = createClient();


    const handleSubmit = async () => {
        const { data, error } = await supabase
            .from('sessions')
            .update(sessionData);

        if (!error) {
            alert("Data updated successfully");
            updateSessions();
        }
    };

    return (
        <>
            <Button onPress={onOpen} className=" text-content1-foreground mr-4">
            Editeaza
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Session Data</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-3">
                                    <Input label="Attendance" placeholder="Text" onChange={(e) => {
                                        setSessionData((prev) => ({
                                            ...prev,
                                            attendance: e.target.value
                                        }));
                                    }} />
                                    <Input label="Grade" placeholder="Int(1,2...)" onChange={(e) => {
                                        setSessionData((prev) => ({
                                            ...prev,
                                            grade: e.target.value
                                        }));
                                    }} />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Anuleaza
                                </Button>
                                <Button type="button" color="primary" onPress={onClose} onClick={handleSubmit}>
                                    Salveaza
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
