import React, { useMemo, useState } from "react";
import { PostFilter } from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/Button/MyButton";
import { MyModal } from "./components/UI/Modal/MyModal";


import "./styles/App.css";

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: "Javascript 1", body: "Description full news" },
        { id: 2, title: "Pyton 2", body: " full news" },
        { id: 3, title: "Delphi 3", body: " news" },
    ]);

	const [filter, setFilter] = useState({sort: '', query: ''})
	const [modal, setModal] = useState(false)

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
		setModal(false)
    };

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    return (
        <div className="app">
			<hr />
			<MyButton onClick={() => setModal(true)}>
				Создать пост
			</MyButton>
			<hr />
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
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
