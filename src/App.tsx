import './styles/App.css'
import {usePosts} from "./hooks/usePosts.ts";
import {useSelectionStore} from "./store/useSelectionStore.ts";
import PostsTable from "./components/PostsTable.tsx";
import {Post} from "./types.ts";
import {useState} from "react";
import AddPostModal from "./components/AddPostModal.tsx";
import {useModalStore} from "./store/useModalStore.ts";
import {useQueryClient} from "@tanstack/react-query";

function App() {
    const {data: posts, isLoading, error} = usePosts()
    const {selectedIds, toggleSelection, clearSelection} = useSelectionStore();
    const [localPosts, setLocalPosts] = useState<Post[]>([]);
    const { openModal } = useModalStore();

    const queryClient = useQueryClient();

    const removeSelected = () => {
        setLocalPosts(localPosts => localPosts.filter(post => !selectedIds.includes(post.id)));
        queryClient.setQueryData<Post[]>(["posts"], (queryPosts) =>
            queryPosts ? queryPosts.filter((post) => !selectedIds.includes(post.id)) : []
        );
        clearSelection();
    }

    const addPost = (post: Omit<Post, "id">) => {
        const lastId = allPosts.length > 0 ? Math.max(...allPosts.map(post => post.id)) : 0;
        const newPost = { ...post, id: lastId + 1 };
        setLocalPosts(prevPosts => [...prevPosts, newPost]);

    }

    const allPosts = posts ? [...posts, ...localPosts] : localPosts;

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div className="p-4">

            <button onClick={openModal} className="px-4 py-2 bg-green-500 text-white rounded">
                Add Post
            </button>

            <AddPostModal onAddPost={addPost}/>


            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <PostsTable posts={allPosts || []} selectedIds={selectedIds} toggleSelection={toggleSelection}/>
            <p className={"mt-4 text-lg font-semibold"}>
                Selected: {selectedIds.length}
            </p>
            <button onClick={clearSelection} className={"px-4 py-4 mx-4 my-4"}>Ponisti selekciju</button>
            <button onClick={removeSelected} className={"px-4 py-4 mx-4 my-4"}>Obrisi selektovane</button>
        </div>
    )
}

export default App
