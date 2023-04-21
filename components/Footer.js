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
`;
const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
  align-items: stretch;
  justify-content: space-evenly;
  width: 100%;
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
})``;

const StyledError = styled.span`
  color: red;
`;
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit", { name, email, message });
    // const res = await fetch("/api/contact")
    try {
      const res = await axios.post("/api/contact", { name, email, message });
      console.log(res);
      setError("");
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }
  };
  return (
    <>
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
            Odeslat
          </Button>
        </ButtonContainer>
      </StyledForm>
      {error && <StyledError>{error}</StyledError>}
    </>
  );
};

const StyledContact = styled.ul`
  padding: 0;
  margin: 1em;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
`;
export const Footer = ({ withSignUpForm = true, settings }) => {
  return (
    <>
      <StyledWave fill={COLOR.primary} />
      <StyledFooter>
        <StyledLogo color={COLOR.light} />
        <ContactForm />
        <HorizontalDivider />
        <StyledContact>
          <li>
            <a>vojtech.suchanek@gmail.com</a>
          </li>
          <li>
            <a>+420 123 456 789</a>
          </li>
        </StyledContact>
      </StyledFooter>
    </>
  );
};
