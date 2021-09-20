import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { db, timestamp } from "../../firebase";
import Image from "next/image";
import { FaRegCommentDots } from "react-icons/fa";
import { IoBookmarksOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";
import Navbar from "../../components/Navbar";
import CommentsBody from "./../../components/HomeBody/CommentsBody";

export default function post() {
  const router = useRouter();
  const id = router.query.id;
  const [session] = useSession();

  const [targetPost, setTargetPost] = useState(null);

  useEffect(async () => {
    if (id) {
      const idRef = db.collection("posts").doc(id);
      const doc = await idRef.get();
      if (doc.exists) {
        setTargetPost(doc.data());
      } else {
        router.push("/404");
      }
      // idRef.get().then((doc) => {
      //   setTargetPost(doc.data());
      // });
      // if (idRef.get().)
    }
  }, [id]);

  const handlePostDelete = () => {
    db.collection("posts").doc(id).delete();
    router.push("/404");
  };

  // const handlePostBookmark = (id, targetPost) => {
  //   db.collection("bookmarks").doc(id).set({
  //     readerEmail: session.user.email,
  //     text: targetPost.text,
  //     images: targetPost.images,
  //     posterEmail: targetPost.posterEmail,
  //     posterName: targetPost.posterName,
  //     posterIcon: targetPost.posterIcon,
  //     timestamp,
  //   });
  // };

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

  return (
    <>
      {targetPost && (
        <PostBodyContainer>
          <Navbar />
          <PostBlockContainer>
            <PostContainer>
              <PostIconWrapper>
                <Image
                  src={targetPost.posterIcon}
                  alt={"user icon"}
                  height={45}
                  width={45}
                  objectFit="cover"
                />
              </PostIconWrapper>
              <PostInfoWrapper>
                <PostUsername>{targetPost.posterName}</PostUsername>
                <PostContent>{targetPost.text}</PostContent>
                <PostInteractWrapper>
                  {session && (
                    <PostInteractIcon
                      onClick={() => handlePostBookmark(id, targetPost)}
                    >
                      <IoBookmarksOutline />
                    </PostInteractIcon>
                  )}
                  {session && session.user.email === targetPost.posterEmail && (
                    <PostInteractIcon onClick={handlePostDelete}>
                      <BsTrash />
                    </PostInteractIcon>
                  )}
                </PostInteractWrapper>
              </PostInfoWrapper>
            </PostContainer>
            <CommentsBody
              commentsExpandLocation={id}
              postId={id}
              posterName={targetPost.posterName}
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
  /* gap: 5px; */
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
