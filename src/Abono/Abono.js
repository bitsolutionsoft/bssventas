
import React, { useState,useEffect } from 'react';
import moment from "moment";
import swal from "sweetalert";
import Datos  from '../Host/Datos';

import SearchBar2 from '../Component/SearchBar2'

function Abono(props)  {
  /**datos del proveedor */
    const [idproveedor, setidproveedor] = useState("");
    const [nombre, setnombre] = useState("");
    const [datos, setdatos] = useState([]);

    const [encontrado, setencontrado] = useState([]);
    const [buscar, setbuscar] = useState("");
    const [accion, setaccion] = useState("new");
    const [datosCuenta, setdatosCuenta] = useState([])
    const [datosAbono, setdatosAbono] = useState([])
   

/**datos de la cuenta por proveedor ;*/    

    const [idcuenta, setidcuenta] = useState("");
    const [idproveedorc, setidproveedorc] = useState("");
    const [descripcionc, setdescripcionc] = useState("");
    const [totalc, settotalc] = useState("");
    const [totalabonoc, settotalabonoc] = useState("0");
    const [saldoc, setsaldoc] = useState("0");
    const [estadoc, setestadoc] = useState("Pendiente")
    const [accionCuenta, setaccionCuenta] = useState("new")

    /**datos del abono ;*/
const [idabono, setidabono] = useState("");
const [idcuentaa, setidcuentaa] = useState("");
    const [cantidada, setcantidada] = useState("");
    const [tipoPagoa, settipoPagoa] = useState("Efectivo");
    const [comprobantea, setcomprobantea] = useState("")
    const [accionAbono, setaccionAbono] = useState("new")
    


    useEffect(()=>{
      settotalabonoc(0)
      setsaldoc(0)
        consultarProveedor();
    }, []);

    async function consultarProveedor() {
        let dat = await  Datos.Consulta("proveedor");
       console.log(dat);
        if (dat !== null) {
       if(dat.message==="Success"){
       setencontrado(dat.res); 
         console.log(dat);
          setdatos(dat.res);
        }}
      }
    
      
      async function consultarCuenta(idpro){
        setidproveedorc(idpro)
        let cuentas = await Datos.ConsultaCuentaXP(idpro);
        if (cuentas !== null) {
         console.log(cuentas.res);
          setdatosCuenta(cuentas.res);
        }
      }

async function abrirIngreso(e){
    limpiar();
    var myInput = document.getElementById("exampleModal");
    e.addEventListener("shown.bs.modal", function () {
      myInput.focus();
    });

}

async function abrirIngresoAbono(e,codcuenta){
  setidcuentaa(codcuenta)
  limpiarAbono();
  var myInput = document.getElementById("abonoModal");
  e.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  });

}

const limpiarAbono = () => {
  setcantidada("");
  settipoPagoa("Efectivo");
  setcomprobantea("");
  setaccionAbono("new");
}

const  abrirDetalleAbonos=(e,cuenta)=>{
  setidcuentaa(cuenta);
consultarAbonoXCuenta(cuenta);
  var myInput = document.getElementById("abonodetalleModal");
  e.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  }); 
}

async function consultarAbonoXCuenta(cuenta){
let detalleabonos=await Datos.ConsultaAbonoXC(cuenta);
if(detalleabonos !== null){
  if(detalleabonos.message ==="Success"){
    console.log(detalleabonos.res);
    setdatosAbono(detalleabonos.res)
  }
}
}
async function abrirIngresoc(e, idpro){
  limpiarCuenta();
  
  var myInput = document.getElementById("cuentaModal");
  e.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  });
  setidproveedorc(idpro)
}
const abrirActualizaA = (e,item) => {
  setidabono(item.idabono);
  setidcuentaa(item.idcuenta);
  setcantidada(item.cantidad);
  settipoPagoa(item.tipopago);
  setcomprobantea(item.comprobante);
  setaccionAbono("update");

  var myInput = document.getElementById("abonoModal");
  e.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  });  
}

const abrirActualizarC = (e, item) => {
  setidcuenta(item.idcuenta);
  setidproveedorc(item.idproveedor);
  setdescripcionc(item.descripcion);
  settotalc(item.total);
  settotalabonoc(item.totalabono);
  setsaldoc(item.saldo)
  setestadoc(item.estado)
  setaccionCuenta("update");

  var myInput = document.getElementById("cuentaModal");
  e.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  });
}

 const limpiarCuenta = () => {
 // setidcuenta("");
 // setidproveedorc("");
  setdescripcionc("");
  settotalc("");
  settotalabonoc("");
  setsaldoc("")
  setestadoc("Pendiente")
  setaccionCuenta("new");
 }
 

