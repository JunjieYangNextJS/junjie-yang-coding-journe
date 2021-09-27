import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useSession, signIn, signOut } from "next-auth/client";
import Image from "next/image";
import { useSelectedNav } from "../contexts/SelectedNavContext";
import { useRouter } from "next/router";
import { SiAiqfome } from "react-icons/si";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { IoBookmarksOutline } from "react-icons/io5";
import { IoBookmarks } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";

export default function Navbar() {
  const [session] = useSession();
  const router = useRouter();
  const selectedNav = useSelectedNav();

  const handleSelectNav = (nav) => {
    router.push(nav);
  };

  return (
    <NavbarContainer>
      <NavbarWrapper>
        <NavElementsContainer>
          <NavElementWrapper>
            <NavElement onClick={() => handleSelectNav("/")} label={"/"}>
              <SiAiqfome />
            </NavElement>
          </NavElementWrapper>

          <NavElementWrapper>
            <NavElement
              onClick={() => handleSelectNav("/")}
              label={"/"}
              selectedNav={selectedNav}
            >
              {selectedNav === "/" ? <AiFillHome /> : <AiOutlineHome />}
              Home
            </NavElement>
          </NavElementWrapper>

          <NavElementWrapper>
            <NavElement
              onClick={() => handleSelectNav("/comments")}
              label={"/comments"}
              selectedNav={selectedNav}
            >
              {selectedNav === "/comments" ? (
                <FaCommentDots />
              ) : (
                <FaRegCommentDots />
              )}
              Comments
            </NavElement>
          </NavElementWrapper>

          <NavElementWrapper>
            <NavElement
              onClick={() => handleSelectNav("/bookmarks")}
              label={"/bookmarks"}
              selectedNav={selectedNav}
            >
              {" "}
              {selectedNav === "/bookmarks" ? (
                <IoBookmarks />
              ) : (
                <IoBookmarksOutline />
              )}
              Bookmarks
            </NavElement>
          </NavElementWrapper>

          <NavElementWrapper>
            <NavElement
              onClick={() => handleSelectNav("/profile")}
              label={"/profile"}
              selectedNav={selectedNav}
            >
              {selectedNav === "/profile" ? <IoPerson /> : <IoPersonOutline />}
              Profile
            </NavElement>
          </NavElementWrapper>
        </NavElementsContainer>
        <ContactMeSection>
          <ContactMeButton>Contact Me</ContactMeButton>
        </ContactMeSection>
        <DisplayUserWrapper>
          {session ? (
            <DisplayUserSection>
              <DisplayUserIcon>
                <Image
                  src={session.user.image}
                  alt={"user icon"}
                  height={40}
                  width={40}
                  objectFit="cover"
                />
              </DisplayUserIcon>
              <DisplayUserAccess>
                <DisplayUserName>{session.user.name}</DisplayUserName>
                <LogoutSection onClick={signOut}>log out</LogoutSection>
              </DisplayUserAccess>
            </DisplayUserSection>
          ) : (
            <LoginSection onClick={signIn}>Login</LoginSection>
          )}
        </DisplayUserWrapper>
      </NavbarWrapper>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  z-index: 2;

  align-items: flex-end;
  width: 30%;
  height: 100%;
`;
const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 300px;
  min-width: 100px;
  backface-visibility: hidden;
  flex-basis: auto;

  flex-shrink: 0;
  height: 100%;
  padding-top: 80px;
  overflow-y: auto;
`;

const NavElementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* padding-left: 40px; */
  padding-bottom: 200px;
`;

const NavElementWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #363636;
  font-size: 25px;
  cursor: pointer;

  height: 80px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-wrap: break-word;
  padding-left: 10px;

  :first-child {
    color: rgb(29, 155, 240);
    font-size: 30px;
    margin-top: -80px;
    margin-bottom: -20px;
  }
`;

const NavElement = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 25px 10px 15px;
  transition: background-color 0.3s ease-out;
  :hover {
    background-color: #e6e6e6;
  }

  ${({ label, selectedNav }) =>
    label === selectedNav &&
    css`
      font-weight: 700;
    `};

  border-radius: 50px;
`;

const ContactMeSection = styled.div`
  display: flex;
  justify-content: center;
  padding-right: 50px;
  padding-bottom: 50px;
`;

const ContactMeButton = styled.button`
  font-size: 23px;
  border-radius: 50px;
  line-height: 20px;
  padding: 15px 50px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  background-color: rgb(29, 155, 240);
  border: none;
`;

const DisplayUserWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 220px;
  min-height: 60px;
  /* border: 1px solid black; */
  border-radius: 50px;
  margin-top: 100px;
  margin-bottom: 50px;
  color: #363636;
  transition: all 0.2s ease-in-out;
  :hover {
    background-color: #e3e3e3;
  }
`;

const DisplayUserSection = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  padding-left: 15px;
`;

const DisplayUserIcon = styled.div`
  display: flex;
  height: 40px;
  width: 40px;
  border-radius: 50px;
  /* border: 1px solid red; */
  margin-right: 15px;
  overflow: hidden;
`;

const DisplayUserAccess = styled.div``;

const DisplayUserName = styled.div`
  font-weight: 700;
  font-size: 17px;
  overflow-wrap: break-word;
`;

const LogoutSection = styled.div`
  cursor: pointer;
  font-size: 15px;
`;

const LoginSection = styled.div`
  font-size: 26px;
  line-height: 2;
  font-weight: bold;
  cursor: pointer;
`;
