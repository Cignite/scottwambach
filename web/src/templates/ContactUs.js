import React from 'react';
import styled from 'styled-components';
import ContactForm from '../components/forms/ContactForm';
import Layout from '../components/Layout';
import Wrapper from '../styles/utilities/Wrapper';
import { misc } from '../styles/utilities/settings';
import { above } from '../styles/utilities/mediaQueries';

const ContactUsPage = ({
  pageContext: {
    content: { cityStateZip, mainEmail, phone, street },
  },
}) => (
  <Layout title="Contact Us" path="contact-us">
    <SContactUs>
      <Wrapper>
        <div className="form-inner">
          <ContactForm />
          <div>
            <p>{street}</p>
            <p>{cityStateZip}</p>
            <p>
              <a href={`mailto:${mainEmail}`}>{mainEmail}</a>
            </p>
            <p>
              <a href={`tel:${phone}`}>{phone}</a>
            </p>
          </div>
        </div>
      </Wrapper>
    </SContactUs>
  </Layout>
);

export default ContactUsPage;

const SContactUs = styled.div`
  padding-top: ${misc.sectionMobileMargin}px;

  .form-inner {
    ${above.ipadPort`
      display: flex;
      flex-direction: row-reverse;
    `}

    > div {
      ${above.ipadPort`
        width: 66.6666%;
      `}
      &:last-child {
        ${above.ipadPort`
          width: 33.3333%;
        `}
      }
    }
  }
`;