async function actualizar(datos, e){
    setidproveedor(datos.idproveedor)
    setnombre(datos.nombre);
    setaccion("update")

    var myInput = document.getElementById("exampleModal");
    e.addEventListener("shown.bs.modal", function () {
      myInput.focus();
    });
}

async function guardarCuenta(){
  if(accionCuenta ==="new"){
  let rowcuenta={
"idcuenta":0,
"idproveedor":idproveedorc,
"fecha":moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
"total": totalc,
"estado": estadoc
  }
let cuenta=await Datos.NuevoReg("cuenta_proveedor",rowcuenta);
if(cuenta !== null){
  if(cuenta.message ==="Success"){
    swal("Cuenta del Proveedor","Ingresado con exito","success");
   
    consultarCuenta(idproveedorc);
    limpiarCuenta();
  }else{
    swal("Cuenta del Proveedor","No se pudo ingresar, verifique que los datos sean correctos","warning");
  }
}}else{
  
  let rowcuentas={
    "idcuenta":idcuenta,
    "idproveedor":idproveedorc,
    "fecha":moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
    "total": totalc,
    "estado": estadoc
      }
    let cuenta=await Datos.ActualizarReg("cuenta_proveedor",rowcuentas);
    if(cuenta !== null){
      if(cuenta.message ==="Success"){
        swal("Cuenta del Proveedor","Actualizado con exito","success");
        consultarCuenta(idproveedorc);
      }
    }
}


}
async function guardarAbono(){
  if(accionAbono ==="new"){
  let rowabono={
"idabono":0,
"idcuenta":idcuentaa,
"abono":cantidada,
"tipopago":tipoPagoa,

  }
  let abono=await Datos.NuevoReg("abono_proveedor",rowabono);
  if(abono !== null){
    if(abono.message ==="Success"){
      swal("Abono","Ingresado con exito","success");
      consultarCuenta(idproveedorc);
      consultarAbonoXCuenta(idcuentaa)
      
    }else{
      swal("Abono","No se pudo ingresar, verifique que los datos sean correcto","warning");
    }
  }}else{
    let rowabonos={
      "idabono":idabono,
      "idcuenta":idcuentaa,
      "abono":cantidada,
      "tipopago":tipoPagoa,
    
        }
        let abono=await Datos.ActualizarReg("abono_proveedor",rowabonos);
        if(abono !== null){
          if(abono.message ==="Success"){
            swal("Abono","Actualizado con exito","success");
            consultarCuenta(idproveedorc);
             consultarAbonoXCuenta(idcuentaa)
            
          }
        }
  }
}
const limpiar=()=>{
    setidproveedor("")
     setnombre("");
     setaccion("new");
    
}


async function eliminar(idproveedor){
let proveedor=await Datos.BorrarReg(idproveedor);

if (proveedor!==null){
  if(proveedor.message==="Success"){
    swal("Proveedor","Eliminado con exito","success");
  consultarProveedor();
  }else{
    swal("Proveedor","No se pudo eliminar, porque esta relacionado a otros registros","warning");
  }
}
}

 
async function eliminarCuenta(codigo){
  let cuentaeliminado=await Datos.BorrarReg("cuenta_proveedor",codigo);
  if(cuentaeliminado !== null){
    if(cuentaeliminado.message==="Success"){
      
      consultarCuenta(idproveedorc);
    }
  }
}
 
async function eliminarAbono(codigo){
  let abonoeliminado=await Datos.BorrarReg("abono_proveedor",codigo);
  if(abonoeliminado !== null){
    if(abonoeliminado.message==="Success"){
      consultarCuenta(idproveedorc);
      consultarAbonoXCuenta(idcuentaa)
    }
  }
}


const Busqueda =(e)=>{
  let buscarTexto=e.target.value;
  let text=buscarTexto.replace(/^\w/,(c) =>c.toLowerCase());
  setbuscar(buscarTexto);
  setdatos(encontrado.filter(function(item){
      return item.empresa.toLowerCase().includes(text) ;   
    }).map(function(result){
      return result
    })
   );
  }
   
  
