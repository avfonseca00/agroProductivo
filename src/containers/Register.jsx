import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import 'antd/dist/reset.css';
import {Button, Form, Input, message} from 'antd';
import {UserOutlined, MailOutlined, LockOutlined} from '@ant-design/icons';
import '../assets/css/Register.css';
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    user: "",
    email: "",
    password: ""
  });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const {user, password, email} = inputs;
  const navigate = useNavigate();

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value});
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if(user !== "" && password !== "" && email !== ""){
      const account = {
        user,
        password,
        email
      };
      setLoading(true);
      await axios
      .post('http://localhost:5000/register', account)
      .then(({data}) => {
        setMensaje(data.mensaje);
        setInputs({user:"", password: "", email: "" });
        setTimeout(() => {
          setMensaje('');
          navigate("/login");
          setLoading(false);
        }, 1500);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        setMensaje("Hubo un error");
        setTimeout(() => {
          setMensaje("");
          setLoading(false);
        }, 1500);
      });
    } else {
      message.error("Faltan datos en el formulario");
    }
  }
  
  return (
  <div className="main">
    <img className='start_svg1' alt='bg1' src={require("../assets/img/Start Vector 1.svg")}/>
    <img className='start_svg2' alt='bg2' src={require("../assets/img/Start Vector 2.svg")}/>
    <Form className='login-form' onSubmitCapture={(e) => onSubmit(e)}>
      <Form.Item className='center'>
      <img src={require('../assets/img/logotipo.svg')} alt='logo'></img>
      <br/><br/>
      </Form.Item>
      <Form.Item rules={[{required:true, message: "Por favor introduzca un nombre"}]} >
        <Input onChange={(e) => onChange(e)} name="user" prefix={<UserOutlined/>} style={{ fontSize: '20px'}} placeholder="Nombre"/>
      </Form.Item>
      <Form.Item rules={[{required:true, message: "Por favor introduzca un correo"},{}]}>
        <Input onChange={(e) => onChange(e)} type='email' prefix={<MailOutlined/>} style={{ fontSize: '20px'}} placeholder="Correo" name='email'/>
      </Form.Item>
      <Form.Item prefix={<LockOutlined/>} rules={[{required:true, message: "Por favor introduzca una contraseña"}, {min: 8, message: "La contraseña debe tener al menos 8 caracteres"}, {pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/ , message: 'La contraseña debe contener minusculas, mayusculas, numeros, y caracteres especiales'}]}>
        <Input onChange={(e) => onChange(e)} type='password' prefix={<LockOutlined/>} style={{ fontSize: '20px'}} placeholder="Contraseña" name='password'/> 
      </Form.Item>
      <Form.Item className='center'>
        <Button type='primary' size='large' style={{width:"100%"}} htmlType='submit'>{loading ? "Cargando..." : "Registrarme"}</Button><br/> Or <a href="/login">Login</a>
      </Form.Item>
    </Form>
    {mensaje && <div className='toast'>{mensaje}</div>}
  </div>
  );
}

export default Register;
