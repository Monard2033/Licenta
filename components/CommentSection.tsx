'use client';
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";
import { CommentsInterface} from "@/utils/users";

const CommentSection = ({ userId, taskName , onCommentSubmit }: { userId: string, onCommentSubmit?: (comment: any) => void,taskName: string }) => {
    const supabase = createClient();
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState<CommentsInterface[]>([]);

    useEffect(() => {
        fetchComments();
    }, [taskName]);

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('task_name', taskName);

        if (error) {
            console.error('Error fetching comments:', error);
        } else {
            setComments(data);
        }
    };

    const handleCommentSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
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

    const pathName = usePathname();

    return (
        <div className="comments-section flex flex-col w-full bg-content2 rounded-3xl border-1 gap-2 p-2">
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
            <div className="comments-list">
                {comments.map((comment: any) => (
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
        </div>
    );
};

export default CommentSection;
