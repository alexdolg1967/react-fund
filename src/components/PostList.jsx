import React from 'react'
import PostItem from './PostItem'

function PostList({posts, title, remove}) {
    return (
        <div className="main">
            <h2>{title}</h2>
			{posts.map((post, index) =>
				<PostItem remove={remove} number={index + 1} post={post} key={post.id} />
			)}
        </div>
    )
}

export default PostList
