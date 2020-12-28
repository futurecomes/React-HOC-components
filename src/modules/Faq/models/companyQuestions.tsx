import React from 'react';
import { Link } from 'react-router-dom';

import { FaqQuestion } from './faq';

const email = 'sayhello@messy.fm';

export const companyQuestions: FaqQuestion[] = [
    {
        question: 'How did Messy start?',
        answer: (
            <p>
                Read about our origin story on <Link to="/about">our About page</Link>.
            </p>
        ),
    },
    {
        question: 'Can I work at Messy? Can my company advertise or partner with Messy?',
        answer: (
            <p>
                We love meeting potential future team members and connecting about innovative partnerships;
                <br />
                email <a href={`mailto:${email}`}>{email}</a> to start the conversation.
            </p>
        ),
    },
];
