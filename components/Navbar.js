import React from "react";
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
import { FaRegUserCircle } from "react-icons/fa";
import { BiLogIn } from "react-icons/bs";
import { RiLoginCircleLine } from "react-icons/ri";

export default function Navbar() {
  const [session] = useSession();
  const router = useRouter();
  const selectedNav = useSelectedNav();

  const handleSelectNav = (page) => {
    router.push(page);
  };

  return (
    <NavbarContainer>
      <NavbarWrapper>
        <NavElementsContainer>
          <NavElementWrapper>
            <NavElement onClick={() => handleSelectNav("/")} label={"/"}>
              <NavIcon>
                <SiAiqfome />
              </NavIcon>
            </NavElement>
          </NavElementWrapper>

          <NavElementWrapper>
            <NavElement
              onClick={() => handleSelectNav("/")}
              label={"/"}
              selectedNav={selectedNav}
            >
              <NavIcon>
                {selectedNav === "/" ? <AiFillHome /> : <AiOutlineHome />}
              </NavIcon>

              <NavLabel>Home</NavLabel>
            </NavElement>
          </NavElementWrapper>

          <NavElementWrapper>
            <NavElement
              onClick={() => handleSelectNav("/comments")}
              label={"/comments"}
              selectedNav={selectedNav}
            >
              <NavIcon>
                {selectedNav === "/comments" ? (
                  <FaCommentDots />
                ) : (
                  <FaRegCommentDots />
                )}
              </NavIcon>
              <NavLabel>Comments</NavLabel>
            </NavElement>
          </NavElementWrapper>

          <NavElementWrapper>
            <NavElement
              onClick={() => handleSelectNav("/bookmarks")}
              label={"/bookmarks"}
              selectedNav={selectedNav}
            >
              <NavIcon>
                {selectedNav === "/bookmarks" ? (
                  <IoBookmarks />
                ) : (
                  <IoBookmarksOutline />
                )}
              </NavIcon>

              <NavLabel>Bookmarks</NavLabel>
            </NavElement>
          </NavElementWrapper>

          <NavElementWrapper>
            <NavElement
              onClick={() => handleSelectNav("/profile")}
              label={"/profile"}
              selectedNav={selectedNav}
            >
              <NavIcon>
                {selectedNav === "/profile" ? (
                  <IoPerson />
                ) : (
                  <IoPersonOutline />
                )}
              </NavIcon>
              <NavLabel>Profile</NavLabel>
            </NavElement>
          </NavElementWrapper>
        </NavElementsContainer>
        <ContactMeSection>
          <ContactMeButton
            onClick={() => handleSelectNav("/profile")}
            label={"/profile"}
            selectedNav={selectedNav}
          >
            Contact Me
          </ContactMeButton>
        </ContactMeSection>
        <DisplayUserWrapper>
          {session ? (
            <DisplayUserSection onClick={signOut}>
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
                <LogoutSection>log out</LogoutSection>
              </DisplayUserAccess>
            </DisplayUserSection>
          ) : (
            <LoginSection onClick={signIn}>
              <LoginIcon>
                <RiLoginCircleLine />
              </LoginIcon>
              <LoginLabel>Login</LoginLabel>
            </LoginSection>
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
  height: 100vh;

  @media screen and (max-width: 1050px) {
    width: 70px;
    min-width: 70px;
  }
  @media screen and (max-width: 500px) {
    width: 30px;
    min-width: 30px;
  }
`;
const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 300px;
  backface-visibility: hidden;
  flex-basis: auto;
  flex-shrink: 0;
  height: 100%;
  padding-top: 80px;
  overflow-y: auto;
  font-size: 25px;

  @media screen and (max-width: 1050px) {
    width: 70px;
    align-items: center;
  }
  @media screen and (max-width: 500px) {
    width: 30px;
    min-width: 30px;
  }
`;

const NavElementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  @media screen and (max-width: 1050px) {
    padding-left: 0;
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

  @media screen and (max-width: 1050px) {
    padding: 7px 11px;
  }
  @media screen and (max-width: 500px) {
    padding: 3px 3px;
  }
`;

const NavIcon = styled.div`
  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`;

const NavLabel = styled.div`
  @media screen and (max-width: 1050px) {
    display: none;
  }
`;

const ContactMeSection = styled.div`
  display: flex;
  justify-content: center;
  padding-right: 50px;
  padding-bottom: 50px;

  @media screen and (max-width: 1050px) {
    display: none;
  }
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
  border-radius: 50px;
  margin-top: 100px;
  color: #363636;
  transition: all 0.2s ease-in-out;
  :hover {
    background-color: #e3e3e3;
  }
  @media screen and (max-width: 1050px) {
    margin-top: -150px;
    transition: none;
    :hover {
      background-color: white;
    }
  }
`;

const DisplayUserSection = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  padding-left: 15px;

  @media screen and (max-width: 500px) {
    padding-left: 0;
  }
`;

const DisplayUserIcon = styled.div`
  display: flex;
  height: 40px;
  width: 40px;
  border-radius: 50px;
  margin-right: 15px;
  overflow: hidden;

  @media screen and (max-width: 500px) {
    height: 28px;
    width: 28px;
    margin-right: 0;
  }
`;

const DisplayUserAccess = styled.div`
  @media screen and (max-width: 1050px) {
    display: none;
  }
`;

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

const LoginIcon = styled.div`
  color: rgb(29, 155, 240);

  transition: all 0.2s ease-in;
  :hover {
    font-size: 30px;
  }
  @media screen and (min-width: 1049px) {
    display: none;
  }
`;

const LoginLabel = styled.div`
  cursor: pointer;
  @media screen and (max-width: 1050px) {
    display: none;
  }
`;
