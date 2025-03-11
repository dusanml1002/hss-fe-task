import {useQuery} from "@tanstack/react-query";
import {Post} from "../types.ts";

export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            if (!res.ok) throw new Error(res.statusText);
            const data: Post[] = await res.json();
            return data.filter((post) => post.userId === 1);
        }
    })
}