
import React, { useState,useEffect,useContext } from 'react';
import md5 from "md5";
import swal from "sweetalert";
import SearchBar from '../Component/SearchBar';
import Datos from '../Host/Datos';
import {Quetzal, Dolar} from '../Funciones/Moneda';
import Lote from './Lote';
import { ItemProducto } from '../Context/Context';
import moment from 'moment';
function Producto(props)  {
    const [idproducto, setIdProducto] = useState("");
    const [idproveedor, setIdproveedor] = useState("");
    const [codbarr, setCodebarr] =useState("");
    const [nombre, setNombre] = useState("");
    const [presentacion, setPresentacion] = useState("");
    const [especificacion, setEspecificacion] = useState(""); 
    const [cantidad_maxima, setCant_maxima] = useState("")
    const [cantidad_minima, setCant_minima] = useState("")
    const [estado, setEstado] = useState("Activo");
    const [codigoEmpresa, setCodigoEmpresa] = useState("")
    
    const [datos, setdatos] = useState([]);  
    
    const [datosp, setdatosp] = useState([]);  
    const [encontrado, setencontrado] = useState([]);
    const [buscar, setbuscar] = useState("");
    const [accion, setAccion] = useState("new");
    const[itemlote,setItemlote]=useState([]);
    const[viewLote,setViewLote]=useState(false);

    
    
    //const moneda=2;
    //const Moneda= moneda===1 ? Dolar: Quetzal;

    useEffect(()=>{
      ConsultarProducto();
      ConsultarProveedor();
      console.log(nombre)
    },[])
    
    const ConsultarProveedor=async()=>{
      const datos=await Datos.Consulta("proveedor");
      if(datos!==null){
        if(datos.message==="Success"){
         console.log(datos.res);
        setdatosp(datos.res);
       // setencontrado(datos.res)   
        }
        
      }
    }
    const ConsultarProducto=async()=>{
      const datos=await Datos.Consulta("producto/all");
      if(datos!==null){
        if(datos.message==="Success"){
        console.log(datos.res);
       // setdatos(datos.res);
        setencontrado(datos.res)
        Number(codigoEmpresa) > 0 && BusquedaPorProveedor(codigoEmpresa);
        }
      }
    }

    const limpiar=()=>{
      setIdProducto(0);
      setCodebarr("")
      setNombre("");
      setEspecificacion("");
      setPresentacion("");
      setCant_maxima("");
      setCant_minima("");
      setEstado("Activo");
    }
    const Ingresar=async()=>{
      let datos={
        idproducto: 0,
        codbarr:codbarr,
        idproveedor:idproveedor,
        nombre:nombre,
        presentacion:presentacion,
        especificacion:especificacion,
        cantidad_maxima:cantidad_maxima,
        cantidad_minima:cantidad_minima,
        estado:estado
      }
   
      let Producto=await Datos.NuevoReg("Producto",datos);
      if(Producto !== null){
        if(Producto.message==="Success"){
          swal("Producto","Ingresdo exitosamente","success");
          limpiar();
          ConsultarProducto();
        }else{
          swal("Producto","No se pudo Ingresar, verifique los datos","warning");
        }
      }
    }
    const Actualizar=async()=>{
      let datos={
        idproducto:idproducto,
        codbarr:codbarr,
        idproveedor:idproveedor,
        nombre:nombre,
        presentacion:presentacion,
        especificacion:especificacion,
        cantidad_maxima:cantidad_maxima,
        cantidad_minima:cantidad_minima,
        estado:estado
      }
      console.log(datos);
      let Producto=await Datos.ActualizarReg("Producto",datos);
      if(Producto !== null){
        if(Producto.message==="Success"){
          swal("Producto","Ingresdo exitosamente","success");
          limpiar();
          ConsultarProducto();
        }else{
          swal("Producto","No se pudo Ingresar, verifique los datos","warning");
        }
      }
    }
    const Eliminar=async(id)=>{
      let Producto=await Datos.BorrarReg("Producto",id);
      if(Producto!==null){
        if(Producto.message === "Success"){
          swal("Producto", "Eliminado con exíto","success")
          ConsultarProducto();
        }else{
          swal("Producto","No se pudo eliminar","warning");
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
setIdProducto(datos.idProducto);
setCodebarr(datos.codbarr);
setIdproveedor(datos.idproveedor);
setNombre(datos.nombre);
setPresentacion(datos.presentacion);
setEspecificacion(datos.especificacion);
setCant_maxima(datos.cantidad_maxima);
setCant_minima(datos.cantidad_minima)
setEstado(datos.estado)
setAccion("update");

var myInput = document.getElementById("exampleModal");
    e.addEventListener("shown.bs.modal", function () {
      myInput.focus();
    });
    }
    const Busqueda =(e)=>{
      let soloNumero=/^[0-9]+$/;

      let buscarTexto=e.target.value;
      setbuscar(buscarTexto);
      let text=buscarTexto.match(soloNumero) !==null ? buscarTexto : buscarTexto.replace(/^\w/,(c) =>c.toLowerCase());
      setbuscar(buscarTexto);
      
      setdatos(encontrado.filter(function(item){
          return   item.idproducto===text|| item.nombre.toLowerCase().includes(text) || item.presentacion.toLowerCase().includes(text) || item.especificacion.toLowerCase().includes(text);   
        }).map(function(element){
          return element
        })
       );
      }

       const BusquedaPorProveedor=(codigo)=>{
        setCodigoEmpresa(codigo);
        let buscarTexto=ObtenerProveedor(codigo);
        let text= buscarTexto.replace(/^\w/,(c) =>c.toLowerCase()); 
        setdatos(encontrado.filter(function(item){
            return   item.empresa.toLowerCase().includes(text);   
          }).map(function(element){
            return element
          })
         );
      
        }
        
        const ObtenerProveedor = (codigo) => { 
          for (let i in datosp){
            if(Number(datosp[i].idProveedor) ===Number(codigo)){
              return datosp[i].empresa;
            }
          }
         }

        const vefrificarCodigoExistente=(codigo)=>{ 
          for(let  i in datos){
            if(datos[i].codbarr===codigo){
                 setCodebarr("")
              swal("Producto","ya existente","warning");
           
            }else{
              setCodebarr(codigo)
            }
          }
        }
    
  const AbrirIngreso=(e)=>{
    let myInput = document.getElementById("exampleModal");
    e.target.addEventListener("shown.bs.modal", function () {
      myInput.focus();
    });
  }
const verLote = (item, view) => { 
  setItemlote(item);
  setViewLote(view);
}

const ValueProvider =  {
itemlote,
  setItemlote,
  viewLote,
  setViewLote,
  ConsultarProducto

 }
    return(
        <ItemProducto.Provider value={ValueProvider}>
        {  !viewLote ?
          <div>
            <div className="mb-2">   
            <h5 className="modal-title">Producto</h5></div>
            <SearchBar
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar Producto..."  
            data_bs_toggle="modal"
            data_bs_target="#exampleModal"
            onClick={AbrirIngreso}
            />
             <div className="form-outline mb-4">
  <label className="form-label" htmlFor="form1Example1" >Empresa</label>
 
                  <select className="form-select form-select-sm" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example"  onChange={(e)=>BusquedaPorProveedor(e.target.value)}>
                         {datosp.length > 0 ? datosp.map((item,index) =>(
                         <option key={index} value={item.idProveedor} data-tokens={item.empresa}>{item.empresa}</option>))
                         :
                        null
                          }
                    </select>
              
              </div>

         
{/**modal para ingreso de empleado */}

  <form
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
          onSubmit={(e)=>GuardarCambios(e)}
        >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de Producto</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo del producto</label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idproducto} onChange={(e) => setIdProducto(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1"  >Codigo de barra</label>   
    <input type="text" id="form1Example1" className="form-control" value={codbarr} onChange={(e) => vefrificarCodigoExistente(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Nombre</label>
    
          <input type="text" id="form1Example1" className="form-control" value={nombre}  onChange={(e) => setNombre(e.target.value)} required/>
        
  </div>
  <div className="form-outline mb-4">
  <label className="form-label" htmlFor="form1Example1" >Empresa</label>
 
                  <select className="form-select form-select-sm" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={idproveedor} onChange={(e)=>setIdproveedor(e.target.value)}>
                         {datosp.length > 0 ? datosp.map((item,index) =>(
                         <option key={index} value={item.idProveedor} data-tokens={item.empresa}>{item.empresa}</option>))
                         :
                        null
                          }
                    </select>
              
              </div>

  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Especificación</label>
        <input type="text" id="form1Example1" className="form-control" value={especificacion}  onChange={(e) => setEspecificacion(e.target.value)} required/>

  </div>  
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Detalle</label>
      
        <input type="text" id="form1Example1" className="form-control" value={presentacion}  onChange={(e) => setPresentacion(e.target.value)} required />
        
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Cantidad Maxima</label>
        <input type="number" id="form1Example1" className="form-control" value={cantidad_maxima}  onChange={(e) => setCant_maxima(e.target.value)} required/>

  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Cantidad Mímina</label>
        <input type="number" id="form1Example1" className="form-control" value={cantidad_minima}  onChange={(e) => setCant_minima(e.target.value)} required/>

  </div>

  
  <div className="form-outline mb-4 center">
       <label className="form-label" htmlFor="form1Example1">Estado</label>
       <div className="form-outline mb-4">
        <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={estado} checked={estado === "Activo" ? true : false} onChange={() => setEstado("Activo")} selected/>
  <label className="form-check-label" htmlFor="inlineRadio1">Activo</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={estado} checked={estado === "No Activo" ? true : false} onChange={() => setEstado("No Activo")}/>
  <label className="form-check-label" htmlFor="inlineRadio2">No activo</label>
  </div>
</div>

  </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </div>
    </div>
  </div>
</form>

<div className="div-table">
<div className="table-wrap">
  
<table className="table-item ">
  <thead >
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Empresa</th>      
            <th>Especificacion</th>      
            <th>Detalle</th>
            <th>Existencia</th>  
            <th></th>
            <th>C/Max</th>
            <th>C/Min</th>
           
            <th>Lotes</th>
            <th>Estado</th>
            
            <th>Opciones</th>
          </tr>
        </thead>
       <tbody>
      { datos ?
           datos.map((item,index) =>(
            <tr key={index}>
               
               <td>{item.codbarr}</td>
               <td>{item.nombre}</td>
               <td>{item.empresa}</td>
               <td>{item.especificacion}</td> 
               <td>{item.presentacion}</td>
               <td>{item.stock}</td>
               <td>{item.stock <= item.cantidad_minima ?
                <i className="bi bi-x-circle-fill icon-error"   aria-hidden="true" ></i>
                :
                <i className="bi bi-check-circle-fill icon-success"   aria-hidden="true" ></i>
               
               }</td>
              
               <td>{item.cantidad_maxima}</td>
               <td>{item.cantidad_minima}</td>
               <td>{item.lote}</td>
           
             
               {item.estado === "Activo" ? <td ><p className="activo">{item.estado}</p></td>:
               <td ><p className="noactivo">{item.estado}</p></td>
                }
               
               <td>
               <div className="d-flex dropdown justify-content-center alig-items-center">
  <i className="bi bi-three-dots " type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
  </i>
  <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton2">
  <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>AbrirActualizar(item,e.target)} >Editar</li>
    <li  className="dropdown-item" onClick={()=>Eliminar(item.idproducto)}>Eliminar</li>
    <li  className="dropdown-item" onClick={()=>verLote(item,true)}>Ver Lote</li>
      
   
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
        :
        <Lote item={itemlote} onClick={verLote}/>
        }

     </ItemProducto.Provider>   

    );
        }
    export default Producto;
    