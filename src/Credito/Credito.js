import React,{useEffect, useState} from 'react'
import SearchBar2 from '../Component/SearchBar2';
import Datos from '../Host/Datos';
import moment from 'moment';
import swal from 'sweetalert';
import { ConvertirAMoneda } from '../Funciones/Funciones';

function Credito() {
  const [datos, setdatos] = useState([]);  
  const [encontrado, setencontrado] = useState([]);
  const [buscar, setbuscar] = useState("");
  const [datosAbono, setDatosAbono]=useState([]);
  const[selectedCredit,setSelectedCredit]=useState("");
      /**datos del abono ;*/
const [idabono, setidabono] = useState("");
const [idcredito, setidcredito] = useState("");
    const [cantidada, setcantidada] = useState("");
    const [tipoPagoa, settipoPagoa] = useState("Efectivo");
    const [comprobantea, setcomprobantea] = useState("")
    const [accionAbono, setaccionAbono] = useState("new")
const [resumenTotal, setResumenTotal]=useState(0);
const[resumenAbono, setResmunAbono] =useState(0);
const resumeSaldo=Number(resumenTotal)-Number(resumenAbono);


  useEffect(()=>{
ConsultarCredito()
  },[])
  

  const ConsultarCredito=async()=>{
    const datosC=await Datos.Consulta("credito");
    if(datosC!==null){
      if(datosC.message==="Success"){
      console.log(datosC.res);
      setdatos(datosC.res);
      setencontrado(datosC.res)
      resumenCredito(datosC.res)
      }else{
        setdatos([]);
      setencontrado([])
      resumenCredito([])
      }
    }
  }

  const ConsultaAbono=async(id)=>{
    
    setSelectedCredit(id)
    setidcredito(id)
const datosA=await Datos.ConsutaID("abonocredito",id);
console.log(datosA)
if(datosA!==null){
  if(datosA.message==="Success"){
    setDatosAbono(datosA.res)
  }else{
    setDatosAbono([])
  }

}
  }
  


  async function guardarAbono(){
    if(accionAbono ==="new"){
    let rowabono={
  "idabono":0,
  "idcredito":idcredito,
  "abono":cantidada,
  "tipopago":tipoPagoa,
  
    }
    let abono=await Datos.NuevoReg("abonocredito",rowabono);
    if(abono !== null){
      if(abono.message ==="Success"){
        swal("Abono","Ingresado con exito","success");
        ConsultarCredito();
        ConsultaAbono(selectedCredit)
        
      }else{
        swal("Abono","No se pudo ingresar, verifique que los datos sean correcto","warning");
      }
    }}else{
      let rowabonos={
        "idabono":idabono,
        "idcredito":idcredito,
        "abono":cantidada,
        "tipopago":tipoPagoa,
      
          }
          let abono=await Datos.ActualizarReg("abonocredito",rowabonos);
          if(abono !== null){
            if(abono.message ==="Success"){
              swal("Abono","Actualizado con exito","success");
              ConsultarCredito();
        ConsultaAbono(selectedCredit)
        
            }
          }
    }
  }

  
const abrirActualizaA = (e,item) => {
  setidabono(item.idabono);
  setidcredito(item.idcredito);
  setcantidada(item.abono);
  settipoPagoa(item.tipopago);

  setaccionAbono("update");

  var myInput = document.getElementById("abonoModal");
  e.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  });  
}


