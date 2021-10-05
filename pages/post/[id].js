import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { handlePostBookmark } from "../../utility/handleUserActions";
import getTimeAgo from "../../utility/getTimeAgo";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { IoBookmarksOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";
import Navbar from "../../components/Navbar";
import CommentsBody from "../../components/HomeBody/Comments/CommentsBody";
import PostEditBox from "../../components/HomeBody/Post/PostEditBox";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export default function post() {
  const router = useRouter();
  const id = router.query.id;
  const [session] = useSession();

  const [targetPost, setTargetPost] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(async () => {
    if (id) {
      const doc = db.collection("posts").doc(id);
      doc.onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setTargetPost(snapshot.data());
        } else {
          router.push("/404");
        }
      });
      setCurrentTime(Date.now());
    }
  }, [id]);

  const handlePostDelete = () => {
    db.collection("posts").doc(id).delete();
    router.replace("/404");
  };

  const [postEditExpand, setPostEditExpand] = useState(true);

  const handlePostEditExpand = () => {
    setPostEditExpand(!postEditExpand);
  };

  return (
    <>
      {targetPost && (
        <PostBodyContainer>
          <Navbar />
          <PostBlockContainer>
            <PostContainer>
              <PostIconWrapper>
                <ImageWrapper>
                  <Image
                    src={targetPost.posterIcon}
                    alt={"user icon"}
                    height={45}
                    width={45}
                    objectFit="cover"
                  />
                </ImageWrapper>
              </PostIconWrapper>
              <PostInfoWrapper>
                <PostUserInfo>
                  <PostUsername>{targetPost.posterName}</PostUsername>
                  {targetPost.timestamp && (
                    <PostTimestamp>
                      {getTimeAgo(currentTime, targetPost.timestamp.seconds)}
                    </PostTimestamp>
                  )}
                </PostUserInfo>
                <PostContent>
                  <PostText>{targetPost.text}</PostText>
                  <PostImages>
                    {targetPost.images.map((image, index) => (
                      <PostImage key={index}>
                        <Image
                          src={image}
                          alt={"post image"}
                          height={400}
                          width={400}
                          objectFit="contain"
                        />
                      </PostImage>
                    ))}
                  </PostImages>
                </PostContent>
                <PostInteractWrapper>
                  {session && (
                    <Tippy content="bookmark">
                      <PostInteractIcon
                        onClick={() =>
                          handlePostBookmark(id, targetPost, session)
                        }
                      >
                        <BookmarkedWrapper
                          bookmarked={targetPost.bookmarked}
                          user={session.user.email}
                        >
                          <IoBookmarksOutline />
                        </BookmarkedWrapper>
                      </PostInteractIcon>
                    </Tippy>
                  )}
                  {session && session.user.email === targetPost.posterEmail && (
                    <Tippy content="edit">
                      <PostInteractIcon onClick={handlePostEditExpand}>
                        <FiEdit />
                      </PostInteractIcon>
                    </Tippy>
                  )}
                  {session && session.user.email === targetPost.posterEmail && (
                    <Tippy content="delete">
                      <PostInteractIcon onClick={handlePostDelete}>
                        <BsTrash />
                      </PostInteractIcon>
                    </Tippy>
                  )}
                </PostInteractWrapper>
              </PostInfoWrapper>
            </PostContainer>
            <PostEditBox
              postEditExpand={postEditExpand}
              setPostEditExpand={setPostEditExpand}
              postId={id}
              postText={targetPost.text}
              posterEmail={targetPost.posterEmail}
              session={session}
            />
            <CommentsBody
              commentsExpandLocations={id}
              postId={id}
              posterName={targetPost.posterName}
              posterEmail={targetPost.posterEmail}
              session={session}
            />
          </PostBlockContainer>
        </PostBodyContainer>
      )}
    </>
  );
}

const PostBodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: auto;
`;

const PostBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  min-width: 270px;
  flex-shrink: 4;
  /* width: 500px; */
`;

const PostContainer = styled.div`
  display: flex;
  padding-top: 10px;
  margin-top: 20px;
  /* min-height: 150px; */
  height: auto;
  width: 100%;
  padding-right: 5px;
  border: 1px solid rgb(239, 243, 244);
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

  @media screen and (max-width: 700px) {
    width: 35px;
    height: 35px;
  }
`;

const PostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  /* justify-content: space-between; */
`;

const PostUserInfo = styled.div`
  display: flex;
  gap: 10px;
`;

const PostUsername = styled.div`
  display: flex;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
  overflow-wrap: break-word;
`;

const PostTimestamp = styled.div``;

const PostContent = styled.div`
  color: rgb(15, 20, 25);
  height: auto;
  width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.7;
  text-overflow: ellipsis;
`;

const PostText = styled.div`
  font-size: 18px;
  margin-bottom: 12px;
  word-spacing: 1px;
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.7;
  text-overflow: ellipsis;
`;

const PostImages = styled.div`
  display: flex;
  position: relative;
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const PostImage = styled.div`
  margin: 5px 5px;
`;

const PostInteractWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 8px;
  font-size: 18px;
  gap: 100px;

  @media screen and (max-width: 400px) {
    gap: 50px;
  }
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

const BookmarkedWrapper = styled.div`
  display: flex;
  transition: all 0.3s ease-in-out;
  color: ${({ bookmarked, user }) =>
    bookmarked.includes(user) ? "rgb(29, 155, 240)" : "default"};
`;
