import React, { useState, useEffect, useRef } from 'react'
import { Table, Tag, Space, Button } from 'antd';
import ReactHtmlParser from "react-html-parser";
import { message, Popconfirm } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { AutoComplete } from 'antd';
import { Popover } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import FormEditProject from '../../../components/Cyberbugs/Forms/FormEditProject/FormEditProject';
import { values } from 'lodash';
import { NavLink } from 'react-router-dom';


export default function ProjectManagement(props) {
    //Lấy dữ liệu từ reducer về component
    const projectList = useSelector(state => state.ProjectCyberbugsReducer.projectList);
    //Sử dụng useDispatch để gọi action
    const dispatch = useDispatch();
    const userSearch = useSelector(state => state.UserLoginCyberBugsReducer.userSearch)
    const [value, setValue] = useState('')
    const searchRef = useRef(null)

    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    useEffect(() => {
        // console.log(projectList)
        dispatch({ type: 'GET_LIST_PROJECT_SAGA' })
    }, [])

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };


    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (item2, item1) => {
                return item2.id - item1.id;
            },
            // sortDirections: ['ascend']

        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record, index) => {
                return <NavLink to={`/projectdetail/${record.id}`}> {text}</NavLink>
            },
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1;
            },
        },
        // {
        //     title: 'description',
        //     dataIndex: 'description',
        //     key: 'description',
        //     render: (text, record, index) => {
        //         let contentJSX = ReactHtmlParser(text);

        //         return <div>
        //             {contentJSX}
        //         </div>
        //     }
        // },

        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color="green">{record.creator?.name}</Tag>
            },
            sorter: (item2, item1) => {
                let creator1 = item1.categoryName?.trim().toLowerCase();
                let creator2 = item2.categoryName?.trim().toLowerCase();
                if (creator2 < creator1) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Members',
            key: 'members',
            render: (text, record, index) => {
                // console.log(record)
                return <div>
                    {record.members?.slice(0, 3).map((member, index) => {
                        return (
                            <Popover key={index} title="Member project" placement="top" content={() => {
                                return <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Avatar</th>
                                            <th>Name</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {record.members?.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.userId}</td>
                                                <td><img src={item.avatar} width="30" height="30" style={{ borderRadius: '15px' }} /></td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <button onClick={() => {
                                                        dispatch({
                                                            type: 'REMOVE_USER_PROJECT_API',
                                                            userProject: {
                                                                userId: item.userId,
                                                                projectId: record.id
                                                            }
                                                        })
                                                    }} className="btn btn-danger" style={{ borderRadius: '50%' }}>X</button>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            }}>
                                <Avatar key={index} src={member.avatar} alt="avatar" />
                            </Popover>
                        )
                    })}
                    {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}
                    <Popover placement="rightTop" title={'Add user'} content={() => {
                        return <AutoComplete
                            options={userSearch?.map((user, index) => {
                                return { label: user.name, value: user.userId.toString() }
                            })}
                            onSelect={(valueSelect, option) => {
                                //set giá trị của hộp thoại = option.label
                                setValue(option.label)
                                //gọi api gửi về backend
                                dispatch({
                                    type: 'ADD_USER_PROJECT_API',
                                    userProject: {
                                        "projectId": record.id,
                                        "userId": valueSelect
                                    }
                                })
                            }}
                            onChange={(text) => {
                                setValue(text)
                            }}
                            value={value}
                            onSearch={(value) => {
                                if (searchRef.current) {
                                    clearTimeout(searchRef.current)
                                }
                                searchRef.current = setTimeout(() => {
                                    dispatch({
                                        type: 'GET_USER_API',
                                        keyWord: value
                                    })
                                }, 300)
                            }} style={{ width: 200, }} placeholder="input here" > </AutoComplete>
                    }} trigger="click">
                        <Button style={{ borderRadius: '100%' }}>+</Button>
                    </Popover>
                </div>
            }

        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return <div>
                    <button onClick={() => {
                        const action = {
                            type: 'OPEN_FORM_EDIT_PROJECT',
                            Component: <FormEditProject />,
                            title: 'Edit Project',
                            SubmitFunction: ''
                        }
                        //dispatch lên reducer nội dung
                        dispatch(action)
                        //dispatch dữ liệu dòng hiện tại lên reducer
                        const actionEditProject = {
                            type: 'EDIT_PROJECT',
                            projectEditModel: record
                        }
                        dispatch(actionEditProject)
                    }} className="btn mr-2 btn-primary">
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>

                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this project?"
                        onConfirm={() => {
                            const action = {
                                type: 'DELETE_PROJECT_SAGA',
                                idProject: record.id
                            }
                            dispatch(action)
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger">
                            <DeleteOutlined style={{ fontSize: 17 }} />
                        </button>
                    </Popconfirm>
                </div>
            },
        }

    ];
    return (
        <div style={{color:'red'}} className="container-fluid m-5">
            <h3>Project management</h3>

            <Table columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />
        </div>
    )
}