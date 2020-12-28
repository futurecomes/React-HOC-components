import { Carousel } from 'antd';
import * as H from 'history';
import { isEmpty } from 'lodash';
import React from 'react';
import styled, { keyframes } from 'react-emotion';

import sliderArrowLeft from 'src/public/img/icons/slider-arrow-left.svg';
import sliderArrowRight from 'src/public/img/icons/slider-arrow-right.svg';

import { Episode, PodcastItem, Show } from 'src/modules/Podcasts/models/podcasts';
import { CenteredSpinner } from 'src/shared/components/old/CenteredSpinner';
import { breakPoints, media } from 'src/styles/variables';

import { PodcastItemTile } from '../components/PodcastItemTile';
import { carouselItemsAmount } from '../models/listenData';
import * as S from './styles';

const spinAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const arrowOrSpinner = (isFetching: boolean) =>
    isFetching
        ? {
              width: '20px',
              heigth: '20px',
              right: 0,
              border: '3px solid transparent',
              borderTop: '3px solid gray',
              borderRadius: '50%',
              animation: `${spinAnimation} 0.6s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite`,
              cursor: 'default',
              [media.md]: {
                  right: '-1.5rem',
              },
          }
        : {
              backgroundImage: `url('${sliderArrowRight}')`,
              right: 0,
              [media.md]: {
                  right: '-1.5rem',
              },
          };

const showLeftArrow = (currentIndex: number) => currentIndex !== 0;
const showRightArrow = (currentIndex: number, carouselItems: number, itemsLength: number, isFetching: boolean) =>
    currentIndex + carouselItems === itemsLength && isFetching === false;

interface CarouselWrapperProps {
    isFetching: boolean;
    currentIndex: number;
    itemsLength: number;
    carouselItems: number;
}

const CarouselWrapper = styled.div<CarouselWrapperProps>(
    ({ isFetching, currentIndex, itemsLength, carouselItems }: CarouselWrapperProps) => ({
        position: 'relative',
        margin: '0 -0.5rem 2rem',
        '.ant-carousel': {
            '.slick-slider > button': {
                marginTop: '-2rem',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                top: -7,
                [media.md]: {
                    top: '8rem',
                },
                '&.slick-prev': showLeftArrow(currentIndex) && {
                    backgroundImage: `url('${sliderArrowLeft}')`,
                    left: 0,
                    [media.md]: {
                        left: '-1.5rem',
                    },
                },
                '&.slick-next': showRightArrow(currentIndex, carouselItems, itemsLength, isFetching)
                    ? { display: 'none' }
                    : arrowOrSpinner(isFetching),
            },
        },
    }),
);

const ItemsWrapper = styled.div({
    display: 'flex',
    flexFlow: 'wrap',
    margin: '0 -0.5rem 2rem',
});

interface Props {
    sectionTitle: string;
    items: PodcastItem[];
    history: H.History;
    onLoadMore?: (path: string, type: string, from: number) => void;
    isCarousel?: boolean;
    areItemsShows?: boolean;
    togglePlay: (showId: number, episodeId: string | number, force: boolean, currentPodcast: Episode) => void;
}

interface State {
    carouselIndex: number;
    responsiveCarouselItemsAmount: number;
    isFetching: boolean;
}

export class PodcastItems extends React.PureComponent<Props, State> {
    public carousel: any;

    public state: State = {
        carouselIndex: 0,
        responsiveCarouselItemsAmount: carouselItemsAmount.lg,
        isFetching: false,
    };

    public componentDidMount(): void {
        window.addEventListener('resize', this.updateCarouselItemsAmount);
        this.updateCarouselItemsAmount();
    }

    public componentDidUpdate(prevProps: Props) {
        if (prevProps.items && prevProps.items.length !== this.props.items.length && this.state.isFetching) {
            this.setState({ isFetching: false });
        }
    }

    private updateCarouselItemsAmount = () => {
        if (window.innerWidth > breakPoints.lg) {
            this.setState({
                responsiveCarouselItemsAmount: carouselItemsAmount.lg,
            });
        } else if (window.innerWidth > breakPoints.md) {
            this.setState({
                responsiveCarouselItemsAmount: carouselItemsAmount.md,
            });
        } else {
            this.setState({
                responsiveCarouselItemsAmount: carouselItemsAmount.sm,
            });
        }
    };

    public moveCarouselBackwards = () => this.carousel.slick.slickPrev();

    public moveCarouselForward = () => this.carousel.slick.slickNext();

    public afterCarouselChange = (carouselIndex: number) => {
        this.setState({ carouselIndex });

        if (
            this.props.onLoadMore &&
            carouselIndex >= this.props.items.length - this.state.responsiveCarouselItemsAmount
        ) {
            this.props.onLoadMore('podcast/search/latest', 'latest', this.props.items.length);
            this.setState({ isFetching: true });
        }
    };

    public goToShow = (item: Episode) => () => this.props.history.push(item.show ? item.showUrl : item.url);

    public playEpisode = (item: Episode) => () => this.props.togglePlay(item.show, item.guid, false, item);

    private displayItems = (items: PodcastItem[], onSlider?: boolean) =>
        items.map(
            item =>
                !item.showPlaceholder && (
                    <PodcastItemTile
                        key={item.title}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        showId={this.props.areItemsShows ? (item as Show).id : (item as Episode).show}
                        onPlay={this.playEpisode(item as Episode)}
                        isShow={this.props.areItemsShows}
                        fullWidth={onSlider}
                    />
                ),
        );

    public render(): JSX.Element | null {
        const { sectionTitle, items, isCarousel } = this.props;
        const { isFetching, carouselIndex, responsiveCarouselItemsAmount } = this.state;

        if (!items) {
            return <CenteredSpinner />;
        }

        return !isEmpty(items) ? (
            <>
                <S.Header forCarousel={isCarousel}>{sectionTitle}</S.Header>
                {isCarousel ? (
                    <CarouselWrapper
                        isFetching={isFetching}
                        currentIndex={carouselIndex}
                        itemsLength={items.length}
                        carouselItems={responsiveCarouselItemsAmount}
                    >
                        <Carousel
                            ref={ref => (this.carousel = ref)}
                            afterChange={this.afterCarouselChange}
                            slidesToShow={responsiveCarouselItemsAmount}
                            slidesToScroll={responsiveCarouselItemsAmount}
                            infinite={false}
                            dots={false}
                            arrows={true}
                        >
                            {this.displayItems(items, true)}
                        </Carousel>
                    </CarouselWrapper>
                ) : (
                    <ItemsWrapper>{this.displayItems(items)}</ItemsWrapper>
                )}
            </>
        ) : null;
    }

    public componentWillUnmount(): void {
        window.removeEventListener('resize', this.updateCarouselItemsAmount);
    }
}
