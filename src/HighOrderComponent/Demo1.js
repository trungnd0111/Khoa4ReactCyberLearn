import React from 'react'
import { useDispatch } from 'react-redux'
import Login from '../page/Login/Login'
import Register from '../page/Register/Register'
import SlideDown from './SlideDown'

const LoginWithSlideDown = () => new SlideDown(Login)

export default function Demo1() {
  const RegisterWithSlideDown = new SlideDown(Register)

  const Dispatch = useDispatch()
  return (
    <div>
      <button onClick={() => {
        Dispatch({
          type: 'LOGIN_HOC',
          component: <Login />
        })
      }} type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
        Đăng nhập
      </button>

      <button onClick={() => {
        Dispatch({
          type: 'REGISTER_HOC',
          component: <Register />
        })
      }} type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
        Đăng ký
      </button>

      <LoginWithSlideDown />
      {RegisterWithSlideDown}
    </div>
  )
}
