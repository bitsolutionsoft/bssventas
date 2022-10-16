
import { Chart,

  LineElement,
  
  PointElement,
 
  LineController, 
  CategoryScale,
  LinearScale,
 
  Title} from 'chart.js'
import React, { useState,useEffect } from 'react';
import moment from "moment";
import swal from "sweetalert";

import Datos  from '../Host/Datos';


function Informe(props)  {

  Chart.register(LineController, LineElement, PointElement, LinearScale, Title,CategoryScale);

  const [fechainicio, setfechainicio] = useState("");
  const [fechaFinal, setfechaFinal] = useState("");

  const [datosVentas, setdatosVentas] = useState([]);
  const [datosGanacias, setdatosGanacias] = useState([]);
  const [masVendido, setMasVendido] = useState([]);

const [myChart, setmyChart] = useState("")

const [detalle, setDetalle] = useState([]);


  useEffect(() => {
//datosGrafica();
}, [])

const traducir = (params) => {

  switch (params.toString().toLowerCase()) {
    case "monday":
      return "lunes";
    case "tuesday":
      return "martes";
    case "wednesday":
      return "miercoles";
    case "thursday":
      return "jueves";
    case "friday":
      return "viernes";
    case "saturday":
      return "sabado";
    case "sunday":
      return "domingo";
    case "january":
      return "enero";
    case "february":
      return "febrero";
    case "march":
      return "marzo";
    case "april":
      return "abril";
    case "may":
      return "mayo";
    case "june":
      return "junio";
    case "july":
      return "julio";
    case "august":
      return "agosto";
    case "september":
      return "septiembre";
    case "october":
      return "octubre";
    case "november":
      return "noviembre";
    case "december":
      return "diciembre";
    default:
      return params;
      
  }
  
}

const verInforme = (params) => {
  switch(params){
    case "Dia":
      ventas(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"dia")
      ganacias(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"gdia")
      infoVentas(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"ventaxsem")
      masvendidos(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"hoy")
      break;
      case "Semana":
        ventas(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"semana")
        ganacias(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"gsemana")
        infoVentas(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"ventaxmes")
        masvendidos(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"semana")
        break;
        case "Mes":
          ventas(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"mes")
          ganacias(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"gmes")
          infoVentas(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"ventaxanio")
          masvendidos(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"mes")
          break;
          case "Rango":
            if(fechaFinal !=="" && fechainicio !==""){
            ventas(0,moment(fechainicio).format("YYYY-MM-DD"),moment(fechaFinal).format("YYYY-MM-DD"),"rango")
            ganacias(0,moment(fechainicio).format("YYYY-MM-DD"),moment(fechaFinal).format("YYYY-MM-DD"),"grango")
            infoVentas(0,moment(fechainicio).format("YYYY-MM-DD"),moment(fechaFinal).format("YYYY-MM-DD"),"ventaxranm")
            masvendidos(0,moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD"),"rango")
            }else{
              swal("Aviso","Por favor de seleccionar la fecha inical y fecha final", "success");
            }
            break; 
            default:
            break;
  }
  
}


async function verDetalle (item,e)  {
 
  let detalle=await Datos.ConsutaID("detalle_factura/byfac", item.idfactura) ;
  if(detalle !== null){
    console.log(detalle)
      if(detalle.message ==="Success"){
          setDetalle(detalle.res);
      }
  }
  
  var myInput = document.getElementById("exampleModal");
  e.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  });
}

async function ventas(idfac,fecha1,fecha2,accion){
  let informe={
    "id": idfac,
    "finicial":fecha1,
    "ffinal":fecha2,
    "accion":accion,
  }
  let dventas=await Datos.consultarInforme('informe/',informe);
  console.log(dventas)
  if(dventas!== null){
    if(dventas.message==="Success"){
 
      setdatosVentas(dventas.res)
    }
  }

}