return(
        <>
           <div className="mb-2">   <h5 className="modal-title">Empresa</h5></div>
            

{/**modal ingreso proveedor 
  <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
        >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de Proveedor</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true}>Codigo de proveedor</label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idproveedor} onChange={(e) => setidproveedor(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" >Nombre</label>
     <input type="text" id="form1Example1" className="form-control" value={nombre}  onChange={(e) => setnombre(e.target.value)} />
   
  </div>




      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary"  >Guardar</button>
      </div>
    </div>
  </div>
</div>
*/}

{/*modal ingreso de nueva cuenta */}

<div
          className="modal fade"
          id="cuentaModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
        >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de nueva cuenta del proveedor</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Id cuenta</label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idcuenta} onChange={(e) => setidcuenta(e.target.value)} />

  </div>

  <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Id proveedor</label>   
    <input type="text" id="form1Example1" className="form-control" hidden={true} value={idproveedorc} onChange={(e) => setidproveedorc(e.target.value)} />

  </div>
{/**
  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" >Concepto</label>
     <input type="text" id="form1Example1" className="form-control" value={descripcionc}  onChange={(e) => setdescripcionc(e.target.value)} />
   
  </div> */}
  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" >Total</label>
     <input type="text" id="form1Example1" className="form-control" value={totalc}  onChange={(e) => settotalc(e.target.value)} />
   
  </div>
  {/**
  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" >Abono</label>
     <input type="text" id="form1Example1" className="form-control" value={totalabonoc}  onChange={(e) => settotalabonoc(e.target.value)} />
   
  </div> 

  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" >Saldo</label>
     <input type="text" id="form1Example1" className="form-control" value={saldoc}  onChange={(e) => setsaldoc(e.target.value)} />
   
  </div>*/}
  <div className="form-outline mb-4 center">
       <label className="form-label" htmlFor="form1Example1">Estado</label>
       <div className="form-outline mb-4">
        <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Pendiente"   checked={estadoc === "Pendiente" ? true : false} onChange={(e) => setestadoc(e.target.value)} selected/>
  <label className="form-check-label" htmlFor="inlineRadio1">Pendiente</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Cancelado" checked={estadoc === "Cancelado" ? true : false} onChange={(e) => setestadoc(e.target.value)}/>
  <label className="form-check-label" htmlFor="inlineRadio2">Cancelado</label>
  </div>
</div>

  </div>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={()=>guardarCuenta()} >Guardar</button>
      </div>
    </div>
  </div>
</div>

{/*modal detalles de abonos realizados */}

<div className="modal fade" id="abonodetalleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true"  >
  <div className="modal-dialog modal-dialog-scrollable modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Abonos realizados</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
     

      <div className="table-wrap">
