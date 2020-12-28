import React, { Component } from 'react'
import { connect } from 'react-redux'

import { editorSaveDraft, toggleDraftModal, selectShow } from 'src/actions/old/editor'
import { editorUpdateDraft } from 'src/modules/old/Editor/actions'

function mapStateToProps({
    shows: { list },
    editor: {
        present: { canPublish },
    },
    editorMeta: { showIdx, isSaveDraftOpen, isUploading, id, drafts },
}) {
    return {
        canPublish,
        shows: list,
        showIdx,
        isSaveDraftOpen,
        isUploading,
        draftId: id,
        isDraftSaved: drafts.saved,
        isSavingDraft: drafts.isSaving,
    }
}

function createContainer(ComposedComponent) {
    class Container extends Component {
        // eslint-disable-line react/prefer-stateless-function

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return connect(
        mapStateToProps,
        {
            editorSaveDraft,
            selectShow,
            toggleDraftModal,
            editorUpdateDraft,
        },
    )(Container)
}

export default createContainer
