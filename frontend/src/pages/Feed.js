import React, { useEffect, useState } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

export default function Feed() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function loadData() {
      const response = await api.get('posts');
      setPosts(response.data)
    }
    loadData();
  }, [])

  // useEffect(() => {
  //  function registerToSocket(){
  //     const socket = io('http://localhost:3333');

  //     socket.on('post', newPost => {
  //       setPosts({ posts: [newPost, ...posts] })
  //     });

  //     socket.on('like', likedPost => {
  //       setPosts({
  //         posts: posts.map(post => post._id === likedPost.id ? likedPost : post)
  //       })
  //     })

  //   }
  //   registerToSocket()
  // }, [posts])



  function handleLike(id){
    // console.log(id)
    api.post(`/posts/${id}/like`);
  }


  return (
   <section id="post-list">
     {posts.map(post => (
      <article key={post._id}>
       <header>
         <div className="user-info">
          <img src={`http://localhost:3333/files/${post.image}`} alt={post.author} />
          <div>
           <span>{post.author}</span>
           <span className="place">{post.place}</span>
           </div>
         </div>
         <img src={more} alt="Mais"/>
       </header>
       <img src={`http://localhost:3333/files/${post.image}`} alt={post.author} />
       <footer>
        <div className="actions">
          <button type="button" onClick={() => handleLike(post._id)}>
            <img src={like} alt=""/>
          </button>
          <img src={comment} alt="" />
          <img src={send} alt="" />
        </div>
        <strong>{post.likes}</strong>
        <p>{post.description}<span></span></p>
       </footer>
     </article>
     ))}

   </section>
  );
}
