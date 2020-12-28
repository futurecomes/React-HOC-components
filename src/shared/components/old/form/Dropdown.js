/* eslint-disable no-restricted-globals */

import React, { Component } from 'react';

import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

import arrowDown from '../static/svg/down-arrow.svg';

import { css } from 'src/styles/old';
import styles from './styles';

import FieldHOC from './Field';

class DropdownComp extends Component {
    state = {
        hasBeenSelected: false,
        isOpen: false,
    };

    componentWillReceiveProps({ values, input: { value, onChange } }) {
        const newItem = this.findItem(values, value);
        const item = this.findItem();

        if (!newItem && item) {
            onChange('');
        }
    }

    handleItemClick = (e, item) => {
        e.stopPropagation();
        const {
            input: { onChange },
        } = this.props;

        if (this.props.hasFolder) this.props.hasFolder(true);
        onChange(item.value);

        this.dropdown.hide();
    };

    handleClear = e => {
        e.stopPropagation();
        e.preventDefault();
        const {
            input: { onChange },
        } = this.props;

        if (this.props.hasFolder) this.props.hasFolder(false);
        onChange(null);
        this.dropdown.hide();
    };

    findItem = (list, val) => {
        const values = list || this.props.values;
        const value = val || this.props.input.value;

        return values.find(v => v.value === value);
    };

    getTitle = () => {
        const { placeholder } = this.props;
        const item = this.findItem();

        if (!item) {
            return <span className={css(styles.placeholder)}>{placeholder}</span>;
        }

        return <span className={css(item.color && styles[`dropdown-${item.color}`])}>{item.text}</span>;
    };

    onShow = () => {
        this.setState({ isOpen: true });
    };

    onHide = () => {
        this.setState({ isOpen: false });
    };

    render() {
        const { isOpen } = this.state;
        const {
            label,
            input,
            meta: { touched, error },
            tag,
        } = this.props;

        return (
            <div className={css(styles.container)}>
                {label && (
                    <label className={css(styles.label)} htmlFor={name}>
                        {label}
                        {tag && <span className={css(styles.tag, styles.grayText)}>{` (${tag})`}</span>}
                    </label>
                )}
                <input
                    {...input}
                    type="hidden"
                    ref={ref => {
                        this.input = ref;
                    }}
                />
                <Dropdown
                    ref={ref => {
                        this.dropdown = ref;
                    }}
                    onShow={this.onShow}
                    onHide={this.onHide}
                    className={css(
                        styles.input,
                        styles.dropdown,
                        isOpen && styles.activeInput,
                        touched && error && styles.errorBorder,
                    )}
                >
                    <DropdownTrigger className={css(styles.dropdownTrigger)}>
                        <span>{this.getTitle()}</span>
                        <div>
                            <button className={css(styles.clearButton)} onClick={e => this.handleClear(e)}>
                                X
                            </button>
                            <img src={arrowDown} alt="Select" />
                        </div>
                    </DropdownTrigger>
                    <DropdownContent className={css(styles.dropdownContent)}>
                        {this.props.values.map((val, i) =>
                            val.isHidden ? null : (
                                <div
                                    className={`${css(styles.dropdownItem)} dropdown-item`}
                                    key={i.toString()}
                                    onClick={e => this.handleItemClick(e, val, i)}
                                >
                                    {val.text}
                                </div>
                            ),
                        )}
                    </DropdownContent>
                </Dropdown>
                {touched && error && <span className={css(styles.label, styles.error)}>{error}</span>}
            </div>
        );
    }
}

DropdownComp.defaultProps = {
    label: '',
    values: [],
    defaultTitle: 'Select',
    placeholder: '',
    tag: '',
};

export default FieldHOC(DropdownComp);
