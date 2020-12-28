import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import { toggleMicCheck, setInputDevice, receivedInputDevices } from 'src/actions/old/recording';

function mapStateToProps({ recording: { isMicCheck, devices, inputDeviceId } }) {
    return {
        isOpen: isMicCheck,
        devices: devices.map(({ label, isNoInput }, idx) => ({
            text: label,
            value: idx,
            color: isNoInput ? 'red' : null,
        })),
        isPermissionDenied: devices.reduce((accumulator, device) => {
            if (device.label === 'Permission Denied' || accumulator === true) {
                return true;
            }
            return false;
        }, false),
        initialValues: {
            deviceId: devices.findIndex(({ deviceId }) => deviceId === inputDeviceId),
        },
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            close: () => toggleMicCheck(false),
            setInputDevice,
            receivedInputDevices,
        },
        dispatch,
    );
}

function onSubmit({ deviceId }, dispatch) {
    dispatch(toggleMicCheck(false));
    dispatch(setInputDevice(deviceId));
}

const FormContainer = reduxForm({
    form: 'miccheck',
    onSubmit,
});

function createContainer(ComposedComponent) {
    class Container extends Component {
        constructor(...args) {
            super(...args);

            this.state = {
                hasBeenOpened: false,
            };
        }

        componentDidMount() {
            this.fetchDevices();
        }

        componentWillReceiveProps({ isOpen }) {
            if (isOpen && !this.props.isOpen && this.state.hasBeenOpened) {
                this.fetchDevices();
            } else if (isOpen && !this.props.isOpen && !this.state.hasBeenOpened) {
                this.setState({ hasBeenOpened: true });
            }
        }

        fetchDevices() {
            if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
                navigator.mediaDevices
                    .enumerateDevices()
                    .then(devices =>
                        this.props.receivedInputDevices(devices.filter(({ kind }) => kind === 'audioinput')),
                    );
            }
        }

        render() {
            return <ComposedComponent {...this.props} onOpen={this.handleOpen} />;
        }
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(FormContainer(Container));
}

export default createContainer;
