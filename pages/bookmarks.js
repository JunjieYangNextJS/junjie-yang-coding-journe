import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useSession } from "next-auth/client";
import { db } from "../firebase";
import Navbar from "../components/Navbar";

export default function bookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [session] = useSession();
  useEffect(() => {
    db.collection("bookmarks")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        let tempBookmarks = [];
        tempBookmarks = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setBookmarks(tempBookmarks);
      });
  }, []);

  console.log(bookmarks[0]);

  const handleBookmarkDelete = (id) => {
    db.collection("bookmarks").doc(id).delete();
  };

  return (
    <HomeContainer>
      <Navbar />
      <PostsBodyContainer>
        {bookmarks.map(
          ({ id, data }) =>
            session &&
            session.user.email === data.readerEmail && (
              <PostContainer key={id}>
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
                  <PostContentWrapper>{data.text}</PostContentWrapper>

                  <button onClick={() => handleBookmarkDelete(id)}>
                    delete
                  </button>
                </PostInfoWrapper>
              </PostContainer>
            )
        )}
      </PostsBodyContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  height: auto;
`;

const PostsBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostContainer = styled.div`
  display: flex;
  min-height: 150px;
  width: 100%;
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

const PostContentWrapper = styled.div``;

const PostBookmarkButton = styled.button``;
