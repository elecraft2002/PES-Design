import { PrismicLink, PrismicRichText, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { Bounded } from "./Bounded";
import { Heading } from "./Heading";
import { HorizontalDivider } from "./HorizontalDivider";
import styled from "styled-components";
import { COLOR } from "../pages/_app";
import Logo from "../assets/svgs/Logo";
import Wave from "../assets/svgs/Wave";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";
import Arrow from "../assets/svgs/Arrow";
import Contact from "./Contact";
import { LoadingPopup } from "./Loading";

const SignUpForm = ({ settings }) => {
  return (
    <div className="px-4">
      <form
        action="/api/sign-up"
        method="post"
        className="grid w-full max-w-xl grid-cols-1 gap-6"
      >
        {prismicH.isFilled.richText(settings.data.newsletterDisclaimer) && (
          <div className="text-center font-serif tracking-tight text-slate-500">
            <PrismicRichText
              field={settings.data.newsletterDescription}
              components={{
                heading1: ({ children }) => (
                  <Heading as="h2" className="mb-4 last:mb-0">
                    {children}
                  </Heading>
                ),
                paragraph: ({ children }) => (
                  <p className="mb-4 italic last:mb-0">{children}</p>
                ),
              }}
            />
          </div>
        )}
        <div className="grid grid-cols-1 gap-2">
          <div className="relative">
            <label>
              <span className="sr-only">Email address</span>
              <input
                name="email"
                type="email"
                placeholder="jane.doe@example.com"
                required={true}
                className="w-full rounded-none border-b border-slate-200 py-3 pl-3 pr-10 text-slate-800 placeholder-slate-400"
              />
            </label>
            <button
              type="submit"
              className="absolute top-0 right-0 bottom-0 flex items-center justify-center px-3 text-2xl text-slate-400"
            >
              <span className="sr-only">Submit</span>
              <span aria-hidden={true}>&rarr;</span>
            </button>
          </div>
          {prismicH.isFilled.richText(settings.data.newsletterDisclaimer) && (
            <p className="text-center text-xs tracking-tight text-slate-500">
              <PrismicText field={settings.data.newsletterDisclaimer} />
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

const StyledFooter = styled.footer`
  background: ${COLOR.primary};
  display: flex;
  min-height: 25vh;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  overflow-x: hidden;
`;
const StyledLogo = styled(Logo)`
  width: 30vw;
  @media (min-width: 600px) {
    width: 20vw;
  }
`;

const StyledWave = styled(Wave)`
  margin-bottom: -4px;
`;

const StyledTextArea = styled.textarea`
  outline: none;
  width: 18vw;
  background: ${COLOR.light}1f;
  color: ${COLOR.light};
  border-radius: 0.5rem;
  border: solid 2px ${COLOR.light};
  padding: 0.5rem;
  &:focus {
    &::placeholder {
      color: ${COLOR.light}9f;
    }
  }
  &::placeholder {
    color: ${COLOR.light};
  }
  @media (max-width: 500px) {
    width: calc(100% - 3em);
  }
`;
const StyledInputArea = styled.input`
  border: none;
  width: 18vw;
  outline: none;
  background: transparent;
  color: ${COLOR.light};
  border-bottom: solid 2px ${COLOR.light};
  &:focus {
    &::placeholder {
      color: ${COLOR.light}9f;
    }
  }
  &::placeholder {
    color: ${COLOR.light};
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const StyledH3 = styled.h3`
  font-family: Kimberley;
  font-size: 1rem;
  margin: 0;
  /* @media (min-width: 400px) {
    font-size: 2.5rem;
  }
  @media (min-width: 600px) {
    font-size: 3rem;
  } */
  @media (min-width: 600px) {
    font-size: 2vw;
  }
`;
const StyledContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (max-width: 500px) {
    width: calc(100% - 3em);
  }
`;
const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;
const StyledFormButton = styled.button.attrs((props) => {
  return {
    type: "submit",
    form: "form",
  };
})`
  width: 3rem;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  border: none;
  outline: none;
  background: ${COLOR.light};
  z-index: 2;
  padding: 1rem;
  cursor: pointer;
`;

const StyledError = styled.span`
  color: red;
  font-weight: 1000;
`;
const StyledArrow = styled(Arrow)`
  width: 100%;
  height: 100%;
  fill: ${COLOR.primary};
`;
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoadingState] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingState(true);
    console.log("Submit", { name, email, message });
    // const res = await fetch("/api/contact")
    try {
      const res = await axios.post("/api/contact", { name, email, message });
      setLoadingState(false);
      if (res.status == 200) {
        setName("");
        setEmail("");
        setError("");
        setMessage("");
      }
      console.log(res);
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }
  };
  return (
    <>
      {loading && <LoadingPopup />}
      <StyledForm id="form" onSubmit={handleSubmit}>
        <StyledContactInfo>
          <StyledH3>Zaujali jsme Vás?</StyledH3>
          <StyledInputArea
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Vaše jméno"
            required={true}
          />
          <StyledInputArea
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            type="email"
            placeholder="Email"
          />
        </StyledContactInfo>
        <StyledTextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required={true}
          maxLength={400}
          placeholder="Zpráva"
        />
        <ButtonContainer>
          {" "}
          <Button CustomElement={StyledFormButton} move type="onBLue">
            <StyledArrow />
          </Button>
        </ButtonContainer>
      </StyledForm>
      {error && <StyledError>{error}</StyledError>}
    </>
  );
};

const StyledContact = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
`;
const StyledNav = styled.ul`
  display: flex;
  justify-content: center;
  gap: 2em;
`;
const StyledNavItem = styled(PrismicLink)`
  color: ${COLOR.light};
  font-size: 1.2em;
`;
const StyledNavItem1 = styled.a`
  color: ${COLOR.light};
`;

const StyledInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

export const Footer = ({ withSignUpForm = true, settings, navigation }) => {
  return (
    <>
      <StyledWave fill={COLOR.primary} />
      <StyledFooter>
        <StyledLogo color={COLOR.light} />
        <ContactForm />
        <HorizontalDivider />
        <StyledInfo>
          <StyledContact>
            <Contact settings={settings} />
          </StyledContact>
          <StyledNav>
            {navigation.data.links.map((link, index) => {
              return (
                <StyledNavItem field={link.link} key={index}>
                  <PrismicRichText field={link.label} />
                </StyledNavItem>
              );
            })}
          </StyledNav>
        </StyledInfo>
      </StyledFooter>
    </>
  );
};
