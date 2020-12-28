import React from 'react'

import FormMessages from 'src/shared/components/old/form/Messages'
import Input from 'src/shared/components/old/form/Input'
import TextArea from 'src/shared/components/old/form/TextArea'
import Dropdown from 'src/shared/components/old/form/Dropdown'
import Loading from 'src/shared/components/old/activity/EllipsesIndicator'
import Button from 'src/shared/components/old/interactive/Button'
import closeSrc from 'src/shared/components/old/shared/static/svg/close.svg'
import { css } from 'src/styles/old'

import { ShowImagePicker } from './ShowImagePicker'
import styles from './styles'

function inputFormatter(value) {
    const prefix = 'messy.fm/'
    if (!value) return ''
    if (value === prefix) return ''
    if (!value.startsWith(prefix)) return `${prefix}${value}`
    return value
}

export function CreateShowModal(props) {
    return (
        <React.Fragment>
            <div className={css(styles.modalPadding)}>
                <div className={css(styles.spaceBetween, styles.row)}>
                    <h2 className={css(styles.title)}>Create Show</h2>
                    <button
                        onClick={() => props.close({ type: 'create' })}
                        className={css(styles.iconButton)}
                    >
                        <img src={closeSrc} alt="Close Mic Check" />
                    </button>
                </div>
                <p className={css(styles.p)}>{`
            The first step in starting a podcast is creating the show, from there
            you'll be able to record episodes and publish it to all your friends (and the world)!
          `}</p>
            </div>

            <form onSubmit={props.handleSubmit} className={css(styles.form)}>
                <Input name="title" label="Title" />
                <TextArea name="description" label="Show Description" />
                <Dropdown
                    name="category1"
                    label="Categories"
                    tag="Select up to three"
                    placeholder="Select Category"
                    values={props.categories}
                />
                <Dropdown name="category2" placeholder="Select Category" values={props.categories} />
                <Dropdown name="category3" placeholder="Select Category" values={props.categories} />
                <ShowImagePicker
                    onClick={() => props.goTo('createArt')}
                    isOptional
                    optionalText="you can add this in later"
                    showValidationInfo
                />
                <Input
                    label="Custom Show URL"
                    name="customUrl"
                    isOptional={false}
                    placeholder="messy.fm/"
                    format={inputFormatter}
                    normalize={value => value.replace(/^messy.fm\//, '')}
                />

                <Button type="blue" isSubmit isDisabled={props.isFetching} style={styles.submit}>
                    {props.isFetching ? (
                        <span>
                            Creating
                            <Loading />
                        </span>
                    ) : (
                        'Create'
                    )}
                </Button>
                <FormMessages />
            </form>
        </React.Fragment>
    )
}
