import * as React from "react";


interface PostsTableProps {
    posts: {id: number; title: string; body: string}[];
    selectedIds: number[];
    toggleSelection: (id: number) => void;
}

const PostsTable: React.FC<PostsTableProps> = ({posts, selectedIds, toggleSelection}) => {

    return <table className={"w-full border-collapse border border-gray-300"}>
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
            <tr key={post.id} className="odd:bg-gray-100 even:bg-gray-300">
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
}

export default PostsTable;