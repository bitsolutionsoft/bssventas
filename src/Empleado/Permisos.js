import React,{useState,useEffect} from 'react'
import swal from 'sweetalert';
import Datos from '../Host/Datos';

function Permisos(datos) {
const ActualizarPermiso =async (item, permiso) => { 
    let datosPermiso={
        idpermiso:item.idpermiso,
        idempleado:item.idempleado,
        idmodulo:item.idmodulo,
        permiso:permiso ? 1 : 0
    }
    let dtpermiso=await Datos.ActualizarReg("permiso",datosPermiso);
    if(dtpermiso !==null){
        if(dtpermiso.message==="Success"){
            swal("Aviso", "Se Actualizo correctamente","success");  
        }
        swal("Aviso", "No se pudo actualizar el permiso","error");
    }
 }

  return (
    <div>
    <div className="div-table">
<div className="table-wrap">
  <table className="table-subitem">
<thead>
<tr>
<th></th>
  <th >Modulo</th>
  <th>Permiso</th>
 
</tr>
</thead>
<tbody>
{datos ? 
datos.map((item,index)=>(
   <tr key={index}>
     <td></td>
  <td>{item.nombre}</td>
  <td>
    <div className="form-check form-switch">
    <input className="form-check-input" type="checkbox" id="escritura"  checked={item.permiso === 1 ? true : false } onChange={(e)=>ActualizarPermiso(item, e.target.checked)}/>
    </div> 
  </td>
 
</tr> 
))

: 
null
}


</tbody>
</table>
</div>
  </div></div>
  )
}

export default Permisos