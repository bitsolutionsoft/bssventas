
import React, { useState,useEffect } from 'react';
import md5 from "md5";
import swal from "sweetalert";
import SearchBar from '../Component/SearchBar';
import Datos from '../Host/Datos';

function Empleado(props)  {
    const [idempleado, setIdempleado] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [dpi, setDpi] = useState(""); 
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [estado, setEstado] = useState("Activo");

    const [datos, setdatos] = useState([]);  
    const [encontrado, setencontrado] = useState([]);
    const [buscar, setbuscar] = useState("");
    const [accion, setAccion] = useState("new");
    const [modulo, setmodulo] = useState([]);

    const[datosPermiso, setDatosPermiso]=useState([]);
    const[datosUsuario, setDatosUsuario]=useState([]);
    const[accionUser, setAccionUser]=useState([])
    const[empleadoSelect,setEmpeladoSelect]=useState([]);
    const [usuario, setusuario]=useState("");
    const [pass,setpass]=useState("");

    
    useEffect(()=>{
        ConsultarEmpleado();
        ConsultarModulo();
      },[])

      const ConsultarEmpleado=async()=>{
     
        const datos=await Datos.Consulta("empleado");
      //datos  && datos.res && setdatos(datos.res); setencontrado(datos.res);
       if(datos!==null){
          console.log(datos.res);
          setdatos(datos.res);
          setencontrado(datos.res)
        }
      }
      const ConsultarModulo=async()=>{
     
        const datos=await Datos.Consulta("modulo");
      //datos  && datos.res && setdatos(datos.res); setencontrado(datos.res);
       if(datos!==null){
          console.log(datos.res);
          setmodulo(datos.res);
        }
      }

      const limpiar=()=>{
        setIdempleado(0);
        setNombre("");
        setApellido("");
        setDpi("");
        setDireccion("")
        setTelefono("");
 
        setEstado("Activo");
      }

      const Ingresar=async()=>{
        let datos={
          idempleado:0,
          nombre:nombre,
          apellido:apellido,
          dpi:dpi,
          telefono:telefono,
          direccion:direccion,
          estado:estado
        }
        let empleado=await Datos.NuevoReg("empleado",datos);
        if(empleado !== null){
          if(empleado.message==="Success"){
            swal("Empleado","Ingreso exitosamente","success");
            limpiar();
            ConsultarEmpleado();
          }else{
            swal("Empleado","No se pudo Ingresar, verifique los datos","warning");
          }
        }
      }

      const Actualizar=async()=>{
        let datos={
            idempleado:idempleado,
          nombre:nombre,
          apellido:apellido,
          dpi:dpi,
          telefono:telefono,
     direccion:direccion,
          estado:estado
        }
        let empleado=await Datos.ActualizarReg("empleado",datos);
        if(empleado !== null){
          if(empleado.message==="Success"){
            swal("Empleado","Ingresdo exitosamente","success");
            limpiar();
            ConsultarEmpleado();
          }else{
            swal("Empleado","No se pudo Ingresar, verifique los datos","warning");
          }
        }
      }

      const Eliminar=async(id)=>{
        let empleado=await Datos.BorrarReg("empleado",id);
        if(empleado!==null){
          if(empleado.message === "Success"){
            swal("Plan", "Eliminado con exíto","success")
            ConsultarEmpleado();
          }else{
            swal("Plan","No se pudo eliminar","warning");
          }
        }
      }

      const GuardarCambios=(e)=>{
        e.preventDefault();

        if(accion==="new"){
          Ingresar();
        }else{
          Actualizar();
        }
      }

      const AbrirActualizar=(datos,e)=>{
        setIdempleado(datos.idempleado);
        setNombre(datos.nombre);
        setApellido(datos.apellido);
        setDpi(datos.dpi);
        setTelefono(datos.telefono);
  setDireccion(datos.direccion);
        setEstado(datos.estado)
        setAccion("update");
        
        var myInput = document.getElementById("exampleModal");
            e.addEventListener("shown.bs.modal", function () {
              myInput.focus();
            });
            }

            const Busqueda =(e)=>{
              console.log(e.target.value);
                let buscarTexto=e.target.value;
                setbuscar(buscarTexto);
                let text=buscarTexto.replace(/^\w/,(c) =>c.toLowerCase());
                setbuscar(buscarTexto);
                
                setdatos(encontrado.filter(function(item){
                    return item.nombre.toLowerCase().includes(text) || item.apellido.toLowerCase().includes(text) ||  item.estado.toLowerCase().includes(text) ;   
                  }).map(function({idempleado, nombre, apellido,direccion, dpi, telefono, correo, estado}){
                    return{idempleado, nombre, apellido,direccion, dpi, telefono, correo, estado}
                  })
                 );
                
                  }

                  const AbrirIngreso=(e)=>{
                    let myInput = document.getElementById("exampleModal");
                    e.target.addEventListener("shown.bs.modal", function () {
                      myInput.focus();
                    });
                  }

                  const ConsultarUsuario=async(codigo)=>{
                    setAccionUser("")
                    
                    setusuario("");
                    setpass("");
            
                    const datosUser=await Datos.ConsutaIDUser("usuario",codigo);
                   if(datosUser!==null){
                
                    if(datosUser.message==="Success"){
                 console.log(datosUser)
                    setDatosUsuario(datosUser.res);
                    setusuario(datosUser.res[0].usuario);
                    setpass(datosUser.res[0].pass);
                    setAccionUser("update")
                    }else{
                      setAccionUser("new")
                    }
                    }
                  }
                  const ConsultarPermiso=async(codigo )=>{
                    const dats=await Datos.ConsultaPermiso(codigo);
                   if(dats!==null){
                    if(dats.message==="Success"){
                      console.log(dats.res)
                      setDatosPermiso(dats.res)
                      
                    }
                    }
                    
                  }
                  const agregarPermiso = () => { 
                     for(let i in modulo){
                        ingresarPermiso(empleadoSelect.idempleado,modulo[i].idmodulo)
                        if(i>=modulo.length - 1){
                          ConsultarPermiso(empleadoSelect.idempleado)
                        }
                      }
                   }

                  const ingresarPermiso = async(idempleado, idmodulo) => { 
                    let datos={
                      idpermiso:0,
                      idempleado:idempleado,
                      idmodulo:idmodulo,
                      permiso:0,
                    }
                    let permisoIngresado=await Datos.NuevoReg("permiso",datos);
                    if(permisoIngresado!==null){
                      if(permisoIngresado.message==="Success"){
                        swal("","Permiso Ingreado","success")
                      }else{
                      swal("","No se ingreso el permiso","error")}
                    }
                   }
                  const verPermiso = (empleado,e) => { 
                    setEmpeladoSelect(empleado)
                    setDatosPermiso([])
                    ConsultarPermiso(empleado.idempleado);
                   
                    let myInput = document.getElementById("examplePermiso");
                    e.target.addEventListener("shown.bs.modal", function () {
                      myInput.focus();
                    });

                   }

                   const verUsuario= (empleado,e) => { 
                    setDatosUsuario([])
                    setEmpeladoSelect(empleado)
                    ConsultarUsuario(empleado.idempleado);

                    let myInput = document.getElementById("exampleUser");
                    e.target.addEventListener("shown.bs.modal", function () {
                      myInput.focus();
                    });
                  }

                  
const guardaruser = (e) => { 
  e.preventDefault();
  
  let datos={
      idusuario: accionUser ==="new" ? 0 : datosUsuario[0].idusuario,
      idempleado:empleadoSelect.idempleado,
      usuario:usuario,
      pass:md5(pass),
  }
  if(accionUser ==="new"){
    ingresarUser(datos)
  }else{
    actualizarUser(datos)
  }

  
   }
  const ingresarUser = async(datos) => { 
      let ingresado=await Datos.NuevoReg("usuario",datos);
      if(ingresado !==null){
          if(ingresado.message==="Success"){
              swal("","Se ingreso correctamente, ahora puede modificarlo o salir","success");
              ConsultarUsuario(empleadoSelect.idempleado)
          }else{
          swal("","No Se ingreso ","error");
          }
      }
   }
   
  const actualizarUser = async(datos) => { 
      let ingresado=await Datos.ActualizarReg("usuario",datos);
      if(ingresado !==null){
          if(ingresado.message==="Success"){
              swal("","Se Actualizo correctamente","success");
              ConsultarUsuario(empleadoSelect.idempleado)
          }else{
          swal("","No Se ingreso ","error");
        }
      }
   }

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
          ConsultarPermiso(empleadoSelect.idempleado)
            swal("Aviso", "Se Actualizo correctamente","success");  
        }else{
        swal("Aviso", "No se pudo actualizar el permiso","error");
        }
    }
 }  
    return(
       
        <div>
            <div className="mb-2">   
            <h5 className="modal-title">Empleado</h5></div>
            <SearchBar
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar Empleado..."  
            data_bs_toggle="modal"
            data_bs_target="#exampleModal"
            onClick={AbrirIngreso}
            />
         
{/**modal para ingreso de empleado */}

  <form onSubmit={(e)=>{GuardarCambios(e)}} className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden={true}  >
  
  <div className="modal-dialog modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de Empleado</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
       
      <div className="modal-body">
  
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo de empleado</label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idempleado} onChange={(e) => setIdempleado(e.target.value)} />

     </div>
       <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example2" >Nombre</label>
     <input type="text" id="form1Example2" className="form-control" value={nombre}  onChange={(e) => setNombre(e.target.value)} required />
   
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example3" >Apellido</label>
        <input type="text" id="form1Example3" className="form-control" value={apellido}  onChange={(e) => setApellido(e.target.value)} required />

  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example4" >Dirección</label>
        <input type="text" autoComplete='false'  id="form1Example4" className="form-control" value={direccion}  onChange={(e) => setDireccion(e.target.value)} required />

  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example5" >DPI</label>
        <input type="number" autoComplete='false'  id="form1Example5" className="form-control" value={dpi}  onChange={(e) => setDpi(e.target.value.slice(0,13))} required />

  </div>

  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example6" >Telefono</label>
        <input type="number" id="form1Example6"  className="form-control" value={telefono}  onChange={(e) => setTelefono(e.target.value.slice(0,8))}  required/>

  </div>
  

  
  <div className="form-outline mb-4 center">
       <label className="form-label" htmlFor="form1Example7">Estado</label>
       <div className="form-outline mb-4">
        <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={estado} checked={estado === "Activo" ? true : false} onChange={() => setEstado("Activo")} />
  <label className="form-check-label" htmlFor="inlineRadio1">Activo</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={estado} checked={estado === "No Activo" ? true : false} onChange={() => setEstado("No Activo")}/>
  <label className="form-check-label" htmlFor="inlineRadio2">No activo</label>
  </div>
