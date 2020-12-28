import React from 'react';
import { Link } from 'react-router-dom';

import creatingIcon from 'src/public/img/htgs-creating.svg';
import editingIcon from 'src/public/img/htgs-editing.svg';
import joiningIcon from 'src/public/img/htgs-joining.svg';
import microphoneIcon from 'src/public/img/htgs-microphone.svg';
import onAirIcon from 'src/public/img/htgs-on-air.svg';
import publishingIcon from 'src/public/img/htgs-publishing.svg';
import recordingIcon from 'src/public/img/htgs-recording.svg';

import { color } from 'src/styles/variables';

import { HtgsSectionContent } from './htgs';

export const htgsSections: HtgsSectionContent[] = [
    {
        header: 'Joining Messy',
        illustration: joiningIcon,
        content: (
            <>
                <p>
                    To join Messy, click on <strong>Sign In</strong> in the top navigation bar and then “Join Messy.”
                    You can also <Link to="/join">create an account here</Link>.
                </p>
                <p>
                    Fill in your details and click on <strong>Start Podcasting Now</strong> to create your account.
                    You'll be asked to confirm your email address so your account can be activated - now, you're on you
                    way to becoming a podcaster!
                </p>
            </>
        ),
    },
    {
        header: 'Creating Your Show',
        illustration: creatingIcon,
        content: (
            <>
                <p>
                    Click on <strong>My Podcasts</strong> in the top navigation bar and then{' '}
                    <strong>Create Show</strong>. Fill in each field:
                </p>
                <p>
                    <strong>Title:</strong> this is the name of your podcast.
                </p>
                <p>
                    <strong>Description:</strong> this is the description of your podcast. Think about key search terms
                    people might use to find your podcast.
                </p>
                <p>
                    <strong>Categories:</strong> select at least one category that your podcast fits into.
                </p>
                <p>
                    <strong>Show Art:</strong> this is the image that listeners will see when they listen to your show.
                    A podcast's show art typically has the show title, sub-title, and/or host's name. You can upload
                    your own already-created show art, or create custom show art in the Messy Show Art Creator.
                </p>
                <p>
                    <strong>Custom Podcast URL:</strong> this is the website address where listeners can find your
                    podcast on Messy.
                </p>
            </>
        ),
        backgroundColor: color.danube,
        whiteText: true,
    },
    {
        header: 'Entering the Recording Studio',
        illustration: recordingIcon,
        content: (
            <>
                <p>
                    Now it’s time to start recording your first episode. Click on <strong>Create</strong> and you’ll
                    find yourself in the Recording Studio. (Yay, you are almost on-air!)
                </p>

                <p>
                    Click on <strong>New Recording Session</strong> and you’ll be prompted to name your Session and then
                    name the Take of the session. All of your Takes will be grouped in this Session folder, so Session
                    titles are usually the name of the Segment or the name of the Episode. Takes are usually numbered
                    starting with 1.
                </p>
            </>
        ),
    },
    {
        header: 'Adjusting Your Microphone',
        illustration: microphoneIcon,
        content: (
            <>
                <p>
                    Next, your computer will most likely have a pop-up appear asking you if it’s okay to let Messy have
                    access to your computer's default microphone – you will want to click <strong>Allow</strong> here.
                </p>
                <p>
                    If you accidentally clicked <strong>Don’t Allow</strong> or <strong>Block</strong> and you want to
                    use your computer's built-in microphone, go into your browser’s settings and update it to allow
                    microphone access. If you’d like to use an external microphone, click on "Mic Check" and select your
                    external microphone from the drop-down menu.
                </p>
            </>
        ),
        backgroundColor: color.sail,
    },
    {
        header: 'Being On Air',
        illustration: onAirIcon,
        content: (
            <>
                <p>
                    Click on <strong>Record</strong> to start recording. When the <strong>Record</strong> button changes
                    to <strong>On Air</strong>, you will know that you are live. You also want to be sure that you can
                    see the orange lines bouncing as you record – that’s the computer capturing your audio.
                </p>
                <p>
                    You can group different recordings under one session, so it’s okay to hit the{' '}
                    <strong>On Air</strong> button again to stop the recording, catch a breath, and start again. When
                    you hit <strong>Record</strong> again, you’ll be prompted to name your Take.
                </p>
            </>
        ),
    },
    {
        header: 'Editing Your Recordings',
        illustration: editingIcon,
        content: (
            <>
                <p>
                    Now that you’ve recorded, it’s time to put together your episode by clicking on{' '}
                    <strong>Editor &amp; Publisher</strong>. You will be prompted to choose if you want to start from
                    scratch, or start using a draft you have previously saved. Either way, you will see all your
                    previous recordings on the right-hand side of the page under the section labeled{' '}
                    <strong>"My Recordings &amp; Audio"</strong>. If you recorded an audio file elsewhere that you’d
                    like to include in your podcast, you can also upload it here (.mp3, .wav, or.m4a files are all
                    accepted).
                </p>

                <p>
                    In the same sidebar as your recordings, you will also see the Messy Music Library. This is
                    attribution-free music you can use in your podcast. You can buy access to the entire library, or one
                    song at a time.
                </p>

                <p>
                    You can now start dragging and dropping audio files from the sidebar into layers to create the
                    episode. The <strong>quick explainer</strong> on the left-hand side of the page will tell you
                    exactly how to make the episode. Don’t forget to use the editing tools (undo, redo, cut audio,
                    reset, and play) at the top of the recording. You can also fade in and fade out the first or last
                    five seconds of any audio clip by hitting the grey triangles in the clip. Having your intro music
                    fade in and out makes the podcast sound more professional.{' '}
                </p>

                <p>
                    Reminder: You will see a six-second promotion for Messy inserted on layer 1 of the episode that you
                    cannot remove unless you have paid for <Link to="/pricing">Ad Removal</Link>.
                </p>
            </>
        ),
        backgroundColor: color.fog,
    },
    {
        header: 'Publishing on Messy, Apple Podcasts, & More',
        illustration: publishingIcon,
        content: (
            <>
                <p>
                    You can save the episode at any time. Once you have the episode the way you like it, you can
                    schedule it to go live at a later date or publish it immediately by clicking "Publish" and filling
                    in a title and description of the episode. If you have multiple podcasts on Messy, you’ll choose
                    which podcast the episode should appear under. Once the podcast is published, anyone can go to Messy
                    and listen to your show.
                </p>

                <p>
                    The episode will appear automatically on Messy, and you will also instantly get an email on how to
                    publish your podcast on Apple Podcasts, Google Podcasts, and Spotify. You have published your first
                    podcast! Congrats!
                </p>
            </>
        ),
    },
];
