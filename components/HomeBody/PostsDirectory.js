import React, { useState } from "react";
import styled, { css } from "styled-components";

export default function PostsDirectory() {
  const [selectedProject, setSelectedProject] = useState(1);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  return (
    <PostsDirectoryContainer>
      <NavElementsContainer>
        <NavElementWrapper>
          <NavElement
            href="#1"
            onClick={() => handleSelectProject(1)}
            label={1}
            selectedProject={selectedProject}
          >
            E-Commerce Project
          </NavElement>
        </NavElementWrapper>

        <NavElementWrapper>
          <NavElement
            href="#2"
            onClick={() => handleSelectProject(2)}
            label={2}
            selectedProject={selectedProject}
          >
            Memory Game
          </NavElement>
        </NavElementWrapper>

        <NavElementWrapper>
          <NavElement
            href="#3"
            onClick={() => handleSelectProject(3)}
            label={3}
            selectedProject={selectedProject}
          >
            Whac-a-Poro Game
          </NavElement>
        </NavElementWrapper>

        <NavElementWrapper>
          <NavElement
            href="#4"
            onClick={() => handleSelectProject(4)}
            label={4}
            selectedProject={selectedProject}
          >
            Coding Journey
          </NavElement>
        </NavElementWrapper>
      </NavElementsContainer>
    </PostsDirectoryContainer>
  );
}

const PostsDirectoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(70% - 800px);
  /* width: 800px; */

  position: fixed;
  right: 0px;

  /* height: 100%; */
`;

const NavElementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 60px;
  padding-left: 25px;
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
`;

const NavElement = styled.a`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-style: italic;
  gap: 20px;
  padding: 10px 25px;
  transition: background-color 0.3s ease-out;
  :hover {
    background-color: #e6e6e6;
  }

  ${({ label, selectedProject }) =>
    label === selectedProject &&
    css`
      font-weight: 700;
      color: rgb(29, 155, 240);
    `};

  border-radius: 50px;
`;
