import React, { useState, useEffect, useRef } from "react";
import { PostFilter } from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from "../components/UI/Button/MyButton";
import { MyModal } from "../components/UI/Modal/MyModal";
import { usePosts } from "../hooks/usePosts";

import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import { Pagination } from "../components/UI/Pagination/Pagination";
import { useObserver } from "../hooks/useObserver";

export function Posts() {
    const [posts, setPosts] = useState([
        { id: 1, title: "Javascript 1", body: "Description full news" },
        { id: 2, title: "Pyton 2", body: " full news" },
        { id: 3, title: "Delphi 3", body: " news" },
    ]);

    const [filter, setFilter] = useState({ sort: "", query: "" });
    const [modal, setModal] = useState(false);
    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const lastElement = useRef();

    const [fetchPosts, isPostsLoading, postError] = useFetching(
        async (limit, page) => {
            const response = await PostService.getAll(limit, page);
            setPosts([...posts, ...response.data]);
            const totalCount = response.headers["x-total-count"];
            setTotalPages(getPageCount(totalCount, limit));
        }
    );

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    });

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page);
    };

    return (
        <div className="main">
            <div className="search">
                <MyButton onClick={() => setModal(true)}>?????????????? ????????</MyButton>
                <MyButton onClick={fetchPosts}>???????????????? ??????????</MyButton>
            </div>
            <hr />
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <PostFilter filter={filter} setFilter={setFilter} />
            {postError && <h2>?????????????????? ???????????? ${postError}</h2>}

            <PostList
                remove={removePost}
                posts={sortedAndSearchPosts}
                title="???????????? ????????????"
            />
            <div
                ref={lastElement}
                style={{ height: 20, background: "red" }}
            ></div>

            {isPostsLoading && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "50px",
                    }}
                >
                    <Loader />
                </div>
            )}

            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}
