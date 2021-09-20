import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useSession } from "next-auth/client";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import { BsTrash } from "react-icons/bs";

export default function commentsPage() {
  const [myComments, setMyComments] = useState([]);
  const [session] = useSession();

  useEffect(() => {
    if (!session) return;
    db.collection("comments")
      .where("commenterEmail", "==", session.user.email)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        let tempMyComments = [];
        tempMyComments = snapshot.docs.map((doc) => ({
          myCommentsId: doc.id,
          data: doc.data(),
        }));
        setMyComments(tempMyComments);
      });
  }, []);

  const handlePostDelete = (myCommentsId) => {
    db.collection("comments").doc(myCommentsId).delete();
  };

  return (
    <HomeContainer>
      <Navbar />
      <PostsBodyContainer>
        {myComments.map(({ myCommentsId, data }) => (
          <PostContainer key={myCommentsId}>
            {data.commenterEmail}
            {data.commentText}
            <PostInteractIcon onClick={() => handlePostDelete(myCommentsId)}>
              <BsTrash />
            </PostInteractIcon>
          </PostContainer>
        ))}
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

const PostInteractIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  border-radius: 50px;
  color: #383838;
  transition: all 0.5s ease-in-out;

  :hover {
    background-color: #d4f7ff;
    color: black;
  }
`;
