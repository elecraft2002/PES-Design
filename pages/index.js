import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { Bounded } from "../components/Bounded";
import { components } from "../slices";
import { Article } from "../components/Article";
import { SliceZone } from "@prismicio/react";
import styled from "styled-components";

const StyledHeading = styled.h1`
  left: -9999px;
  position: absolute;
`;
const Index = ({ navigation, settings, page, projects }) => {
  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
      projects={projects}
    >
      <Head>
        <title>{prismicH.asText(settings.data.name)}</title>
      </Head>
      <StyledHeading>{prismicH.asText(settings.data.name)}</StyledHeading>
      <SliceZone  context={{projects}} slices={page.data.slices} components={components} />
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const projects = await client.getAllByType("project", {
    // orderings: [
    //   { field: "my.article.publishDate", direction: "desc" },
    //   { field: "document.first_publication_date", direction: "desc" },
    // ],
  });
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");
  const page = await client.getByUID("page", "homepage");

  return {
    props: { page, projects, navigation, settings },
  };
}
