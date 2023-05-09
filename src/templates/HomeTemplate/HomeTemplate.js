import React from "react";
import { Route } from "react-router-dom";
import Header from "../../components/Home/Header/Header";


export const HomeTemplate = (props) => {

    const { Component, ...restParam } = props

    return <Route {...restParam} render={(propRoute) => {
        return <>
            <Header/>
            <Component {...propRoute}></Component>
        </>
    }
    } />
}