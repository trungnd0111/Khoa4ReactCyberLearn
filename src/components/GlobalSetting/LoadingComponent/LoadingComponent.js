import React from 'react'
import styleLoading from './LoadingComponent.module.css'
import { useSelector } from 'react-redux'

export default function LoadingComponent() {

    const { isloading } = useSelector(state => state.LoadingReducer)
    if (isloading) {
        return (
            <div className={styleLoading.bgLoading}>
                <img src={require('../../../assets/imgLoading/raiden.gif')} />/
            </div>
        )
    } else{
        return ''
    }
}
