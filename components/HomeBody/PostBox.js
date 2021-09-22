import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { timestamp, db, storage } from "../../firebase";
import { SiAiqfome } from "react-icons/si";
import { RiImageAddLine } from "react-icons/ri";

export default function PostBox({ session }) {
  const [postInput, setPostInput] = useState("");
  const [postProject, setPostProject] = useState(1);

  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);

  const handleFileSelect = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  useEffect(() => {
    if (images.length === 0) return;
    const promises = [];
    images.map((image) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
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
  }, [images]);

  const sendPost = (e) => {
    e.preventDefault();

    const uploadPost = async () => {
      db.collection("posts").add({
        posterEmail: session.user.email,
        posterName: session.user.name,
        posterIcon: session.user.image,
        text: postInput,
        images: urls,
        project: postProject,
        timestamp,
      });
    };

    const resetPost = async () => {
      setPostInput("");
      setImages([]);
      setUrls([]);
    };

    const postActions = [uploadPost, resetPost];

    for (const action of postActions) {
      action();
    }
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
                <UploadImageInput
                  id="uploadImage"
                  type="file"
                  multiple
                  onChange={(e) => handleFileSelect(e)}
                />
                <UploadImageLabel htmlFor="uploadImage">
                  <RiImageAddLine />
                  Insert Images
                </UploadImageLabel>
                {/* <PostSubmitButton onClick={(e) => uploadImage(e)}>
                  confirm
                </PostSubmitButton> */}
              </PostEditSection>
              <PostSubmitButton
                onClick={(e) => sendPost(e)}
                disabled={urls.length === images.length ? false : true}
              >
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

const UploadImageInput = styled.input`
  display: none;
`;

const UploadImageLabel = styled.label``;

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
  :disabled {
    background-color: gray;
    cursor: default;
  }
`;
