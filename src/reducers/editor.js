import * as actions from 'src/actions/old/editor';
import { timerInterval } from 'src/middlewares/editor/handlers';
import { DRAFT_REHYDRATE } from 'src/modules/old/Drafts/actions/actions';
import {
    EDITOR_REVERT_DRAFT,
    CLEAR_EPISODE_EDITION,
    ENABLE_TRIM,
    SHOW_DROP_WARNING,
} from 'src/modules/old/Editor/actions';
import { calculateEpisodeDuration } from 'src/modules/old/Editor/helpers';

import createReducer from './createReducer';

const timePerSection = {
    1: 120,
    2: 90,
    3: 60,
    4: 45,
    5: 40,
    6: 30,
    7: 20,
    8: 15,
    9: 10,
    10: 5,
};

const initialState = {
    currentTimelineTime: 0,
    pixelsPerSecond: 1,
    canPublish: true,
    secondsPerSection: 120,
    totalTimeSeconds: 2000, // total length of the timeline in seconds
    latestSnippetTime: 0,
    layers: [
        {
            audioVolume: 1,
            frontendId: 1,
        },
    ],
    layerRecordings: [],
    draftItems: [],
    isDropWarningVisible: false,
};

const handlers = {
    [SHOW_DROP_WARNING]: (state, action) => ({
        ...state,
        isDropWarningVisible: action.payload,
    }),
    [ENABLE_TRIM]: (state, action) => ({
        ...state,
        layerRecordings: state.layerRecordings.map(layer => {
            if (layer.frontendId !== action.payload.id) {
                return layer;
            }

            const width = state.pixelsPerSecond * layer.playDuration;
            const left = action.payload.position - 20;
            const right = action.payload.position + 20;

            return {
                ...layer,
                trim: {
                    ...layer.trim,
                    isTrimming: true,
                    arrowLeft: left < 0 ? 0 : left,
                    arrowRight: right > width ? width : right,
                },
            };
        }),
    }),
    [CLEAR_EPISODE_EDITION]: () => initialState,
    [actions.EDITOR_ADD_LAYER]: (state, payload) => {
        const newLayer = {
            name: `Layer ${payload.layerId}`,
            audioVolume: 1,
            frontendId: payload.layerId,
        };

        const layers = [newLayer, ...state.layers];
        return {
            ...state,
            layers,
        };
    },
    [actions.EDITOR_ADD_RECORDING_SNIPPET]: (state, { recordingSnippet }) => {
        const isAlreadyAd = state.layerRecordings.find(e => e.isAd);
        if (recordingSnippet.isAd && isAlreadyAd) {
            return state;
        }
        const newSnippets = [recordingSnippet, ...state.layerRecordings];

        return {
            ...state,
            layerRecordings: newSnippets,
            latestSnippetTime: calculateEpisodeDuration(newSnippets) || state.latestSnippetTime,
        };
    },
    [actions.EDITOR_ADD_AD_RECORDING_SNIPPET]: (state, { recordingSnippet }) => {
        const isAlreadyAd = state.layerRecordings.find(e => e.isAd);
        if (recordingSnippet.isAd && isAlreadyAd) {
            return state;
        }
        const newSnippets = [recordingSnippet, ...state.layerRecordings];
        return {
            ...state,
            layerRecordings: newSnippets,
        };
    },
    [actions.EDITOR_SWITCH_RECORDING_SNIPPET]: (state, { snippetId, newLayerId }) => {
        const updatedSnippets = state.layerRecordings.map(snippet => {
            if (snippet.frontendId === snippetId) {
                return {
                    ...snippet,
                    layer: newLayerId,
                };
            }
            return snippet;
        });
        return {
            ...state,
            layerRecordings: updatedSnippets,
        };
    },
    [actions.EDITOR_MOVE_RECORDING_SNIPPET]: (state, { recordingSnippet, newOffsetSeconds }) => {
        const updatedSnippets = state.layerRecordings.map(snippet => {
            if (snippet.frontendId !== recordingSnippet.frontendId) {
                return snippet;
            }
            return {
                ...snippet,
                timelineOffset: newOffsetSeconds,
            };
        });
        return {
            ...state,
            layerRecordings: updatedSnippets,
        };
    },
    [actions.EDITOR_DELETE_RECORDING_SNIPPET]: (state, { recordingSnippet }) => {
        const updatedSnippets = state.layerRecordings.filter(
            snippet => snippet.frontendId !== recordingSnippet.frontendId,
        );
        return {
            ...state,
            canPublish: true,
            latestSnippetTime: calculateEpisodeDuration(updatedSnippets),
            layerRecordings: updatedSnippets,
        };
    },
    [actions.EDITOR_FADE_RECORDING_SNIPPET]: (state, { frontendId, isFadeOut, fadeDuration }) => {
        const key = isFadeOut ? 'fadeOut' : 'fadeIn';
        const updatedSnippets = state.layerRecordings.map(snippet => {
            if (snippet.frontendId === frontendId) {
                return {
                    ...snippet,
                    fadeDuration,
                    [key]: !snippet[key],
                };
            }

            return snippet;
        });
        return {
            ...state,
            layerRecordings: updatedSnippets,
        };
    },
    [actions.EDITOR_UPDATE_RECORDING_SNIPPET]: (state, { recordingSnippet }) => {
        const updatedSnippets = state.layerRecordings.map(snippet => {
            if (snippet.frontendId !== recordingSnippet.frontendId) {
                return snippet;
            }
            return recordingSnippet;
        });
        return {
            ...state,
            layerRecordings: updatedSnippets,
        };
    },
    [actions.EDITOR_INCREMENT_TIMELINE]: state => ({
        ...state,
        currentTimelineTime: state.currentTimelineTime + timerInterval,
    }),
    [actions.EDITOR_RESET]: () => ({
        ...initialState,
    }),
    [actions.EDITOR_SET_TIMELINE_TIME]: (state, action) => ({
        ...state,
        currentTimelineTime: action.newTime,
    }),
    [actions.EDITOR_SET_SNIPPET_DURATION]: (state, { snippet, newDuration }) => {
        const updatedSnippets = state.layerRecordings.map(recordingSnippet => {
            if (recordingSnippet.frontendId !== snippet.frontendId) {
                return recordingSnippet;
            }
            return {
                ...snippet,
                duration: newDuration,
                playDuration: Math.abs(newDuration / 1000 || snippet.playDuration),
            };
        });
        return {
            ...state,
            layerRecordings: updatedSnippets,
        };
    },
    [actions.EDITOR_RECOMPUTE_TIMELINE_LENGTH]: state => {
        const latestSnippetTime = state.layerRecordings.reduce((acc, val) => {
            const endTime = val.timelineOffset + val.playDuration;
            if (endTime > acc) {
                return endTime;
            }
            return acc;
        }, 0);

        const newTotalTime =
            latestSnippetTime + 120 > state.totalTimeSeconds ? latestSnippetTime + 140 : state.totalTimeSeconds;

        return {
            ...state,
            canPublish: true,
            latestSnippetTime,
            totalTimeSeconds: newTotalTime,
        };
    },
    [actions.EDITOR_SET_LAYER_VOLUME]: (state, { layerId, volume }) => {
        const updatedLayers = state.layers.map(layer => {
            if (layer.frontendId === layerId) {
                return {
                    ...layer,
                    audioVolume: volume,
                };
            }
            return layer;
        });
        return {
            ...state,
            layers: updatedLayers,
        };
    },
    [actions.EDITOR_CHANGE_ITEM_START_OFFSET]: (state, { snippet, deltaSeconds }) => {
        const updatedSnippets = state.layerRecordings.map(thisSnippet => {
            if (thisSnippet.frontendId === snippet.frontendId) {
                return {
                    ...thisSnippet,
                    startOffset: snippet.startOffset + deltaSeconds,
                    playDuration: Math.abs(snippet.playDuration - deltaSeconds),
                };
            }
            return thisSnippet;
        });
        return {
            ...state,
            layerRecordings: updatedSnippets,
        };
    },
    [actions.EDITOR_CHANGE_ITEM_PLAY_DURATION]: (state, { snippet, deltaSeconds }) => {
        const updatedSnippets = state.layerRecordings.map(currentSnippet => {
            const thisSnippet = currentSnippet;
            if (thisSnippet.frontendId === snippet.frontendId) {
                const playDuration = snippet.playDuration + deltaSeconds;
                if (playDuration < 10) {
                    delete thisSnippet.fadeIn;
                    delete thisSnippet.fadeOut;
                }
                return {
                    ...thisSnippet,
                    playDuration,
                };
            }
            return thisSnippet;
        });
        return {
            ...state,
            canPublish: true,
            layerRecordings: updatedSnippets,
        };
    },
    [actions.EDITOR_SET_TRIM_MODE]: state => ({
        ...state,
        layerRecordings: state.layerRecordings.map(l => ({
            ...l,
            trim: { ...l.trim, isTrimming: false, arrowLeft: 0, arrowRight: 0 },
        })),
    }),
    [actions.EDITOR_SET_TRIM_X]: (state, { trim, snippet }) => {
        const updatedSnippets = state.layerRecordings.map(thisSnippet => {
            if (thisSnippet.frontendId !== snippet.frontendId) {
                return thisSnippet;
            }

            return {
                ...thisSnippet,
                trim,
            };
        });
        return {
            ...state,
            layerRecordings: updatedSnippets,
        };
    },
    [actions.EDITOR_SET_ZOOM]: (state, { pixelsPerSecond }) => {
        const updatedSnippets = state.layerRecordings.map(thisSnippet => {
            const previousWidth = state.pixelsPerSecond * thisSnippet.playDuration;
            const nextWidth = pixelsPerSecond * thisSnippet.playDuration;

            const scale = nextWidth / previousWidth;

            const arrowLeft = thisSnippet.trim.arrowLeft !== 0 ? thisSnippet.trim.arrowLeft * scale : 0;
            const arrowRight = thisSnippet.trim.arrowRight !== 0 ? thisSnippet.trim.arrowRight * scale : 0;
            return {
                ...thisSnippet,
                trim: {
                    ...thisSnippet.trim,
                    arrowLeft,
                    arrowRight,
                },
            };
        });
        return {
            ...state,
            pixelsPerSecond,
            secondsPerSection: timePerSection[pixelsPerSecond],
            layerRecordings: updatedSnippets,
        };
    },
    [actions.EDITOR_TRIM_SELECTIONS]: state => {
        const updatedSnippets = state.layerRecordings
            .filter(snippet => snippet.playDuration !== 0)
            .map(thisSnippet => ({
                ...thisSnippet,
                trim: {
                    arrowLeft: 0,
                    arrowRight: 0,
                    higher: null,
                },
            }));

        return {
            ...state,
            latestSnippetTime: calculateEpisodeDuration(updatedSnippets),
            layerRecordings: updatedSnippets,
        };
    },
    [DRAFT_REHYDRATE]: (_state, { draft }) => {
        const draftRehydrated = JSON.parse(draft.data);

        return {
            ...draftRehydrated,
            layers: draftRehydrated.layers.map(l => (Number.isInteger(l.audioVolume) ? l : { ...l, audioVolume: 1 })),
            layerRecordings: draftRehydrated.layerRecordings.map(l => ({
                ...l,
                trim: { arrowLeft: 0, arrowRight: 0, higher: null, isTrimming: false },
            })),
        };
    },
    [actions.EDITOR_INITIALIZE]: () => ({
        ...initialState,
    }),
    [EDITOR_REVERT_DRAFT]: () => ({
        ...initialState,
    }),
};

export default createReducer(handlers, initialState);
