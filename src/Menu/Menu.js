import React, { useContext, useEffect, useState } from 'react';
import '../css/estilo.css'
import ls from "local-storage";


import Producto from '../Producto/Producto';
import Empleado from '../Empleado/Empleado';
import AlertModel from '../Menu/AlertModel';
import Cliente  from '../Cliente/Cliente';
import Venta  from '../Venta/Venta';
import Informe from '../Informe/Informe';
import { DataContext } from '../Context/Context';
import {Info} from '../Host/Info';
import Proveedor from '../Proveedor/Proveedor';
import Ajuste from './Ajuste';

function Menu(props)  {
    const [screen, setScreen] = useState("Venta");
    const [usuario, setUsuario] =useState("");

    const [currentUser,setCurrentUser] = useState("");
    const [currentCuenta,setCurrentCuenta]=useState("");
const {setIsLogin} =useContext(DataContext);
    const nav_item="nav-item";
    const nav_active="nav-item nav-active";

   
    useEffect(() => {
       iniciar();
    }, [])
    const iniciar=()=>{
      
  if(ls.get('usuario')===null){
   // props.history.push('./')
   setIsLogin(false)
  }else{

      setUsuario(ls.get("usuario").usuario)
      setCurrentUser(ls.get("usuario").usuario)
  }
}

const acceso = (modulo) => {
    let permiso=ls.get("permiso");
    console.log(permiso);
 let acceso=false;
    permiso.map((item) =>{
        if(item.nombre === modulo){
            if(item.permiso ===1){
                acceso= true;
            }
        }
        return true;
    })
    return acceso
}




    function ColocarContent(){
      
         switch (screen) {
            case 'Ajuste':
                if(acceso("Ajuste")){
                    return <Ajuste />
                }else{
                    return <AlertModel tipo="warning" titulo="Aviso" msg="No tienes acceso a los del sistema" />
                }
          
           
                case 'Producto':
                    if(acceso("Producto")){
                        return <Producto />
                    }else{
                        return <AlertModel tipo="warning" titulo="Aviso" msg="No tienes acceso a Producto" />
                    }
               
                case 'Empleado':
                    if(acceso("Empleado")){
                        return <Empleado />
                    }else{
                        return <AlertModel tipo="warning" titulo="Aviso" msg="No tienes acceso a Empleado" />;
                    }
               
                case 'Cliente':
                    if(acceso("Cliente")){
                        return <Cliente />
                    }else{
                        return <AlertModel tipo="warning" titulo="Aviso" msg="No tienes acceso a Cliente" />;
                      }
             
                case 'Venta':
                    if(acceso("Venta")){
                      return <Venta />
                   }else{
                      return <AlertModel tipo="warning" titulo="Aviso" msg="No tienes acceso a Venta" />;
                   }
                case 'Informe':
                    if(acceso("Informe")){
                      return <Informe />
                   }else{
                      return <AlertModel tipo="warning" titulo="Aviso" msg="No tienes acceso a Informe" />;
                   }
               

                   case 'Proveedor':
                    if(acceso("Proveedor")){
                      return <Proveedor />
                   }else{
                      return <AlertModel tipo="warning" titulo="Aviso" msg="No tienes acceso a Proveedor" />;
                   }
                default:  
              //  return <AlertModel tipo="success" titulo="Aviso" msg="Bienvenido" />;
                return <Venta/>;
            }
           
     }
    
     const cerrarSesion=()=>{
         ls.clear();
        // props.history.push('./');
        setIsLogin(false)
     }

    return (

<div className="container-fluid vh-100">
    
        <div className="row flex-nowrap ">
            <div className="col-auto col-sm-auto  col-md-1 col-xl-2 px-sm-2 px-0 nav-lateral max-vh-100 ">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2  min-vh-100">
                    <p    className="d-flex align-items-center pb-3 mb-md-0 me-md-auto  text-decoration-none">
                        <span className="fs-5 d-none d-none d-md-none d-xl-inline  text-center">{Info.nombre}</span>

                
                    </p>
                    <div className="dropdown pb-4">
                        <p     className="d-flex align-items-center  text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://raw.githubusercontent.com/bitsolutionsoft/img/main/bss.png" alt="perfil" width="30" height="30" className="rounded-circle"/>
                            <span className="d-none d-md-none d-xl-inline mx-1">{usuario}</span>
                        </p>
                        <ul className="dropdown-menu dropdown-menu text-small shadow">
                       
                       <li onClick={()=>setScreen("Ajuste")}><button    className="dropdown-item" >Ajustes</button></li>
                     
                       <li>
                           <hr className="dropdown-divider"/>
                       </li>
                       <li onClick={cerrarSesion}><button    className="dropdown-item" >Cerra Sesion</button></li>
                   </ul>
                    </div>
                    
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
{/**                 <li onClick={()=>setScreen("Cobros del Día")}  className={screen === "Cobros del Día" ? nav_active : nav_item}>
                            <div    className=" align-middle px-0">
                                <i className="bi bi-list-task"></i> <span className="ms-1 d-none d-md-none d-xl-inline">Pagos del dia</span>
                            </div>
                        </li>
*/}    
                        <li onClick={()=>setScreen("Producto")}  className={screen === "Producto" ? nav_active : nav_item}>
                            <div    className=" align-middle px-0">
                                <i className="bi bi-box2-fill"></i> <span className="ms-1 d-none d-md-none d-xl-inline">Producto</span>
                            </div>
                        </li>
                        <li onClick={()=>setScreen("Empleado")}  className={screen === "Empleado" ? nav_active : nav_item}>
                            <div    className=" align-middle px-0">
                                <i className="bi bi-file-earmark-person"></i> <span className="ms-1 d-none d-md-none d-xl-inline">Empleado</span>
                            </div>
                        </li>
                        <li onClick={()=>setScreen("Cliente")} className={screen === "Cliente" ? nav_active : nav_item}>
                            <div    className=" align-middle px-0">
                            <i className="bi bi-person-lines-fill" aria-hidden="true"></i> <span className="ms-1 d-none d-md-none d-xl-inline">Cliente</span>
                            </div>
                        </li>
                {/**       <li onClick={()=>setScreen("Cuentas")} className={screen === "Cuentas" ? nav_active : nav_item}>
                            <div    className="align-middle px-0">
                            <i className="bi bi-postcard" aria-hidden="true"></i> <span className="ms-1 d-none d-md-none d-xl-inline">Cuentas</span>
                            </div>
                        </li>
                        */}  
                        <li onClick={()=>setScreen("Venta")} className={screen === "Venta" ? nav_active : nav_item}>
                            <div    className="align-middle px-0">
                            <i className="bi bi-cart-plus-fill" aria-hidden="true"></i> <span className="ms-1 d-none d-md-none d-xl-inline">Venta</span>
                            </div>
                        </li>
                      
                        <li onClick={()=>setScreen("Informe")} className={screen === "Informe" ? nav_active : nav_item}>
                        <div    className=" px-0 align-middle">
                                <i className="bi bi-graph-up-arrow" ></i> <span className="ms-1 d-none d-md-none d-xl-inline">Informe</span>
                                </div>
                        </li>
                      
                        <li onClick={()=>setScreen("Proveedor")} className={screen === "Proveedor" ? nav_active : nav_item}>
                        <div    className=" px-0 align-middle">
                                <i className="bi bi-graph-up-arrow" ></i> <span className="ms-1 d-none d-md-none d-xl-inline">Empresa</span>
                                </div>
                        </li>
                     
                        <li onClick={cerrarSesion} className={screen === "Salir" ? nav_active : nav_item}>
                            <div    className="px-0 align-middle">
                                <i className="bi bi-box-arrow-in-right"></i> <span className="ms-1 d-none d-md-none d-xl-inline">Salir</span> 
                                </div>
                        </li>
                    </ul>
                    <hr/>
                   
                </div>
            </div>
            
            <div className="col  max-vh-100 overflow-auto div-center">
            <ColocarContent  /> 
            </div>
        </div>
    </div>
    
    );



}

export default Menu;