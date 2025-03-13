import {useState} from "react";
import {Post} from "../types.ts";
import {useModalStore} from "../store/useModalStore.ts";

const AddPostModal = ({ onAddPost }: { onAddPost: (post: Post) => void }) => {

  const {isOpen, closeModal} = useModalStore();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) return;

    const newPost = {
      id: 0,
      title,
      body,
      userId: 1,
    };

    onAddPost(newPost);
    setTitle("");
    setBody("");
    closeModal();
  };

  const cancel = () => {
    setTitle("");
    setBody("");
    closeModal();
  }

  return isOpen ? (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Add New Post</h2>
          <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
          />
          <textarea
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
          />
          <div className="flex justify-end space-x-2">
            <button onClick={cancel} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
          </div>
        </div>
      </div>
  ) : null;
};

export default AddPostModal;