import { createClient } from "@/utils/supabase/client";
import React from "react";

const FileUpload = ({ projectId, onFileUpload }: { projectId: string, onFileUpload?: (file: any) => void }) => {
    const supabase = createClient();

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const filePath = `projects/${projectId}/${file.name}`;

        const { data, error } = await supabase
            .storage
            .from('projects-files')
            .upload(filePath, file);

        if (error) {
            console.error('Error uploading file:', error);
        } else {
            console.log('File uploaded:', data);
            if (onFileUpload) {
                onFileUpload(file);
            }
        }
    };

    return (
        <div className="file-upload">
            <input type="file" onChange={handleFileUpload} />
        </div>
    );
};

export default FileUpload;
