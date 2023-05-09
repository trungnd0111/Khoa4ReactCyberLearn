import React from 'react'
import { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../../redux/constants/Cyberbugs/Cyberbugs';

function FormEditProject(props) {
    //props của Formit
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;

    // const submitForm = (e) => {
    //     e.preventDefault();
    //     alert("yah")
    // }
    const dispatch = useDispatch()
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)

    //props của thư viện editor
    const handleEditorChange = (content, editor) => {
        props.setFieldValue('description', content)
    }

    //Component Did mount
    useEffect(() => {

        //gọi api load project category
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_SAGA
        })

        //Load sự kiện submit lên DrawerCyberbugs nút submit
        dispatch({
            type: 'SET_SUBMIT_EDIT_PROJECT',
            submitFunction: handleSubmit
        })
    }, [])

    return (
        <div>
            <form className='container-fluid' onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-4'>
                        <div className='form-group'>
                            <p className='font-weight-bold'>Project id</p>
                            <input disabled value={values.id} className='form-control' name='id'></input>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='form-group'>
                            <p className='font-weight-bold'>Project name</p>
                            <input value={values.projectName} onChange={handleChange} className='form-control' name='projectName'></input>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='form-group'>
                            <p className='font-weight-bold'>Project Category</p>
                            <select  onChange={handleChange} className='form-control' name='categoryId' value={values.categoryId}>
                                {arrProjectCategory.map((item, index) => {
                                    return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <p className='font-weight-bold'>Project Description</p>
                            <Editor
                                name="description"
                                initialValue={values.description}
                                value={values.description}
                                init={{
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
                    </div>
                </div>
            </form>
        </div>
    )
}
//Formik
const editProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectEdit } = props
        // console.log('propsvalue', props)

        return {
            id: projectEdit.id,
            projectName: projectEdit.projectName,
            description: projectEdit.description,
            categoryId: projectEdit.categoryId
        }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        //Khi người dùng bấm submit => đưa dữ liệu về back-end thông qua api
        const action = {
            type: 'UPDATE_PROJECT_SAGA',
            projectUpdate: values
        }
        //Gọi saga update project
        props.dispatch(action)

    },
    displayName: 'EditProjectFormik',
})(FormEditProject);
const mapStateToProps = (state) => ({
    projectEdit: state.ProjectEditReducer.projectEdit
})
export default connect(mapStateToProps)(editProjectForm)
