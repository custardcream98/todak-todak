import React, { useEffect, useState } from 'react'
import fetchPosts from '../api/fetchPosts';

export default function Posts({ token }) {
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPosts = async (token) => {
    setIsLoading(true);
    const posts = await fetchPosts(token);

    if (!!posts) {
      setPostData(posts);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadPosts(token);
  }, [token])

  return (
    isLoading ? <p>포스트 로딩중...</p> :
      <>
        {React.Children.toArray(postData.map((post) =>
          <section className='post'>
            <strong>{post.title}</strong>
            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
            <ul>
              {React.Children.toArray(
                post.tags.map((tag) =>
                  <li>{tag}</li>
                )
              )}
            </ul>
            <p>{post.subject}</p>
            <p>{post.content}</p>
          </section>
        ))}
      </>
  )
}
