import './styles/App.css'
import {usePosts} from "./hooks/usePosts.ts";
import {useStore} from "./store/useStore.ts";
import PostsTable from "./components/PostsTable.tsx";

function App() {
    const {data: posts, isLoading, error} = usePosts()
    const {selectedIds, toggleSelection, clearSelection} = useStore();

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <PostsTable posts={posts || []} selectedIds={selectedIds} toggleSelection={toggleSelection} />
            <p className={"mt-4 text-lg font-semibold"}>
                Selected: {selectedIds.length}
            </p>
            <button onClick={clearSelection} className={"px-4 py-4 mx-4 my-4"}>Obrisi selektovane</button>
        </div>
    )
}

export default App
