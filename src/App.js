import React, { useMemo, useState } from "react";
import { PostFilter } from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

import "./styles/App.css";

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: "Javascript 1", body: "Description full news" },
        { id: 2, title: "Pyton 2", body: " full news" },
        { id: 3, title: "Delphi 3", body: " news" },
    ]);

	const [filter, setFilter] = useState({sort: '', query: ''})

	const sortedPosts = useMemo(() => {
		if (filter.sort) {
			return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
		}
		return posts
	}, [filter.sort, posts])

	const sortedAndSearchPosts = useMemo(() => {
		return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(filter.query))
	}, [filter.query, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    };

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    return (
        <div className="app">
            <PostForm create={createPost} />
			<hr/>
			<PostFilter 
				filter={filter}
				setFilter={setFilter}
			/>
			<PostList
				remove={removePost}
				posts={sortedAndSearchPosts}
				title="Список постов 1"
			/>
        </div>
    );
}

export default App;
