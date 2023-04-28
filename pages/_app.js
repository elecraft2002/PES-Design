import Link from "next/link";
import { PrismicLink, PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";

import { repositoryName } from "../prismicio";
import { Heading } from "../components/Heading";

import "../styles/globals.css";
import styled from "styled-components";

export const StyledStrong = styled.strong`
  color: ${() => {
    const colors = [COLOR.primary, COLOR.secondary, COLOR.tertiary];
    // console.log(id, Math.round(Math.random() * colors.length));
    return colors[Math.floor(Math.random() * colors.length)];
  }};
`;
const StyledH1 = styled.h1`
  margin: 1rem;
  font-family: "Kimberley";
  @media (min-width: 800px) {
    font-size: 5vw;
  }
`;
export const StyledSection = styled.section`
min-height:70vh;
display:flex;
flex-direction:column;
justify-content:center;
`

const richTextComponents = {
  heading1: ({ children }) => <StyledH1>{children}</StyledH1>,
  heading2: ({ children }) => (
    <Heading as="h2" size="2xl" className="mb-7 last:mb-0">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="xl" className="mb-7 last:mb-0">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => <p className="mb-7 last:mb-0">{children}</p>,
  oList: ({ children }) => (
    <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>
  ),
  oListItem: ({ children }) => (
    <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2">{children}</li>
  ),
  list: ({ children }) => (
    <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>
  ),
  listItem: ({ children }) => (
    <li className="mb-1 list-disc pl-1 last:mb-0 md:pl-2">{children}</li>
  ),
  preformatted: ({ children }) => (
    <pre className="mb-7 rounded bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg">
      <code>{children}</code>
    </pre>
  ),
  strong: ({ children }) => {
    return <StyledStrong>{children}</StyledStrong>;
  },

  hyperlink: ({ children, node }) => (
    <PrismicLink
      field={node.data}
      className="underline decoration-1 underline-offset-2"
    >
      {children}
    </PrismicLink>
  ),
};

export const COLOR = {
  light: "#E6E6E6",
  dark: "#1E1E1E",
  primary: "#5386E4",
  secondary: "#FFBC42",
  secondary: "#FFBC42",
  tertiary: "#16DB65",
};

export default function App({ Component, pageProps }) {
  return (
    <PrismicProvider
      internalLinkComponent={(props) => <Link {...props} />}
      richTextComponents={richTextComponents}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <Component {...pageProps} />
      </PrismicPreview>
    </PrismicProvider>
  );
}
