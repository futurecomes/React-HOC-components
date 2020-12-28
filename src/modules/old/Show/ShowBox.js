import React from 'react'
import Linkify from 'react-linkify'

import styles from 'src/shared/components/old/Podcast/styles'
import Link from 'src/shared/components/old/interactive/Link'
import itunesSrc from 'src/shared/components/old/Podcast/static/svg/itunes.svg'
import spotifySvg from 'src/shared/components/old/Podcast/static/svg/spotify.svg'
import googleSvg from 'src/shared/components/old/Podcast/static/svg/google.svg'
import { css } from 'src/styles/old'
import { setPageThumbnail } from 'src/shared/helpers/setPageThumbnail'
import { setPageTitle } from 'src/shared/helpers/setPageTitle'

import * as S from './styled'

const fixUrl = url => {
    if (!/^http/i.test(url)) {
        return `http://${url}`
    }

    return url
}


export class ShowBox extends React.Component {
    componentDidMount() {
        setPageThumbnail(this.props.show.imageUrl)
        setPageTitle(this.props.show.title)
    }

    buildUserUrl = () => {
        const { userUrl, creatorName } = this.props.show

        return userUrl ? (
            <Link to={`/profile/${userUrl}`} author>
                {creatorName}
            </Link>
        ) : (
            creatorName
        )
    }

    render() {
        const { show, preview } = this.props
        return (
            <div className={css(styles.showWrapper)}>
                <div className={css(styles.showInfo, styles.noLeft)}>
                    <div className={css(styles.imageWrapper)}>
                        <img className={css(styles.showImg)} src={show.imageUrl} alt="User Profile"/>
                    </div>

                    <div className={css(styles.infoWrapper)}>
                        <S.TitleWrapper>
                            <S.ShowTitle>{show.title}</S.ShowTitle>
                        </S.TitleWrapper>
                        {!preview && (
                            <React.Fragment>
                            <span className={css(styles.grayTitle, styles.big, styles.author)}>
                                By {this.buildUserUrl()}
                            </span>
                                {(show.isTrending || show.wasTrending) && (
                                    <S.Badge>
                                        {show.isTrending
                                            ? 'Currently Top & Trending'
                                            : show.wasTrending
                                                ? 'Previously Top & Trending'
                                                : ''}
                                    </S.Badge>
                                )}
                                <div className={css(styles.actionsWrapper)}>
                                    {(show.itunesUrl || show.spotifyUrl || show.googleUrl) && <p className={css(styles.listenOn)}> Listen on: </p>}
                                    <S.ThirdPartyServices>
                                        {show.itunesUrl && (
                                            <S.LinkActionButton target="blank" href={fixUrl(show.itunesUrl)}>
                                                <img
                                                    src={itunesSrc}
                                                    alt="Apple Podcasts"
                                                    className={css(styles.actionIcon)}
                                                />
                                            </S.LinkActionButton>
                                        )}
                                        {show.spotifyUrl && (
                                            <S.LinkActionButton target="blank" href={fixUrl(show.spotifyUrl)}>
                                                <img
                                                    src={spotifySvg}
                                                    alt="Spotify Podcasts"
                                                    className={css(styles.actionIcon)}
                                                />
                                            </S.LinkActionButton>
                                        )}
                                        {show.googleUrl && (
                                            <S.LinkActionButton target="blank" href={fixUrl(show.googleUrl)}>
                                                <img
                                                    src={googleSvg}
                                                    alt="Google Podcasts"
                                                    className={css(styles.actionIcon)}
                                                />
                                            </S.LinkActionButton>
                                        )}
                                    </S.ThirdPartyServices>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
                <Linkify properties={{target: '_blank'}}>
                    <S.ShowDescription>
                        {show.description}
                    </S.ShowDescription>
                </Linkify>
            </div>
        )
    }
}
