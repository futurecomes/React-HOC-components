import { connect } from 'react-redux'
import { ActionCreators } from 'redux-undo'

import * as actions from 'src/actions/old/editor'
import { editorRevertDraft } from 'src/modules/old/Editor/actions'

function mapStateToProps({
    editorMeta: { episodeName, showIdx, playerStatus, isTrimMode, isUploading, drafts, id },
    editor: {
        present: { latestSnippetTime },
        present,
    },
    shows: { list },
    ads,
}) {
    return {
        name: episodeName,
        showIdx,
        shows: list,
        playerStatus,
        isTrimMode,
        isUploading,
        isTooLong: latestSnippetTime > 14400,
        drafts,
        draftId: id,
        audioAds: ads.audioAds,
        currentTimelineTime: present.currentTimelineTime,
        isOnlyAd: present.layerRecordings.length === 1 && present.layerRecordings.find(e => e.isAd),
    }
}

export default connect(
    mapStateToProps,
    {
        onNameChange: actions.setEpisodeName,
        onShowChange: actions.selectShow,
        editorSetPlay: actions.editorSetPlay,
        editorSetPause: actions.editorSetPause,
        editorSetStop: actions.editorSetStop,
        editorPublish: actions.editorPublish,
        editorSetTrimMode: actions.editorSetTrimMode,
        undo: ActionCreators.undo,
        redo: ActionCreators.redo,
        editorRevertDraft,
    },
)
