import React from 'react';
import { Link } from 'react-router-dom';

import { FaqQuestion } from './faq';

export const productQuestions: FaqQuestion[] = [
    {
        question: 'Can I really create a podcast without a technical background?',
        answer: (
            <>
                <p>
                    Yes! Here at Messy, we make podcast creation easy because we believe everyone should be able to
                    share their voice. We handle all the technical aspects of creating a podcast so all you need to
                    focus on is your show idea. Recording, editing, &amp; publishing your podcast is free here at Messy
                    with unlimited bandwidth.
                </p>

                <p>
                    Without ever leaving this site, you can record, edit, add show music, create show art, host your RSS
                    feed that will allow your podcast to run on Apple Podcasts, publish your show, and get analytics.
                    You don’t even need a special microphone – you can record using your computer’s microphone. We’ll
                    even help create a special landing page for your podcast with a custom URL that you can direct your
                    listeners to, or if you already have a website, Messy can help you embed your podcast into your
                    website for listeners to listen from there. Plus, we want you to get even more listeners with our
                    Promoted Podcasts feature, and we also want to help you monetize your work by offering Listener
                    Support so your fans can support your podcast directly and you can cash out to your bank account.
                </p>

                <p>
                    We also have additional extra options, like <Link to="/pricing">1:1 coaching</Link> and a{' '}
                    <a
                        href={'https://www.facebook.com/groups/newpodcasters/'}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Facebook group
                    </a>{' '}
                    for new podcasters.
                </p>
            </>
        ),
    },
    {
        question: 'Do I have to buy an expensive microphone?',
        answer: (
            <p>
                No. We don't believe a lack of funds to buy an expensive microphone should hold anyone back from joining
                the podcasting revolution. Messy's Recording Studio works with your desktop’s built-in microphone. When
                you enter the Messy Recording Studio, a pop-up will appear asking you if it's okay to allow Messy to
                access your computer’s microphone. You'll want to click “Allow”. If you accidentally clicked “Don’t
                Allow” or “Block”, go into your browser’s setting and update to allow microphone access. If you do
                already have or would like to use an external microphone like a Blue Yeti, you will select that instead
                from the drop-down menu.
            </p>
        ),
    },
    {
        question: 'How can I have a good audio experience?',
        answer: (
            <p>
                Wearing headphones when recording in Messy's Recording Studio will help your sound quality. You'll also
                want to turn your cell phone off, try not to click your pen or have your jewelry hit the table, and
                record in a relatively quiet space.
            </p>
        ),
    },
    {
        question: 'How do I edit my recordings?',
        answer: (
            <p>
                Most of us are never going to record a perfect take, but that’s okay because, with Messy editing tools,
                you can always fix it. Our audio editing tools strike a balance between simplicity and functionality,
                only providing what you need to create a professional sounding podcast. In our Editor &amp; Publisher,
                you can layer multiple tracks, drag and drop audio that you recorded in Messy’s Recording Studio, chose
                music from Messy Music Library, fade in or out of music or conversations, edit and cut audio, and upload
                clips that you recorded elsewhere (.mp3, .wav, or.m4a files are all accepted).
            </p>
        ),
    },
    {
        question: 'Can I put music in my podcast?',
        answer: (
            <p>
                Yes, you can upload music (that you have the rights to use) to our Editor &amp; Publisher tool, or you
                can select music from the Messy Music Library, created exclusively for Messy by{' '}
                <a href={'https://www.instagram.com/brirealmusic/'} target="_blank" rel="noopener noreferrer">
                    DJ Platano Shwagg
                </a>
                .
            </p>
        ),
    },
    {
        question: 'If I recorded my audio using another program, can I still use Messy?',
        answer: (
            <p>
                Yes, simply upload your .mp3, .wav or.m4a audio files to our Editor &amp; Publisher by clicking on
                “Upload” next to “My Recordings &amp; Audio".
            </p>
        ),
    },
    {
        question: 'Do I need to use a specific browser?',
        answer: <p>Messy works best in a browser running on the the latest version of Chrome or Firefox.</p>,
    },
    {
        question: 'What does it mean that my episode is listed on “Top & Trending”?',
        answer: (
            <p>
                Congrats! That means that your episode is among the most popular episodes on Messy. That's not easy to
                do! Our Top &amp; Trending feature updates in real-time and displays the ten most-listened-to episodes
                on Messy over the 72 hours. Once your show has made the Top &amp; Trending list, you carry that
                distinction forever. So if any of your episodes have ever made the list, be sure to tell potential
                listeners and advertisers “We are a Top &amp; Trending show.” Congrats again!
            </p>
        ),
    },
    {
        question: 'What if I only want certain listeners to be able to access my podcast?',
        answer: (
            <p>
                Yes, you can do that on Messy. We give you the option to make your podcast password-protected if you
                only want certain listeners to be able to access it. This feature is often used by podcasters creating
                internal employee-only company podcasts, professors who only want their students to be able to hear
                their show, or anyone who just wants to restrict their podcast's audience. You can privatize you'
                podcast and chose a password for it under My Podcasts by clicking on Make My Podcast Private when you
                are logged in.
            </p>
        ),
    },
    {
        question: 'If I use Messy, can I get sponsors for my podcast?',
        answer: (
            <p>
                Yes, absolutely. We encourage our podcasters to monetize their work. If you'd like some help figuring
                out sponsorship packages, check out our podcast monetization coaching <Link to="/pricing">here</Link>.
                And if you're not interested in having sponsors for your show, consider launching{' '}
                <Link to="/account/listener-support">Listener Support</Link> so your fans can support your show directly
                and you can cash out to your bank account.
            </p>
        ),
    },
    {
        question: 'Can people listen to my podcast from my own blog or company website?',
        answer: (
            <p>
                Yes, you can easily embed your podcast into another website so listeners can enjoy listening to your
                podcast without leaving that site. Sign up to embed your podcast into another site{' '}
                <Link to="/pricing">here</Link>.
            </p>
        ),
    },
    {
        question: 'I already have a podcast that is hosted elsewhere. Can I still use Messy?',
        answer: (
            <p>
                Yes, if you want to keep hosting your podcast somewhere else but also want to have it also be available
                for listeners on Messy, this is the second option under the “My Podcasts” section of the account portal.
            </p>
        ),
    },
];
