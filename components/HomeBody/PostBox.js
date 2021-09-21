import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { timestamp, db, storage } from "../../firebase";
import { SiAiqfome } from "react-icons/si";

export default function PostBox({ session }) {
  const [postInput, setPostInput] = useState("");
  const [postProject, setPostProject] = useState(1);

  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const uploadImage = (e) => {
    e.preventDefault();

    if (images.length !== 0) {
      const promises = [];
      images.map((image) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const tempProgress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(tempProgress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                setUrls((prevState) => [...prevState, url]);
              });
          }
        );
      });

      Promise.all(promises)
        .then(() => alert("All images uploaded"))
        .catch((err) => console.log(err));
    }
  };

  const sendPost = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      posterEmail: session.user.email,
      posterName: session.user.name,
      posterIcon: session.user.image,
      text: postInput,
      images: urls,
      project: postProject,
      timestamp,
    });
    setPostInput("");

    setImages([]);
    setUrls([]);
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
              type="text"
              value={postInput}
              onChange={(e) => setPostInput(e.target.value)}
              placeholder="Share your stories..."
            />
            <PostAuthorization>
              <SiAiqfome />
              Feel free to post and comment
            </PostAuthorization>
            <PostEditSubmitSection>
              <PostEditSection>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileSelect(e)}
                />
                <button onClick={(e) => uploadImage(e)}>button</button>
              </PostEditSection>
              <PostSubmitButton onClick={(e) => sendPost(e)}>
                Submit
              </PostSubmitButton>
            </PostEditSubmitSection>
          </PostWritingForm>
        </PostPostingSection>
      )}
    </>
  );
}

const PostPostingSection = styled.div`
  display: flex;
  border: 1px solid rgb(239, 243, 244);
  padding: 10px 18px;
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

const PostInputBox = styled.input`
  border: none;
  outline: none;
  height: 45px;
  width: 500px;
  font-size: 18px;
  /* margin-bottom: 20px; */
`;

const PostAuthorization = styled.div`
  display: flex;
  margin: 5px 0 10px 0;
  color: rgb(29, 155, 240);
  font-weight: 700;
  align-items: center;
  gap: 10px;
`;

const PostEditSubmitSection = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgb(239, 243, 244);
  padding-top: 11px;
`;

const PostEditSection = styled.div``;

const PostSubmitButton = styled.button`
  font-size: 15px;
  font-weight: bold;
  border-radius: 50px;
  line-height: 20px;
  padding: 6px 14px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  background-color: rgb(29, 155, 240);
  border: none;
`;
