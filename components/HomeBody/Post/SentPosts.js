import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { db, storage } from "../../../firebase";
import {
  handleIdDelete,
  handlePostBookmark,
  handleTargetPost,
} from "../../../utility/handleUserActions";
import getTimeAgo from "../../../utility/getTimeAgo";
import Image from "next/image";
import { FaRegCommentDots } from "react-icons/fa";
import { IoBookmarksOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import CommentsBody from "../Comments/CommentsBody";
import PostEditBox from "./PostEditBox";

export default function SentPosts({ session }) {
  const [posts, setPosts] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        let tempPosts = [];
        tempPosts = snapshot.docs.map((doc) => ({
          postId: doc.id,
          data: doc.data(),
        }));
        setPosts(tempPosts);
      });
    setCurrentTime(Date.now());
  }, []);

  // console.log(posts[0].data.timestamp.seconds);

  // console.log(posts[0]);

  const [commentsExpandLocations, setCommentsExpandLocations] = useState([]);

  const handleCommentsExpand = (postId) => {
    commentsExpandLocations.includes(postId)
      ? setCommentsExpandLocations(
          commentsExpandLocations.filter((location) => location !== postId)
        )
      : setCommentsExpandLocations((prevLocation) => [...prevLocation, postId]);
    postEditExpandLocation === postId && setPostEditExpandLocation("");
  };

  const [postEditExpandLocation, setPostEditExpandLocation] = useState("");

  const handlePostEditExpand = (postId) => {
    if (postEditExpandLocation === postId) {
      setPostEditExpandLocation("");
    } else {
      setPostEditExpandLocation(postId);
      setCommentsExpandLocations(
        commentsExpandLocations.filter((location) => location !== postId)
      );
    }
  };

  return (
    <PostsBodyContainer>
      {posts.map(({ postId, data }) => (
        <PostBlockContainer key={postId}>
          <PostContainer id={data.project}>
            <PostIconWrapper>
              <ImageWrapper>
                <Image
                  src={data.posterIcon}
                  alt={"user icon"}
                  height={45}
                  width={45}
                  objectFit="cover"
                />
              </ImageWrapper>
            </PostIconWrapper>
            <PostInfoWrapper>
              <PostUserInfo>
                <PostUsername>{data.posterName}</PostUsername>
                {data.timestamp && (
                  <PostTimestamp>
                    {getTimeAgo(currentTime, data.timestamp.seconds)}
                  </PostTimestamp>
                )}
              </PostUserInfo>

              <PostContent onClick={() => handleTargetPost(postId)}>
                <PostText>{data.text}</PostText>
                <PostImages>
                  {data.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={"post image"}
                      height={45}
                      width={45}
                      objectFit="cover"
                    />
                  ))}
                </PostImages>
              </PostContent>
              <PostInteractWrapper>
                <Tippy content="comments">
                  <PostInteractIcon
                    onClick={() => handleCommentsExpand(postId)}
                  >
                    <FaRegCommentDots />

                    <CommentsAmountWrapper>
                      {data.commentsAmount !== 0 && data.commentsAmount}
                    </CommentsAmountWrapper>
                  </PostInteractIcon>
                </Tippy>

                {session && (
                  <Tippy content="bookmark">
                    <PostInteractIcon
                      onClick={() => handlePostBookmark(postId, data, session)}
                    >
                      {" "}
                      <BookmarkedWrapper
                        bookmarked={data.bookmarked}
                        user={session.user.email}
                      >
                        <IoBookmarksOutline />
                      </BookmarkedWrapper>
                    </PostInteractIcon>
                  </Tippy>
                )}
                {session && session.user.email === data.posterEmail && (
                  <Tippy content="edit">
                    <PostInteractIcon
                      onClick={() => handlePostEditExpand(postId)}
                    >
                      <FiEdit />
                    </PostInteractIcon>
                  </Tippy>
                )}
                {session && session.user.email === data.posterEmail && (
                  <Tippy content="delete">
                    <PostInteractIcon
                      onClick={() => handleIdDelete("posts", postId)}
                    >
                      <BsTrash />
                    </PostInteractIcon>
                  </Tippy>
                )}
              </PostInteractWrapper>
            </PostInfoWrapper>
          </PostContainer>
          <PostEditBox
            postEditExpandLocation={postEditExpandLocation}
            setPostEditExpandLocation={setPostEditExpandLocation}
            postId={postId}
            postText={data.text}
            postImages={data.images}
            session={session}
          />
          <CommentsBody
            commentsExpandLocations={commentsExpandLocations}
            postId={postId}
            posterName={data.posterName}
            posterEmail={data.posterEmail}
            // commentsAmount={data.commentsAmount}
            session={session}
          />
        </PostBlockContainer>
      ))}
    </PostsBodyContainer>
  );
}

const PostsBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PostBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostContainer = styled.div`
  display: flex;

  /* min-height: 150px; */
  max-height: auto;
  width: 100%;
  border: 1px solid rgb(239, 243, 244);
  padding-right: 15px;
  margin-top: 10px;
`;

const PostIconWrapper = styled.div`
  display: flex;
  margin: 10px 15px 0 15px;
`;

const ImageWrapper = styled.div`
  height: 45px;
  width: 45px;
  overflow: hidden;
  border-radius: 50px;
`;

const PostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const PostUserInfo = styled.div`
  display: flex;
  gap: 10px;
`;

const PostUsername = styled.div`
  display: flex;
  font-weight: 700;
  font-size: 17px;
  margin-bottom: 5px;
  overflow-wrap: break-word;
`;

const PostTimestamp = styled.div`
  margin-top: 1px;
`;

const PostContent = styled.div`
  color: rgb(15, 20, 25);
  height: auto;
  width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.7;
  text-overflow: ellipsis;
  cursor: pointer;
`;

const PostText = styled.div`
  margin-bottom: 10px;
`;

const PostImages = styled.div``;

const PostInteractWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 8px;
  font-size: 18px;
  gap: 50px;
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
  gap: 2px;

  :hover {
    background-color: #d4f7ff;
    color: black;
  }
`;

const BookmarkedWrapper = styled.div`
  display: flex;
  transition: all 0.3s ease-in-out;
  color: ${({ bookmarked, user }) =>
    bookmarked.includes(user) ? "rgb(29, 155, 240)" : "default"};
`;

const CommentsAmountWrapper = styled.span`
  display: flex;
  font-size: 16px;
`;
