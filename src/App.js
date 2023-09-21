import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {ConfigProvider} from 'antd';
import './App.css';
import Landing from './containers/Landing';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import Map from './containers/Map';
import NotFound from './containers/NotFound';
import Landing1 from './containers/Landing1';

const App = () => {
  return(
  <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#10C338',
        },
      }}
    >
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />}></Route>
          <Route exact path="/dashboard/:id" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path='/landing' element={<Landing1/>}></Route>
          <Route exact path='/map' element={<Map/>}></Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </>
  );
};

export default App;