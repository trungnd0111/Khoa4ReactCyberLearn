import React from 'react'

const initialState = {
    visible: false,
    title: '',
    ComponentContentDrawer: <div>Ningguang my love</div>,
    callBackSubmit: () => {
        alert('click demo!')
    }
}

export const drawerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_DRAWER':
            return { ...state, visible: true }
        case 'CLOSE_DRAWER':
            return { ...state, visible: false }
        case 'OPEN_FORM_EDIT_PROJECT':
            return { ...state, visible: true, title: action.title, ComponentContentDrawer: action.Component }
        case 'SET_SUBMIT_EDIT_PROJECT':
            state.callBackSubmit = action.submitFunction
            return { ...state }
        case 'OPEN_FORM_CREATE_TASK':
            return { ...state, visible: true, title: action.title, ComponentContentDrawer: action.Component }
        case 'SET_SUBMIT_CREATE_TASK_PROJECT':
            state.callBackSubmit = action.submitFunction;
            return { ...state };
        default:
            return { ...state }
    }
}
