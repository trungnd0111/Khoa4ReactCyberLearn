import React from 'react'
import { connect } from 'react-redux';
//import component antd
import { Button, Input } from 'antd'
//Import icon
import { UserOutlined, LockOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
//import thư viện handle input
import { withFormik, Formik } from 'formik';
import * as Yup from 'yup';
import { USER_SIGNIN_API } from '../../../redux/constants/Cyberbugs/Cyberbugs';
import { signinCyberbug_action } from '../../../redux/actions/CyberBugAction';




function LoginCyberBugs(props) {
    // console.log(props)
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    return (
        <form onSubmit={handleSubmit} className='container' style={{ height: window.innerHeight }}>
            <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: window.innerHeight }}>
                <h3 style={{ fontSize: '35px' }} className='text-center font-weight-bold'>Login CyberBugs</h3>
                <div className='d-flex mt-3'>
                    <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name='email' type='email' size='large' placeholder='Enter Your Email' prefix={<UserOutlined />} />
                </div>
                <div className="text-danger">{errors.email}</div>
                <div className='d-flex mt-3'>
                    <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name='password' type='password' size='large' placeholder='Enter Password' prefix={<LockOutlined />} />
                </div>
                <div className="text-danger">{errors.password}</div>

                <Button htmlType='submit' size='large' style={{ minWidth: 300, backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className='mt-3'>Login</Button>

                <div className='social mt-3 d-flex'>
                    <Button style={{ backgroundColor: "rgb(59,89,152)" }} size='large' type='primary' shape='circle'>
                        <span className='font-weight-bold'>F</span>
                    </Button>

                    <Button size='large' type='primary ml-3' shape='circle'
                        icon={<TwitterOutlined />}></Button>
                </div>
            </div>
        </form>
    )
}

const LoginCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required!').email('Email is invalid!'),
        password: Yup.string().required('Password is required!').min(6, 'password must have min 6 characters').max(32, 'password have max 32 characters')

    }),
    handleChange: (values, propsChange) => {
        console.log(values)
    },
    handleSubmit: ({ email, password }, { props, setSubmitting }) => {
        // let action = {
        //     type: USER_SIGNIN_API,
        //     userLogin: {
        //         email: values.email,
        //         password: values.password
        //     }
        // }
        // setSubmitting(false)
        console.log(props)
        props.dispatch(signinCyberbug_action(email, password));
    },

    displayName: 'Login CyberBugs',
})(LoginCyberBugs);

export default connect()(LoginCyberBugsWithFormik);