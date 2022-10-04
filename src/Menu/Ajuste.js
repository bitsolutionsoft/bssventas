import { set } from 'local-storage';
import React,{useEffect, useState} from 'react'
import swal from 'sweetalert';
import Datos from '../Host/Datos';

function Ajuste() {
const [Nombre,setNombre]=useState();
const [Descripcion,setDescripcion]=useState("");
useEffect(()=>{
    ConsultarInfo();
},[])

const ConsultarInfo =async () => { 
let datos=await Datos.Consulta("ajuste");
if(datos!==null){
    if(datos.message==="Success"){
        setNombre(datos.res[0].nombre);
        setDescripcion(datos.res[0].descripcion);
    }
}
}
const GuardarCambios = async() => { 
    let datos={
        nombre:Nombre,
        descripcion:Descripcion,

    }
    let info=await Datos.ActualizarReg("ajuste",datos)
    if(info!==null){
        if(info.message==="Success"){
            swal("","Información actualizado","success");
            ConsultarInfo();
            return
        }
        swal("","No se pudo Actuliazar la infomración","error");
    }

 }
  return (
    <div>
        
      <div className="modal-body">
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1"  >Nombre de la Empresa</label>   
    <input type="text" id="form1Example1" className="form-control"  value={Nombre} onChange={(e) => setNombre(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example2" >Descripcion</label>
     <input type="text" id="form1Example2" className="form-control" value={Descripcion}  onChange={(e) => setDescripcion(e.target.value)} />
   
  </div>
  
  <div className="modal-footer">
      
        <button type="button" className="btn btn-primary" onClick={()=>GuardarCambios()} >Guardar Cambios</button>
      </div>
  

      </div>
    </div>
  )
}

export default Ajuste