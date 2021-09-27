import React, { useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useGetSelectedNav } from "../contexts/SelectedNavContext";

export default function profile() {
  const setSelectedNav = useGetSelectedNav();

  useEffect(() => {
    setSelectedNav("/profile");
  });

  return (
    <HomeContainer>
      <Navbar />
      <PostsBodyContainer></PostsBodyContainer>
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
  min-width: 400px;
  border: 1px solid rgb(239, 243, 244);
  /* margin-top: 30px; */
`;
