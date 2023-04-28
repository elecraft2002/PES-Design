import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const StyledLoadingContainer = styled.span`
  position: relative;
  display: flex;
  height: 1em;
  overflow: hidden;
  font-family: Kimberley;
`;
const StyledAnimation = keyframes`
    0%{
        top:0em;
    }
    100%{
        top:-1em;
    }
`;

const StyledColumn = styled.span`
  display: flex;
  width: 1em;
  line-height: 1em;
  flex-direction: column;
  position: relative;
  animation: ${StyledAnimation};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  /* animation-iteration-count: infinite; */
`;

export default function Loading(props) {
  const text = "PES";
  const [key, updateKey] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      updateKey((e) => e + 1);
    }, text.length * 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <StyledLoadingContainer {...props}>
      {text.split("").map((letter, index) => {
        return (
          <StyledColumn
            style={{ animationDelay: `${index}s` }}
            key={key + "" + index}
          >
            <span>{text[(index + key) % text.length]}</span>
            <span>{text[(index + 1 + key) % text.length]}</span>
          </StyledColumn>
        );
      })}
      {/* <StyledColumn>
        <span>P</span>
        <span>S</span>
        <span>E</span>
        <span>P</span>
      </StyledColumn>
      <StyledColumn>
        <span>E</span>
        <span>P</span>
        <span>S</span>
        <span>E</span>
      </StyledColumn>
      <StyledColumn>
        <span>S</span>
        <span>E</span>
        <span>P</span>
        <span>S</span>
      </StyledColumn> */}
    </StyledLoadingContainer>
  );
}

const StyledPopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #0000009f;
  z-index: 99999999999;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  @media (min-width: 500px) {
    font-size: 7vw;
  }
`;

export const LoadingPopup = (props) => {
  return (
    <StyledPopupContainer>
      <Loading />
    </StyledPopupContainer>
  );
};
