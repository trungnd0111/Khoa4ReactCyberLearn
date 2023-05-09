import React from "react";
import { Route } from "react-router-dom";
import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs";
import ModalCyberBugs from "../../components/Cyberbugs/ModalCyberbugs/ModalCyberbugs";
import SidebarCyberbugs from "../../components/Cyberbugs/SidebarCyberbugs";
import './CyberbugsTemplate.css'

export const CyberbugsTemplate = (props) => {

    const { Component, ...restParam } = props

    return <Route {...restParam} render={(propRoute) => {
        return <>
            <div>
                {/* BODY */}
                <div className="jira">
                    {/* Sider Bar  */} 
                    <SidebarCyberbugs />
                    {/* Menu */}
                    <MenuCyberbugs />
                    {/* {/* {/* Main Board * /} * /} */}
                    <Component {...propRoute}></Component>
                </div>
                <ModalCyberBugs />
            </div>
        </>
    }
    } />
}