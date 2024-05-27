'use client'
import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {Textarea} from "@nextui-org/react";


const CommentSection = ({ projectId }: { projectId: number }) => {
    const supabase = createClient()
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([{
        projectId: "",
        userid: "",
        content: "",
        created_at: "",
        updated_at: "",
    }]);

    useEffect(() => {
        fetchComments();
    }, [projectId]);

    const fetchComments = async () => {
        const {data, error} = await supabase
            .from('comments')
            .select('*')
            .eq('project_id', projectId);
        setComments(comments);
    };

    const handleCommentSubmit = async (e: { preventDefault: () => void; }) => {
        const {data, error} = await supabase
            .from('comments')
            .insert([{project_id: projectId, content: newComment}]);

        if (error) {
            console.error('Error adding comment:', error);
        } else {
            setNewComment('');
            fetchComments();
        }
    };
    const pathName = usePathname();

    return (
        <div className="comments-section">
            <h3>Comments</h3>
            <form onSubmit={handleCommentSubmit}>
                <Textarea
                    className="col-span-12 md:col-span-6 mb-6 md:mb-0 border-2 rounded-medium"
                    disableAutosize={false}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                />
                <button type="submit">Submit</button>
            </form>
            <div className="comments-list">
                {comments.map((comment: any) => (
                    <div key={comment.id}>
                        {comment.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
export  default CommentSection;
