import React, { useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import "./styles/App.css";

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: "Javascript 1", body: "Description full news" },
        { id: 2, title: "Javascript 2", body: "Description full news" },
        { id: 3, title: "Javascript 3", body: "Description full news" },
    ]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    };

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    return (
        <div className="app">
            <PostForm create={createPost} />
            <PostList
                remove={removePost}
                posts={posts}
                title="Список постов 1"
            />
        </div>
    );
}

export default App;
