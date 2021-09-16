import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';

export const PostIdPage = () => {

	const params = useParams()
	const [post, setPost] = useState({})
	const [comments, setComments] = useState([])
	const [fetchPostById, isLoading, error] = useFetching(async(id) =>{
		const response = await PostService.getById(id)
		setPost(response.data)
	})
	const [fetchComments, isComLoading, comError] = useFetching(async(id) =>{
		const response = await PostService.getCommentsByPostId(id)
		setComments(response.data)
	})
	
	useEffect(() => {
		fetchPostById(params.id)
		fetchComments(params.id)
	},[])

	return (
        <div className="main">
            {isLoading ? (
                <Loader />
            ) : (
                <h2>
                    {post.id}. {post.title}
                </h2>
            )}
            <br />
            <div>{post.body}</div>
            <hr />
            <h4>Комментарии</h4>
            <hr />
            {isComLoading ? (
                <Loader />
            ) : (
                <div>
                    {comments.map((comm) => (
                        <div style={{ marginTop: 15 }}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
