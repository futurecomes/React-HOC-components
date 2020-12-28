import React, { Component } from 'react'
import uuidv1 from 'uuid/v1'
import Modal from 'react-modal'
import Dropzone from 'react-dropzone'

import { css, modalStyles } from 'src/styles/old'

import Button from 'src/shared/components/old/interactive/Button'
import Dropdown from 'src/shared/components/old/form/Dropdown'
import container from 'src/containers/editor/Upload'

import { ProgressBar, ProgressBarContainer, ButtonsContainer } from './styled'
import { File } from './File'
import styles from '../styles'

class Upload extends Component {
    state = {
        isFolder: false,
    }

    componentWillReceiveProps({ isFetchingFiles, folders, createFolder }) {
        if (!isFetchingFiles && !this.hasRun && !folders.length) {
            createFolder(null, 'Media uploads')
            this.hasRun = true
        }
    }

    handleUploadClick = () => {
        this.picker.open()
    }

    hasFolder = (value) => {
        this.setState({isFolder: value})
    }

    render() {
        const {
            isOpen,
            open,
            close,
            onSelectedFiles,
            files,
            removeFile,
            handleSubmit,
            folders,
            isUploading,
            uploadFileProgress,
        } = this.props

        return (
            <div>
                <Button type="blue" style={styles.smallButton} onClick={open}>
                    Upload
                </Button>
                <Modal isOpen={isOpen} style={modalStyles} contentLabel="miccheck">
                    <div className={css(styles.topRow)}>
                        <h2 className={css(styles.blueText, styles.modalTitle)}>Upload Files</h2>
                        <p className={css(styles.greyText)}>You can add an .mp3, .wav or.m4a audio file.</p>
                    </div>
                    <Dropzone
                        ref={ref => {
                            this.picker = ref
                        }}
                        className={css(styles.modalBody, files.length > 0 && styles.stretch)}
                        accept="audio/*"
                        onDrop={onSelectedFiles}
                        disableClick
                        disablePreview
                    >
                        {!isUploading &&
                        (files.length === 0 ? (
                            <div className={css(styles.buttonBlock)}>
                                <Button
                                    type="blue"
                                    className="upload"
                                    onClick={this.handleUploadClick}
                                    style={styles.submit}
                                >
                                    Select Files
                                </Button>
                                <Button className={css(styles.keepEditingButton)} type="white" onClick={close}
                                        alternate>
                                    Keep Editing
                                </Button>
                            </div>

                        ) : (
                            <div className={css(styles.column)}>
                                <div className={css(styles.fileList)}>
                                    {files.map(({name}, i) => (
                                        <File key={uuidv1()} removeFile={removeFile} name={name} i={i}/>
                                    ))}
                                </div>
                                <Button alternate style={styles.addMore} onClick={this.handleUploadClick}>
                                    + Add More
                                </Button>
                            </div>
                        ))}
                    </Dropzone>
                    {isUploading && (
                        <ProgressBarContainer>
                            <span>{Math.floor(uploadFileProgress * 99)}%</span>
                            <ProgressBar value={uploadFileProgress * 99} max="100" />
                        </ProgressBarContainer>
                    )}
                    {files.length > 0 && !isUploading && (
                        <form
                            onSubmit={handleSubmit}
                            className={css(styles.form)}
                            css={{ marginLeft: 5, marginRight: 5, display: 'flex' }}
                        >
                            {folders.length > 0 && (
                                <Dropdown
                                    name="folderId"
                                    label="Folder"
                                    placeholder="Select"
                                    values={folders}
                                    hasFolder={this.hasFolder}
                                />
                            )}
                            <ButtonsContainer>
                                <Button isSubmit isDisabled={!this.state.isFolder} type="purple" style={styles.submit}>
                                    Upload
                                </Button>
                                <Button type="red" onClick={close} style={styles.submit}>
                                    Close
                                </Button>
                            </ButtonsContainer>
                        </form>
                    )}
                </Modal>
            </div>
        )
    }
}

export default container(Upload)
