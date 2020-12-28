import React from 'react';

import { SectionWrapper } from 'src/styles/sections';
import { color } from 'src/styles/variables';

import * as S from './styles';

const Privacy: React.FC = () => (
    <SectionWrapper backgroundColor={color.solitude}>
        <S.ContentWrapper css={{ maxWidth: '50rem' }}>
            <h2>Privacy Policy</h2>
            <p>
                1. Messy LLC, a New York limited liability company, owns and operates messy.fm and related websites,
                newsletter(s), and software (&ldquo;Messy&rdquo; or the &ldquo;Messy Platform&rdquo;).&nbsp;
            </p>

            <p>
                In order to use Messy, you must:
                <br />
                * be at least eighteen (18) years old and able to enter into contracts;
                <br />
                * complete the registration process;
                <br />
                * agree to these Terms;
                <br />
                * be located in the United States; and
                <br />* provide true, complete, and up-to-date account and contact information.
            </p>

            <p>
                By using Messy, you warrant and represent that you meet all the requirements listed above, and that you
                won&rsquo;t use Messy in a way that violates any laws or regulations. (Representing and warranting is
                like making a legally enforceable promise.) Messy may refuse service, close accounts of any users,
                change the terms, and/or change eligibility requirements at any time.
            </p>

            <p>
                Your use of the Messy Platform is subject to this Privacy Policy and the Terms of Service
                messy.fm/terms, which may be amended from time to time, at Messy&rsquo;s sole discretion, with or
                without notice to you. By using the Messy Platform, you consent to this privacy policy.
            </p>

            <p>
                When you visit the Messy Platform, register an account, subscribe to our newsletter, respond to a
                survey, place an order, engage with us on social media, and/or engage any services, the website(s) will
                collect information from you.
            </p>

            <p>
                2. The Messy Platform stores information about your use of the Messy Platform through the use of
                cookies. This includes information needed to analyze and optimize the content and users&rsquo;
                experience. The Messy Platform may not function properly if you block cookies.
            </p>

            <p>
                3. We may use third-party advertising companies to serve ads when you visit the Messy Platform.
                Depending on your account level (i.e. Free, Basic, Professional, etc.), we may place third-party
                advertising in your finished and distributed podcast. These companies may use information about your
                podcast and your visits to the Messy Platform, and related websites, in order to provide and track
                advertisements.
            </p>

            <p>
                4. This privacy policy is subject to change without notice and was last updated on September 26,
                2017.&nbsp;If we decide to change our privacy policy, we will post changes on this page.
            </p>
        </S.ContentWrapper>
    </SectionWrapper>
);

export default Privacy;
