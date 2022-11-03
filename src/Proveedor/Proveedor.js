
import React, { useState,useEffect } from 'react';
import swal from "sweetalert";
import SearchBar from '../Component/SearchBar';
import Datos from '../Host/Datos';
import {Quetzal, Dolar} from '../Funciones/Moneda';

//import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet'

function Proveedor(props)  {
    const [idproveedor, setIdProveedor] = useState("");
    const [nombre, setNombre] = useState(null);
   const [apellido, setApellido] = useState(null);
    const [telefono, setTelefono] = useState(0); 
        const [empresa, setEmpresa] = useState(""); 
    const [direccion, setDreccion] = useState(null);


    const [estado, setEstado] = useState(null);

    const [datos, setdatos] = useState([]);  
    const [encontrado, setencontrado] = useState([]);
    const [buscar, setbuscar] = useState("");
    const [accion, setAccion] = useState("new");


    //const moneda=2;
    //const Moneda= moneda===1 ? Dolar: Quetzal;

    useEffect(()=>{
      ConsultarProveedor();
      //getSexo();

    },[])
    



    const ConsultarProveedor=async()=>{
      const datos=await Datos.Consulta("proveedor");
      if(datos!==null){
        if(datos.message==="Success"){

         console.log(datos.res);
        setdatos(datos.res);
        setencontrado(datos.res)   
        }
        
      }
    }

    const limpiar=()=>{
      setIdProveedor(0);
         setEmpresa("");
      /*setNombre("");
      setTelefono("");
      setApellido("");
      setDreccion("");
   
      setSexo("");
      setEstado("Activo");*/
    }
    const Ingresar=async()=>{
 
      let datos={
        idproveedor:0,
        nombre:nombre,
       apellido:apellido,
        telefono:telefono,
        direccion:direccion,
     
        empresa:empresa,
    
        estado:estado
      }
   
      let proveedor=await Datos.NuevoReg("proveedor",datos);
      if(proveedor !== null){
        if(proveedor.message==="Success"){
    
          swal("Cliente","Ingresdo exitosamente","success");
         limpiar();
          ConsultarProveedor();
        }else{
          swal("Cliente","No se pudo Ingresar, verifique los datos","warning");
        }
      }
    }
    const Actualizar=async()=>{
      let datos={
        idproveedor:idproveedor,
        nombre:nombre,
        apellido:apellido,
        telefono:telefono,
        direccion:direccion,
     
        empresa:empresa,

        estado:estado
      }
      console.log(datos);
      let proveedor=await Datos.ActualizarReg("proveedor",datos);
      if(proveedor !== null){
        if(proveedor.message==="Success"){
          swal("Cliente","Ingresdo exitosamente","success");
          limpiar();
          ConsultarProveedor();
        }else{
          swal("Cliente","No se pudo Ingresar, verifique los datos","warning");
        }
      }
    }
    const Eliminar=async(datos)=>{
      let proveedor=await Datos.BorrarReg("proveedor",datos.idproveedor);
      if(proveedor!==null){
        if(proveedor.message === "Success"){
          swal("Cliente", "Eliminado con exíto","success")
       
          ConsultarProveedor();

        }else{
          swal("Cliente","No se pudo eliminar","warning");
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
setIdProveedor(datos.idproveedor);
setEmpresa(datos.empresa);
/*setNombre(datos.nombre);
setApellido(datos.apellido);
setTelefono(datos.telefono);
setDreccion(datos.direccion);

setSexo(datos.sexo);
setEstado(datos.estado)*/
setAccion("update");

var myInput = document.getElementById("exampleModal");
    e.addEventListener("shown.bs.modal", function () {
      myInput.focus();
    });
    }

  

    const Busqueda =(e)=>{
      let buscarTexto=e.target.value;
      setbuscar(buscarTexto);
      let text=buscarTexto.replace(/^\w/,(c) =>c.toLowerCase());
      setbuscar(buscarTexto);
      
      setdatos(encontrado.filter((item)=>{
          return   item.empresa.toLowerCase().includes(text) ;   
        }).map((element)=>{
          return element
        })
       );
      
        }
    
  const AbrirIngreso=(e)=>{
    let myInput = document.getElementById("exampleModal");
    e.target.addEventListener("shown.bs.modal", function () {
      myInput.focus();
    });
  }
    return(
        <div>
            <div className="mb-2">   
            <h5 className="modal-title">Empresa</h5></div>
            <SearchBar
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar Cliente..."  

            data_bs_toggle="modal"
            data_bs_target="#exampleModal"
            onClick={AbrirIngreso}
            />
         
{/**modal para ingreso de proveedor */}

  <form
          className="modal fade "
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
          onSubmit={(e)=>{GuardarCambios(e)}}
          
        >
  <div className="modal-dialog modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de Empresa</h5>

        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo </label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idproveedor} onChange={(e) => setIdProveedor(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Nombre de empresa</label>
  
        <input type="text"  id="form1Example1" className="form-control" value={empresa}  onChange={(e) => setEmpresa(e.target.value)} required/>
      
  </div>
 {/* <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1">Nombre</label>
   
          <input type="text" id="form1Example1" className="form-control" value={nombre}  onChange={(e) => setNombre(e.target.value)}  required/>
           
  </div>
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Apellido</label>
  
        <input type="text" id="form1Example1" className="form-control" value={apellido}  onChange={(e) => setApellido(e.target.value)} required/>
      

  </div> 
  
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Dirección</label>
   
          <input type="text" id="form1Example1" className="form-control" value={direccion}  onChange={(e) => setDreccion(e.target.value)} required />
         
  </div>
  <div className="form-outline mb-4">

       <label className="form-label" htmlFor="form1Example1" >Telefono</label>
        <input type="number" id="form1Example1" className="form-control" value={telefono}  onChange={(e) => setTelefono(e.target.value.slice(0,8))} required/>

  </div>
 

  


  <div className="form-outline mb-4 center">
       <label className="form-label" htmlFor="form1Example1">Sexo</label>
       <div className="form-outline mb-4">
        <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="sexo" id="inlineRadio1" value={sexo} checked={sexo === "Hombre" ? true : false} onChange={() => setSexo("Hombre")} selected/>
  <label className="form-check-label" htmlFor="inlineRadio1">Hombre</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="sexo" id="inlineRadio2" value={sexo} checked={sexo === "Mujer" ? true : false} onChange={() => setSexo("Mujer")}/>
  <label className="form-check-label" htmlFor="inlineRadio2">Mujer</label>
  </div>
</div>

  </div>

  <div className="form-outline mb-4 center">
       <label className="form-label" htmlFor="form1Example1">Estado</label>
       <div className="form-outline mb-4">
        <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="estado" id="inlineRadio3" value={estado} checked={estado === "Activo" ? true : false} onChange={() => setEstado("Activo")} selected/>
  <label className="form-check-label" htmlFor="inlineRadio3">Activo</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="estado" id="inlineRadio4" value={estado} checked={estado === "No Activo" ? true : false} onChange={() => setEstado("No Activo")}/>
  <label className="form-check-label" htmlFor="inlineRadio4">No activo</label>
  </div>
</div>

  </div>*/}
    </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" className="btn btn-primary" >Guardar</button>
      </div>
    </div>
  </div>
</form>
{/** fin del modal de ingreso proveedor */}



<div className="div-table">
<div className="table-wrap">
  
<table className="table-item ">
  <thead >
          <tr>
            <th>#</th>
            <th>Empresa</th>
          {/* 
            <th>Nombre</th>
           <th>Apellido</th>

            <th>Telefono</th>
            <th>Dirección</th>
          
          
          
<th>Estado</th>*/}

            <th>Opciones</th>
          </tr>
        </thead>
       <tbody>
      { datos ?
           datos.map((item,index) =>(
            <tr key={index}>
               
               <td>{item.idproveedor}</td>
                <td>{item.empresa}</td>
              {/*
               <td>{item.nombre}</td>
              <td>{item.apellido}</td>
               <td>{item.telefono}</td>
               <td>{item.direccion}</td>
               <td>{item.sexo}</td>
             
           

               {item.estado === "Activo" ? <td ><p className="activo">{item.estado}</p></td>:
               <td ><p className="noactivo">{item.estado}</p></td>
                }
            */}
               <td>
               <div className="d-flex dropdown justify-content-center alig-items-center">
  <i className="bi bi-three-dots " type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
  </i>
  <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton2">
  <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>AbrirActualizar(item,e.target)} >Editar</li>
    <li  className="dropdown-item" onClick={()=>Eliminar(item)}>Eliminar</li>

      
   
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
    export default Proveedor;
    

