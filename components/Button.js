import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { COLOR } from "../pages/_app";
import { animated, config, useSpring } from "react-spring";

const StyledButton = styled(animated.button)`
  font-family: Neris;
  color: white;
  padding: 1em 2em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.25em;
  border-radius: 2em;
  transition: 0.5s;
  z-index: 1;
  position: relative;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  ${({ type }) => {
    if (type === "primary")
      return css`
        border: none;
        background-color: ${COLOR.primary};
        &:hover {
          background-color: ${COLOR.light};
          color: ${COLOR.primary};
        }
      `;
    if (type === "secondary")
      return css`
        border: solid ${COLOR.primary} 2px;
        background-color: transparent;
        &:hover {
          border: solid ${COLOR.light} 2px;
          color: ${COLOR.primary};
        }
      `;
    if (type === "onBLue")
      return css`
        background-color: ${COLOR.light};
        color: ${COLOR.primary};
        border: none;
        &:hover {
          background-color: transparent;
          border: solid ${COLOR.light} 2px;
          color: ${COLOR.light};
        }
      `;
  }}
`;
const StyledButtonContainer = styled.div`
  position: relative;
  z-index: 2;
`;
const StyledTriggerArea = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  border-radius: 2em;
  transform: scale(1.5);
`;

export default function Button({
  children,
  onClick,
  type = "primary",
  move = false,
  CustomElement = StyledButton,
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState([0, 0]);
  const handleMouseMove = (e) => {
    if (move) {
      const rect = ref.current.getClientRects()[0];
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setPosition([x, y]);
    }
  };
  const { transform } = useSpring({
    transform: `translate(${position[0] * 100}%,${position[1] * 100}%)`,
    config: {
      tension: 30,
      friction: 100,
    },
  });
  return (
    <StyledButtonContainer>
      <animated.div
        style={{
          transform: transform,
          cursor: "pointer",
        }}
      >
        <CustomElement
          onMouseMove={handleMouseMove}
          onClick={onClick}
          type={type}
        >
          {children}
        </CustomElement>
      </animated.div>
      <StyledTriggerArea
        ref={ref}
        onMouseMove={handleMouseMove}
        onPointerLeave={() => setPosition([0, 0])}
      ></StyledTriggerArea>
    </StyledButtonContainer>
  );
}
