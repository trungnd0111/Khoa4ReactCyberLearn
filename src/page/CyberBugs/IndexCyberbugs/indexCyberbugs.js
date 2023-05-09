import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContentMain from "../../../components/Cyberbugs/MainBoardCyberbugs/ContentMain"
import HeaderMain from "../../../components/Cyberbugs/MainBoardCyberbugs/HeaderMain"
import InfoMain from "../../../components/Cyberbugs/MainBoardCyberbugs/InfoMain"


export default function IndexCyberBugs(props) {

    const { projectDetail } = useSelector(state => state.ProjectCyberbugsReducer)
    const dispatch = useDispatch();

    console.log('projectDetail', projectDetail)

    useEffect(() => {
        //Khi người dùng link qua trang này bằng thẻ navlink hoặc người dùng tự gõ url thì ta sẽ lấy tham số từ url => gọi saga
        const { projectId } = props.match.params;
        dispatch({
            type: 'GET_PROJECT_DETAIL_SAGA',
            projectId
        })

    }, [])

    return (
        <div className="main">
            <HeaderMain projectDetail={projectDetail} />

            <InfoMain projectDetail={projectDetail}/>

            <ContentMain projectDetail={projectDetail}/>
        </div>

    )
}