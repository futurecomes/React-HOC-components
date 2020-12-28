import { Collapse, Icon } from 'antd';
import React from 'react';
import styled from 'react-emotion';

import { color, font } from 'src/styles/variables';

import { FaqQuestion } from '../models/faq';

const FaqSectionWrapper = styled.div({
    '&:not(:last-child)': {
        marginBottom: '2rem',
    },
});

const Header = styled.h2(
    {
        color: color.royalBlue,
        textTransform: 'uppercase',
        marginBottom: 0,
    },
    font.bold(font.size.base),
);

const StyledCollapse = styled<any>(Collapse)({
    '&.ant-collapse': {
        backgroundColor: 'transparent',
        border: 'none',

        '> .ant-collapse-item': {
            padding: 0,
            borderBottom: `1px solid ${color.gallery}`,

            '&:last-child': {
                borderBottom: 0,
            },
            '.ant-collapse-header': {
                ...font.medium(font.size.base),
                padding: '1rem 1.5rem 1rem 0',
                '.ant-collapse-arrow': {
                    left: 'auto',
                    right: 0,
                },
            },
            '.ant-collapse-content': {
                ...font.normal(font.size.small),
                lineHeight: 1.6,
                border: 'none',
                '> .ant-collapse-content-box': {
                    padding: 0,
                },
            },
        },
    },
});

const StyledPanel = styled(Collapse.Panel)({
    a: {
        color: color.royalBlue,
        '&:hover': {
            color: color.royalBlue,
            textDecoration: 'underline',
        },
    },
});

interface Props {
    title?: string;
    questions: FaqQuestion[];
}

export const FaqSection: React.FC<Props> = ({ title, questions }) => (
    <FaqSectionWrapper>
        {title && <Header>{title}</Header>}
        <StyledCollapse
            accordion
            expandIcon={({ isActive }: { isActive: boolean }) => (
                <Icon type={isActive ? 'minus' : 'plus'} style={{ color: color.royalBlue }} />
            )}
        >
            {questions.map(question => (
                <StyledPanel header={question.question} key={question.question}>
                    {question.answer}
                </StyledPanel>
            ))}
        </StyledCollapse>
    </FaqSectionWrapper>
);