<table className="table-item ">
  <thead >
          <tr>
            <th>#</th>
            <th>Cuenta</th>
             <th>Fecha</th>
            <th>Tipo de pago</th>
        
             <th>Cantidad</th>
             <th>Opciones</th>
          </tr>
        </thead>
       <tbody>
      {datosAbono.length > 0 ?
           datosAbono.map((item,index )=>(
            <tr  key={index} >
               
               <td>{item.idabono}</td>
               <td>{item.idcuenta}</td>
                <td>{moment(item.fecha_abono).format("DD/MM/YYYY")}</td>
               <td>{item.tipopago}</td>
           
               <td>{item.abono}</td>

               <td>
               
               <div className="d-flex dropdown justify-content-center alig-items-center">
 <i className="bi bi-three-dots " type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
   </i>
  <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton2">
    <li  className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#abonoModal" onClick={(e)=>abrirActualizaA(e.target,item)}  >Editar</li>
    <li  className="dropdown-item"  onClick={(e)=>eliminarAbono(item.idabono)}>Eliminar</li>
    
  </ul>
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
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Salir</button>
        
      </div>
    </div>
  </div>
</div>
{/**fin del modal de detalle de abonos */}


{/*modal abono */}

<div
          className="modal fade"
          id="abonoModal"
          data-backdrop="static"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
        >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingresar abono</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">


         <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" hidden={true} >Proveedor</label>
     <input type="text" id="form1Example1" className="form-control" hidden={true} value={idcuentaa}  onChange={(e) => setidcuentaa(e.target.value)} />

</div>
<div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Cantidad</label>
        <input type="text" id="form1Example1" className="form-control" value={cantidada}  onChange={(e) => setcantidada(e.target.value)} />

  </div >
  <div className="form-outline mb-4">
  <label className="form-label" htmlFor="form1Example1" >Seleccione el tipo de pago</label>
  <div className="form-check">
  <input className="form-check-input" type="checkbox" value="Efectivo" checked={tipoPagoa === "Efectivo" ? true : false} onChange={(e)=>settipoPagoa(e.target.value)}/>
  <label className="form-check-label" htmlFor="flexCheckDefault">
  Efectivo
  </label>
</div>
<div className="form-check">
<input className="form-check-input" type="checkbox" value="Cheque" checked={tipoPagoa === "Cheque" ? true : false} onChange={(e)=>settipoPagoa(e.target.value)}/>
  <label className="form-check-label" htmlFor="flexCheckChecked">
  Cheque   
  </label>
</div>
<div className="form-check">
<input className="form-check-input" type="checkbox" value="Deposito"  checked={tipoPagoa === "Deposito" ? true : false} onChange={(e)=>settipoPagoa(e.target.value)}/>
  <label className="form-check-label" htmlFor="flexCheckDefault">
  Deposito
  </label>
</div>
<div className="form-check">
<input className="form-check-input" type="checkbox" value="Transferencia"  checked={tipoPagoa === "Transferencia" ? true : false} onChange={(e)=>settipoPagoa(e.target.value)}/>
  <label className="form-check-label" htmlFor="flexCheckChecked">
  Transferencia
  </label>
</div>
    
</div>



      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={()=>guardarAbono()} >Guardar</button>
      </div>
    </div>
  </div>
</div>

{/*final modal ingreso de cuenta */}

 < div className=" mt-1  row ">
     <div className="col-12 col-sm-12 col-md-5 col-lg-5 ">
        <div className="row mb-1 ">
          <SearchBar2
           onChange={Busqueda} 
           value={buscar} 
           placeholder="Buscar Proveedor..."  

          
          />
        
        </div>
        <div className="div-table">
<div className="table-wrap">
<table className="table-item ">
  <thead >
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
        
            <th>Opciones</th>
          </tr>
        </thead>
       <tbody>
      {datos.length > 0 ?
           datos.map((item,index) =>(
            <tr  key={index} onClick={()=>consultarCuenta(item.idProveedor)}>
               
               <td>{item.idProveedor}</td>
               <td>{item.empresa}</td>
             
            
            
               <td>
               
               <div className="d-flex dropdown justify-content-center alig-items-center">
               <i className="bi bi-three-dots " type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
   </i>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">

    
    <li  className="dropdown-item" data-bs-toggle="modal" data-bs-target="#cuentaModal" onClick={(e)=>abrirIngresoc(e.target,item.idProveedor)} >Ingresar Nueva Cuenta</li>
  </ul>
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
      </div>

      <div className="col-12 col-sm-12 col-md-7 col-lg-7 ">
     <h5>Cuentas por pagar al proveedor</h5>
     <div className="div-table">
     <div className="table-wrap">
<table className="table-subitem ">
  <thead >
          <tr>
          <th>#</th>
         
          <th>Fecha</th>
            <th>Cuenta</th>
            <th>Abono</th>
            <th>Total</th>

            <th>Estado</th>
            <th>Opciones</th>

          </tr>
        </thead>
       <tbody>
      {datosCuenta.length > 0 ?
           datosCuenta.map((item,index) =>(
            <tr  key={index}>
               
               <td>{item.idcuenta}</td>
             
             
               <td>{moment(item.fecha).format("DD-MM-YYYY")}</td>
               <td>{item.total}</td>
               <td>{item.total_abono}</td>
               <td>{item.saldo}</td>
               <td>{item.estado}</td>
            
              
                <td>
               
               <div className="d-flex dropdown justify-content-center alig-items-center">
               <i className="bi bi-three-dots " type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
   </i>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
    <li  className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#abonoModal" onClick={(e)=>abrirIngresoAbono(e.target,item.idcuenta)} >Agregar abono</li>
    <li  className="dropdown-item" data-bs-toggle="modal" data-bs-target="#abonodetalleModal" onClick={(e)=>abrirDetalleAbonos(e.target,item.idcuenta)} >Detalles de Abono</li>
   <li  className="dropdown-item" data-bs-toggle="modal" data-bs-target="#cuentaModal" onClick={(e)=>abrirActualizarC(e.target,item)} >Editar</li>
    <li  className="dropdown-item" onClick={()=>eliminarCuenta(item.idcuenta)}>elilminar</li>
    
  </ul>
</div>
               
               </td>
             </tr>
           ))
            :
          null
            }
      
       </tbody>
      </table>
      </div></div>
      </div>


      </div>
   

      



      
        </>
        

    );
        }
    export default Abono;
    