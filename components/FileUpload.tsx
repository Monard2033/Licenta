import { createClient } from "@/utils/supabase/client";
import React, {useState, useCallback} from "react";
import { useDropzone } from "react-dropzone";
import {Button} from "@nextui-org/react";


const FileUpload = ({ userId, onFileUpload, taskName }: {
    userId: string,
    onFileUpload?: (file: any) => void,
    taskName?: string
}) => {
    const supabase = createClient();
    const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFilesToUpload((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleFileUpload = async () => {
        for (const file of filesToUpload) {
            const fileName = encodeURIComponent(file.name);
            const filePath = `${userId}/${file.name}`;
            const { data, error } = await supabase
                .storage
                .from('projects-files')
                .upload(filePath,file);

            if (error) {
                console.error('Error uploading file:', error);
            } else {
               alert("Fisier incarcat cu succes")
                if (onFileUpload) {
                    onFileUpload(file);
                }
            }
        }
        setFilesToUpload([]);
    };

    return (
        <div className="file-upload flex flex-col w-full min-w-96 overflow-auto min-h-96 max-h-screen bg-content2 rounded-3xl border-1 gap-2 p-2">
            <div className="file-preview p-1">
                <h3 className="text-xl">Fisiere pentru Incarcare (format fisier .zip , .rar):</h3>
                <ul>
                    {filesToUpload.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            </div>
            <div
                {...getRootProps()}
                className={`dropzone p-4 border-dashed border-2 rounded-lg ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Arunca fisierele aici...</p>
                ) : (
                    <p className="text-large">Drag 'n' drop, sau click pentru selectie fisier</p>
                )}
            </div>
            {filesToUpload.length > 0 && (
                <Button
                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={handleFileUpload}
                >
                    Trimite Fisierele
                </Button>
            )}
        </div>
    );
};

export default FileUpload;
