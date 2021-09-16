import React from "react";
import styled from "styled-components";
import PostsBody from "./PostsBody";
import PostsDirectory from "./PostsDirectory";

export default function HomeBody() {
  return (
    <HomeBodyContainer>
      <HomeBodyWrapper>
        <PostsBody />
        <PostsDirectory />
      </HomeBodyWrapper>
    </HomeBodyContainer>
  );
}

const HomeBodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;

  height: auto;
`;

const HomeBodyWrapper = styled.div`
  align-items: stretch;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  position: relative;
  height: auto;
`;
