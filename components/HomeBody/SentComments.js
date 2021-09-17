import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fieldPath, db, timestamp } from "../../firebase";
import Image from "next/image";

export default function SentComments({ id }) {
  const [comments, setComments] = useState(null);

  // useEffect(() => {
  //   db.collection("posts").onSnapshot((snapshot) => {
  //     let tempComments = [];
  //     tempComments = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       commentsArray: doc.data().comments,
  //     }));
  //     setComments(
  //       tempComments.filter((tempComment) => tempComment.id === id)[0]
  //     );
  //   });
  // }, []);

  useEffect(() => {
    db.collection("posts")
      .where(fieldPath, "==", id)
      .onSnapshot((snapshot) => {
        let tempComments = [];
        tempComments = snapshot.docs.map((doc) => ({
          commentsArray: doc.data().comments,
        }));
        setComments(tempComments[0]);
      });
  }, []);

  return (
    <>
      {comments && (
        <CommentsBodyContainer>
          {comments.commentsArray.map((comment, index) => (
            <CommentContainer key={index}>
              {comment.commentText}
            </CommentContainer>
          ))}
        </CommentsBodyContainer>
      )}
    </>
  );
}

const CommentsBodyContainer = styled.div``;

const CommentContainer = styled.div``;
