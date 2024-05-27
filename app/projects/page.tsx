
import CommentSection from "@/components/CommentSection";
import FileUpload from "@/components/FileUpload";

const Projects = () => {
        return (
            <main className="mx-4 flex flex-col justify-between w-screen bg-content2 border-2 rounded">
                    <div className="flex flex-col bg-content1 m-2 hover:my-1 hover:mx-1 transition-all duration-300">
                        <div className=" border-3 rounded-medium bg-blue-500">
                            <h1 className="text-2xl text-white font-bold m-4">Proiectele tale</h1>
                        </div>
                            <div>
                                <CommentSection projectId={1}/>
                                <FileUpload projectId={"1"}/>
                            </div>

                    </div>
            </main>
        );
};

export default Projects;