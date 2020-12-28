import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import Link from 'src/shared/components/old/interactive/Link'
import DashboardContainer from 'src/containers/Admin/Dashboard'
import { css } from 'src/styles/old'

import styles from '../styles'
import { columns } from './helpers'

const renderGroup = (title, link, analytics) =>
    analytics ? (
        <div className={css(styles.card)} key={title}>
            <div className={css(styles.statsContainer)}>
                <h3 className={css(styles.cardTitle)}>{title}</h3>

                {analytics.map(stat => (
                    <div key={stat.name}>
                        <span className={css(styles.stat)}>
                            <span className={css(styles.statName)}>{stat.name}</span>
                            <span className={css(styles.statValue)}>{stat.value}</span>
                        </span>

                        {stat.substats &&
                            stat.substats.map(substat => (
                                <span className={css(styles.stat, styles.substat)} key={substat.name}>
                                    <span className={css(styles.statName)}>{substat.name}</span>
                                    <span className={css(styles.statValue)}>{substat.value}</span>
                                </span>
                            ))}
                    </div>
                ))}
            </div>

            {link && (
                <Link style={styles.statsLink} to={link.href}>
                    {link.text}
                </Link>
            )}
        </div>
    ) : null

const Dashboard = ({ analytics: { data }, analytics }) => (
    <div className={css(styles.container, styles.containerDashboard)}>
        {data && data.map(analytic => renderGroup(analytic.title, analytic.footer, analytic.analytics))}

        {!!analytics.audioAd.totalAds &&
            renderGroup(
                'Audio Advertisements',
                {
                    text: 'Manage Audio Ads',
                    href: '/admin/ads/audio',
                },
                [
                    {
                        name: 'Active Ads',
                        value: analytics.audioAd.totalAds,
                        substats: analytics.audioAd.ads
                            .map(ad => ({
                                name: ad.name,
                                value: ad.frequency,
                            }))
                            .concat({
                                name: `Others (${
                                    parseInt(analytics.audioAd.remainingAds, 10) > 0
                                        ? analytics.audioAd.remainingAds
                                        : 0
                                })`,
                                value: '',
                            }),
                    },
                ],
            )}

        {!!analytics.visualAd.totalAds &&
            renderGroup(
                'Visual Advertisements',
                {
                    text: 'Manage Visual Ads',
                    href: '/admin/ads/visual',
                },
                [
                    {
                        name: 'Active Ads',
                        value: analytics.visualAd.totalAds,
                        substats: analytics.visualAd.ads
                            .map(ad => ({
                                name: ad.name,
                                value: ad.frequency,
                            }))
                            .concat({
                                name: `Others (${
                                    parseInt(analytics.visualAd.remainingAds, 10) > 0
                                        ? analytics.visualAd.remainingAds
                                        : 0
                                })`,
                                value: '',
                            }),
                    },
                ],
            )}

        {analytics.growth.users.length > 0 && (
            <ReactTable
                data={analytics.growth.users}
                columns={columns}
                defaultPageSize={5}
                showPageSizeOptions={false}
                defaultSortDesc
            />
        )}
    </div>
)

export default DashboardContainer(Dashboard)
