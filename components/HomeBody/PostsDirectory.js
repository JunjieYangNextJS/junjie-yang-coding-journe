import React from "react";
import styled from "styled-components";

export default function PostsDirectory() {
  return (
    <PostsDirectoryContainer>
      <a href="#2">to 11</a>
    </PostsDirectoryContainer>
  );
}

const PostsDirectoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(70% - 1000px);
  position: fixed;
  right: 0;
  font-size: 30px;

  height: 100%;
`;
