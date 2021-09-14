import React, { useState } from "react";
import { PostFilter } from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/Button/MyButton";
import { MyModal } from "./components/UI/Modal/MyModal";
import { usePosts } from "./hooks/usePosts";
import axios from "axios";


import "./styles/App.css";

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: "Javascript 1", body: "Description full news" },
        { id: 2, title: "Pyton 2", body: " full news" },
        { id: 3, title: "Delphi 3", body: " news" },
    ]);

	const [filter, setFilter] = useState({sort: '', query: ''})
	const [modal, setModal] = useState(false)
	const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query)


    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
		setModal(false)
    };

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

	async function fetchPosts(){
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {

        })
 		setPosts(response.data)
	}

    return (
        <div className="app">
			<hr />
			<div className="search">
			<MyButton onClick={() => setModal(true)}>
				Создать пост
			</MyButton>
			<MyButton onClick={fetchPosts}>
				Получить посты
			</MyButton>
			</div>
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
