import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_LOGIN } from '../../util/constants/settingSystem'

export default function Home(props) {

  const userLogin = useSelector(state => state.UserLoginCyberBugsReducer.userLogin)
  const dispatch = useDispatch()
  const logOutButton = () =>{
    if(localStorage.getItem(USER_LOGIN)){
      return <button onClick={()=>{
        dispatch({
          type: 'LOG_OUT_USER_SAGA',
        })
      }}>Logout</button>
    }
  }

  return (
    <div>
      HOME
      <br/>
      {userLogin?.name}
      <img src={userLogin?.avatar} />
      {logOutButton()}
    </div>
  )
}
