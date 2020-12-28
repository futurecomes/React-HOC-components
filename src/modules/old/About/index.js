import React from 'react';
import styled from 'react-emotion';

import { TextHeader } from 'src/shared/components/old/TextHeader';
import Link from 'src/shared/components/old/interactive/Link';
import { GradientStrip } from 'src/shared/components/old/GradientStrip';
import { css, tabletMax, colors } from 'src/styles/old';

import { Logos } from './Logos';
import styles from './styles';

const Button = styled(Link)({
    display: 'inline-block',
    background: colors.goldenFizz,
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: 20,
    color: 'black',
    marginTop: 20,
    textDecoration: 'none',
    fontSize: 16,
    [tabletMax]: {
        margin: '20px auto 20px',
    },
});

const joinButtonStyles = {
    display: 'inline-block',
    margin: '30px auto 0',
    [tabletMax]: {
        display: 'none',
    },
};

const About = () => (
    <div className={css(styles.container)}>
        <GradientStrip>
            <TextHeader>It's Your Turn to Start a Podcast</TextHeader>
        </GradientStrip>
        <div className={css(styles.body)}>
            <div className={css(styles.row, styles.info)}>
                <h3>
                    Welcome to Messy. Here, we make it free, easy, and fun to create your own podcast. We handle all the
                    technical aspects so all you need to focus on is sharing your voice.
                </h3>
                <p className={css(styles.infoP)}>
                    Hi, I'm Molly and that's why I founded Messy.fm - where our mission is that <b>everyone</b> should
                    be able to share their voice.
                </p>
                <p className={css(styles.infoP)}>
                    The seeds for Messy were planted ten years ago when I graduated college and started a blog. The
                    reason I was able to start a blog so easily is because sites like Wordpress existed: they took care
                    of the technical aspects of starting a blog so that I only needed to think about what I was going to
                    write.
                </p>
                <p className={css(styles.infoP)}>
                    The blog led to some great career opportunities, including working at Forbes where I launched Forbes
                    Podcasts. While I was running Forbes Podcasts, aspiring podcasters kept coming to me and sharing the
                    great ideas they had for their own show. So I had a crazy long list of all the different platforms
                    and equipment they would need to publish their first episode - but the many confusing technical
                    tools aspiring podcasters needed to learn turned many wannabe podcasters off.
                </p>
                <p className={css(styles.infoP)}>
                    So I started thinking: where was the platform that would handle the technical pieces of launching a
                    podcast so new podcasters could just think about what they wanted to say?
                </p>
                <p className={css(styles.infoP)}>So I left Forbes to start that platform.</p>
                <p className={css(styles.infoP)}>
                    Without ever leaving this site, you can record, edit, add show music, create show art, host your RSS
                    feed that will allow your podcast to run on Apple Podcasts, publish your show, and get analytics.
                    You don’t even need a special microphone – you can record using your computer’s microphone. We also
                    give you the option to make your podcast password-protected if you only want certain listeners to be
                    able to access it; this feature is especially loved by podcasters creating internal employee-only
                    company podcasts or professors who only want their students to be able to hear their show.
                </p>
                <p className={css(styles.infoP)}>
                    We’ll even help create a special landing page for your podcast with a custom URL that you can direct
                    your listeners to, or if you already have a website, Messy can help you embed your podcast into your
                    website for listeners to listen from there. Plus, we want you to get even more listeners with our
                    Promoted Podcasts feature, and we also want to help you monetize your work by offering Listener
                    Support so your fans can support your podcast directly and you can cash out to your bank account. We
                    also offer tons of{' '}
                    <a href="https://www.messy.fm/blog/" css={{ color: '#059bff', textDecoration: 'none' }}>
                        free resources
                    </a>{' '}
                    and{' '}
                    <Link to="/pricing" alternate>
                        1:1 coaching
                    </Link>{' '}
                    if you want some extra help getting started.
                </p>
                <p className={css(styles.infoP)}>
                    <b>Recording, editing, & publishing your podcast is free here at Messy with unlimited bandwidth.</b>{' '}
                    I don't want anything to stop you from being able to share your voice.
                </p>
                <p className={css(styles.infoP)}>
                    My dream is that Messy helps you start a podcast that changes your life. I hope that your new
                    podcast brings you new opportunities, lets you connect with new people, and gives you experience the
                    thrill of sharing your unique perspective with the world.
                </p>
                <p className={css(styles.infoP)}>
                    So come on in to the podcasting revolution - we are waiting for your voice.
                </p>
                Podcast On,
                <br />
                Molly Beck
                <br />
                Founder & CEO, Messy.fm
                <Button to="/join" css={joinButtonStyles}>
                    Start Podcasting, Right Now, For Free. It's Time To Get Messy!
                </Button>
            </div>
            <Logos />
        </div>
    </div>
);

export default About;
