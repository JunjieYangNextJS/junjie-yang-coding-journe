import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db, timestamp } from "../../firebase";
import Image from "next/image";
import { FaRegCommentDots } from "react-icons/fa";
import { IoBookmarksOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";

export default function SentPosts({ session }) {
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

  const [commentInput, setCommentInput] = useState("");

  const handlePostComments = (id) => {
    db.collection("bookmarks").doc(id).collection("comments").add({
      commenterEmail: session.user.email,
      commenterName: session.user.name,
      commenterIcon: session.user.icon,
      commentText: commentInput,
      timestamp,
    });
  };

  // db.collection("posts")
  //   .doc("pAcdYwa9IM4xPum1E5cN")
  //   .collection("comments")
  //   .onSnapshot((snapshot) => {
  //     let tempComments = [];
  //     tempComments = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       data: doc.data(),
  //     }));
  //     console.log(tempComments);
  //   });

  const handlePostBookmark = (id, data) => {
    db.collection("bookmarks").doc(id).set({
      readerEmail: session.user.email,
      text: data.text,
      images: data.images,
      posterEmail: data.posterEmail,
      posterName: data.posterName,
      posterIcon: data.posterIcon,
      timestamp,
    });
  };

  const handlePostDelete = (id) => {
    db.collection("posts").doc(id).delete();
  };

  const [commentsExpandLocation, setCommentsExpandLocation] = useState("");

  const handleCommentsExpand = (id) => {
    setCommentsExpandLocation(id);
  };

  return (
    <PostsBodyContainer>
      {posts.map(({ id, data }, index) => (
        <PostContainer key={id} id={data.project}>
          <PostIconWrapper>
            <Image
              src={data.posterIcon}
              alt={"user icon"}
              height={45}
              width={45}
              objectFit="cover"
            />
          </PostIconWrapper>
          <PostInfoWrapper>
            <PostUsername>{data.posterName}</PostUsername>
            <PostContent>{data.text}</PostContent>
            <PostInteractWrapper>
              <PostInteractIcon onClick={() => handleCommentsExpand(id)}>
                <FaRegCommentDots />
              </PostInteractIcon>
              {session && (
                <PostInteractIcon onClick={() => handlePostBookmark(id, data)}>
                  <IoBookmarksOutline />
                </PostInteractIcon>
              )}
              {session && session.user.email === data.posterEmail && (
                <PostInteractIcon onClick={() => handlePostDelete(id)}>
                  <BsTrash />
                </PostInteractIcon>
              )}
            </PostInteractWrapper>
          </PostInfoWrapper>

          <PostWritingForm
            location={id}
            commentsExpandLocation={commentsExpandLocation}
          >
            <PostInputBox
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Share your comments..."
            />
            <PostEditSubmitSection>
              <PostEditSection>hi</PostEditSection>
              <PostSubmitSection onClick={() => handlePostComments(id)}>
                submit
              </PostSubmitSection>
            </PostEditSubmitSection>
          </PostWritingForm>
        </PostContainer>
      ))}
    </PostsBodyContainer>
  );
}

const PostsBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const PostContainer = styled.div`
  display: flex;

  /* min-height: 150px; */
  max-height: auto;
  width: 100%;
  border: 1px solid rgb(83, 100, 113);
`;

const PostIconWrapper = styled.div`
  display: flex;
  height: 45px;
  width: 45px;

  margin: 10px 15px 0 15px;
  border-radius: 50px;

  overflow: hidden;
`;

const PostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  /* justify-content: space-between; */
`;

const PostUsername = styled.div`
  display: flex;
  font-weight: 700;
  font-size: 17px;
  margin-bottom: 2px;
  overflow-wrap: break-word;
`;

const PostContent = styled.div``;

const PostInteractWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 8px;
  font-size: 18px;
  gap: 100px;
`;

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

const PostWritingForm = styled.div`
  display: ${({ location, commentsExpandLocation }) =>
    location === commentsExpandLocation ? "default" : "none"};
`;

const PostInputBox = styled.input``;

const PostEditSubmitSection = styled.div``;

const PostEditSection = styled.div``;

const PostSubmitSection = styled.button``;
