import Head from "next/head";
import { PrismicLink, PrismicText, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";
import { HorizontalDivider } from "../../components/HorizontalDivider";

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

const Project = ({ project, latestProjects, navigation, settings }) => {
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
      <Bounded>
        <PrismicLink
          href="/"
          className="font-semibold tracking-tight text-slate-400"
        >
          &larr; Back to articles
        </PrismicLink>
      </Bounded>
      <article>
        <Bounded className="pb-0">
          <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
            <PrismicText field={project.data.title} />
          </h1>
          <p className="font-serif italic tracking-tighter text-slate-500">
            {dateFormatter.format(date)}
          </p>
        </Bounded>
        <SliceZone slices={project.data.slices} components={components} />
      </article>
      {latestProjects.length > 0 && (
        <Bounded>
          <div className="grid grid-cols-1 justify-items-center gap-16 md:gap-24">
            <HorizontalDivider />
            <div className="w-full">
              <Heading size="2xl" className="mb-10">
                Latest articles
              </Heading>
              <ul className="grid grid-cols-1 gap-12">
                {latestProjects.map((project) => (
                  <LatestProject key={project.id} project={project} />
                ))}
              </ul>
            </div>
          </div>
        </Bounded>
      )}
    </Layout>
  );
};

export default Project;

export async function getStaticProps({ params, previewData }) {
  console.log(params);
  const client = createClient({ previewData });

  const project = await client.getByUID("project", params.uid);
  const latestProjects = await client.getAllByType("project", {
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
      latestProjects,
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
