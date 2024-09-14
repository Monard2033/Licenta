'use client';
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";
import {checkAdminRole, CommentsInterface, fetchUser} from "@/utils/users";

const CommentSection = ({ userId, taskName , onCommentSubmit }: { userId: string, onCommentSubmit?: (comment: any) => void,taskName: string }) => {
    const supabase = createClient();
    const [newComment, setNewComment] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState<any[]>([]);
    const [userInfo, setUserInfo] = useState<any>();
    const [comments, setComments] = useState<CommentsInterface[]>([]);

    useEffect(() => {
        fetchComments();
    }, [taskName]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // @ts-ignore
                const userData = await fetchUser(setUserInfo);
                setUserInfo(userData);
                if (userData) {
                    setUser(userInfo?.name); // Set the profile name
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchData();
    }, []);


    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('task_name', taskName);

        if (error) {
            console.error('Error fetching comments:', error);
        } else {
            setComments(data);
            const isAdmin = await checkAdminRole();
            // @ts-ignore
            setIsAdmin(isAdmin);
        }
    };

    const handleCommentSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (newComment === '') {
            alert('Introduceti un comentariu');
            return;
        }
        const { data, error } = await supabase
            .from('comments')
            .insert([{
                task_name: taskName,
                user_name: userId,
                content: newComment,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }]);

        if (error) {
            console.error('Error adding comment:', error);
        } else {
            setNewComment('');
            fetchComments();
            if (onCommentSubmit) {
                onCommentSubmit(comments);
            }
            alert('Trimis cu succes');
        }

    };
    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, commentId: number) => {
        const newContent = e.target.value;

        // Update the specific comment in the state
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId ? { ...comment, content: newContent } : comment
            )
        );
    };


    const pathName = usePathname();

    return (
        <div className="comments-section flex flex-col w-full h-fit bg-content2 rounded-3xl border-1 gap-2 p-2">
            <h3>ADAUGA UN COMENTARIU PENTRU ACEASTA SARCINA</h3>
            <form className="flex flex-col items-end gap-2" onSubmit={handleCommentSubmit}>
        <textarea
            className="border-2 rounded-medium w-full min-h-44 max-h-64 bg-inherit p-2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="     ...comentariu"
        />
                <Button className="w-fit justify-center" type="submit">Adauga</Button>
            </form>
            {isAdmin && (
                <div className="comments-list max-h-64 overflow-y-auto">
                    {comments
                        .sort((a, b) => a.created_at.localeCompare(b.created_at))
                        .map((comment: any) => (
                        <div key={comment.id} className="comment-item border p-2 my-2 rounded">
                            <div className="comment-content">{comment.content}</div>
                            <div className="comment-meta text-sm text-gray-500">
                                <div>Sarcina: {comment.task_name}</div>
                                <div>Utilizator: {comment.user_name}</div>
                                <div>Creat La: {new Date(comment.created_at).toLocaleString()}</div>
                                <div>Actualizat La: {new Date(comment.updated_at).toLocaleString()}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
                <div className="last-user-comment mt-4 p-4 bg-content2 rounded">
                    <h4>Ultimul comentariu creat de tine</h4>
                    {comments.filter(comment => comment.user_name === userId)
                            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .slice(0, 1)
                        .map((comment: any) => (
                            <form key={comment.user_name} className="flex flex-col gap-2" onSubmit={(e) => handleCommentSubmit(comment.id)}>
                        <textarea
                            className="border-2 rounded-medium w-full min-h-24 max-h-64 bg-inherit p-2"
                            value={comment.content}
                            onChange={(e) => handleCommentChange(e, comment.user_name)}
                        />
                                <Button className="w-fit justify-center" type="submit">Actualizeaza comentariul</Button>
                            </form>
                        ))}
                </div>
        </div>
    );
};

export default CommentSection;
