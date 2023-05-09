import { Editor } from '@tinymce/tinymce-react'
import React from 'react'
import { Select, Radio } from 'antd';
import { Slider } from 'antd';
import { useState } from 'react';
import { GET_ALL_PROJECT_SAGA } from '../../../../util/constants/CyberBugs/ProjectConstants';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useEffect } from 'react';
import { GET_ALL_PRIORITY_SAGA, GET_ALL_TASK_TYPE_SAGA } from '../../../../redux/constants/Cyberbugs/TaskTypeConstant';
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { GET_ALL_STATUS_TASK_SAGA } from '../../../../util/constants/CyberBugs/StatusConstants';
import { GET_USER_BY_PROJECT_ID_SAGA } from '../../../../util/constants/CyberBugs/UserContants';


const { Option } = Select;

const children = [];

for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
function FormCreateTask(props) {
    //do kết nối vs formik => component có các prop
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;

    const dispatch = useDispatch()
    const { arrProject } = useSelector(state => state.ProjectCyberbugsReducer)
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer)
    const arrPriority = useSelector(state => state.PriorityReducer.arrPriority)
    const { arrStatus } = useSelector(state => state.StatusTaskReducer)
    //bai59
    const { arrUser } = useSelector(state => state.UserLoginCyberBugsReducer)
    //hàm biến đổi option cho thẻ select
    const userOption = arrUser.map((item, index) => {
        return { value: item.userId, label: item.name }
    })
    //hook
    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_SAGA });
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
        dispatch({ type: GET_ALL_PRIORITY_SAGA });
        dispatch({ type: GET_ALL_STATUS_TASK_SAGA });

        dispatch({
            type: 'GET_USER_API',
            keyWord: ''
        })
        dispatch({
            type: 'SET_SUBMIT_CREATE_TASK_PROJECT',
            submitFunction: handleSubmit
        })
    }, [])


    const [timeTracking, setTimetracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })

    const [size, setSize] = React.useState('default');

    const handleEditorChange = (content, editor) => {
        setFieldValue("description", content)
    }

    return (
        <form onSubmit={handleSubmit} className="container" onChange={handleChange}>
            <div className="form-group">
                <p>Project</p>
                <select onChange={(e) => {
                    //Dispatch giá trị làm thay đổi dữ liệu arrUser
                    let { value } = e.target;
                    dispatch({
                        type: GET_USER_BY_PROJECT_ID_SAGA,
                        idProject: value
                    })
                    //Cập nhật giá trị cho project id
                    setFieldValue('projectId', e.target.value)

                }} name="projectId" className="form-control">
                    {arrProject.map((project, index) => {
                        return <option value={project.id} key={index}>{project.projectName}</option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <p>Task Name</p>
                <input name="taskName" className="form-control" />
            </div>
            <div className="form-group">
                <p>Status</p>
                <select name='statusId' className='form-control'>
                    {arrStatus.map((item, index) => {
                        return <option value={item.statusId} key={index}>{item.statusName}</option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select name="priorityId" className="form-control">
                            {arrPriority.map((item, index) => {
                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task type</p>
                        <select className="form-control" name="typeId">
                            {arrTaskType?.map((taskType, index) => {
                                return <option key={index} value={taskType.id}>{taskType.taskType}</option>
                            })}
                        </select>
                    </div>
                </div>

            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>List User Asign</p>
                        <Select
                            mode="multiple"
                            size={size}
                            options={userOption}
                            placeholder="Please select"
                            // defaultValue={['a12', 'a13']}
                            optionFilterProp='label'
                            style={{ width: '100%' }}
                            onSelect={(value) => {
                                console.log(value)
                            }}
                            onChange={(value) => {
                                //set lại giá trị cho list user asign
                                setFieldValue("listUserAsign", value)
                            }}
                            name='listUserAsign'
                        >
                            {children}
                        </Select>
                    </div>

                    <div className="col-6">
                        <p>Original Estimate</p>
                        <input type="number" min="0" name="originalEstimate" defaultValue="0" className="form-control" />
                    </div>
                    <div className='col-12 mt-3'>
                        <p>Time tracking hour</p>
                        <Slider defaultValue={30} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                        <div className="row">
                            <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent}h logged</div>
                            <div className="col-6 text-right font-weight-bold">{timeTracking.timeTrackingRemaining}h remaining</div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <p>Time spent</p>
                                <input type='number' defaultValue="0" min="0" name="timeTrackingSpent" className='form-control' onChange={(e) => {
                                    setTimetracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    })
                                }} />
                            </div>
                            <div className='col-6'>
                                <p>Time remaining</p>
                                <input type='number' defaultValue="0" min="0" name="timeTrackingRemaining" className='form-control' onChange={(e) => {
                                    setTimetracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    })
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <p>Description</p>
                <Editor
                    name="description"
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
                    onEditorChange={handleEditorChange}
                />
            </div>
        </form>
    )
}

//Formik
const createTasktForm = withFormik({
    //enableReinitialize: khi mà true thì mỗi lần props của redux thay đổi thì nó sẽ bliding lại những giá trị trong object này
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { arrProject, arrTaskType, arrPriority, arrStatus } = props;
        console.log('arrProject',arrProject)
        if (arrProject?.length > 0) {
            props.dispatch({
                type: GET_USER_BY_PROJECT_ID_SAGA,
                idProject: arrProject[0]?.id
            })
        }
        return {
            taskName: '',
            description: '',
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: arrProject[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId,
            listUserAsign: []
        }
    },
    validationSchema: Yup.object().shape({
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        console.log('values', values)
        props.dispatch({
            type: 'CREATE_TASK_SAGA',
            taskObject: values
        })
    },
    displayName: 'EditProjectFormik',
})(FormCreateTask);

const mapStateToProps = (state) => {
    return {
        arrProject: state.ProjectCyberbugsReducer.arrProject,
        arrTaskType: state.TaskTypeReducer.arrTaskType,
        arrPriority: state.PriorityReducer.arrPriority,
        arrStatus: state.StatusTaskReducer.arrStatus
    }
}

export default connect(mapStateToProps)(createTasktForm)