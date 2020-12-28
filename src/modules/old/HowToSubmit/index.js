import React from 'react'

import { css } from 'src/styles/old'

import styles from './styles'

const HowToSubmit = () => (
    <div className={css(styles.container)}>
        <div className={css(styles.header)}>
            <section className={css(styles.section)}>
                <p className={css(styles.tag)}>How To</p>
                <h1 className={css(styles.headerTitle)}>Submit Your Podcast to Apple Podcasts</h1>
            </section>
        </div>
        <div className={css(styles.body)}>
            <div className={css(styles.row, styles.info)}>
                <h1 className={css(styles.infoTitle)}>Before You Begin</h1>
                <p className={css(styles.infoP)}>
                    You&apos;ll need to have your podcast setup on Messy. You&apos;ll also need:
                    <ol className={css(styles.listDirections)}>
                        <li>
                            Your artwork in a square png or jpg at 3000x3000 pixels (or atleast 1400x1400).
                        </li>
                        <li> A unique name for Apple Podcasts, so check the Apple Podcasts Podcast list.</li>
                        <li> At least one Apple Podcasts category in mind.</li>
                        <li>
                            {' '}
                            An Apple ID, which you can setup <a href="http://appleid.apple.com">here</a> if
                            you don&apos;t have one. (If you have an Apple product you probably do).{' '}
                        </li>
                        <li> At least one episode published on Messy.</li>
                    </ol>
                </p>
            </div>
            <div className={css(styles.row, styles.info)}>
                <h1 className={css(styles.infoTitle)}>Submitting to Apple Podcasts</h1>
                <p className={css(styles.infoP)}>
                    <ol className={css(styles.listDirections)}>
                        <li>
                            {' '}
                            Sign in to{' '}
                            <a href="https://podcastsconnect.apple.com">
                                Apple Podcasts Podcast Connect
                            </a>{' '}
                        </li>
                        <li>
                            Once signed in, click the large blue plus (+) icon in the top left corner of the
                            page.
                        </li>
                        <li>
                            Enter your RSS feed info, which you can find in Settings Etc. on My Podcasts in
                            Messy.
                        </li>
                        <li> Click Validate.</li>
                        <li>
                            {' '}
                            A Feed Preview will load if everything is in order; make sure everything looks
                            good. If there any validation errors, you&apos;ll need to fix them and try again.
                        </li>
                        <li> Once everything is in order, click Submit and you&apos;ll be good to go.</li>
                    </ol>
                </p>
            </div>
            <div className={css(styles.row, styles.info)}>
                <h1 className={css(styles.infoTitle)}>Before You Begin</h1>
                <p className={css(styles.infoP)}>
                    It can take a little bit of time before your podcast is live on Apple Podcasts, sometimes
                    up to 10 days. Apple will email you once it&apos;s up and give you a unique Apple Podcasts
                    subscribe URL, which you can add to Messy in Settings Etc. on My Podcast.
                </p>
                <p className={css(styles.infoP)}>
                    For any additional information on the Apple Podcasts Podcast Submission process, check out
                    Apple&apos;s documentation{' '}
                    <a href="https://itunespartner.apple.com/en/podcasts/overview">here</a>.
                </p>
            </div>
        </div>
    </div>
)

export default HowToSubmit
