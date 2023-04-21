import React from "react";
import styled, { keyframes, css } from "styled-components";

/* const SlideIn = keyframes`
0%{
    opacity:0;
transform:translateX(100%);
};
50%{opacity: 1;};
100% {transform:translateX(0px); };
`; */
const StyledLetter = styled.span`
  /* animation: ${SlideIn}; */
  /* animation-duration: 1s; */
  transition: 0.8s;
  position: relative;
  display: block;
  transition-timing-function: cubic-bezier(0.43, 1.87, 0.69, 0.9);
  ${({ visible }) => {
    return visible
      ? css`
          opacity: 1;
          transform: translateX(0px);
        `
      : css`
          opacity: 0;
          transform: translateX(50px);
        `;
  }}
`;
export default function SlideIn({ delay = 0, children, visible = true }) {
  return (
    <StyledLetter style={{ transitionDelay: delay + "ms" }} visible={visible}>
      {children}
    </StyledLetter>
  );
}
