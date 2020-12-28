import React from 'react';
import styled from 'react-emotion';

import { color } from 'src/styles/variables';
import { css } from 'src/styles/old';
import styles from './styles';

// temporary solution before full component rebuild
const FormContainer = styled.div({
    width: '100vw',
    height: '100vh',
    backgroundColor: color.solitude,
});

const createPage = (title, FormComponent) => () => (
    <FormContainer>
        <div className={css(styles.formContainer, styles.container)}>
            <h1 className={css(styles.title)}>{title}</h1>

            <FormComponent />
        </div>
    </FormContainer>
);

export default createPage;