async function ganacias(idfac,fecha1,fecha2,accion){
  let informe={
    "id": idfac,
    "finicial":fecha1,
    "ffinal":fecha2,
    "accion":accion,
  }
  let dventas=await Datos.consultarInforme('informe/',informe);
  console.log(dventas)
  if(dventas!== null){
    if(dventas.message==="Success"){
      setdatosGanacias(dventas.res)
    }
  }

}

async function infoVentas(idfac,fecha1,fecha2,accion){
  let informe={
    "id": idfac,
    "finicial":fecha1,
    "ffinal":fecha2,
    "accion":accion,
  }
  let dventas=await Datos.consultarInforme('informe/',informe);
  console.log(dventas)
  if(dventas!== null){
    if(dventas.message==="Success"){
    
      //setdatosinfoVentas(dventas.res)
      //setdataDatos(returnData(dventas.res));
      //setlabelsDatos(returnLabel(dventas.res));
graficarDatos(dventas.res);
     
    }
  }
}


async function masvendidos(idfac,fecha1,fecha2,accion){
  let informe={
    "id": idfac,
    "finicial":fecha1,
    "ffinal":fecha2,
    "accion":accion,
  }
  let dventas=await Datos.consultarInforme('informe/masvendido',informe);
  console.log(dventas)
  if(dventas!== null){
    if(dventas.message==="Success"){
      setMasVendido(dventas.res)
    }
  }

}
  const returnLabel = (datos) => {
    let labels=[];
    datos.map(item=>{
      labels.push(traducir(item.nombre));
      return true;
    })
    return labels;
  }
  
const returnData = (datos) => {
  let data=[];
  datos.map(item=>{
    console.log(item.total)
    data.push(item.total);
    return true;
  })
  return data;
}



  const graficarDatos = (datos) => {
/**configuracion de  la grafica */ 
//etiquetas
const labels = returnLabel(datos);
console.log(labels)
//datos
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Ventas',
      data:returnData(datos),
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      yAxisID: 'y',
    },
  
  ]
};
//configuracion de la grafica
    const config = {
      type: 'line',
      data: data,
      options: {
       
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: "Ventas"       
           },
           legend:{
            position:'top'
           }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
    
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        }
      },
    };


    //obtner el id del canva de la grafica
    const ctx = document.getElementById('myChart').getContext('2d');
    //crear grafica y mardar los parametros
  

let chart = Chart.getChart('myChart');
if (typeof chart !== 'undefined') {
  chart.destroy() // Does not show anything because of this line, comment it out to show again
}
setmyChart( new Chart(ctx,config));

 
   
  }
  

