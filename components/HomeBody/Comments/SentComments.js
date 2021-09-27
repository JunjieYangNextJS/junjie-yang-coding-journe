import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { handleIdDelete } from "../../../utility/handleUserActions";
import { db } from "../../../firebase";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Image from "next/image";
import CommentEditBox from "./CommentEditBox";

export default function SentComments({
  postId,
  posterEmail,
  session,
  readOnly,
}) {
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

  const [commentEdit, setCommentEdit] = useState("");

  const handleCommentEditExpand = (commentId) => {
    if (commentEdit === commentId) {
      setCommentEdit("");
    } else {
      setCommentEdit(commentId);
    }
  };

  return (
    <>
      {comments && (
        <SentCommentsContainer>
          {comments.map(({ commentId, data }) => (
            <SentCommentWrapper key={commentId}>
              <CommenterIconSection>
                <ImageWrapper>
                  <Image
                    src={data.commenterIcon}
                    alt={"user icon"}
                    height={40}
                    width={40}
                    objectFit="cover"
                  />
                </ImageWrapper>
              </CommenterIconSection>
              <SentCommentBody>
                <SentCommentUsername>{data.commenterName}</SentCommentUsername>
                {data.commenterEmail !== posterEmail && (
                  <CommenterAtPoster>@{data.posterName}</CommenterAtPoster>
                )}

                {commentId !== commentEdit ? (
                  <SentCommentContent>{data.commentText}</SentCommentContent>
                ) : (
                  <CommentEditBox
                    commentText={data.commentText}
                    commentId={commentId}
                    setCommentEdit={setCommentEdit}
                  />
                )}

                {session &&
                  data.commenterEmail === session.user.email &&
                  readOnly !== true && (
                    <CommentInteractWrapper>
                      <Tippy content="edit">
                        <CommentInteractIcon
                          onClick={() => handleCommentEditExpand(commentId)}
                        >
                          <FiEdit />
                        </CommentInteractIcon>
                      </Tippy>
                      <Tippy content="delete">
                        <CommentInteractIcon
                          onClick={() =>
                            handleIdDelete("comments", commentId, postId)
                          }
                        >
                          <BsTrash />
                        </CommentInteractIcon>
                      </Tippy>
                    </CommentInteractWrapper>
                  )}
              </SentCommentBody>
            </SentCommentWrapper>
          ))}
        </SentCommentsContainer>
      )}
    </>
  );
}

const SentCommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const SentCommentWrapper = styled.div`
  display: flex;
  padding: 15px 10px;
  align-items: flex-start;
  /* border: 1px solid rgb(239, 243, 244); */
`;

const CommenterIconSection = styled.div`
  display: flex;
  margin-right: 15px;
  margin-left: 15px;
`;

const ImageWrapper = styled.div`
  height: 40px;
  width: 40px;
  overflow: hidden;
  border-radius: 50px;
`;

const SentCommentBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -5px;
`;
const SentCommentUsername = styled.div`
  font-weight: 700;
  margin-bottom: 3px;
`;

const CommenterAtPoster = styled.div`
  color: rgb(27, 149, 224);
`;

const SentCommentContent = styled.div`
  color: rgb(15, 20, 25);
  height: auto;
  width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.3;
  text-overflow: ellipsis;
`;

const CommentInteractWrapper = styled.div`
  display: flex;
  margin-top: 5px;
  font-size: 16px;
  gap: 50px;
`;

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
