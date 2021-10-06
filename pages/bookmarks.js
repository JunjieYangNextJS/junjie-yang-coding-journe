import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import CommentsBody from "../components/HomeBody/Comments/CommentsBody";
import { useSession, signIn } from "next-auth/client";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import { FaRegCommentDots } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  useGetSelectedNav,
  useSelectedNav,
} from "../contexts/SelectedNavContext";
import { handleTargetPost, handleIdDelete } from "../utility/handleUserActions";
import getTimeAgo from "../utility/getTimeAgo";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [session] = useSession();
  const setSelectedNav = useGetSelectedNav();
  const selectedNav = useSelectedNav();
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    setSelectedNav("/bookmarks");

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
    setCurrentTime(Date.now());
  }, [session, selectedNav]);

  const [commentsExpandLocations, setCommentsExpandLocations] = useState([]);

  const handleCommentsExpand = (markedPostId) => {
    commentsExpandLocations.includes(markedPostId)
      ? setCommentsExpandLocations(
          commentsExpandLocations.filter(
            (location) => location !== markedPostId
          )
        )
      : setCommentsExpandLocations((prevLocation) => [
          ...prevLocation,
          markedPostId,
        ]);
  };

  return (
    <HomeContainer>
      <Navbar />
      <PostsBodyContainer>
        <Header>
          <h2>Bookmarks</h2>{" "}
        </Header>
        <PostsBodyWrapper>
          {session ? (
            bookmarks.map(({ markedPostId, data }) => (
              <PostBlockContainer key={markedPostId}>
                <PostContainer>
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
                    <PostContent
                      onClick={() => handleTargetPost(data.bookmarkedId)}
                    >
                      <PostText>{data.text}</PostText>
                      <PostImages>
                        {data.images.map((image, index) => (
                          <PostImage key={index}>
                            {" "}
                            <Image
                              src={image}
                              alt={"post image"}
                              height={250}
                              width={250}
                              objectFit="contain"
                            />
                          </PostImage>
                        ))}
                      </PostImages>
                    </PostContent>
                    <PostInteractWrapper>
                      <Tippy content="comments">
                        <PostInteractIcon
                          onClick={() =>
                            handleCommentsExpand(data.bookmarkedId)
                          }
                        >
                          <FaRegCommentDots />

                          <CommentsAmountWrapper>
                            {data.commentsAmount !== 0 && data.commentsAmount}
                          </CommentsAmountWrapper>
                        </PostInteractIcon>
                      </Tippy>

                      {session.user.email === data.posterEmail && (
                        <Tippy content="delete">
                          <PostInteractIcon
                            onClick={() =>
                              handleIdDelete("bookmarks", markedPostId)
                            }
                          >
                            <BsTrash />
                          </PostInteractIcon>
                        </Tippy>
                      )}
                    </PostInteractWrapper>
                  </PostInfoWrapper>
                </PostContainer>

                <CommentsBody
                  commentsExpandLocations={commentsExpandLocations}
                  postId={data.bookmarkedId}
                  posterName={data.posterName}
                  posterEmail={data.posterEmail}
                  readOnly={true}
                  // commentsAmount={data.commentsAmount}
                  session={session}
                />
              </PostBlockContainer>
            ))
          ) : (
            <PostLoginConvincer onClick={signIn}>
              Please Login to unlock this feature.
            </PostLoginConvincer>
          )}
        </PostsBodyWrapper>
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
  width: 800px;
  min-width: 200px;
  border: 1px solid rgb(239, 243, 244);
  /* margin-top: 30px; */
`;

const Header = styled.div`
  display: flex;

  height: 60px;
  justify-content: flex-start;
  align-items: center;

  h2 {
    font-size: 20px;
    margin-left: 15px;
  }
`;

const PostsBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const PostLoginConvincer = styled.h1`
  padding: 30px 10px;
  cursor: pointer;
  color: rgb(29, 155, 240);
`;

const PostBlockContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  gap: 40px; */
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
  @media screen and (max-width: 500px) {
    height: 35px;
    width: 35px;
  }
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
  cursor: pointer;
`;

const PostText = styled.div`
  font-size: 17px;
  margin-bottom: 7px;
`;

const PostImages = styled.div`
  position: relative;
`;

const PostImage = styled.span`
  margin: 3px 3px;
`;

const PostInteractWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 8px;
  font-size: 18px;
  gap: 150px;
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

const CommentsAmountWrapper = styled.span`
  display: flex;
  font-size: 16px;
`;
