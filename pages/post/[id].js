import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { db, timestamp } from "../../firebase";
import { handlePostBookmark } from "../../utility/handleUserActions";
import Image from "next/image";
import { SiAiqfome } from "react-icons/si";
import { RiImageAddLine } from "react-icons/ri";
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
    }
  }, [id]);

  console.log("hello");

  const handlePostDelete = () => {
    db.collection("posts").doc(id).delete();
    router.push("/404");
  };

  const [postEditExpandLocation, setPostEditExpandLocation] = useState("");

  const handlePostEditExpand = (postId) => {
    if (postEditExpandLocation === postId) {
      setPostEditExpandLocation("");
    } else setPostEditExpandLocation(postId);
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
                <PostUsername>{targetPost.posterName}</PostUsername>
                <PostContent>
                  {targetPost.text}
                  {targetPost.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={"post image"}
                      height={45}
                      width={45}
                      objectFit="cover"
                    />
                  ))}
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
                      <PostInteractIcon
                        onClick={() => handlePostEditExpand(id)}
                      >
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
              postEditExpandLocation={postEditExpandLocation}
              setPostEditExpandLocation={setPostEditExpandLocation}
              postId={id}
              postText={targetPost.text}
              postImages={targetPost.images}
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
`;

const PostBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostContainer = styled.div`
  display: flex;
  padding-top: 10px;
  margin-top: 20px;
  /* min-height: 150px; */
  max-height: auto;
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

const PostContent = styled.div`
  color: rgb(15, 20, 25);
  height: auto;
  width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.7;
  text-overflow: ellipsis;
`;

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

const BookmarkedWrapper = styled.div`
  display: flex;
  transition: all 0.3s ease-in-out;
  color: ${({ bookmarked, user }) =>
    bookmarked.includes(user) ? "rgb(29, 155, 240)" : "default"};
`;
