import React from 'react'
import { SwatchesPicker } from 'react-color'

import * as S from './styled'

const popover = {
    position: 'absolute',
    zIndex: '2',
    left: '100%',
    bottom: 0,
}

export class Input extends React.PureComponent {
    openColorPicker = e => {
        e.preventDefault()
        this.props.openColorPicker(this.props.text.id)
    }

    selectFontColor = color => {
        this.props.selectFontColor({ id: this.props.text.id, color: color.hex })
    }

    onTextChange = e => {
        this.props.setTextValue({ value: e.target.value, id: this.props.text.id })
    }

    render() {
        const { text } = this.props

        return (
            <S.Text>
                <S.Info>{text.label}</S.Info>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <S.Input name={text.id} value={text.value} onChange={this.onTextChange} />{' '}
                    <S.Circle
                        color={text.color}
                        onClick={this.openColorPicker}
                        border="1px solid lightgrey"
                    />
                    {text.displayColorPicker && (
                        <div style={{ ...popover, bottom: text.id === 1 ? 150 : 90 }}>
                            <SwatchesPicker
                                color={text.color}
                                onClick={e => e.stopPropagation()}
                                onChange={this.selectFontColor}
                            />
                        </div>
                    )}
                </div>
            </S.Text>
        )
    }
}
