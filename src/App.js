import React, { Component } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Router, Switch, useHistory } from 'react-router-dom'
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent'
import Header from './components/Home/Header/Header'
import Demo1 from './HighOrderComponent/Demo1'
import Modal from './HighOrderComponent/Modal'
import About from './page/About/About'
import BaiTapToDoListSaga from './page/BaiTapToDoListSaga/BaiTapToDoListSaga'
import Contact from './page/Contact/Contact'
import CreateProject from './page/CyberBugs/CreateProject/CreateProject'
import LoginCyberBugs from './page/CyberBugs/LoginCyberBugs.js/LoginCyberBugs'
import Detail from './page/Detail/Detail'
import Home from './page/Home/Home'
import Login from './page/Login/Login'
import PageNotFound from './page/PageNotFound/PageNotFound'
import Profile from './page/Profile/Profile'
import ToDoListRCC from './page/ToDoList/ToDoListRCC'
import ToDoListRedux from './page/ToDoList/ToDoListRedux'
import ToDoListRFC from './page/ToDoList/ToDoListRFC'
import indexCyberbugs from './page/CyberBugs/IndexCyberbugs/indexCyberbugs'
import { CyberbugsTemplate } from './templates/HomeTemplate/CyberbugsTemplate'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate'
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate'
import ProjectManagement from './page/CyberBugs/ProjectManagement/ProjectManagement'
import DrawerCyberbugs from './templates/CyberbugsModal/DrawerCyberbugs'

export default function App() {

  const history = useHistory();
  // console.log(history)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'ADD_HISTORY', history: history });
  }, [])

  return (
    <div>
      <>
        {/* <Modal /> */}
        <LoadingComponent />
        <DrawerCyberbugs />
        <Switch>
          {/* <Route exact path='/home' render={(propRoute) => {
            return <div>
              <Header />
              <Home />
            </div>
          }} /> */}
          <HomeTemplate exact path='/' Component={Home} />
          <HomeTemplate exact path='/home' Component={Home} />
          <HomeTemplate exact path='/contact' Component={Contact} />
          <HomeTemplate exact path='/about' Component={About} />
          <CyberbugsTemplate exact path='/' Component={ProjectManagement} />

          {/* CyberBugs */}
          <UserLoginTemplate exact path='/login' Component={LoginCyberBugs} />
          <CyberbugsTemplate exact path='/cyberbugs' Component={indexCyberbugs} />
          <CyberbugsTemplate exact path='/createproject' Component={CreateProject} />
          <CyberbugsTemplate exact path='/projectmanagement' Component={ProjectManagement} />
          <CyberbugsTemplate exact path='/projectdetail/:projectId' Component={indexCyberbugs} />

          {/* CyberBugs */}

          <HomeTemplate exact path='/detail/:id' Component={Detail} />
          <HomeTemplate exact path='/profile' Component={Profile} />
          <HomeTemplate exact path='/todolistrcc' Component={ToDoListRCC} />
          <HomeTemplate exact path='/todolistrfc' Component={ToDoListRFC} />
          <HomeTemplate exact path='/todolistredux' Component={ToDoListRedux} />
          <HomeTemplate exact path='/todolistreduxsaga' Component={BaiTapToDoListSaga} />
          <HomeTemplate exact path='/demo1' Component={Demo1} />
          <HomeTemplate path="*" Component={PageNotFound} />
        </Switch>
      </>
    </div>
  )
}

