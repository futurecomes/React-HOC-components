import React from 'react';
import styled from 'react-emotion';

import { validateImageFile } from 'src/shared/helpers/validate';
import ImagePicker from 'src/shared/components/old/form/ImagePicker';
import { css, colors } from 'src/styles/old';

import styles from './styles';

const ValidationInfo = styled.span({
    margin: '-7px 0 1rem',
    color: colors.black38,
    fontSize: 12,
    whiteSpace: 'pre-wrap',
});

export function ShowImagePicker(props) {
    const validationInfo =
        'Image must:\n- be a jpg / png,\n- be between 1400x1400 and 3000x3000,\n- be smaller than 2MB';

    return (
        <React.Fragment>
            <ImagePicker
                name="coverArt"
                label="Show Art"
                validate={[validateImageFile(1400, 1400, 3000, 3000, false, 2, true)]}
                validationInfo={props.showValidationInfo && !props.showValidationInfoBelow && validationInfo}
                {...props}
                tag={
                    <span className={css(styles.tag)}>
                        {`You can upload an image, or use the Messy Show Art Creator `}
                        {/* eslint-disable-next-line */}
                        <a className={css(styles.tagLink)} onClick={props.onClick}>
                            here
                        </a>
                    </span>
                }
            />
            {props.showValidationInfoBelow && <ValidationInfo>{validationInfo}</ValidationInfo>}
        </React.Fragment>
    );
}
