import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { timestamp, db } from "../../firebase";

export default function PostBox({ session }) {
  const [postInput, setPostInput] = useState("");
  const [postImages, setPostImages] = useState([]);
  const [postProject, setPostProject] = useState(2);

  const sendPost = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      posterEmail: session.user.email,
      posterName: session.user.name,
      posterIcon: session.user.image,
      text: postInput,
      images: [...postImages],
      project: postProject,
      timestamp,
      comments: [],
    });
    setPostInput("");
    setPostImages("");
    setPostProject("");
  };

  return (
    <>
      {session && (
        <PostPostingSection>
          <UserIcon>
            <Image
              src={session.user.image}
              alt={"user icon"}
              height={40}
              width={40}
              objectFit="cover"
            />
          </UserIcon>
          <PostWritingForm>
            <PostInputBox
              value={postInput}
              onChange={(e) => setPostInput(e.target.value)}
              placeholder="Share your thoughts..."
            />
            <PostEditSubmitSection>
              <PostEditSection>hi</PostEditSection>
              <PostSubmitSection onClick={(e) => sendPost(e)}>
                submit
              </PostSubmitSection>
            </PostEditSubmitSection>
          </PostWritingForm>
        </PostPostingSection>
      )}
    </>
  );
}

const PostPostingSection = styled.div`
  display: flex;
`;

const UserIcon = styled.div`
  display: flex;
  height: 40px;
  width: 40px;
  border-radius: 50px;
  /* border: 1px solid red; */
  margin-right: 15px;
  overflow: hidden;
`;

const PostWritingForm = styled.form``;

const PostInputBox = styled.input``;

const PostEditSubmitSection = styled.div``;

const PostEditSection = styled.div``;

const PostSubmitSection = styled.button``;
