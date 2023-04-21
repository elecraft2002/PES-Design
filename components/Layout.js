import { Header } from "./Header";
import { Footer } from "./Footer";
import styled, { keyframes } from "styled-components";
import { COLOR } from "../pages/_app";
import { createContext, useContext, useEffect, useState } from "react";
import { useSpring } from "react-spring";
import { animated, config } from "@react-spring/web";
import useMousePosition from "../functions/useMousePosition";
import { ParallaxProvider } from "react-scroll-parallax";

const StyledMain = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const StyledContainer = styled.div`
  color: ${COLOR.light};
  /* background: ${COLOR.dark}; */
`;

const rotation = keyframes`
from{
  transform:translate(-50%, -50%) rotate(0deg);
}
to{
  transform:translate(-50%, -50%) rotate(360deg);
}
`;

const StyledCircle = styled(animated.div)`
  width: 40vw;
  aspect-ratio: 0.75;
  background: white;
  position: relative;
  transform: translate(-50%, -50%);
  animation: ${rotation};
  animation-duration: 50s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.5;
  background: ${COLOR.primary};
  background: linear-gradient(
    0deg,
    ${COLOR.primary} 0%,
    ${COLOR.secondary} 100%
  );
`;

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background: ${COLOR.dark};
  overflow: hidden;
`;
const Background = () => {
  const [x, y] = useMousePosition();
  const [{ X, Y }, set] = useSpring(() => ({
    X: x,
    Y: y,
    config: config.molasses,
  }));
  useEffect(() => {
    set({ X: x, Y: y });
  }, [x, y]);
  return (
    <StyledBackground>
      <StyledCircle style={{ left: X, top: Y }} />
    </StyledBackground>
  );
};

export const Layout = ({
  navigation,
  settings,
  withSignUpForm,
  children,
  projects,
}) => {
  return (
    <ParallaxProvider>
      <StyledContainer>
        <Background />
        <Header navigation={navigation} settings={settings} />
        <StyledMain>{children}</StyledMain>
        <Footer withSignUpForm={withSignUpForm} settings={settings} />
      </StyledContainer>
    </ParallaxProvider>
  );
};