return(
    <div className="vh-100">
    <div className="mb-2">   <h5 className="modal-title">Informe</h5></div>

     <div className="row mb-2">

     <div className="col-12"> 
               <div className="form-check form-check-inline">
               <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Por Dia"  onClick={(e)=>verInforme("Dia")}/>
                  <label className="form-check-label" htmlFor="exampleRadios1">Por Día</label>
               </div>
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Por semana"  onClick={(e)=>verInforme("Semana")} />
                 <label className="form-check-label" htmlFor="exampleRadios2">Por semana</label>
               </div>
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="Por mes"  onClick={(e)=>verInforme("Mes")}/>
                 <label className="form-check-label" htmlFor="exampleRadios3">Por mes</label> <br/>
               </div> 
               
               </div>         
            </div>


            <div className="col-12">
           <div className="row d-flex">

            <div className="form-outline mb-4 col-4">
<div className='input-group'>
          <span className="input-group-text">Fecha inicial</span>
          <input type="date" className="form-control form-control-sm" value={fechainicio} onChange={(e)=>setfechainicio(moment(e.target.value).format("YYYY-MM-DD"))}/>
          
      </div>
       
  </div>

  <div className="form-outline mb-4 col-4" >
      <div className='input-group'>
          <span className="input-group-text">Fecha final</span>
          <input type="date"  id="exampleFormControlInput1"  className="form-control form-control-sm"  value={fechaFinal} onChange={(e)=>setfechaFinal(moment(e.target.value).format("YYYY-MM-DD"))}/>
          
      </div>
       
  </div>

<div className="col-auto">
<button type="button" className="ml-1 me-2 btn btn-success" onClick={()=>verInforme("Rango")} >Buscar</button>
<button type="button" className="ml-1 btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleMasVendido">Producto mas vendido</button>
</div> 
</div>
 </div>            
<div className="row">
 

</div>
    
</div>
<div >
 
<table className="table-subitem">
  <thead >
          <tr>
            <th></th>
            <th>Ventas</th>
            <th>Inversion</th>
             <th>Ganacia</th>
           
          </tr>
        </thead>
       <tbody>
  {datosGanacias ?
datosGanacias.map((item,index)=>(
  <tr  key={index} >  
  <td></td>          
  <td>{item.ventas > 0 ? item.ventas.toFixed(2) : null}</td>
  <td>{item.compra > 0 ? item.compra.toFixed(2) : null}</td> 
  <td>{item.ganancia > 0 ? item.ganancia.toFixed(2) : null}</td>
</tr>
))

: null
}
</tbody>
      </table>
  
</div>
<div className="row vh-70">

<div className="row w-100 h-50 ">
  <h5>Grafica de ventas</h5>
<canvas id="myChart" width="400" height="330"></canvas>
</div>

<div className="row w-100 h-50 ">
  <h5>Historial de ventas</h5>

  <div className="div-table">
<div className="table-wrap">
  
<table className="table-item ">
  <thead >
          <tr>
          <th>#</th>
            <th>Fecha</th>
            <th>Cliente</th>
             <th>Total vendido</th>
            <th>Detalle</th>
           
          </tr>
        </thead>
       <tbody>
  {datosVentas ?
datosVentas.map((item,index)=>(
  <tr  key={index} > 
  <td>{item.idfactura}</td>           
  <td>{moment.utc(item.fecha).format("DD/MM/YYYY")}</td>
  <td>{item.cliente}</td> 
  <td>{item.total}</td>
  <td ><i   className="bi bi-info-circle-fill icon-option" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>verDetalle(item,e.target)}></i></td>

</tr>
))

: null
}
</tbody>
      </table>
</div>
</div>
</div>

</div>
 
{/**modal de detalle producto */}
<div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-xl">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Detalle de la venta</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="table-wrap">
      <table className="table-item">
        <thead >
            <tr>
              <th>Código</th>
              <th>No. de lote</th>
              <th>Descripción</th>         
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal </th>
            </tr>
          </thead>
         <tbody>
        { detalle ?
             detalle.map((item, index) =>(
              <tr key={index} >
                 <td>{item.id_producto}</td>
                 <td>{item.idlote}</td>
                  <td>{item.descripcion}</td>
                 <td>{item.cantidad}</td>  
                 <td>{item.precio}</td>
                 <td>{item.subtotal}</td>
               </tr>
             )) 
             : null
             
        
             }
        
         </tbody>
        </table>

      </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Salir</button>
      
      </div>
    </div>
  </div>
</div>
{/**final del modal */}

{/**modal de producto mas vendido */}
<div className="modal fade " id="exampleMasVendido" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-xl">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Producto mas vendido</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="table-wrap">
      <table className="table-item">
        <thead >
            <tr>
              <th>Codigo</th>
              <th>Descripción</th>
              <th>Cantidad</th>
           
            </tr>
          </thead>
         <tbody>
        { masVendido.length >0  ?
             masVendido.map((item, index) =>(
              <tr key={index} >
                 <td>{item.id_producto}</td>
                 <td>{item.nombre}</td>
                  <td>{item.cantidad_vendida}</td>
              
               </tr>
             )) 
             : null
             
        
             }
        
         </tbody>
        </table>

      </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Salir</button>
      
      </div>
    </div>
  </div>
</div>
{/**final del modal  prodcuto mas vendido*/}
 </div>

    );
}

export default Informe;