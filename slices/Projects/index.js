import React from "react";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import Project from "../../components/Project";
import styled from "styled-components";
import Button from "../../components/Button";
import { StyledSection } from "../../pages/_app";

/**
 * @typedef {import("@prismicio/client").Content.ProjectsSlice} ProjectsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ProjectsSlice>} ProjectsProps
 * @param { ProjectsProps }
 */

const StyledContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledInfoContainer = styled.div`
  display:flex;
  flex-direction:column;
  @media (min-width: 1000px) {
    display:grid;
    grid-template-columns: 1fr 1fr;
  }
`
const StyledDescriptionContainer = styled.span`
margin:1rem;
`
const Projects = ({ slice, context }) => {
  console.log(context);
  return (
    <StyledSection>
      <StyledInfoContainer>
        <PrismicRichText field={slice.primary.title} />
        <StyledDescriptionContainer>
          <PrismicRichText field={slice.primary.description} />
        </StyledDescriptionContainer>
      </StyledInfoContainer>
      <StyledContainer>
        {context?.projects?.map((project, i) => {
          return (
            <li key={i}>
              <Project project={project} key={i} />
            </li>
          );
        })}
      </StyledContainer>
      <StyledButtonContainer>
        <Button move={true} type="secondary">
          Více
        </Button>
      </StyledButtonContainer>
    </StyledSection>
  );
};

export default Projects;
