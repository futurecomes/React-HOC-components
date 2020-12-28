import { Carousel, Col, Row } from 'antd';
import React from 'react';
import styled from 'react-emotion';

import * as S from 'src/styles/sections';
import { color, font, media } from 'src/styles/variables';

import entrepreneurLogo from '../svg/entrepreneur.svg';
import forbesLogo from '../svg/forbes.svg';
import laTimesLogo from '../svg/latimes.svg';
import mentorboxLogo from '../svg/mentorbox.svg';
import podnewsLogo from '../svg/podnews.svg';

import * as homepageTexts from '../models/homepageTexts.json';

const companies = [
    {
        title: 'LA Times',
        logo: laTimesLogo,
    },
    {
        title: 'Forbes',
        logo: forbesLogo,
    },
    {
        title: 'Mentorbox',
        logo: mentorboxLogo,
    },
    {
        title: 'Entrepreneur',
        logo: entrepreneurLogo,
    },
    {
        title: 'Podnews',
        logo: podnewsLogo,
    },
];

const TestimonialsWrapper = styled(S.SectionWrapper)({
    [media.sm]: {
        paddingTop: '5rem',
    },
});

const CarouselWrapper = styled.div({
    paddingBottom: '3rem',

    '.ant-carousel': {
        '.slick-list': {
            height: 'fit-content',
        },
        '.slick-dots': {
            bottom: '-3rem',

            li: {
                button: {
                    width: '1rem',
                    height: '1rem',
                    margin: '0 0.5rem',
                    borderRadius: '100%',
                    backgroundColor: color.trout,
                    '&:before': {
                        display: 'none',
                    },
                },
                '&:hover': {
                    button: {
                        backgroundColor: color.trout,
                    },
                },
                '&.slick-active': {
                    button: {
                        width: '1rem',
                        height: '1rem',
                        backgroundColor: color.royalBlue,
                    },
                },
            },
        },
    },
});

const Testimonial = styled.div({
    display: 'block',
    maxWidth: '50rem',
    margin: '0 auto',
    textAlign: 'center',
});

const Text = styled.p({
    fontSize: font.size.large,
    color: color.scorpion,
    lineHeight: 1.5,
});

const Author = styled.a({
    marginTop: '2rem',
    color: color.scorpion,
    fontSize: font.size.mediumLarge,
    strong: {
        fontWeight: font.weight.bold,
    },
});

const Companies = styled(Row)({
    alignItems: 'center',
    marginTop: '4rem',
});

const CompanyLogoWrapper = styled.div({
    display: 'block',
    padding: '1rem',
    marginBottom: '2rem',
    filter: 'grayscale(100%)',
    [media.lg]: {
        marginBottom: 0,
    },
});

const CompanyLogo = styled.img({
    display: 'block',
    margin: '0 auto',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '1.3rem',
});

export const Testimonials = () => (
    <TestimonialsWrapper backgroundColor={color.white} hideOnMobile>
        <S.ContentWrapper css={{ textAlign: 'center' }}>
            <CarouselWrapper>
                <Carousel easing="ease-in-out">
                    {homepageTexts.testimonials.map(testimonial => (
                        <Testimonial key={testimonial.author}>
                            <Text>"{testimonial.testimonial}"</Text>
                            <Author href={testimonial.link} target="_blank()">
                                {testimonial.author} from <strong>{testimonial.showTitle}</strong>
                            </Author>
                        </Testimonial>
                    ))}
                </Carousel>
            </CarouselWrapper>
            <Companies type="flex" justify="space-around">
                {companies.map(company => (
                    <Col key={company.title} sm={12} md={8} lg={4}>
                        <CompanyLogoWrapper>
                            <CompanyLogo src={company.logo} />
                        </CompanyLogoWrapper>
                    </Col>
                ))}
            </Companies>
        </S.ContentWrapper>
    </TestimonialsWrapper>
);
