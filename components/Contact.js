import React from "react";
import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import styled from "styled-components";
import { COLOR } from "../pages/_app";

const StyledConactContainer = styled.div`
  @media (min-width: 500px) {
    font-size: 2rem;
  }
`;
const StyledHeading = styled.h4`
  color: ${COLOR.primary};
  text-transform:uppercase;
  font-size:.75em;
`;

export default function Contact({ settings }) {
  return (
    <StyledConactContainer>
      <StyledHeading>Kontakt</StyledHeading>
      <ul>
        <li>
          <PrismicLink href={"tel:" + prismicH.asText(settings.data.mobile)}>
            <PrismicRichText field={settings.data.mobile} />
          </PrismicLink>
          <PrismicLink href={"mailto:" + prismicH.asText(settings.data.email)}>
            <PrismicRichText field={settings.data.email} />
          </PrismicLink>
        </li>
      </ul>
    </StyledConactContainer>
  );
}
