import React, { useEffect } from "react";
import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import styled from "styled-components";
import useMousePosition from "../../functions/useMousePosition";
import { animated, config, useSpring } from "react-spring";
import useWindowSize from "../../functions/useWindowSize";
import Button from "../../components/Button";
import { Parallax } from "react-scroll-parallax";

/**
 * @typedef {import("@prismicio/client").Content.BigTextSlice} BigTextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BigTextSlice>} BigTextProps
 * @param { BigTextProps }
 */

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const StyledVideoContainer = styled(animated.div)`
  aspect-ratio: 4/3;
  width: 70vw;
  /* height: 100%; */
  max-height: 80vh;
  opacity: 0.45;
  border-radius: 1rem;
  overflow: hidden;
  position: absolute;
  max-width: 100%;
  @media (max-width: 800px) {
  }
`;
const StyledText = styled.span`
  font-family: Kimberley;
  font-size: 2rem;
  position: relative;
  @media (min-width: 400px) {
    font-size: 5rem;
  }
  @media (min-width: 600px) {
    font-size: 7rem;
  }
  @media (min-width: 1000px) {
    font-size: 8rem;
  }
`;
const StyledContainer = styled.div`
  margin: auto;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  /*   @media (min-width: 800px) {
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
  } */
  padding: 1em;
  align-items: center;
`;
const StyledSection = styled.section`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  flex-direction: column;
`;

const Video = ({ slice }) => {
  const [x, y] = useMousePosition();
  // const [{ X, Y }, set] = useSpring(() => ({
  //   X: x,
  //   Y: y,
  //   config: config.molasses,
  // }));
  // useEffect(() => {
  //   set({ X: x, Y: y });
  // }, [x, y]);
  const { transform } = useSpring({
    transform: `translate(-50%, 15%) perspective(800px) rotateY(${
      (x / useWindowSize()?.width) * 12 - 6
    }deg) rotateX(${(-y / useWindowSize()?.height) * 12 + 6}deg)`,
    config: config.stiff,
  });
  if (useWindowSize()?.width < 800) {
    return (
      <StyledVideoContainer
        style={{ transform: "translate(-50%,25vh) scale(.75)" }}
      >
        <StyledVideo
          src={slice.primary.background_media.url}
          autoPlay
          muted
          loop
          type="video/mp4"
        />
      </StyledVideoContainer>
    );
  }
  return (
    <StyledVideoContainer
      style={{
        transform: transform,
      }}
    >
      <StyledVideo
        src={slice.primary.background_media.url}
        autoPlay
        muted
        loop
        type="video/mp4"
      />
    </StyledVideoContainer>
  );
};

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const BigText = ({ slice }) => {
  return (
    <StyledSection>
      <StyledContainer>
        <div>
          <Video slice={slice} />
        </div>
        <Parallax translateY={["20vh", "-20vh"]}>
          <StyledText>
            <PrismicRichText field={slice.primary.title} />
          </StyledText>
        </Parallax>
      </StyledContainer>
      <StyledButtonContainer>
        <Button move={true} >Naše práce</Button>
      </StyledButtonContainer>
    </StyledSection>
  );
};

export default BigText;
