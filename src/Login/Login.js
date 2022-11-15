import '../css/login.css';
import md5 from 'md5';
import React, { useContext, useEffect, useState } from 'react';
import Datos from '../Host/Datos';
import ls, { set } from "local-storage";
import swal from "sweetalert"
import Menu from '../Menu/Menu';
import { DataContext } from '../Context/Context';

function Login(props)  {
    const [user, setuser] = useState("");
    const [password, setpassword] = useState("");
    const [isLogin, setIsLogin]=useState(false);
    const [view, setView]=useState(false);
    const [selectedCliente, setSelectedCliente]=useState([])
    const [usuarioActual, setUsuarioActual]=useState([])

   
    
useEffect(()=>{
inicio();
},[])
const inicio=()=>{
  if(ls.get('usuario')!==null){
    setIsLogin(true)
   }
}

    async function loguear() {
      let data = {
        idusuario: 0,
        idempleado: 0,
        usuario: user.trim(),
        pass: md5(password.trim()),
      };
console.log(data)
      let usuario = await Datos.ConsultaUser(data);

      if (usuario !== undefined) {
        if (usuario.message === "Success") {
          let d = usuario.res[0];
          console.log(d);
       await   ls.set("usuario", usuario.res[0]);   
      await    consultarPermiso(d.idempleado);
          swal("Bssventas", "Bienvenido", "success");
         // props.history.push("/Menu");
         setIsLogin(true)
        } else {
          swal("Bssventas", "Usuario o Cantraseña Incorrecta", "warning");
        }
      }
    }
    async function consultarPermiso(idemp) {
      let dat = await Datos.ConsultaPermiso(idemp);
      if (dat !== null) {
        if (dat.message === "Success") {
          console.log(dat.res);
          ls.set("permiso", dat.res);
        }
      }
    }
   
    const pressEnter=(event)=>{
        if(event.key==='Enter'){
            loguear();
        }
    }

const valueProvider={
  isLogin,
  setIsLogin,
  selectedCliente,
  setSelectedCliente,
 
  usuarioActual,
  setUsuarioActual,
 
}

return (
  <DataContext.Provider value={valueProvider}>
    {
!isLogin  ?
<div className="login">
  <div className='bg2'>
     
     <div className="w-75 mt-0 mb-15 bg " >
         <div className="row    align-items-stretch  rounded">
             <div className="col  d-none d-lg-block col-md-5 col-lg-5 col-xl-6  imgleft">
             </div>
             <div className="col  p-2 rounded-end">
                 <h2 className="fw-bold text-center pt-6 py-5  text-white"  >Bienvenido</h2>
                 
                 <div className="d-flex justify-content-center h-100 ">
                     <div> 
                         <div className=" p-2  ">
                             <div className="input-group form-group">
                                 <div> 
                                     <label htmlFor="username" className="form-label text-white fw-bold" > Usuario: </label>
                                     <div className="input-group"> 
                                     <i className="bi bi-person-fill input-group-text "  ></i>
                                     <input type="text" className="form-control " placeholder="Nombre de usuario" name="user"  onChange={(e) => setuser(e.target.value)}/>
                                     </div>
                                     
                                 </div>
                             </div>
                               <div className="input-group form-group">
                                 <div className="mb-3">
                                     
                                         <label htmlFor="password" className="form-label text-white fw-bold">Contraseña:</label>
                                         <div className="input-group">
                                         <i className={view ? "bi bi-unlock-fill input-group-text" : "bi bi-lock-fill input-group-text"} ></i>  
                                         <input type={view ? "text" : "password"} className="form-control" placeholder="Contraseña" name="password" onKeyDown={(e)=>pressEnter(e)}   onChange={(e)=>setpassword(e.target.value)}/>
                                         <i className={view ? "bi bi-eye-fill input-group-text"  : "bi bi-eye-slash-fill input-group-text" } onClick={()=>setView(!view)}></i>  
                                         </div>
                                 </div>
                                 
                             </div>                           
                             <div className="d-grid mb-15">
                                 <div className='mb-20'>
                                     <input type="submit" value="Iniciar Sesión" className="btn btn-secondary w-100 my-100" onClick={()=> loguear()}/>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
     </div>       
 </div>
 :
<Menu/>
}
  </DataContext.Provider>
    
   


         
        );
    
}
export default Login;