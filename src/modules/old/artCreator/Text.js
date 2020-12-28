import React from 'react'
import { Rnd } from 'react-rnd'

const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    wordBreak: 'break-all',
}

export class Text extends React.PureComponent {
    state = {
        hover: false,
        x: 25,
        y: this.props.text.id === 1 ? 5 : 90,
        width: 350,
        height: 50,
        fontSize: 36,
        zIndex: 0,
    }

    mouseEnter = () => {
        this.setState({ hover: true })
    }

    mouseLeave = () => {
        this.setState({ hover: false })
    }

    dragStop = d => {
        this.setState({ x: d.x, y: d.y, zIndex: 0 })
    }

    onResize = ref => {
        const fontSize = (ref.offsetWidth + ref.offsetHeight) / 10

        this.setState({ width: ref.offsetWidth, height: ref.offsetHeight, fontSize })
    }

    onDragStart = () => {
        this.setState({ zIndex: 1 })
    }

    render() {
        const { text } = this.props
        const { hover, x, y, width, height, fontSize, zIndex } = this.state

        return (
            <Rnd
                key={text.id}
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}
                style={{
                    ...styles,
                    color: text.color,
                    fontSize,
                    border: hover ? '1px dashed black' : 'none',
                    zIndex,
                }}
                position={{ x, y }}
                maxWidth={400}
                maxHeight={400}
                size={{ width, height }}
                onDragStart={this.onDragStart}
                onDragStop={(_, d) => this.dragStop(d)}
                onResize={(_a, _b, ref) => this.onResize(ref)}
            >
                {text.value}
            </Rnd>
        )
    }
}
