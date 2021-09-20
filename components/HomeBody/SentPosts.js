import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db, timestamp } from "../../firebase";
import Image from "next/image";
import { FaRegCommentDots } from "react-icons/fa";
import { IoBookmarksOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";
import CommentsBody from "./CommentsBody";

export default function SentPosts({ session }) {
  const [posts, setPosts] = useState([]);

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
  }, []);

  // const getTimeAgo = (postTime) => {
  //   let minutes = Math.floor(
  //     new Date(Date.now()).getMinutes() - new Date(postTime).getMinutes()
  //   );
  //   return `${minutes}m ago`;
  // };
  const [commentsExpandLocation, setCommentsExpandLocation] = useState([]);

  const handleCommentsExpand = (postId) => {
    commentsExpandLocation.includes(postId)
      ? setCommentsExpandLocation(
          commentsExpandLocation.filter((location) => location !== postId)
        )
      : setCommentsExpandLocation((prevLocation) => [...prevLocation, postId]);
  };

  const handlePostBookmark = async (postId, data) => {
    const bookmarkRef = db.collection("bookmarks");
    const docs = await bookmarkRef
      .where("bookmarkedId", "==", postId)
      .where("readerEmail", "==", session.user.email)
      .get();

    if (docs.empty) {
      db.collection("bookmarks").add({
        readerEmail: session.user.email,
        text: data.text,
        images: data.images,
        posterEmail: data.posterEmail,
        posterName: data.posterName,
        posterIcon: data.posterIcon,
        bookmarkedId: postId,
        timestamp,
      });
    } else {
      docs.forEach((doc) => {
        doc.ref.delete();
      });
    }
  };

  const handlePostDelete = (postId) => {
    db.collection("posts").doc(postId).delete();
  };

  return (
    <PostsBodyContainer>
      {posts.map(({ postId, data }) => (
        <PostBlockContainer key={postId} postId={data.project}>
          <PostContainer>
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
                <PostInteractIcon onClick={() => handleCommentsExpand(postId)}>
                  <FaRegCommentDots />
                </PostInteractIcon>
                {session && (
                  <PostInteractIcon
                    onClick={() => handlePostBookmark(postId, data)}
                  >
                    <IoBookmarksOutline />
                  </PostInteractIcon>
                )}
                {session && session.user.email === data.posterEmail && (
                  <PostInteractIcon onClick={() => handlePostDelete(postId)}>
                    <BsTrash />
                  </PostInteractIcon>
                )}
              </PostInteractWrapper>
            </PostInfoWrapper>
          </PostContainer>
          <CommentsBody
            commentsExpandLocation={commentsExpandLocation}
            postId={postId}
            posterName={data.posterName}
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
  gap: 5px;
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
