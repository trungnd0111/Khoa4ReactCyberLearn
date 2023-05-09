import React, { Component } from 'react'

const initialState = {
    component: <p>Đây là HOC</p>
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'LOGIN_HOC': {
        state.component = action.component
        return {...state}
    }
    case 'REGISTER_HOC': {
        state.component = action.component
        return {...state}
    }


  default:
    return {...state}
  }
}
