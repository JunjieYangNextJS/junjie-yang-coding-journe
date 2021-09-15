import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { signIn, signOut, useSession } from "next-auth/client";
import { db } from "../../firebase";
import Image from "next/image";

export default function SentPosts() {
  const [session] = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        let tempPosts = [];
        tempPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setPosts(tempPosts);
      });
  }, []);

  // const getTimeAgo = (postTime) => {
  //   let minutes = Math.floor(
  //     new Date(Date.now()).getMinutes() - new Date(postTime).getMinutes()
  //   );
  //   return `${minutes}m ago`;
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
            </PostUserWrapper>
            <PostContentWrapper>{data.text}</PostContentWrapper>
            {session && session.user.email === data.userEmail && (
              <button onClick={() => handlePostDelete(id)}>delete</button>
            )}
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
