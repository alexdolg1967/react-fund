import React, {useState} from "react";
import PostItem from "./PostItem";
import './styles/App.css'

function App() {

	const [posts, setPosts] = useState([
		{id: 1, title: 'Javascript 1', body:'Description full news'},
		{id: 2, title: 'Javascript 2', body:'Description full news'},
		{id: 3, title: 'Javascript 3', body:'Description full news'}
	])
    
    return (
        <div className="App">
			<h2>Список постов</h2>
			{posts.map(post => 
				<PostItem post={post} key={post.id} />
			)}
        </div>
    );
}

export default App;
