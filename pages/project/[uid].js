import Head from "next/head";
import {
  PrismicLink,
  PrismicRichText,
  PrismicText,
  SliceZone,
} from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";
import { HorizontalDivider } from "../../components/HorizontalDivider";
import { PrismicNextImage } from "@prismicio/next";
import styled from "styled-components";
import { COLOR, StyledStrong } from "../_app";
import Button from "../../components/Button";
import Wave2 from "../../assets/svgs/Wave2";
import { Parallax } from "react-scroll-parallax";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const LatestProject = ({ project }) => {
  const date = prismicH.asDate(
    project.data.publishDate || project.first_publication_date
  );

  return (
    <li>
      <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
        <PrismicLink document={project}>
          <PrismicText field={project.data.title} />
        </PrismicLink>
      </h1>
      <p className="font-serif italic tracking-tighter text-slate-500">
        {dateFormatter.format(date)}
      </p>
    </li>
  );
};

const StyledTopLanding = styled.div`
  padding: 0 1rem;
  padding-top: calc(20vh + 5vh);
  margin-top: -5vh;
  background: ${COLOR.light};
  color: ${COLOR.dark};
  display: flex;
  flex-direction: column;
`;
const StyledCaption = styled.span`
  font-size: 1.2rem;
  margin: 1rem;
  @media (min-width: 700px) {
    font-size: 3vw;
  }
`;
const StyledType = styled.strong`
  margin: 1rem;
  font-size: 1.25rem;
  font-weight: 1000;
  text-transform: uppercase;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    background: ${COLOR.primary};
    height: 0.5rem;
    aspect-ratio: 1;
    left: 0;
    top: 50%;
    border-radius: 50%;
    transform: translate(-150%, -50%);
  }
`;

const StyledTypeContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const StyledWave = styled(Wave2)`
  fill: ${COLOR.light};
  margin-top: -1px;
  position: absolute;
`;

const StyledImage = styled(PrismicNextImage)`
  object-fit: center;
  height: 100%;
  width: 100%;
`;
const StyledImageContainer = styled.figure`
  margin: 0;
  margin-top: -20vh;
  max-height: 100vh;
  overflow: hidden;
`;
const Project = ({ project, projects, navigation, settings }) => {
  const date = prismicH.asDate(
    project.data.publishDate || project.first_publication_date
  );

  return (
    <Layout
      withHeaderDivider={false}
      withProfile={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>
          {prismicH.asText(project.data.title)} |{" "}
          {prismicH.asText(settings.data.name)}
        </title>
      </Head>
      <div>
        <Parallax translateY={["20vh", "-20vh"]}>
          <StyledTopLanding>
            <StyledCaption>
              <PrismicRichText field={project.data.short_description} />
            </StyledCaption>
            <HorizontalDivider />
            <PrismicRichText field={project.data.title} />
            <StyledTypeContainer>
              <StyledType>{project.data.type}</StyledType>
              <PrismicLink field={project.data.project_url}>
                <Button type="primary">Projekt</Button>
              </PrismicLink>
            </StyledTypeContainer>
          </StyledTopLanding>
          <StyledWave />
        </Parallax>
        <StyledImageContainer>
          <StyledImage field={project.data.featured_image} />
        </StyledImageContainer>
      </div>
      <SliceZone
        slices={project.data.slices}
        context={{ projects }}
        components={components}
      />
    </Layout>
  );
};

export default Project;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const project = await client.getByUID("project", params.uid);
  const projects = await client.getAllByType("project", {
    limit: 3,
    orderings: [
      { field: "my.project.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");
  return {
    props: {
      project,
      projects,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const projects = await client.getAllByType("project");
  // console.log("projects", projects);
  // console.log(projects.map((project) => project.uid));
  return {
    paths: projects.map((project) => "/project/" + project.uid),
    fallback: false,
  };
}
