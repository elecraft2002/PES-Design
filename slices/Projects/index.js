import React from "react";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import Project from "../../components/Project";
import styled from "styled-components";
import Button from "../../components/Button";

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
const Projects = ({ slice, context }) => {
  console.log(context)
  return (
    <section>
      <StyledContainer>
        {context.projects.map((project, i) => {
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
    </section>
  );
};

export default Projects;
