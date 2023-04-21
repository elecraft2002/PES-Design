import React from "react";
import styled from "styled-components";
import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { Parallax } from "react-scroll-parallax";
import { COLOR } from "../pages/_app";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: calc(100% - 2rem);
  color: ${COLOR.light};

  @media (min-width: 600px) {
    width: 40vw;
  }
`;

const StyledImageContainer = styled.figure`
  overflow: hidden;
  width: 100%;
  border-radius: 1rem;
  margin: 0;
  aspect-ratio: 4/3;
`;
const StyledImage = styled(PrismicNextImage)`
  width: 100%;
  height: calc(100%);
  object-fit: cover;
  transition: 0.5s;
  transform: translateY(-5vh);
  transition-delay: 0.5s;
  &:hover {
    transform: translateY(-5vh) scale(1.05);
  }
`;

const StyledH3 = styled.h3`
  font-family: Kimberley;
  font-size: 2rem;
  margin: 1rem 0;
  /* @media (min-width: 400px) {
    font-size: 2.5rem;
  }
  @media (min-width: 600px) {
    font-size: 3rem;
  } */
  @media (min-width: 600px) {
    font-size: 5vw;
  }
`;
const StyledDescription = styled.span`
  @media (min-width: 600px) {
    font-size: 2vw;
  }
  font-size: 1em;
  margin: 1rem 0;
`;

const StyledPrismicLink = styled(PrismicLink)`
  text-decoration: none;
  color: ${COLOR.light};
`;

export default function Project({ project }) {
  console.log(project);
  return (
    <StyledContainer>
      <StyledPrismicLink href={"./project/" + project.uid}>
        <StyledImageContainer>
          <Parallax
            translateY={["-10vh", "10vh"]}
            style={{ height: "calc(100% + 10vh)" }}
          >
            <StyledImage field={project.data.featured_image} />
          </Parallax>
        </StyledImageContainer>
        <div>
          <StyledDescription>
            <PrismicRichText field={project.data.short_description} />
          </StyledDescription>
          <StyledH3>{prismicH.asText(project.data.title)}</StyledH3>
        </div>
      </StyledPrismicLink>
    </StyledContainer>
  );
}