</div>

 
     
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>        
        <input type="submit" className="btn btn-primary" value="Guardar" />
      </div>
     
       </div>
    </div>
      
  </div>

</form>

{/**final del modal para ingreso de empleado */}

{/**modal para administrar permisos */}

<div
          className="modal fade"
          id="examplePermiso"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
        >
  <div className="modal-dialog modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Administrar permisos</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
     {
      datosPermiso.length > 0 ?

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
      {datosPermiso ? 
      datosPermiso.map((item,index)=>(
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
        </div>

      :
     <div>
      <h6>El empleado aun no tiene permiso. Si desea agregar, haga clic en boton agregar permisos</h6>
      <p>Al agregar por primera vez los permisos, todos estan desactivados</p>
      <button type="button" className="btn btn-primary" onClick={()=>agregarPermiso()} >Agregar Permisos</button>
     </div>
      
     }
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" >Guardar</button>
      </div>
    </div>
  </div>
</div>

{/**final del modal para administrar permisos */}

{/**modal para administrar usuario del empledo */}

<form
          className="modal fade"
          id="exampleUser"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
          onSubmit={(e)=>guardaruser(e)}
        >
  <div className="modal-dialog modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title"> Usuario</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {
          datosUsuario.length > 0 ? 

         <div>
          <div className="form-outline mb-4">
            <h5>Actualizar usuario</h5>
          </div>
    <div className="form-outline mb-4">
    <label className="form-label" htmlFor="form2Example6" >Usuario</label>
    <input type="text" id="form2Example6" className="form-control" value={usuario}  onChange={(e) => setusuario(e.target.value)} required/>
  
 </div>
 <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form2Example7" >Contraseña</label>
       <input type="password" id="form2Example7" className="form-control" value={pass}  onChange={(e) => setpass(e.target.value)} required />
       
 </div>
 <div className='modal-footer'>
    <button type="submit" className="btn btn-primary"  >Guardar Cambios</button>
 </div>
          </div> 

          :
          <div>
          <div className="form-outline mb-4">
            <h5>Aun no tiene usuario</h5>
            <p>Lleno los campos para ingresar usuario, asegurese de recordar los datos:</p>
          </div>
    <div className="form-outline mb-4">
    <label className="form-label" htmlFor="form3Example6" >Usuario</label>
    <input type="text" id="form3Example6" className="form-control" value={usuario}  onChange={(e) => setusuario(e.target.value)} required/>
  
 </div>
 <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form3Example7" >Contraseña</label>
       <input type="password" id="form3Example7" className="form-control" value={pass}  onChange={(e) => setpass(e.target.value)} required/>
     
 </div>
 <div className='modal-footer'>
    <button type="submit" className="btn btn-primary"  >Ingresar Usuario</button>
 </div>
          </div> 
        }
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">salir</button>   
        
      </div>
    </div>
  </div>
</form>

{/**final del modal para administrar usuarios del empleado */}
<div className="div-table">
<div className="table-wrap">
  
<table className="table-item ">
  <thead >
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Dirección</th>
            <th>DPI</th>
            <th>Telefono</th>
            <th>Estado</th>
            
            <th>Opciones</th>
          </tr>
        </thead>
       <tbody>
      { datos ?
           datos.map((item,index) =>(
            <tr key={index}>
               
               <td>{item.idempleado}</td>
               <td>{item.nombre}</td>
               <td>{item.apellido}</td>
               <td>{item.direccion}</td>
               <td>{item.dpi}</td>
               <td>{item.telefono}</td>
            

               {item.estado === "Activo" ? <td ><p className="activo">{item.estado}</p></td>:
               <td ><p className="noactivo">{item.estado}</p></td>
                }
               
               <td>
               <div className="d-flex dropdown justify-content-center alig-items-center">
  <i className="bi bi-three-dots " type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
  </i>
  <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton2">
  <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>AbrirActualizar(item,e.target)} >Editar</li>
    <li  className="dropdown-item" onClick={()=>Eliminar(item.idplan)}>Eliminar</li>
    <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#examplePermiso" onClick={(e)=>verPermiso(item,e)} >Editar Permisos</li>
    <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleUser" onClick={(e)=>verUsuario(item,e)} >Editar Usuario</li>
      
   
  </ul>
</div>


                 </td>

             </tr>
           )) 
           : null
           
      
           }
      
       </tbody>
      </table>
      </div>

  
        </div>
     </div>    

    );
        }
    export default Empleado;
    