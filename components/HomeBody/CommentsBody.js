import React, { useState } from "react";
import styled from "styled-components";
import { db, timestamp } from "../../firebase";
import Image from "next/image";
import { BiLeftArrowAlt } from "react-icons/bi";
import SentComments from "./SentComments";

export default function CommentsBody({
  commentsExpandLocation,
  setCommentsExpandLocation,
  id,
  posterName,
  prevComments,
  session,
}) {
  const [commentInput, setCommentInput] = useState("");

  const handlePostComments = (e) => {
    e.preventDefault();

    db.collection("posts")
      .doc(id)
      .update({
        comments: [
          ...prevComments,
          {
            commenterEmail: session.user.email,
            commenterName: session.user.name,
            commenterIcon: session.user.image,
            commentText: commentInput,
            posterName: posterName,
          },
        ],
      });

    setCommentInput("");
  };

  const handleHideComments = () => {
    setCommentsExpandLocation("");
  };

  return (
    <CommentsBodyContainer
      location={id}
      commentsExpandLocation={commentsExpandLocation}
    >
      {session && (
        <CommentWritingForm>
          <CommenterGoBackSection onClick={handleHideComments}>
            <BiLeftArrowAlt />
          </CommenterGoBackSection>
          <CommenterIconSection>
            <Image
              src={session.user.image}
              alt={"user icon"}
              height={40}
              width={40}
              objectFit="cover"
            />
          </CommenterIconSection>
          <CommentInputBox
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Comment here..."
          />

          <CommentSubmitSection onClick={(e) => handlePostComments(e)}>
            Submit
          </CommentSubmitSection>
        </CommentWritingForm>
      )}
      <SentComments id={id} />
    </CommentsBodyContainer>
  );
}

const CommentsBodyContainer = styled.div`
  display: ${({ location, commentsExpandLocation }) =>
    location === commentsExpandLocation ? "flex" : "none"};
  flex-direction: column;
`;

const CommentWritingForm = styled.form`
  display: flex;
  padding: 15px 10px;
  align-items: center;
  border: 1px solid rgb(239, 243, 244);
`;

const CommenterGoBackSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #363636;
  cursor: pointer;
  margin-right: 10px;
  height: 35px;
  width: 35px;
  border-radius: 50px;
  transition: all 0.5s ease-in-out;

  :hover {
    background-color: #d4f7ff;
    color: black;
  }
`;

const CommenterIconSection = styled.div`
  display: flex;
  height: 40px;
  width: 40px;
  border-radius: 50px;
  margin-right: 15px;
  overflow: hidden;
`;

const CommentInputBox = styled.input`
  border: none;
  outline: none;
  height: 40px;
  width: 500px;
  font-size: 18px;
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
`;
