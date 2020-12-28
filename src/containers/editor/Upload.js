import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { reduxForm } from 'redux-form';

import { formatDate } from 'src/shared/helpers/time';

import { toggleUploadModal, selectedFiles, removeUploadFile, submitUploadFiles } from 'src/actions/old/editor';
import { openSession } from 'src/actions/old/recording';

function mapStateToProps({
    editorMeta: { isUploadOpen, uploadFiles, isUploading, uploadFileProgress },
    recording: { sessions, isFetching },
}) {
    return {
        isOpen: isUploadOpen,
        isUploading,
        isFetchingFiles: isFetching,
        files: uploadFiles,
        folders: sessions.map(({ name, createdAt }, idx) => ({
            text: `${name || 'Untitled Session'} - ${formatDate(createdAt)}`,
            value: idx,
        })),
        uploadFileProgress,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            toggle: toggleUploadModal,
            createFolder: openSession,
            open: toggleUploadModal.bind(null, true),
            close: toggleUploadModal.bind(null, false),
            onSelectedFiles: selectedFiles,
            removeFile: removeUploadFile,
        },
        dispatch,
    );
}

const container = connect(
    mapStateToProps,
    mapDispatchToProps,
);

function onSubmit({ folderId }, dispatch) {
    dispatch(submitUploadFiles(folderId));
}

function validate({ folderId }) {
    const errors = {};

    if (typeof folderId === 'undefined') {
        errors.folderId = 'Required';
    }

    return errors;
}

const form = reduxForm({
    form: 'uploadFiles',
    onSubmit,
    validate,
});

export default compose(
    container,
    form,
);
