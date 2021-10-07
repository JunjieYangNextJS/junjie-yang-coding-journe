import React, { useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Image from "next/dist/client/image";
import {
  useGetSelectedNav,
  useSelectedNav,
} from "../contexts/SelectedNavContext";
import profilePic from "../image/profilePic.jpg";
import { FiPhone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";

export default function Profile() {
  const setSelectedNav = useGetSelectedNav();
  const selectedNav = useSelectedNav();

  useEffect(() => {
    setSelectedNav("/profile");
  }, [selectedNav]);

  return (
    <ProfileContainer>
      <Navbar />
      <BodyContainer>
        <BodyWrapper>
          <UserPictureSection>
            <UserPictureContainer>
              <UserPictureWrapper>
                <ImageWrapper>
                  <Image
                    src={profilePic}
                    alt={"user icon"}
                    height={150}
                    width={150}
                    objectFit="cover"
                  />
                </ImageWrapper>
              </UserPictureWrapper>
              <UserNameWrapper>Junjie Yang</UserNameWrapper>
            </UserPictureContainer>
          </UserPictureSection>

          <UserContactContainer>
            <ContactWrapper>
              <FiPhone fontSize="24px" />
              <ContactTextWrapper>
                <ContactUpperText>Phone</ContactUpperText>
                <ContactBottomText>925-953-4081</ContactBottomText>
              </ContactTextWrapper>
            </ContactWrapper>
            <ContactWrapper>
              <AiOutlineMail fontSize="24px" />
              <a
                target="_blank"
                href="https://mail.google.com/"
                rel="noopener noreferrer"
              >
                <ContactTextWrapper>
                  <ContactUpperText>Email</ContactUpperText>

                  <ContactBottomText>jjyusa2010@gmail.com</ContactBottomText>
                </ContactTextWrapper>
              </a>
            </ContactWrapper>
          </UserContactContainer>
        </BodyWrapper>
        <BodyPortfolio>
          <BulletPointContainer>
            <BulletPointWrapper>
              <BulletPointLabel>Skills</BulletPointLabel>
              <BulletPointList>
                <BulletPoint>Next JS</BulletPoint>
                <BulletPoint>React</BulletPoint>
                <BulletPoint>JavaScript</BulletPoint>
                <BulletPoint>HTML</BulletPoint>
                <BulletPoint>CSS</BulletPoint>
                <BulletPoint>NoSQL</BulletPoint>
              </BulletPointList>
            </BulletPointWrapper>
            <BulletPointWrapper>
              <BulletPointLabel>Personality</BulletPointLabel>
              <BulletPointList>
                <BulletPoint>Communicative</BulletPoint>
                <BulletPoint>Creative</BulletPoint>
                <BulletPoint>Dedicated</BulletPoint>
                <BulletPoint>Easygoing</BulletPoint>
                <BulletPoint>Open minded</BulletPoint>
                <BulletPoint>Love learning</BulletPoint>
              </BulletPointList>
            </BulletPointWrapper>
          </BulletPointContainer>
          <AboutMeContainer>
            I am Junjie Yang, a 24 years old self-taught front-end developer who
            has falling in love with programming for 3 years. Three years ago, I
            helped my mother launching her career as a travel agent. We were
            mainly selling cruise tickets through her company's website. We were
            killing it at the start, but fell off short quickly as her company's
            website was not designed to keep consumers but to kick them out. It
            didn't have many features and was full of strange behaviour. At that
            time I thought to myself, 'If the website was better, we could have
            sold so much more'. That really was highly and deeply inspiring for
            me and became a turning point of my life. I was already learning
            Python in my off-times, so it was very easy for me to transition
            right into Javascript since they share the same concept of object
            oriented programming. When the pandemic hit, I went all-in, spending
            10+ hours nearly everyday on learning the skills I need to become a
            great front-end developer and mastered React then NextJS. I believe
            you have checked out all my web app's functionalities at this point.
            I believe I have shown my capability of building great things. If
            you are interested, please contact me :)
          </AboutMeContainer>
        </BodyPortfolio>
      </BodyContainer>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: auto;
`;

const BodyContainer = styled.div`
  display: flex;
  gap: 60px;
  margin: 60px 0 0 20px;
  max-width: 1200px;
  min-width: 350px;
  color: #363636;

  @media screen and (max-width: 1300px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 0;
  }
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  height: auto;
`;

const UserPictureSection = styled.div`
  margin-top: 20px;
`;

const UserPictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  align-items: center;
  gap: 7px;
`;

const UserPictureWrapper = styled.div``;

const UserNameWrapper = styled.div`
  font-size: 23px;
  font-weight: 700;
`;

const ImageWrapper = styled.div`
  height: 150px;
  width: 150px;
  overflow: hidden;
  border-radius: 200px;
`;

const UserContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  background: linear-gradient(to left top, #cd42ff, #26e6ff);
  padding: 25px 55px 32px 35px;
  border-radius: 10px;
`;

const ContactWrapper = styled.div`
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 30px;
`;

const ContactTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactUpperText = styled.div``;

const ContactBottomText = styled.div`
  font-weight: 700;
  letter-spacing: 1px;
`;

const BodyPortfolio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  min-width: 350px;
  height: auto;
  color: #363636;
  padding: 60px 50px;
`;

const BulletPointContainer = styled.div`
  display: flex;
  gap: 80px;
`;

const BulletPointWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const BulletPointLabel = styled.div`
  font-size: 20px;
`;

const BulletPointList = styled.ul``;

const BulletPoint = styled.li`
  font-size: 17px;
  line-height: 1.4;
`;

const AboutMeContainer = styled.div`
  max-width: 600px;
  margin-top: 50px;
  text-indent: 40px;
  font-size: 17px;
  word-spacing: 1px;
  line-height: 1.5;
`;
