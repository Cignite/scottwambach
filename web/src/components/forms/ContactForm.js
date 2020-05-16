import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Input, Submit, Textarea, Fieldset } from '../../styles/modules/Inputs';
import HeadingContent, { HeadingContainer } from '../modules/HeadingContent';
import Form from '../../styles/modules/Form';
import { misc, colors } from '../../styles/utilities/settings';

const Message = ({ children }) => <SMessage>{children}</SMessage>;
const postUrl = 'https://mailer.spdrop.com/contact.php';

const CForm = () => {
  const [serial, setSerial] = useState(null);
  const [honeypot, setHoneypot] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const collectData = id => {
    const form = global.document.getElementById(id);
    const inputs = form.querySelectorAll('input');
    const textareas = form.querySelectorAll('textarea');

    let serialString = '';

    inputs.forEach(input => {
      serialString += `${input.name}=${input.value}&`;
    });

    textareas.forEach((input, index) => {
      serialString += `${input.name}=${input.value}${
        textareas.length === index + 1 ? '' : '&'
      }`;
    });
    setSerial(serialString);
  };

  const postForm = () => {
    axios
      .post(postUrl, serial)
      .then(response => {
        console.log(response);
        setSubmitted(true);
      })
      .catch(error => {
        console.log(error);
        setSubmitError(true);
      });
  };

  return (
    <SContactForm>
      <HeadingContent
        content={{
          heading: 'Contact Form',
        }}
      />
      {!submitted && !submitError && (
        <Form
          id="contactForm"
          onSubmit={e => {
            e.preventDefault();
            postForm();
          }}
        >
          <Fieldset
            onChange={() => {
              collectData('contactForm');
            }}
            disabled={honeypot}
          >
            <Input
              type="text"
              name="hpFirst"
              onChange={() => {
                setHoneypot(true);
              }}
            />
            <div className="inner">
              <label htmlFor="firstName" className="half">
                <span>First Name</span>
                <Input required type="text" id="firstName" name="firstName" />
              </label>
              <label htmlFor="lastName" className="half">
                <span>Last Name</span>
                <Input required type="text" id="lastName" name="lastName" />
              </label>
              <label htmlFor="emailAddress" className="half">
                <span>Email Address</span>
                <Input
                  required
                  type="email"
                  placeholder="email@email.com"
                  id="emailAddress"
                  name="emailAddress"
                />
              </label>
              <label htmlFor="phoneNumber" className="half">
                <span>Phone Number</span>
                <Input
                  type="tel"
                  placeholder="555-555-5555"
                  id="phoneNumber"
                  name="phoneNumber"
                />
              </label>
              <label htmlFor="message">
                <span>Message</span>
                <Textarea
                  required
                  placeholder="What's on your mind?"
                  id="message"
                  name="message"
                />
              </label>
            </div>
          </Fieldset>
          <Submit
            disabled={honeypot}
            type="submit"
            id="submit"
            name="submit"
            value="Submit"
          />
        </Form>
      )}
      {submitted && !submitError && (
        <Message>
          Thank you for Your Submission! We will get back to you as soon as we
          can!
        </Message>
      )}
      {!submitted && submitError && <Message>Something went wrong</Message>}
    </SContactForm>
  );
};

export default CForm;

const SContactForm = styled.div`
  ${HeadingContainer} {
    margin-bottom: ${misc.sectionMargin / 2}px;
  }
`;

const SMessage = styled.div`
  color: ${colors.blue};
  text-transform: none;
  font-weight: bold;
  font-size: 30px;
`;
