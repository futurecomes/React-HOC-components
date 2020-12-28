import { Howl } from 'howler';
import React, { Component } from 'react';

import { css } from 'src/styles/old';

import pauseSrc from 'src/public/img/icons/player/pause.svg';
import playSrc from 'src/public/img/icons/player/play.svg';
import styles from './styles';

interface Props {
    url: string;
}

interface State {
    isPlaying: boolean;
    message: string | null;
}

export class PlayPreview extends Component<Props, State> {
    public player: any;
    public state: State = {
        isPlaying: false,
        message: '',
    };

    public componentDidMount(): void {
        this.player = new Howl({
            src: [this.props.url],
            preload: true,
            html5: true,
            volume: 1,
            autoplay: false,
            onplay: () => {
                this.setState({ isPlaying: true });
            },
            onpause: () => {
                this.setState({ isPlaying: false });
            },
            onstop: () => {
                this.setState({ isPlaying: false });
            },
            onend: () => {
                this.setState({ isPlaying: false });
            },
            onloaderror: () => {
                this.setState({ message: 'Error loading audio, invalid format' });
            },
        });
    }

    public togglePlay = () => {
        if (this.state.isPlaying) {
            this.player.pause();
        } else {
            this.player.play();
            this.setState({ message: null });
        }
    };

    public render(): JSX.Element {
        const { isPlaying, message } = this.state;

        return (
            <div style={{ marginTop: 10 }}>
                <div>
                    <button
                        type="button"
                        disabled={!!message}
                        onClick={() => this.togglePlay()}
                        style={{ height: 30, width: 30 }}
                        className={css(styles.icon, styles.valMid, !!message && styles.disabled)}
                    >
                        <img
                            className={css(styles.icon)}
                            src={isPlaying ? pauseSrc : playSrc}
                            alt={isPlaying ? 'Pause' : 'Play'}
                        />
                    </button>
                    <small className={css(styles.valMid)}>
                        <em>Play Preview</em>
                    </small>
                </div>
                <p>
                    <small>
                        <b>{message}</b>
                    </small>
                </p>
            </div>
        );
    }
}
