import React from "react";
import styled from "styled-components";
import PostBox from "./PostBox";
import SentPosts from "./SentPosts";

export default function PostsBody() {
  return (
    <PostsBodyContainer>
      <Header>Home</Header>
      <PostBox />
      <SentPosts />
    </PostsBodyContainer>
  );
}

const PostsBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  border: 1px solid grey;
  height: 100%;
  z-index: 1;
`;

const Header = styled.div`
  display: flex;
`;