async function eliminarAbono(codigo){
  let abonoeliminado=await Datos.BorrarReg("abonocredito",codigo);
  if(abonoeliminado !== null){
    if(abonoeliminado.message==="Success"){
      ConsultarCredito();
        ConsultaAbono(selectedCredit)
    }
  }
}
const resumenCredito=(datos)=>{
  let t_total=0;
  let t_abono=0;
  if(datos.length>0){
    for (let i in datos){
      t_total=Number(t_total)+Number(datos[i].total);
      t_abono=Number(t_abono)+Number(datos[i].abono);
    }
    setResmunAbono(t_abono);
    setResumenTotal(t_total);
    return
  }
  setResmunAbono(0)
  setResumenTotal(0)

}
async function eliminarCredito(codigo){
  let cuentaeliminado=await Datos.BorrarReg("credito",codigo);
  if(cuentaeliminado !== null){
    if(cuentaeliminado.message==="Success"){
      ConsultarCredito();
      ConsultaAbono(0)
    }
  }
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
  return (
    <>
        <h6>Credito de cliente</h6>
      <div className='secc_info'>
      <div className='contain-status' >
 <div className='div-inversion'>
<label className='title-card-info'>Total de credito</label>
<label className='desc-card-info'>{ConvertirAMoneda(resumenTotal)}</label>
 </div>
 <div className='div-ventas'>
 <label className='title-card-info'>Cantidad abonoda</label>
<label className='desc-card-info'>{ConvertirAMoneda(resumenAbono)}</label>
 </div>
 <div className='div-ganancia'>
 <label className='title-card-info'>Saldo pendiente</label>
<label className='desc-card-info'>{ConvertirAMoneda(resumeSaldo)}</label>
 </div>
 </div>
      </div>
        <div className='row'>
            <div className='col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7  h-100'>
                <div>
                  <SearchBar2
                  placeholder="Buscar Cliente..."
                  value={buscar}
                  onChange={Busqueda}
                  />
                </div>
                
<div className="div-table">
<div className="table-wrap">
  
<table className="table-item ">
  <thead >
          <tr>
            <th>#</th>
            <th>Nombre</th> 
            <th>Total</th> 
            <th>Abono</th> 
            <th>Saldo</th>
            <th>estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
       <tbody>
      { datos.length > 0 ?
           datos.map((item,index) =>(
            <tr key={index} onClick={()=>ConsultaAbono(item.idcredito)}>
               
               <td>{item.idcredito}</td>
               <td>{item.nombre}</td>
               <td>{item.total}</td>
               <td>{item.abono}</td>
               <td>{Number(item.total)-Number(item.abono)}</td>

               {item.estado === "Activo" ? <td ><p className="activo">{item.estado}</p></td>:
               <td ><p className="noactivo">{item.estado}</p></td>
                }
               
               <td>
               <div className="d-flex dropdown justify-content-center alig-items-center">
  <i className="bi bi-three-dots " type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
  </i>
  <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton2">
  <li  className="dropdown-item" data-bs-toggle="modal" data-bs-target="#abonoModal" onClick={()=>{setSelectedCredit(item.idcredito); setidcredito(item.idcredito)}}>Agregar Pago</li>
  <li  className="dropdown-item" onClick={()=>eliminarCredito(item.idcredito)}>elilminar</li>
      
   
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
          
      <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 ">
        <div className='row mb-1'>
     <h5>Pagos realizados </h5>
  

     </div>
     <div className="div-table">
     <div className="table-wrap">
<table className="table-subitem ">
  <thead >
          <tr>
          <th>#</th>
             <th>Abono</th>
    
            <th>tipo/pago</th>
        
            <th>Fecha</th>

         
            <th>Opciones</th>

          </tr>
        </thead>
       <tbody>
      {datosAbono.length > 0 ?
           datosAbono.map((item,index) =>(
            <tr  key={index} >
               
               <td>{item.idabono}</td>
             <td>{item.abono}</td>
             <td>{item.tipopago}</td>
               <td>{moment(item.fecha).format("DD-MM-YYYY")}</td>
               
               
              
            
              
                <td>
               
               <div className="d-flex dropdown justify-content-center alig-items-center">
               <i className="bi bi-three-dots " type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
   </i>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
   <li  className="dropdown-item" data-bs-toggle="modal" data-bs-target="#abonoModal" onClick={(e)=>abrirActualizaA(e.target,item)} >Editar</li>
    <li  className="dropdown-item" onClick={()=>eliminarAbono(item.idabono)}>elilminar</li>
  
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

             {/* ingreso de  ingreso de abonos */}
         
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
     <input type="text" id="form1Example1" className="form-control" hidden={true} value={idcredito}  onChange={(e) => setidcredito(e.target.value)} />

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

         {/* fin de modal de ingreso de abonos */}
        {/**formulario modales*/}
         {/* ingreso de ceuntas */}
         
         {/* fin de modal de ingreso de cuentas */}
       
          {/* ingreso de  ingreso de detalle de abonos */}
         
         {/* fin de modal de ingreso de detalle de abonos */}
    </>
  )
}

export default Credito