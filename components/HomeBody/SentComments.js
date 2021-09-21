import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { handleIdDelete } from "../../utility/handleUserActions";
import { db } from "../../firebase";
import { BsTrash } from "react-icons/bs";
import Image from "next/image";

export default function SentComments({ postId, session }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    db.collection("comments")
      .where("postId", "==", postId)
      .onSnapshot((snapshot) => {
        let tempComments = [];
        tempComments = snapshot.docs.map((doc) => ({
          commentId: doc.id,
          data: doc.data(),
        }));
        setComments(tempComments);
      });
  }, []);

  // useEffect(() => {
  //   db.collection("posts")
  //     .where(fieldPath, "==", id)
  //     .onSnapshot((snapshot) =>
  //       setComments(snapshot.docs.map((doc) => doc.data().comments))
  //     );
  // }, []);

  return (
    <>
      {comments && (
        <CommentsBodyContainer>
          {comments.map(({ commentId, data }) => (
            <CommentContainer key={commentId}>
              {data.commentText}
              {session && data.commenterEmail === session.user.email && (
                <CommentInteractIcon
                  onClick={() => handleIdDelete("comments", commentId)}
                >
                  <BsTrash />
                </CommentInteractIcon>
              )}
            </CommentContainer>
          ))}
        </CommentsBodyContainer>
      )}
    </>
  );
}

const CommentsBodyContainer = styled.div``;

const CommentContainer = styled.div``;

const CommentInteractIcon = styled.div`
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
