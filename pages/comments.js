import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useSession } from "next-auth/client";
import { db } from "../firebase";
import Navbar from "../components/Navbar";

export default function commentsPage() {
  const [comments, setComments] = useState([]);
  const [session] = useSession();

  useEffect(() => {
    db.collection("posts")
      .doc("pAcdYwa9IM4xPum1E5cN")
      .collection("comments")
      .onSnapshot((snapshot) => {
        let tempComments = [];
        tempComments = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setComments(tempComments);
      });
  }, []);

  return (
    <HomeContainer>
      <Navbar />
      <PostsBodyContainer>
        {comments.map(
          ({ id, data }) =>
            session &&
            session.user.email === data.commenterEmail && (
              <PostContainer key={id}>{data.commenterEmail}</PostContainer>
            )
        )}
      </PostsBodyContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  height: auto;
`;

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

const PostBookmarkButton = styled.button``;
