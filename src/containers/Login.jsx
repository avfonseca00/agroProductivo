import React, { useState } from 'react';
import {useNavigate} from 'react-router';
import {Button, Checkbox, Form, Input, message} from 'antd';
import {MailOutlined, LockOutlined} from '@ant-design/icons';
import 'antd/dist/reset.css';
import '../assets/css/Login.css';
import axios from 'axios';
const svg1 = require("../assets/img/Start Vector 1.svg");

const Login = () => {
  
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const {password, email} = inputs;
  const navigate = useNavigate();

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value});
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Hello");
    if(email !== " " && password !== " "){
      const Account = {
        email,
        password
      };
      setLoading(true);
      console.log(Account);
      await axios.post('http://localhost:5000/login', Account)
      .then(({data}) => {
          setMensaje(data.mensaje);
          setTimeout(() => {
            setMensaje('');
            setLoading(false);
            navigate(data.User ? `/dashboard/${data.User.id}` : "/login");
          }, 1500);
      })
      .catch((error) => {
        console.error(error);
        setMensaje("Hubo un error");
        setTimeout(() => {
          setMensaje("");
          setLoading(false);
        }, 1500);
      });
    }
  };

  return (
  <div className="main">
    <img className='start_svg1' src={svg1} alt='bg1'/>
    <img className='start_svg2' src={require("../assets/img/Start Vector 2.svg")} alt='bg2'/>
    <Form className='login-form' onSubmitCapture={(e) => onSubmit(e)}>
      <Form.Item className='center'>
      <img src={require('../assets/img/logotipo.svg')} alt='logo'></img>
      <br/><br/>
      </Form.Item>
      <Form.Item rules={[{required:true, message: "Por favor introduzca un correo",}]}>
        <Input value={email} onChange={(e) => onChange(e)} className="ant-input"  name="email" prefix={<MailOutlined/>} style={{ fontSize: '20px'}} placeholder="Correo"/>
      </Form.Item>
      <Form.Item rules={[{required:true, message: "Por favor introduzca una contraseña"}]}>
        <Input value={password} onChange={(e) => onChange(e)} name='password' type='password' prefix={<LockOutlined/>} style={{ fontSize: '20px'}} placeholder="Contraseña"/>
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Recordar</Checkbox>
        </Form.Item>
        <a href='http://localhost:3000/forgetpassword'>Olvidé la contraseña</a>
      </Form.Item>
      <Form.Item className='center'>
        <Button className='ant-button' type='primary' shape='round' color='#10C338' size='large' style={{width:"100%"}} htmlType='submit'>{loading ? "Cargando..." : "Ingresar"}</Button><br/> O <a href='/register'>regístrate ahora!</a>
      </Form.Item>
    </Form>
    {mensaje && message.success(mensaje, 1.5)}
  </div>
  );
}

export default Login;
