import React, { useEffect, useState } from "react";
import api from "../services/api";
import io from "socket.io-client";

import "./Feed.css";
// import { Container } from "./heart";
import Heart from "../components/Heart";

import more from "../assets/more.svg";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import send from "../assets/send.svg";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [hearted, setHearted] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { data } = await api.get("posts");
      const newData = data.docs;
      setPosts(newData);
    }
    loadData();
  }, []);

  useEffect(() => {
    async function registerToSocket() {
      const socket = await io("http://localhost:3333");

      socket.on("post", newPost => {
        setPosts([newPost, ...posts]);
      });

      socket.on("like", likedPost => {
        setPosts(
          posts.map(post => (post._id === likedPost._id ? likedPost : post))
        );
        setHearted(
          posts.map(post => (post._id === likedPost._id ? true : false))
        );
      });
    }
    registerToSocket();
  }, [posts]);

  function handleLike(id) {
    api.post(`/posts/${id}/like`);
    // setHearted(true);
  }

  return (
    <section id="post-list">
      {posts.map(post => (
        <article key={post._id}>
          <header>
            <div className="user-info">
              <img
                src="https://api.adorable.io/avatars/50/abott@adorable.png"
                alt={post.author}
              />
              <div>
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>
            </div>
            <img src={more} alt="Mais" />
          </header>
          <img
            src={`http://localhost:3333/files/${post.image}`}
            alt={post.author}
          />
          <footer>
            <div className="actions">
              <button type="button" onClick={() => handleLike(post._id)}>
                {!hearted ? <img src={like} alt="" /> : <Heart hearted />}
              </button>
              <img src={comment} alt="" />
              <img src={send} alt="" />
            </div>
            <strong>{post.likes} curtidas</strong>
            <p>
              {post.description}
              <span>{post.hashtags}</span>
            </p>
          </footer>
        </article>
      ))}
    </section>
  );
}
