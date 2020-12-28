import * as React from 'react';
import Modal from 'react-modal';

import Loading from 'src/shared/components/old/activity/EllipsesIndicator';
import Input from 'src/shared/components/old/form/Input';
import FormMessages from 'src/shared/components/old/form/Messages';
import Button from 'src/shared/components/old/interactive/Button';
import closeSrc from 'src/shared/components/old/shared/static/svg/close.svg';
import { css, modalStyles } from 'src/styles/old';
import styles from './styles';

export const AddShowModal = ({ isOpen, close, handleSubmit, isFetching, importShow }) => (
    <Modal isOpen={isOpen} onRequestClose={close} style={modalStyles} contentLabel="add-show">
        <div className={css(styles.modalPadding)}>
            <div className={css(styles.spaceBetween, styles.row)}>
                <h2 className={css(styles.title)}>Add Show</h2>
                <button onClick={close} className={css(styles.iconButton)}>
                    <img src={closeSrc} alt="Close Mic Check" />
                </button>
            </div>
            <p className={css(styles.p)}>{`
          If you want to keep hosting somewhere else but want to add it to the Messy network you can do that here!
        `}</p>
        </div>
        <form onSubmit={handleSubmit(importShow)} className={css(styles.form)}>
            <Input name="source_url" label="RSS Feed" />
            <div className={css(styles.urlField)}>
                <div>
                    <div className={css(styles.label)}>Custom Podcast Url</div>
                    <div className={css(styles.urlLabel)}>messy.fm/</div>
                </div>
                <Input label="" name="custom_url" isOptional={false} />
            </div>
            <Button type="blue" isSubmit isDisabled={isFetching} style={styles.submit}>
                {isFetching ? (
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
    </Modal>
);
