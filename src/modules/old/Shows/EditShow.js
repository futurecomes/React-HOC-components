import React from 'react';

import FormMessages from 'src/shared/components/old/form/Messages';
import Button from 'src/shared/components/old/interactive/Button';
import Input from 'src/shared/components/old/form/Input';
import TextArea from 'src/shared/components/old/form/TextArea';
import Dropdown from 'src/shared/components/old/form/Dropdown';
import Loading from 'src/shared/components/old/activity/EllipsesIndicator';
import closeSrc from 'src/shared/components/old/shared/static/svg/close.svg';
import { css } from 'src/styles/old';
import { ShowImagePicker } from './ShowImagePicker';
import styles from './styles';
import { mapHtmlToString } from 'src/shared/helpers/mapHtmlToString';

function inputFormatter(value) {
    let prefix = 'messy.fm/';
    if (!value) return value;
    if (value === prefix) return '';
    if (!value.startsWith(prefix)) return `${prefix}${value}`;
    return value;
}

export class EditShow extends React.Component {
    handleSubmit = e => {
        e.description = mapHtmlToString(e.description);
        this.props.editShow(e);
    };

    render() {
        const { categories, isFetching, show, close, goTo, handleSubmit } = this.props;
        return (
            <React.Fragment>
                <div className={css(styles.modalPadding)}>
                    <div className={css(styles.spaceBetween, styles.row)}>
                        <h2 className={css(styles.title)}>Edit Show</h2>
                        <button onClick={() => close('edit')} className={css(styles.iconButton)}>
                            <img src={closeSrc} alt="close" />
                        </button>
                    </div>
                    <p className={css(styles.p)}>
                        {`
                            The first step in starting a podcast is creating the show, from there
                            you'll be able to record episodes and publish it to all your friends (and the world)!
                        `}
                    </p>
                </div>
                <form onSubmit={handleSubmit(this.handleSubmit)} className={css(styles.form)}>
                    <Input name="title" label="Title" />
                    <TextArea name="description" label="Description" />
                    <Dropdown
                        name="category1"
                        label="Categories"
                        tag="Select up to three"
                        placeholder="Select Category"
                        values={categories}
                    />
                    <Dropdown name="category2" placeholder="Select Category" values={categories} />
                    <Dropdown name="category3" placeholder="Select Category" values={categories} />
                    <ShowImagePicker
                        onClick={() => goTo('createArt')}
                        imageUrl={show.imageUrl}
                        showValidationInfo
                        showValidationInfoBelow
                    />
                    <Input
                        label="Custom Show URL"
                        name="customUrl"
                        placeholder="messy.fm/"
                        format={inputFormatter}
                        normalize={value => value.replace(/^messy.fm\//, '').toLowerCase()}
                    />
                    <Button type="blue" isSubmit isDisabled={isFetching} style={styles.submit}>
                        {isFetching ? (
                            <span>
                                Updating
                                <Loading />
                            </span>
                        ) : (
                            'Save'
                        )}
                    </Button>
                    <FormMessages />
                </form>
            </React.Fragment>
        );
    }
}
