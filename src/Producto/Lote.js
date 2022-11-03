
import React, { useState,useEffect,useContext } from 'react';
import swal from "sweetalert";
import SearchBar from '../Component/SearchBar';
import Datos from '../Host/Datos';
import {Quetzal, Dolar} from '../Funciones/Moneda';
import moment from 'moment';
import {ItemProducto} from '../Context/Context';
//import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet'

function Lote()  {
    const [idlote, setIdLote] = useState("");
    const [idproducto, setIdproducto] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [precio_mayorista, setPrecio_mayorista] = useState(""); 
    const [precio_compra, setPrecio_compra] = useState("");
    const [precio_unidad, setPrecio_unidad] = useState(""); 
    const [vence,setVence]=useState("");

    const [estado, setEstado] = useState("Activo");

    const [datos, setdatos] = useState([]);  
    const [encontrado, setencontrado] = useState([]);
    const [buscar, setbuscar] = useState("");
    const [accion, setAccion] = useState("new");
    

    const {itemlote,
        setItemlote,
        viewLote,
        setViewLote,
        ConsultarProducto
    } =useContext(ItemProducto);
        

    //const moneda=2;
    //const Moneda= moneda===1 ? Dolar: Quetzal;

    useEffect(()=>{
        console.log(itemlote)
      ConsultarLote(itemlote.idproducto);
      setIdproducto(itemlote.idproducto)
      //getSexo();

    },[])
    



    const ConsultarLote=async(id)=>{
      const datos=await Datos.ConsutaID("Lote",id);
      if(datos!==null){
        if(datos.message==="Success"){
        console.log(datos.res);
        setdatos(datos.res);
        setencontrado(datos.res)
        }
      }
    }

    const limpiar=()=>{
      setIdLote(0);
      setIdproducto("");
      setPrecio_mayorista("");
      setCantidad("");
      setPrecio_compra("");
      setPrecio_unidad("");
      setVence("");   
      setEstado("Activo");
    }
    const Ingresar=async()=>{
 
      let datos={
        idlote:0,
        idproducto:idproducto,
        cantidad:cantidad,
        precio_mayorista:precio_mayorista,
        precio_compra:precio_compra,
        precio_unidad:precio_unidad,
        vence:moment(vence).format("YYYY-MM-DD"),
        estado:estado
      }
   
      let Lote=await Datos.NuevoReg("lote",datos);
      if(Lote !== null){
        if(Lote.message==="Success"){
    
          swal("Lote","Ingresdo exitosamente","success");
         limpiar();
          ConsultarLote(itemlote.idproducto);
        }else{
          swal("Lote","No se pudo Ingresar, verifique los datos","warning");
        }
      }
    }
    const Actualizar=async()=>{
      let datos={
        idlote:idlote,
        idproducto:idproducto,
        cantidad:cantidad,
        precio_mayorista:precio_mayorista,
        precio_compra:precio_compra,
     
        precio_unidad:precio_unidad,
        vence:moment(vence).format("YYYY-MM-DD"),
        estado:estado
      }
      console.log(datos);
      let Lote=await Datos.ActualizarReg("lote",datos);
      if(Lote !== null){
        if(Lote.message==="Success"){
          swal("Lote","Ingresdo exitosamente","success");
          limpiar();
          ConsultarLote(itemlote.idproducto);
        }else{
          swal("Lote","No se pudo Ingresar, verifique los datos","warning");
        }
      }
    }
    const Eliminar=async(datos)=>{
      let Lote=await Datos.BorrarReg("lote",datos.idlote);
      if(Lote!==null){
        if(Lote.message === "Success"){
          swal("Lote", "Eliminado con exíto","success")
       
          ConsultarLote(itemlote.idproducto);

        }else{
          swal("Lote","No se pudo eliminar","warning");
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
setIdLote(datos.idlote);
setIdproducto(datos.idproducto);
setCantidad(datos.cantidad);
setPrecio_mayorista(datos.precio_mayorista);
setPrecio_compra(datos.precio_compra);
setPrecio_unidad(datos.precio_unidad);
setVence(datos.vence);
setEstado(datos.estado)
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
          return   item.nombre.toLowerCase().includes(text) ;   
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
  const AgregarAlLote = (item) => { 
    swal("Ingrese la cantidad a agregar: ",{
      content:"input",
    }).then(async(value)=>{
       let nuevoItem={
      idlote:item.idlote,
      idproducto:item.idproducto,
      cantidad:Number(item.cantidad) + Number(value),
      precio_mayorista:item.precio_mayorista,
      precio_compra:item.precio_compra,
   
      precio_unidad:item.precio_unidad,
      vence:moment(item.vence).format("YYYY-MM-DD"),
      estado:item.estado
       }

       let Lote=await Datos.ActualizarReg("lote",nuevoItem);
       if(Lote !== null){
         if(Lote.message==="Success"){
           swal("Lote","Ingresdo exitosamente","success");
           limpiar();
           ConsultarLote(itemlote.idproducto);
         }else{
           swal("Lote","No se pudo Ingresar, verifique los datos","warning");
         }
        }
    });
  
    
   }
    return(
        <div>
            <div className="mb-2">    
             <i class="bi bi-arrow-left-square-fill icon-option" onClick={()=>{setViewLote(false); ConsultarProducto()}}></i>
            <h5 className="modal-title">Lote</h5>

            </div>
            <SearchBar
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar Lote..."  

            data_bs_toggle="modal"
            data_bs_target="#exampleModal"
            onClick={AbrirIngreso}
            />
         
{/**modal para ingreso de empleado */}

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
        <h5 className="modal-title">Ingreso de Lote</h5>

        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo </label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idlote} onChange={(e) => setIdLote(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
      <label className="form-label" hidden= {true} htmlFor="form1Example1">Idproducto</label>
   
          <input type="text" id="form1Example1"hidden= {true} className="form-control" value={idproducto}  onChange={(e) => setIdproducto(e.target.value)}  required/>
           
  </div>
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Cantidad</label>
  
        <input type="number" id="form1Example1" className="form-control" value={cantidad}  onChange={(e) => setCantidad(e.target.value)} required/>
      

  </div> 
  
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Precio de compra</label>
   
          <input type="text" id="form1Example1" className="form-control" value={precio_compra}  onChange={(e) => setPrecio_compra(e.target.value)} required />
         
  </div>
  <div className="form-outline mb-4">

       <label className="form-label" htmlFor="form1Example1" >Precio_mayorista</label>
        <input type="number" id="form1Example1" className="form-control" value={precio_mayorista}  onChange={(e) => setPrecio_mayorista(e.target.value.slice(0,8))} required/>

  </div>
 

  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" > Precio_unidad</label>
  
        <input type="text"  id="form1Example1" className="form-control" value={precio_unidad}  onChange={(e) => setPrecio_unidad(e.target.value)} required/>
      
  </div>


  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" > Fecha de vencimiento</label>
  
        <input type="date"  id="form1Example1" className="form-control" value={vence}  onChange={(e) => setVence(e.target.value)} required/>
      
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

  </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" className="btn btn-primary" >Guardar</button>
      </div>
    </div>
  </div>
</form>
{/** fin del modal de ingreso Lote */}



<div className="div-table">
<div className="table-wrap">
  
<table className="table-item ">
  <thead >
          <tr>
            <th>#</th>
         
            <th>Producto</th>
            <th>Cantidad</th>  
            <th>P/compra</th>
            <th>P/mayorista</th>
                     <th>P/unidad</th>      
            <th>Vence</th>
          
       
            <th>Estado</th>

            <th>Opciones</th>
          </tr>
        </thead>
       <tbody>
      { datos ?
           datos.map((item,index) =>(
            <tr key={index}>
               
               <td>{item.idlote}</td>
            
               <td>{item.nombre}</td>
               <td>{item.cantidad}</td>
                <td>{item.precio_compra}</td>
               <td>{item.precio_mayorista}</td>
               <td>{item.precio_unidad}</td>
               <td>{moment(item.vence).format("DD/MM/YYYY")}</td>
               {item.estado === "Activo" ? <td ><p className="activo">{item.estado}</p></td>:
               <td ><p className="noactivo">{item.estado}</p></td>
                }
               
               <td>
               <div className="d-flex dropdown justify-content-center alig-items-center">
  <i className="bi bi-three-dots " type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
  </i>
  <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton2">
  <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>AbrirActualizar(item,e.target)} >Editar</li>
  <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleAgregar" onClick={(e)=>AgregarAlLote(item)} >Agrega al mismo lote</li>
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
    export default Lote;
    

