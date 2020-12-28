import React from 'react';
import { connect } from 'react-redux';
import { CirclePicker } from 'react-color';
import html2canvas from 'html2canvas';
import Spinner from 'react-svg-spinner';

import * as S from './styled';
import * as actions from './actions/actions';
import { Input } from './Input';
import { Arrow } from 'src/shared/components/old/shared/Arrow';
import { colors } from 'src/styles/old';
import { Text } from './Text';
import { circleColors } from './helpers';

export class ShowArtCreatorContainer extends React.Component {
    node = React.createRef();

    state = {
        generating: false,
    };

    generate = async () => {
        this.setState({ generating: true });
        const size = { width: 400, height: 400 };
        const canvas = await html2canvas(this.node.current, { logging: false, ...size });
        const source = canvas.toDataURL('image/png');
        const file = await this.urlToFile(source);
        this.props.addGeneratedArt({ file, source, size });
        this.props.goBack();
    };

    urlToFile = async url => {
        const res = await fetch(url);
        const buf = await res.arrayBuffer();
        return new File([buf], 'coverArt.png', { type: 'image/png' });
    };

    componentWillUnmount() {
        this.props.resetArtCreator();
    }

    render() {
        return (
            <S.CreateArtWrapper>
                <S.ArrowWrapper onClick={this.props.goBack}>
                    <Arrow color={colors.azure} />
                </S.ArrowWrapper>
                <S.Title>Show Art Creator</S.Title>
                <div>
                    <S.CreateBox>
                        <S.ArtWrapper>
                            <S.Art innerRef={this.node} backgroundColor={this.props.backgroundColor}>
                                {this.props.texts.map(text => (
                                    <Text key={text.id} text={text} />
                                ))}
                            </S.Art>
                        </S.ArtWrapper>
                        <S.CircleColorPicker>
                            <S.Info>Pick a background</S.Info>
                            <CirclePicker
                                onChange={this.props.changeArtBackground}
                                color={this.props.backgroundColor}
                                circleSize={32}
                                width={276}
                                colors={circleColors}
                            />
                        </S.CircleColorPicker>
                    </S.CreateBox>
                    <S.InputsWrapper>
                        {this.props.texts.map(text => (
                            <Input
                                key={text.id}
                                text={text}
                                openColorPicker={this.props.openColorPicker}
                                selectFontColor={this.props.selectFontColor}
                                setTextValue={this.props.setTextValue}
                            />
                        ))}
                    </S.InputsWrapper>
                    <S.Button onClick={this.generate}>
                        {this.state.generating ? <Spinner speed="fast" /> : `Generate`}
                    </S.Button>
                </div>
            </S.CreateArtWrapper>
        );
    }
}

function mapStateToProps(state) {
    return state.artCreator;
}

export const ShowArtCreator = connect(
    mapStateToProps,
    actions,
)(ShowArtCreatorContainer);
