import React, { useMemo, useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyInput from "./components/UI/Input/MyInput";
import { MySelect } from "./components/UI/Select/MySelect";
import "./styles/App.css";

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: "Javascript 1", body: "Description full news" },
        { id: 2, title: "Pyton 2", body: " full news" },
        { id: 3, title: "Delphi 3", body: " news" },
    ]);

	const [selectedSort, setSelectedSort] = useState('')
	const [searchQuery, setSearchQuery] = useState('')

	const sortedPosts = useMemo(() => {
		console.log('вызвана')
		if (selectedSort) {
			return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
		}
		return posts
	}, [selectedSort, posts])

	const sortedAndSearchPosts = useMemo(() => {
		return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(searchQuery))
	}, [searchQuery, sortedPosts])

	const sortPosts = (sort) => {
		setSelectedSort(sort)
	}

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
			<div className="search">
				<MyInput
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					placeholder="Поиск..."
				/>
				<MySelect className="my_select"
					value={selectedSort}
					onChange={sortPosts}
					defaultValue="Сортировка " 
					options={[
						{value: 'title', name: 'По названию'},
						{value: 'body', name: 'По описанию'},
					]}
				/>
			</div>
            {sortedAndSearchPosts.length !== 0 ? (
                <PostList
                    remove={removePost}
                    posts={sortedAndSearchPosts}
                    title="Список постов 1"
                />
            ) : (
                <h3>Посты не найдены!</h3>
            )}
        </div>
    );
}

export default App;
