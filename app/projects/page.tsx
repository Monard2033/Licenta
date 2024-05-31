"use client"
import React, { useState , useEffect } from 'react';
import FileUpload from '@/components/FileUpload';
import CommentSection from '@/components/CommentSection';
import {fetchUsersProjects, ProjectInterface} from "@/utils/users";

const ProjectPage = (params : any) => {
    const [comments, setComments] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [project, setProject] = useState<ProjectInterface>();
    const projectId = '';

    async function Project(){
        const {data ,error} = await fetchUsersProjects(params.params.id);
        if(error) {
            return console.log(data)
        }
        setProject(data);
    }

    useEffect(() => {
        Project();
    }, []);
    const handleFileUpload = (file: File) => {
        setFiles([...files, file]);
    };

    const handleCommentSubmit = (comment: string) => {
        setComments([...comments, comment]);
    };

    return (
        <main className="mx-4 flex flex-col bg-content2 border-2 justify-between w-screen h-screen">
            <div className="flex flex-col bg-content1 m-2 border-3 rounded-medium hover:my-1 hover:mx-1 transition-all duration-300">
            <h1>Project Name</h1>
            <p>Project Description</p>
            <FileUpload projectId={projectId} onFileUpload={handleFileUpload} />
            <CommentSection projectId={parseInt(projectId, 10)} onCommentSubmit={handleCommentSubmit} />
            <div>
                <h2>Uploaded Files</h2>
                <ul>
                    {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Comments</h2>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
            </div>
        </div>
        </main>
    );
};

export default ProjectPage;
