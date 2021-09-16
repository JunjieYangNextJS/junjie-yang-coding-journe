import React from "react";
import styled from "styled-components";
import PostBox from "./PostBox";
import SentPosts from "./SentPosts";
import { signIn, signOut, useSession } from "next-auth/client";

export default function PostsBody() {
  const [session] = useSession();
  return (
    <PostsBodyContainer>
      <Header>Home</Header>
      <PostBox session={session} />
      <SentPosts session={session} />
    </PostsBodyContainer>
  );
}

const PostsBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  border: 1px solid rgb(83, 100, 113);
  height: 100%;
  z-index: 1;
`;

const Header = styled.div`
  display: flex;
`;
