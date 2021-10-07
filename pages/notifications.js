import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useSession, signIn } from "next-auth/client";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import { handleTargetPost, handleIdDelete } from "../utility/handleUserActions";
import getTimeAgo from "../utility/getTimeAgo";
import { BsTrash } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  useGetSelectedNav,
  useSelectedNav,
} from "../contexts/SelectedNavContext";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [liked, setLiked] = useState([]);
  const [session] = useSession();
  const setSelectedNav = useGetSelectedNav();
  const selectedNav = useSelectedNav();
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    setSelectedNav("/notifications");

    if (!session) return;
    db.collection("comments")
      .where("posterEmail", "==", session.user.email)
      .where("commenterEmail", "!=", session.user.email)
      .limit(99)
      .orderBy("commenterEmail", "desc")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        let tempNotifications = [];
        tempNotifications = snapshot.docs.map((doc) => ({
          notificationsId: doc.id,
          data: doc.data(),
        }));
        setNotifications(tempNotifications);
      });

    db.collection("posts")
      .where("liked", "!=", [])
      .onSnapshot((snapshot) => {
        let tempLiked = [];
        tempLiked = snapshot.docs.map((doc) => ({
          likedPostId: doc.id,
          likedEmails: doc.data().liked,
        }));
        setLiked(tempLiked);
      });

    setCurrentTime(Date.now());
  }, [session, selectedNav]);

  console.log(liked);

  return (
    <HomeContainer>
      <Navbar />
      <PostsBodyContainer>
        <Header>
          <h2>Notifications</h2>{" "}
        </Header>
        <PostsBodyWrapper>
          {liked.map(({ likedPostId, likedEmails }, index) => (
            <LikedContainer key={index}>
              <LikedEmailsWrapper>{likedEmails.join(", ")} </LikedEmailsWrapper>
              <LikedIconWrapper>
                <FcLike />
              </LikedIconWrapper>{" "}
              <LikedPost onClick={() => handleTargetPost(likedPostId)}>
                your post.
              </LikedPost>
            </LikedContainer>
          ))}
        </PostsBodyWrapper>
        <PostsBodyWrapper>
          {session ? (
            notifications.map(({ notificationsId, data }) => (
              <PostBlockContainer key={notificationsId}>
                <PostContainer>
                  <PostIconWrapper>
                    <ImageWrapper>
                      <Image
                        src={data.commenterIcon}
                        alt={"commenter icon"}
                        height={45}
                        width={45}
                        objectFit="cover"
                      />
                    </ImageWrapper>
                  </PostIconWrapper>
                  <PostInfoWrapper>
                    <PostUserInfo>
                      <PostUsername>{data.commenterName}</PostUsername>
                      {data.timestamp && (
                        <PostTimestamp>
                          {getTimeAgo(currentTime, data.timestamp.seconds)}
                        </PostTimestamp>
                      )}
                    </PostUserInfo>

                    <PostContent onClick={() => handleTargetPost(data.postId)}>
                      {data.commentText}
                    </PostContent>
                  </PostInfoWrapper>
                </PostContainer>
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
  gap: 10px;
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
  gap: 10px;
  margin-bottom: 20px;
`;

const LikedContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border: 1px solid rgb(239, 243, 244);
`;

const LikedEmailsWrapper = styled.div`
  display: flex;
  word-break: break-word;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
`;

const LikedIconWrapper = styled.div`
  display: flex;
  margin: 0 5px;
`;

const LikedPost = styled.div`
  display: flex;
  text-decoration: underline;
  color: blue;
  cursor: pointer;
`;

const PostLoginConvincer = styled.h1`
  padding: 30px 10px;
  cursor: pointer;
  color: rgb(29, 155, 240);
`;

const PostBlockContainer = styled.div``;

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
  margin-bottom: 5px;
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
