import React from 'react'
import { useState } from 'react'

export default function Login(props) {

    const [userLogin, setUserLogin] = useState({taiKhoan:'', matKhau:''})
    console.log(userLogin)
    const handleChange = (e) =>{
        let {name, value} = e.target;
        setUserLogin({
            ...userLogin,
            [name]:value
        })
    }
    const handleLogin = (e) =>{
        e.preventDefault();
        if(userLogin.taiKhoan === 'trung' && userLogin.matKhau === 'tr'){
            // Thành công thì chuyển về trang trước đó
            // props.history.goBack();

            //Chuyển đến một trang chỉ định
            // props.history.push('/home')

            //replace thay đổi nội dung path tương ứng
            //props.history.replace('/home')
            props.history.goBack();
            localStorage.setItem('taiKhoan', JSON.stringify(userLogin))
        } else{
            alert("SAI")
            return;
        }
    }
  return (
    <form className='container' onSubmit={handleLogin}>
        <h3>ĐĂNG NHẬP</h3>
        <div className='form-group'>
            <p>Tài khoản</p>
            <input name='taiKhoan' className='form-control' onChange={handleChange}/>
        </div>
        <div className='form-group'>
            <p>Mật khẩu</p>
            <input type='password' name='matKhau' className='form-control' onChange={handleChange}/>
        </div>
        <div className='form-group'>
            <button className='btn btn-success'>Đăng nhập</button>
        </div>
    </form>
  )
}
