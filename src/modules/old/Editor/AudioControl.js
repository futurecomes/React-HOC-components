import React, { Component } from 'react'

import Slider from 'src/shared/components/old/common/Slider'
import container from 'src/containers/editor/AudioControl'
import { css } from 'src/styles/old'

import audioMuted from './static/svg/ic-volume-off-black-24-px.svg'
import audioUp from './static/svg/ic-volume-up-black-24-px.svg'
import styles from './styles'

class AudioControl extends Component {
    state = {
        revertVolume: {},
    }
    onChange = (value, layer) => {
        const { setLayerVolume } = this.props
        setLayerVolume(layer.frontendId, value / 10)
    }

    toggleMute = layer => {
        const { setLayerVolume } = this.props
        if (layer.audioVolume > 0) {
            this.setState(state => ({
                revertVolume: { ...state.revertVolume, [layer.frontendId]: layer.audioVolume },
            }))
            setLayerVolume(layer.frontendId, 0)
        } else {
            const previousVolume = this.state.revertVolume[layer.frontendId] || 1
            setLayerVolume(layer.frontendId, previousVolume)
        }
    }

    render() {
        const { layers, isPremium } = this.props

        return (
            <div>
                {layers
                    .slice()
                    .reverse()
                    .map((layer, i) => {
                        const topOffset = 30 * i + i * 120 + 30
                        const isAd = layer.frontendId === 1 && !isPremium
                        return (
                            <div
                                className={css(styles.layerAudio)}
                                style={{ top: `${topOffset}px` }}
                                key={`audio${layer.frontendId}`}
                            >
                                <div className={css(styles.layerAudioBox)}>
                                    <div className={css(styles.layerAudioLabel)}>Layer {i + 1}</div>
                                    {isAd && (
                                        <div className={css(styles.layerAudioAd)}>Ad (volume is fixed)</div>
                                    )}
                                    <img
                                        src={layer.audioVolume === 0 ? audioMuted : audioUp}
                                        alt={!isAd ? 'Click to mute' : ''}
                                        onClick={() => !isAd && this.toggleMute(layer)}
                                        className={css(styles.audioIcon)}
                                    />
                                    <div className={css(styles.audioBar)}>
                                        <Slider
                                            max={10}
                                            min={0}
                                            disabled={isAd}
                                            val={layer.audioVolume * 10}
                                            onChange={value => this.onChange(value, layer)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        )
    }
}

export default container(AudioControl)
