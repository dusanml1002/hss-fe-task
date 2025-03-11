import './App.css'
import {usePosts} from "./hooks/usePosts.ts";

function App() {
  const {data: posts, isLoading, error} = usePosts()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <ul className={"space-y-2"}>
        {posts?.map((post) => (
            <li key={post.id} className={"p-2 border rounded bg-gray-100"}>
              <h2 className={"font-semibold"}>{post.title}</h2>
            </li>
        ))}
      </ul>

    </div>
  )
}

export default App
