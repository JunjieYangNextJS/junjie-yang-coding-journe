import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useSession } from "next-auth/client";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import { BsTrash } from "react-icons/bs";
import { handleTargetPost, handleIdDelete } from "../utility/handleUserActions";

export default function bookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [session] = useSession();
  useEffect(() => {
    if (!session) return;
    db.collection("bookmarks")
      .where("readerEmail", "==", session.user.email)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        let tempBookmarks = [];
        tempBookmarks = snapshot.docs.map((doc) => ({
          markedPostId: doc.id,
          data: doc.data(),
        }));
        setBookmarks(tempBookmarks);
      });
  }, [session]);

  return (
    <HomeContainer>
      <Navbar />
      <PostsBodyContainer>
        {bookmarks.map(({ markedPostId, data }) => (
          <PostContainer key={markedPostId}>
            <PostIconWrapper>
              <Image
                src={data.posterIcon}
                alt={"user icon"}
                height={40}
                width={40}
                objectFit="cover"
              />
            </PostIconWrapper>
            <PostInfoWrapper>
              <PostUserWrapper>
                <PostUserName>{data.posterName}</PostUserName>
              </PostUserWrapper>

              <PostContent onClick={() => handleTargetPost(data.bookmarkedId)}>
                {data.text}
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
              </PostContent>
              <PostInteractIcon
                onClick={() => handleIdDelete("bookmarks", markedPostId)}
              >
                <BsTrash />
              </PostInteractIcon>
            </PostInfoWrapper>
          </PostContainer>
        ))}
      </PostsBodyContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  /* width: 100%; */

  height: auto;
`;

const PostsBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  min-width: 400px;
`;

const PostContainer = styled.div`
  display: flex;
  min-height: 150px;

  border: 1px solid black;
`;

const PostIconWrapper = styled.div``;

const PostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostUserWrapper = styled.div`
  display: flex;
`;

const PostUserName = styled.div``;

const PostUploadTime = styled.div``;

const PostContent = styled.div`
  color: rgb(15, 20, 25);
  height: auto;
  /* width: 100%; */
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.7;
  text-overflow: ellipsis;
`;

const PostBookmarkButton = styled.button``;

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
