
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
import {PlusIcon} from "@/components/ui/PlusIcon";
import {createClient} from "@/utils/supabase/client";

export default function InsertData({updateUsers}:{updateUsers: ()=> Promise<void>}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        team: "",
    });

    const supabase = createClient()
    const handleSubmit = async () => {
         const { data,error } = await supabase
            .from('users')
            .insert(userData)
        if(!error)
        {
            alert("Adaugat")
            updateUsers()
        }
    };
    return (
        <>
            <Button color="success" variant="bordered" className="text-content1-foreground mr-4"
                    onPress={onOpen}
                    endContent={<PlusIcon width={"64px"} height={"64px"} />}
            >Adauga
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Adauga Utilizator</ModalHeader>
                            <ModalBody>
                                <div className={"flex flex-col gap-3"}>
                                    <Input label={"Nume Prenume"} placeholder={"Text"} onChange={(e)=>{
                                        setUserData((prev)=>{
                                            return {
                                                ...prev,
                                                name:e.target.value
                                            }
                                        })
                                    }} />
                                    <Input label={"Email"} placeholder={"Text"} onChange={(e)=>{
                                        setUserData((prev)=>{
                                            return {
                                                ...prev,
                                                email:e.target.value
                                            }
                                        })
                                    }}/>
                                    <Input label={"Telefon"} placeholder={"Text"} onChange={(e)=>{
                                        setUserData((prev)=>{
                                            return {
                                                ...prev,
                                                phone:e.target.value
                                            }
                                        })
                                    }} />
                                    <Input label={"Rol"} placeholder={"Text"} onChange={(e)=>{
                                        setUserData((prev)=>{
                                            return {
                                                ...prev,
                                                role:e.target.value
                                            }
                                        })
                                    }}/>
                                    <Input label={"Echipa"} placeholder={"Int(1,2...)"} onChange={(e)=>{
                                        setUserData((prev)=>{
                                            return {
                                                ...prev,
                                                team:e.target.value
                                            }
                                        })
                                    }}/>
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
