import React from 'react';
import { Link } from 'react-router-dom';

import { FaqQuestion } from './faq';

export const billingQuestions: FaqQuestion[] = [
    {
        question: 'Is Messy free?',
        answer: (
            <p>
                You can record, edit, publish, and have your podcast be available for listeners on Messy, Apple
                Podcasts, Spotify, and more - all for free with unlimited bandwidth here on Messy. If you'd like to go
                beyond our free options, additional paid features are <Link to="/pricing">here</Link>.
            </p>
        ),
    },
    {
        question: 'Will you see my credit card info?',
        answer: (
            <p>
                No. We use Stripe to process your payments. Stripe is a well-respected payment processing company and
                has handled payments for Target, Blue Apron, Warby Parker, and more.
            </p>
        ),
    },
];
