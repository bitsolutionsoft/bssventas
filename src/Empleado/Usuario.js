import md5 from 'md5';
import React,{useState} from 'react'
import swal from 'sweetalert';
import Datos from '../Host/Datos';

function  Usuario(idempleado,usuarios,accion) {
const {usuario, setusuario}=useState(usuarios.usuario !== undefined ? usuarios.usuario : "");
const {pass,setpass}=useState(usuarios.pass !== undefined ? usuarios.pass : "");

const guardaruser = () => { 
let datos={
    idusuario: accion==="new" ? 0 : usuarios.idsuario,
    idempleado:idempleado,
    usuario:usuario,
    pass:md5(pass),
}

accion === "new" ? ingresarUser(datos) : actualizarUser(datos)

 }
const ingresarUser = async(datos) => { 
    let ingresado=await Datos.NuevoReg("usuario",datos);
    if(ingresado !==null){
        if(ingresado.message==="Success"){
            swal("","Se ingreso correctamente","success");
        }
        swal("","No Se ingreso ","error");
    }
 }
 
const actualizarUser = async(datos) => { 
    let ingresado=await Datos.ActualizarReg("usuario",datos);
    if(ingresado !==null){
        if(ingresado.message==="Success"){
            swal("","Se ingreso correctamente","success");
        }
        swal("","No Se ingreso ","error");
    }
 }

  return (
    <div> 
    <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example6" >Usuario</label>
       <input type="text" id="form1Example6" className="form-control" value={usuario}  onChange={(e) => setusuario(e.target.value)} />
     
    </div>
    <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example7" >Contraseña</label>
          <input type="password" id="form1Example7" className="form-control" value={pass}  onChange={(e) => setpass(e.target.value)} />
  
    </div>
    <div className="form-outline mb-4">
    <button type="button" className="btn btn-primary" onClick={()=>guardaruser()} >Guardar</button>
    </div>
    </div>
  )
}

export default Usuario