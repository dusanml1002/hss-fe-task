import './App.css'
import {usePosts} from "./hooks/usePosts.ts";
import {useStore} from "./store/useStore.ts";

function App() {
    const {data: posts, isLoading, error} = usePosts()
    const {selectedIds, toggleSelection, clearSelection} = useStore();

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <table className={"w-full border-collapse border border-gray-300"}>
                <thead>
                <tr className={"bg-gray-200"}>
                    <th className={"border-gray-300 p-2"}>Select</th>
                    <th className="border border-gray-300 p-2">ID</th>
                    <th className="border border-gray-300 p-2">Title</th>
                    <th className="border border-gray-300 p-2">Body</th>
                </tr>
                </thead>
                <tbody>
                {posts?.map((post) => (
                    <tr key={post.id} className="odd:bg-gray-100">
                        <td className={"border-gray-300 p-2"}>
                            <input
                                type={"checkbox"}
                                checked={selectedIds.includes(post.id)}
                                className={"h-4 w-4"}
                                onChange={() => toggleSelection(post.id)}
                            />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">{post.id}</td>
                        <td className="border border-gray-300 p-2">{post.title}</td>
                        <td className="border border-gray-300 p-2">{post.body}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p className={"mt-4 text-lg font-semibold"}>
                Selected: {selectedIds.length}
            </p>
            <button onClick={clearSelection} className={"px-4 py-4 mx-4 my-4"}>Obrisi selektovane</button>
        </div>
    )
}

export default App
