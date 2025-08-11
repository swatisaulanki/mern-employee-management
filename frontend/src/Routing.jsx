import React from 'react';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import EmployeeList from './pages/EmployeeList';
import EmployeeEdit from './pages/EmployeeEdit';
import CreateEmployee from './pages/CreateEmployee';
import RequiredAuth from './hoc/RequireAuth';
import Login from './login/Login';

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<RequiredAuth><Home/></RequiredAuth>}/>
        <Route path={'/signin'} element={<Login/>}/>
        <Route path={'/employeelist'} element={<RequiredAuth><EmployeeList/></RequiredAuth>}/>
        <Route path={'/employeeEdit/:f_Id'} element={<RequiredAuth><EmployeeEdit/></RequiredAuth>}/>
        <Route path={'/createEmployee'} element={<RequiredAuth><CreateEmployee/></RequiredAuth>}/>
      </Routes>
    </>
  )
}

export default Routing
