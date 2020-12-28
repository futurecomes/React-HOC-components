import React from 'react';

import Input from 'src/shared/components/old/form/Input';
import TextArea from 'src/shared/components/old/form/TextArea';
import FormMessages from 'src/shared/components/old/form/Messages';
import Button from 'src/shared/components/old/interactive/Button';
import EllipsesIndicator from 'src/shared/components/old/activity/EllipsesIndicator';
import ImagePicker from 'src/shared/components/old/form/ImagePicker';
import { css } from 'src/styles/old';
import { validateName, validateImageFile } from 'src/shared/helpers/validate';

import AccountContainer from './containers/Personal';
import styles from './styles';

function inputFormatter(value, name) {
    let prefix = '';

    switch (name) {
        case 'twUrl':
        case 'igUrl':
            prefix = '@';
            break;
        case 'fbUrl':
            prefix = 'facebook.com/';
            break;
        case 'ytUrl':
            prefix = 'youtube.com/';
            break;
        case 'customUrl':
            prefix = 'messy.fm/profile/';
            break;
        default:
            prefix = '';
            break;
    }

    if (!value) return value;
    if (value === prefix) return '';
    if (!value.startsWith(prefix)) return `${prefix}${value}`;
    return value;
}

const PersonalContainer = ({ isFetching, user, handleSubmit, updateUser }) => (
    <div className={css(styles.formContainer)}>
        <h1 className={css(styles.title)}>Personal Info</h1>
        <FormMessages />
        <form onSubmit={handleSubmit(updateUser)} className={css(styles.form)}>
            <Input name="name" label="Name" maxLength={60} validate={validateName} />
            <Input name="email" label="Email Address" />

            <ImagePicker
                name="profileImage"
                label="Profile Picture"
                imageDimensionText="400x400 minimum"
                validate={validateImageFile(400, 400)}
                imageUrl={user.image}
                isOptional
            />
            <Input
                name="fbUrl"
                label="Facebook URL"
                placeholder="facebook.com/"
                maxLength={40}
                format={inputFormatter}
                normalize={value => value.replace(/^facebook.com\//, '')}
                isOptional
            />
            <Input
                name="twUrl"
                label="Twitter Name"
                maxLength={30}
                placeholder="@"
                format={inputFormatter}
                normalize={value => value.replace(/^@/, '')}
                isOptional
            />
            <Input
                name="igUrl"
                label="Instagram Name"
                placeholder="@"
                format={inputFormatter}
                maxLength={30}
                normalize={value => value.replace(/^@/, '')}
                isOptional
            />
            <Input
                name="ytUrl"
                label="YouTube"
                placeholder="youtube.com/"
                format={inputFormatter}
                normalize={value => value.replace(/^youtube.com\//, '')}
                isOptional
            />
            <TextArea
                name="bio"
                label="About Me"
                placeholder="Just a little something about yourself..."
                rows={5}
                isOptional
            />
            <Input
                name="customUrl"
                label="Custom Profile URL"
                placeholder="messy.fm/profile/"
                format={inputFormatter}
                maxLength={50}
                normalize={value => value.replace(/^messy.fm\/profile\//, '')}
                isOptional
            />

            <Button isSubmit type="blueUpdated" className={css(styles.updateButton)} isDisabled={isFetching}>
                {isFetching ? (
                    <span>
                        {'Updating'}
                        <EllipsesIndicator />
                    </span>
                ) : (
                    'Update info'
                )}
            </Button>
        </form>
    </div>
);

PersonalContainer.defaultProps = {
    user: {},
};

export const Personal = AccountContainer(PersonalContainer);
