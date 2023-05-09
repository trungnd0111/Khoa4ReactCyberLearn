import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { connect, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/constants/Cyberbugs/Cyberbugs';

function CreateProject(props) {

  const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)
  const dispatch = useDispatch()
  //Hàm của thư viện Editor
  const handleEditorChange = (content, editor) => {
    props.setFieldValue('description', content)
  }
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue
  } = props;

  useEffect(() => {
    //Gọi api để lấy dữ liệu thẻ select
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_SAGA
    })
  }, [])

  return (
    <div className='container m-5'>
      <h3>Create Project</h3>
      <form className='container' onSubmit={handleSubmit} onChange={handleChange} >
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName" />
        </div>
        <div className='form-group'>
          <p>Description</p>
          <Editor
            name="description"
            initialValue=""
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
        <div className='form-group'>
          <p>Category</p>
          <select name='categoryId' className='form-control' onChange={handleChange}>
            {/* <option >Lựa chọn Dự án</option> */}
            {arrProjectCategory.map((item, index) => {
              return <option value={item.id} key={index}>{item.projectCategoryName}</option>
            })}
          </select>
        </div>
        <button className='btn btn-outline-primary' type='submit'>Create project!</button>
      </form>
    </div>
  )
}

const createProjectForm = withFormik({
  //enableReinitialize: khi mà true thì mỗi lần props của redux thay đổi thì nó sẽ bliding lại những giá trị trong object này
  enableReinitialize: true,
  mapPropsToValues: (props) => {

    // console.log('propsvalue', props)

    return {
      projectName: '',
      description: '',
      categoryId: props.arrProjectCategory[0]?.id,

    }
  },
  validationSchema: Yup.object().shape({
    projectName: Yup.string().required('ProjectName is required!')

  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    // console.log('values', values)
    props.dispatch({
      type: 'CREATE_PROJECT_SAGA',
      newProject: values
    })
  },
  displayName: 'CreateProjectFormik',
})(CreateProject);


const mapStateToProps = (state) => {
  return {
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
  }
}

// const mapStateToProps = (state) => ({
//   arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
// })

export default connect(mapStateToProps)(createProjectForm);