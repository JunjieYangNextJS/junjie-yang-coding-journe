import React from "react";
import styled from "styled-components";
import PostBox from "./PostBox";
import SentPosts from "./SentPosts";
import { signIn, signOut, useSession } from "next-auth/client";

export default function PostsBody() {
  const [session] = useSession();
  return (
    <PostsBodyContainer>
      <Header>
        <h2>Home</h2>{" "}
      </Header>
      <PostBox session={session} />
      <SentPosts session={session} />
    </PostsBodyContainer>
  );
}

const PostsBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  border: 1px solid rgb(239, 243, 244);
  height: 100%;
  z-index: 1;
`;

const Header = styled.div`
  display: flex;

  height: 50px;
  justify-content: flex-start;
  align-items: center;

  h2 {
    font-size: 20px;
    margin-left: 15px;
  }
`;
