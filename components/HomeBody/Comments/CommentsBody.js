import React, { useState } from "react";
import styled from "styled-components";
import { db, timestamp } from "../../../firebase";
import Image from "next/image";
import SentComments from "./SentComments";

export default function CommentsBody({
  commentsExpandLocations,
  postId,
  posterName,
  posterEmail,
  readOnly,
  session,
}) {
  const [commentInput, setCommentInput] = useState("");

  const handlePostComments = async (e) => {
    e.preventDefault();

    db.collection("comments").add({
      postId,
      commenterEmail: session.user.email,
      commenterName: session.user.name,
      commenterIcon: session.user.image,
      commentText: commentInput,
      posterName,
      timestamp,
    });

    const postIdRef = db.collection("posts");
    const snapshot = await postIdRef.doc(postId).get();
    postIdRef.doc(postId).update({
      commentsAmount: snapshot.data().commentsAmount + 1,
    });

    setCommentInput("");
  };

  return (
    <CommentsBodyContainer
      location={postId}
      commentsExpandLocations={commentsExpandLocations}
    >
      {session && (
        <CommentWritingForm>
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
            maxLength="50"
          />

          <CommentSubmitSection
            onClick={(e) => handlePostComments(e)}
            disabled={commentInput === "" ? true : false}
          >
            Reply
          </CommentSubmitSection>
        </CommentWritingForm>
      )}
      <SentComments
        postId={postId}
        posterEmail={posterEmail}
        session={session}
        readOnly={readOnly}
      />
    </CommentsBodyContainer>
  );
}

const CommentsBodyContainer = styled.div`
  display: ${({ location, commentsExpandLocations }) =>
    commentsExpandLocations.includes(location) ? "flex" : "none"};
  flex-direction: column;
  margin-bottom: 20px;
  /* width: max(400px, 100%); */
`;

const CommentWritingForm = styled.form`
  display: flex;
  padding: 15px 10px;
  align-items: center;
  border: 1px solid rgb(239, 243, 244);
  width: 100%;
`;

const CommenterIconSection = styled.div`
  display: flex;
  height: 40px;
  width: 40px;
  border-radius: 50px;
  margin-right: 15px;
  margin-left: 15px;
  overflow: hidden;
`;

const CommentInputBox = styled.input`
  border: none;
  outline: none;
  height: 40px;
  width: 500px;
  font-size: 18px;
  padding-right: 15px;
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
