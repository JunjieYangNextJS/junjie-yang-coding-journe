import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import Image from "next/image";

export default function SentPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      let tempPosts = [];
      tempPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setPosts(tempPosts);
    });
  });

  // console.log(posts[0]);
  // const getTimeAgo = (postTime) => {
  //   let minutes = Math.floor(
  //     new Date(Date.now()).getMinutes() - new Date(postTime).getMinutes()
  //   );
  //   let hours = Math.floor(
  //     new Date(Date.now()).getHours() - new Date(postTime).getHours()
  //   );
  //   return minutes < 60 ? `${minutes}m ago` : `${hours}h ago`;
  // };

  const handlePostDelete = (id) => {
    db.collection("posts").doc(id).delete();
  };

  return (
    <PostsBodyContainer>
      {posts.map(({ id, data }) => (
        <PostContainer key={id}>
          <PostIconWrapper>
            <Image
              src={data.userIcon}
              alt={"user icon"}
              height={40}
              width={40}
              objectFit="cover"
            />
          </PostIconWrapper>
          <PostInfoWrapper>
            <PostUserWrapper>
              <PostUserName>{data.userName}</PostUserName>
              <PostUploadTime>{data.date.seconds}</PostUploadTime>
            </PostUserWrapper>
            <PostContentWrapper>{data.text}</PostContentWrapper>
            <button onClick={() => handlePostDelete(id)}>delete</button>
          </PostInfoWrapper>
        </PostContainer>
      ))}
    </PostsBodyContainer>
  );
}

const PostsBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostContainer = styled.div`
  display: flex;
  min-height: 150px;
  width: 100%;
  border: 1px solid black;
`;

const PostIconWrapper = styled.div``;

const PostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostUserWrapper = styled.div`
  display: flex;
`;

const PostUserName = styled.div``;

const PostUploadTime = styled.div``;

const PostContentWrapper = styled.div``;
