import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import { Bounded } from "../../components/Bounded";
import { StyledSection } from "../../pages/_app";

const Image = ({ slice }) => {
  const image = slice.primary.image;

  return (
    <StyledSection>
      <Bounded as="section" size={slice.variation === "wide" ? "widest" : "base"}>
        <figure className="grid grid-cols-1 gap-4">
          {prismicH.isFilled.image(image) && (
            <div className="bg-gray-100">
              <PrismicNextImage field={image} sizes="100vw" className="w-full" />
            </div>
          )}
          {prismicH.isFilled.richText(slice.primary.caption) && (
            <figcaption className="text-center font-serif italic tracking-tight text-slate-500">
              <PrismicRichText field={slice.primary.caption} />
            </figcaption>
          )}
        </figure>
      </Bounded>
    </StyledSection>
  );
};

export default Image;
