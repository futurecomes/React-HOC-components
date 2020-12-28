import React, { Component } from 'react'
import moment from 'moment'

import FormMessages from 'src/shared/components/old/form/Messages'
import Input from 'src/shared/components/old/form/Input'
import Readonly from 'src/shared/components/old/form/Readonly'
import TextArea from 'src/shared/components/old/form/TextArea'
import ImagePicker from 'src/shared/components/old/form/ImagePicker'
import Dropdown from 'src/shared/components/old/form/Dropdown'
import Button from 'src/shared/components/old/interactive/Button'
import EllipsesIndicator from 'src/shared/components/old/activity/EllipsesIndicator'
import Modal from 'src/shared/components/old/common/Modal'
import UserDetailsContainer from 'src/containers/Admin/User/Details'
import { OrdersHistory } from 'src/modules/old/Orders/OrdersHistory'
import { css } from 'src/styles/old'
import { normalizeTwitter, normalizeInstagram, normalizeFacebook } from 'src/shared/helpers/normalizeInput'
import { formatTwitter, formatInstagram, formatFacebook } from 'src/shared/helpers/formatInput'
import { validateName, validateImageFile } from 'src/shared/helpers/validate'

import styles from '../styles'

class UserDetails extends Component {
    state = {
        isArchiveModalOpen: false,
        isUnarchiveModalOpen: false,
        isDeleteModalOpen: false,
    }

    componentDidMount() {
        this.props.fetchUserPaymentHistory()
    }

    handleModalClose = () => {
        this.setState({
            isArchiveModalOpen: false,
            isUnarchiveModalOpen: false,
            isDeleteModalOpen: false,
        })
    }

    handleArchiveUserClick = () => {
        this.setState({
            isArchiveModalOpen: true,
        })
    }

    handleUnarchiveUserClick = () => {
        this.setState({
            isUnarchiveModalOpen: true,
        })
    }

    handleDeleteUserClick = () => {
        this.setState({
            isDeleteModalOpen: true,
        })
    }

    render() {
        const {
            isFetching,
            user,
            handleSubmit,
            updateUser,
            archiveUser,
            unarchiveUser,
            deleteUser,
        } = this.props

        const UserStatusStyle =
            user.status && user.status.toLowerCase() === 'active'
                ? styles.activeStatus
                : styles.archivedStatus

        const lastActive = user.lastActive || user.updatedAt
        return (
            <form onSubmit={handleSubmit(updateUser)} className={css(styles.form)}>
                <div className={css(styles.detailCard)}>
                    <div className={css(styles.detailHeader)}>
                        <h1 className={css(styles.detailTitle)}>User Details</h1>
                        <span className={css(styles.detailTitle, styles.detailHeaderRight)}>
                            User Status:
                            <span className={css(UserStatusStyle)}>
                                {user.status && user.status[0].toUpperCase() + user.status.slice(1)}
                            </span>
                        </span>
                    </div>

                    <FormMessages />

                    <div className={css(styles.inputContainer)}>
                        <div className={css(styles.inputColumn)}>
                            <Input name="id" label="User ID" isDisabled />
                            <Input name="email" label="Email Address" />
                            <Input name="name" label="Name" validate={validateName} />
                            <Input
                                name="fbUrl"
                                label="Facebook URL"
                                placeholder="facebook.com/"
                                format={formatFacebook}
                                normalize={normalizeFacebook}
                                isOptional
                            />
                            <Input
                                name="twUrl"
                                label="Twitter Name"
                                placeholder="@"
                                format={formatTwitter}
                                normalize={normalizeTwitter}
                                isOptional
                            />
                            <Input
                                name="igUrl"
                                label="Instagram Name"
                                placeholder="@"
                                format={formatInstagram}
                                normalize={normalizeInstagram}
                                isOptional
                            />
                            <TextArea
                                name="bio"
                                label="About Me"
                                placeholder="Just a little something about yourself..."
                                rows={4}
                                isOptional
                            />
                            <Input name="planType" label="Plan Type" isOptional isDisabled />
                            <Dropdown
                                name="musicLibraryTotalAccess"
                                label="Messy Music Library Access"
                                values={[{ value: true, text: 'Yes' }, { value: false, text: 'No' }]}
                            />
                            <Readonly
                                label="Last Active"
                                value={lastActive ? moment(lastActive).format('LL LT') : 'N/A'}
                            />
                            <Readonly
                                label="Join Date"
                                value={user.createdAt ? moment(user.createdAt).format('LL LT') : 'N/A'}
                            />
                        </div>
                        <div className={css(styles.inputColumn)}>
                            <ImagePicker
                                name="profileImage"
                                label="Profile Picture"
                                imageDimensionText="400x400 minimum"
                                validate={validateImageFile(400, 400)}
                                isOptional
                            />
                        </div>
                    </div>
                </div>

                <div className={css(styles.formButtonContainer)}>
                    <Modal
                        isOpen={this.state.isDeleteModalOpen}
                        text="Delete User?"
                        confirmText="Confirm Delete"
                        type="red"
                        onClose={this.handleModalClose}
                        onConfirm={() => {
                            deleteUser()
                            this.handleModalClose()
                        }}
                        onCancel={this.handleModalClose}
                    />
                    <Modal
                        isOpen={this.state.isArchiveModalOpen}
                        text="Archive User?"
                        confirmText="Confirm Archive"
                        type="orange"
                        onClose={this.handleModalClose}
                        onConfirm={() => {
                            archiveUser()
                            this.handleModalClose()
                        }}
                        onCancel={this.handleModalClose}
                    />
                    <Modal
                        isOpen={this.state.isUnarchiveModalOpen}
                        text="Unarchive User?"
                        confirmText="Confirm Unarchive"
                        type="green"
                        onClose={this.handleModalClose}
                        onConfirm={() => {
                            unarchiveUser()
                            this.handleModalClose()
                        }}
                        onCancel={this.handleModalClose}
                    />

                    <Button
                        type="red"
                        style={styles.formButton}
                        isDisabled={isFetching}
                        onClick={this.handleDeleteUserClick}
                    >
                        Delete User
                    </Button>

                    {(user.status && user.status.toLowerCase() === 'active') || !user.status ? (
                        <Button
                            type="orange"
                            style={styles.formButton}
                            isDisabled={isFetching}
                            onClick={this.handleArchiveUserClick}
                        >
                            Archive User
                        </Button>
                    ) : (
                        <Button
                            type="green"
                            style={styles.formButton}
                            isDisabled={isFetching}
                            onClick={this.handleUnarchiveUserClick}
                        >
                            Unarchive User
                        </Button>
                    )}

                    <Button isSubmit type="blue" style={styles.formButton} isDisabled={isFetching}>
                        {isFetching ? (
                            <span>
                                {'Saving'}
                                <EllipsesIndicator />
                            </span>
                        ) : (
                            'Save'
                        )}
                    </Button>
                </div>
                <div css={{ width: 600, margin: '0 auto' }}>
                    {this.props.user.payments && <OrdersHistory {...this.props.user.payments} />}
                </div>
            </form>
        )
    }
}

export default UserDetailsContainer(UserDetails)
