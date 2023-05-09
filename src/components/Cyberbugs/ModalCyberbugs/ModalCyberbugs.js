import { Editor } from '@tinymce/tinymce-react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ALL_PRIORITY_SAGA, GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/Cyberbugs/TaskTypeConstant'
import { GET_ALL_STATUS_TASK_SAGA } from '../../../util/constants/CyberBugs/StatusConstants'
import { Select } from 'antd';

const { Option } = Select;
export default function ModalCyberBugs(props) {

    const taskDetailModal = useSelector(state => state.TaskReducer.taskDetailModal)
    const { arrStatus } = useSelector(state => state.StatusTaskReducer)
    const arrPriority = useSelector(state => state.PriorityReducer.arrPriority)
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer)
    const { projectDetail } = useSelector(state => state.ProjectCyberbugsReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: GET_ALL_STATUS_TASK_SAGA });
        dispatch({ type: GET_ALL_PRIORITY_SAGA });
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    }, [])

    const renderTimeTracking = () => {

        const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const percent = Math.round(Number(timeTrackingSpent) / max * 100)

        return <div>
            <div style={{ display: 'flex' }}>
                <i className="fa fa-clock" />
                <div style={{ width: '100%' }}>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="logged">{Number(timeTrackingSpent)}h logged</p>
                        <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <input className="form-control" name="timeTrackingSpent" onChange={handleChange} />
                </div>
                <div className="col-6">
                    <input className="form-control" name="timeTrackingRemaining" onChange={handleChange} />
                </div>
            </div>
        </div>
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        dispatch({
            type: 'HANDLE_CHANGE_POST_API_SAGA',
            actionType: 'CHANGE_TASK_MODAL',
            name: name,
            value: value
        })
        // dispatch({
        //     type: 'CHANGE_TASK_MODAL',
        //     name: name,
        //     value: value
        // })
    }


    const [visibleEditor, setVisibleEditor] = useState(false)
    const [contentDesc, setContentDesc] = useState(taskDetailModal.description)
    const renderDescription = () => {
        const jsxDesc = ReactHtmlParser(taskDetailModal.description);
        return <div className="form-group">
            {visibleEditor ? <div> <Editor
                name="description"
                initialValue={taskDetailModal.description}
                init={{
                    selector: 'textarea#myTextArea',
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={(content, editor) => { setContentDesc(content) }}
            />
                <button onClick={() => {
                    dispatch({
                        type: 'HANDLE_CHANGE_POST_API_SAGA',
                        actionType: 'CHANGE_TASK_MODAL',
                        name: 'description',
                        value: contentDesc
                    })
                    // dispatch({
                    //     type: 'CHANGE_TASK_MODAL',
                    //     name: 'description',
                    //     value: contentDesc
                    // })
                    setVisibleEditor(false)
                }} className='btn btn-primary mr-2'>Save</button>
                <button onClick={() => {
                    setVisibleEditor(false)
                }} className='btn btn-primary'>Close</button>
            </div> : <div style={{ cursor: "pointer", border: '2px solid black' }} onClick={() => {
                setVisibleEditor(!visibleEditor)
            }}>{jsxDesc}</div>}
        </div>
    }


    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark" />
                            <span style={{ fontSize: '30px' }}>{taskDetailModal.taskName}</span>
                        </div>
                        <select name="typeId" value={taskDetailModal.typeId} onChange={handleChange}>
                            {arrTaskType.map((tp, index) => {
                                return <option value={tp.id}>{tp.taskType}</option>
                            })}
                        </select>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <i className="fa fa-trash-alt='xyz'" style={{ cursor: 'pointer' }} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">This is an issue of type: Task.</p>
                                    <div className="description">
                                        <p style={{ fontWeight: 'bold' }}>Description</p>
                                        {renderDescription()}
                                    </div>
                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={require("../../../assets/img/download (1).jfif")} alt='xyz' />
                                            </div>
                                            <div className="input-comment">
                                                <input type="text" placeholder="Add a comment ..." />
                                                <p>
                                                    <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                    <span>press
                                                        <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                        to comment</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="lastest-comment">
                                            <div className="comment-item">
                                                <div className="display-comment" style={{ display: 'flex' }}>
                                                    <div className="avatar">
                                                        <img src={require("../../../assets/img/download (1).jfif")} alt='xyz' />
                                                    </div>
                                                    <div>
                                                        <p style={{ marginBottom: 5 }}>
                                                            Lord Gaben <span>a month ago</span>
                                                        </p>
                                                        <p style={{ marginBottom: 5 }}>
                                                            Lorem ipsum dolor sit amet, consectetur
                                                            adipisicing elit. Repellendus tempora ex
                                                            voluptatum saepe ab officiis alias totam ad
                                                            accusamus molestiae?
                                                        </p>
                                                        <div>
                                                            <span style={{ color: '#929398' }}>Edit</span>
                                                            •
                                                            <span style={{ color: '#929398' }}>Delete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select name='statusId' className="custom-select" value={taskDetailModal.statusId} onChange={(e) => {
                                            handleChange(e)
                                            // const action = {
                                            //     type: 'UPDATE_STATUS_TASK_SAGA',
                                            //     taskUpdateStatus:{
                                            //         taskId: taskDetailModal.taskId,
                                            //         statusId: e.target.value,
                                            //         projectId: taskDetailModal.projectId
                                            //     }
                                            // }
                                            // dispatch(action)
                                        }}>
                                            {arrStatus?.map((status, index) => {
                                                return <option key={index} value={status.statusId}>{status.statusName}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div className='row mt2 mb-2'>
                                            {taskDetailModal.assigness?.map((user, index) => {
                                                return <div className="col-6 mt-2 mb-2">
                                                    <div key={index} className="item" style={{ display: 'flex' }}>
                                                        <div className="avatar">
                                                            <img src={user.avatar} alt={user.avatar} />
                                                        </div>
                                                        <p className="name mt-1 ml-1">
                                                            {user.name}
                                                            <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {
                                                                dispatch({
                                                                    type: 'HANDLE_CHANGE_POST_API_SAGA',
                                                                    actionType: 'REMOVE_USER_ASSIGN',
                                                                    userId: user.id
                                                                })
                                                                // dispatch({
                                                                //     type: 'REMOVE_USER_ASSIGN',
                                                                //     userId: user.id
                                                                // })
                                                            }} />
                                                        </p>
                                                    </div>
                                                </div>
                                            })
                                            }
                                            <div className='col-6 mt2 mb-2'>
                                                <Select
                                                    options={projectDetail.members?.filter(mem => {
                                                        let index = taskDetailModal.assigness?.findIndex(us => us.id === mem.userId);
                                                        if (index !== -1) {
                                                            return false;
                                                        }
                                                        return true;
                                                    }).map((mem, index) => {
                                                        return { value: mem.userId, label: mem.name };
                                                    })}
                                                    optionFilterProp="label"
                                                    style={{ width: '100%' }}
                                                    name="lstUser"
                                                    value="+ Add more"
                                                    className="form-control"
                                                    onSelect={(value) => {
                                                        if (value == '0') {
                                                            return;
                                                        }
                                                        let userSelected = projectDetail.members.find(mem => mem.userId == value);
                                                        userSelected = { ...userSelected, id: userSelected.userId };
                                                        dispatch({
                                                            type: 'HANDLE_CHANGE_POST_API_SAGA',
                                                            actionType: 'CHANGE_ASSIGNESS',
                                                            userSelected
                                                        })
                                                        //dispatchReducer
                                                        // dispatch({
                                                        //     type: "CHANGE_ASSIGNESS",
                                                        //     userSelected
                                                        // })
                                                    }}>


                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="reporter">
                                        <h6>REPORTER</h6>
                                        <div style={{ display: 'flex' }} className="item">
                                            <div className="avatar">
                                                <img src={require("../../../assets/img/download (1).jfif")} alt='xyz' />
                                            </div>
                                            <p className="name">
                                                Pickle Rick
                                                <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                            </p>
                                        </div>
                                    </div> */}
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select name='priorityId' className="form-control" value={taskDetailModal.priorityId} onChange={(e) => {
                                            handleChange(e)
                                        }}>
                                            {arrPriority?.map((item, index) => {
                                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                                            })}


                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input name='originalEstimate' onChange={(e) => { handleChange(e) }} type="text" className="estimate-hours" value={taskDetailModal.originalEstimate} />
                                    </div>
                                    <div className="time-tracking">
                                        <div className="time-tracking">
                                            <h6>TIME TRACKING</h6>
                                            {
                                                renderTimeTracking()
                                            }

                                        </div>
                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}