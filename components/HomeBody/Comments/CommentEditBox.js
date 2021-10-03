import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../../../firebase";

export default function CommentEditBox({
  commentText,
  commentId,
  setCommentEdit,
}) {
  const [newCommentInput, setNewCommentInput] = useState(commentText);

  const submitEditedComment = (e) => {
    e.preventDefault();

    const uploadEditedComment = async () => {
      const idRef = db.collection("comments").doc(commentId);
      try {
        if (newCommentInput !== commentText) {
          idRef.update({ commentText: newCommentInput });
        }
      } catch {
        alert("Post Update failed.");
      }
    };

    const resetEditedComment = async () => {
      setCommentEdit("");
    };

    const commentEditActions = [uploadEditedComment, resetEditedComment];

    for (const editAction of commentEditActions) {
      editAction();
    }
  };

  return (
    <CommentWritingForm>
      <CommentInputBox
        value={newCommentInput}
        onChange={(e) => setNewCommentInput(e.target.value)}
        maxLength="300"
      />

      <CommentSubmitSection onClick={(e) => submitEditedComment(e)}>
        Confirm
      </CommentSubmitSection>
    </CommentWritingForm>
  );
}

const CommentWritingForm = styled.form`
  display: flex;

  align-items: center;
  border: 1px solid rgb(239, 243, 244);
  width: 100%;
  border: none;
  outline: none;
  gap: 2px;
`;

const CommentInputBox = styled.input`
  border: 1px solid rgb(239, 243, 244);
  border-radius: 10px;
  padding: 2px 10px;
  outline: none;
  height: 40px;
  width: 500px;
  font-size: 16px;
`;

const CommentSubmitSection = styled.button`
  font-size: 15px;
  font-weight: bold;
  border-radius: 50px;
  line-height: 20px;
  padding: 6px 14px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  background-color: rgb(29, 155, 240);
  border: none;

  transition: all 0.3s ease-out;

  :disabled {
    background-color: #f0f1f2;
    color: #919191;
    cursor: default;
  }
`;
