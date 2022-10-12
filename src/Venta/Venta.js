
import React, { useState, useEffect } from 'react';
import ls from "local-storage";
import moment from "moment";
import Datos from '../Host/Datos';
import swal from "sweetalert";
import {Quetzal} from '../Funciones/Moneda';
import SearchBar2 from '../Component/SearchBar2';
import printJS from 'print-js';




function Venta(props) {
    const [idFactura,setIdFactura]=useState("");
    const [idcliente,setIdCliente]=useState("");
    const [motivo_anulacion, setMotivo_anulacion] = useState("")
    const [estado, setEstado] = useState("Vendido")


    const [idEmpleado, setIdEmpleado] =useState("")
   
    const [fecha,setFecha]=useState("");
    const [idproducto, setIdproducto]=useState("");
    const [precioActual, setPrecioActual]=useState("");
 

    const [subtotal,setSubtotal]=useState(0.00);
    const [total,setTotal]=useState(0.00);
    const [descuento,setDescuento]=useState("");
    const [cambio,setCambio]=useState(0.00);
    const [recibido,setRecibido]=useState("");  
    
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState(""); 
    const [direccion, setDreccion] = useState("");
    const [nit, setNit] = useState(""); 
    const [sexo, setSexo] = useState(""); 
    const [estadoc, setEstadoc] = useState("Activo");

    const [datos, setdatos] = useState([]);
    const [encontrado, setencontrado] = useState([]);
    const [buscar, setbuscar] = useState("");
    const [datosv, setdatosv] = useState([]);
    const [datosc, setdatosc] = useState([]);
    const [precioCliente,setPrecioCliente]=useState(false);
    const [precios, setPrecios]=useState([]);
    const [nuevoPrecio,setNuevoPrecio]=useState("");
    const [visible, setvisible] = useState(false)
    const [clieteSelect, setclieteSelect] = useState([])
   

    useEffect(() => {
   

        consultarProducto();
        consultarCliente("primero");
        obneterEmpleado()
        setFecha(moment(new Date()).format("YYYY-MM-DD"));
   
     //  numero_orden();
    }, []);

 const  obneterEmpleado=()=> {    
  if(ls.get('usuario')!==null){
console.log(ls.get("usuario"))
      setIdEmpleado(ls.get("usuario").idempleado)
  }
}
/*
async function numero_orden() {
    let orden = await Datos.NumeroOrden()
    if(orden !== null) {
        if(orden.message==="Success"){
            console.log("numero de orde:" +orden.res[0].numero_orden)
            setIdFactura(orden.res[0].numero_orden);
        }
    }
    
}*/
    async function consultarProducto() {
        let dat = await Datos.Consulta("producto");
        if (dat !== null) {
          if(dat.message==="Success"){
            console.log( dat);
         

            setdatos(dat.res);
          }
        }
    }
    async function consultarCliente(position) {
        let datc = await Datos.Consulta("cliente");
    
        if (datc !== null) {
          setdatosc(datc.res);
 
          switch(position){
          case "primero":
            setIdCliente(datc.res[0].idcliente)
            break;
            case "ultimo":
            let ult=datc.res.length-1;
        
            setIdCliente(datc.res[ult].idcliente)
            break;
            default:
            break;
            }
        }
    
      }


    async function abrirIngreso(e) {
        limpiarCliente();
//        var modal = new bootstrap.Modal('#myModal')

  //     let mymodal=new bootstrap.Modal(document.getElementById("exampleModal"));
      var myInput = document.getElementById("exampleModal");
        e.addEventListener("shown.bs.modal", function (event) {
            myInput.focus();
        });
        
      

    }

 
    

async function guardarCliente(e){
  e.preventDefault();
      let data={
        idcliente:0,
        nombre:nombre,
        apellido:apellido,
        telefono:telefono,
        direccion:direccion,
     
        nit:nit,
        sexo:sexo,
        estado:estadoc
      }
       let cliented=await Datos.NuevoReg("cliente",data)
       if(cliented !== null){
           if(cliented.message ==="Success"){
             limpiarCliente();
           
             swal("Cliente ingresado con exito");
              consultarCliente("ultimo");
        }
       }
    }

 
    const limpiarCliente=()=>{
       // setidcliente("")
       //setIdCliente(0);
       setNombre("");
       setTelefono("");
       setApellido("");
       setDreccion("");
       setNit("");
       setSexo("");
       setEstadoc("Activo");
       
        
    }

    const Busqueda = (buscarTexto) => {
      
        let text = buscarTexto.replace(/^\w/, (c) => c.toLowerCase());
        setbuscar(buscarTexto);
        setdatos(encontrado.filter(function (item) {
            return item.nombre.toLowerCase().includes(text) || item.color.toLowerCase().includes(text) || item.estilo.toLowerCase().includes(text) || item.ubicacion.toLowerCase().includes(text);
        }).map(function ({ idproducto, nombre, presentacion, especificacion, stock,  cantidad_mimima,cantidad_maxima,estado,idlote, cantidad,precio_compra, precio_mayorista,precio_unidad, statuslote }) {
            return { idproducto, nombre, presentacion, especificacion, stock,  cantidad_mimima,cantidad_maxima,estado,idlote, cantidad,precio_compra, precio_mayorista,precio_unidad, statuslote }
        })
        );
    }

  
        
        const calcDescuento= (cantidad) => {
            setDescuento(cantidad)
            if(cantidad > 0){
            setTotal(subtotal-cantidad) 
            }else{
                setTotal(subtotal)
            }

        }

        const calcCambio= (cantidad) => {
            
            if(cantidad > total){
            setCambio(Math.abs(total-cantidad)) 
            }else{
                setCambio(0)
            }
            setRecibido(cantidad)
           
        }
      

        
const existeProducto = (data) => {
   // let existente=false;
    if(datosv.length > 0){
      for (let i in datosv){
        if(datosv[i].idproducto === data.idproducto && datosv[i].idlote===data.idlote){
          return true
        }
      }
    }
        /*datosv.map((item)=>{
            if(data.idproducto === item.idproducto){
            existente= true    
        }
        return true;
        })
    }
    return existente;*/
}
const AgregarNuevo = (data,cant) => {
    let newItem={
        "idproducto":data.idproducto,
        "descripcion":data.nombre + " " +data.presentacion + " "+ data.especificacion,
        "cantidad":cant,
        "precio": data.precio_unidad,  
        "total":cant*data.precio_unidad, 
        "idlote":data.idlote
      
    }

     let datosDeventas=returnDatosDeVenta(datosv,newItem);  
 
  setdatosv(datosDeventas);

    calcTotal(datosDeventas);
}

const returnDatosDeVenta = ( datosventa,newItem) => {
    let dts=datosventa;
    dts.push(newItem);
    return dts;
    
}

 const AgregarProducto=(data,cantidad) =>{

console.table(data)
console.log(cantidad)

if(!existeProducto(data)){
  for(let i in datos){
    if(datos[i].idproducto===data.idproducto && datos[i].idlote ===data.idlote){
      if(datos[i].cantidad >= cantidad){
        datos[i].cantidad =Number(datos[i].cantidad)- Number(cantidad);
        AgregarNuevo(data,cantidad);
        setdatos(datos =>[...datos]);
        setencontrado(datos);
      }
    }
  }

}else{
  console.log("ya existe"); 
  for(let i in datos){
    if(datos[i].idproducto===data.idproducto && datos[i].idlote ===data.idlote){
      if(datos[i].cantidad >= cantidad){
        datos[i].cantidad =Number(datos[i].cantidad)- Number(cantidad);
        AgregarUNO(data,cantidad);
        setdatos(datos =>[...datos]);
        setencontrado(datos);
      }
    }
  }
  
}

/*        datos.map((item) =>{
        if(item.idproducto === data.idproducto && item.idlote===data.idlote){
           if(item.cantidad >= cantidad){

            console.log(existeProducto(data))
           if(!existeProducto(data)){
               AgregarNuevo(data,cantidad);
               item.cantidad=Number(item.cantidad)-Number(cantidad); 
               setdatos(datos=>[...datos]);  
           setencontrado(datos);

           }
           }
          
       }
       return true;
    } );    
 */
          calcTotal(datosv)        
            }
  
const AgregarUNO = (data, cantidad) => { 
  datosv.map((item) =>{
    if(item.idproducto === data.idproducto && item.idlote === data.idlote){
            item.cantidad=Number(item.cantidad) +Number(cantidad);
         item.total=(Number(item.cantidad)* Number(item.precio));
        setdatosv(datosv=>[...datosv]);  
        calcTotal(datosv);
    }
    return true; 
});

}
            const AgregarCantidad= (data,cantidad) => {
                let newdatos;
                datosv.map((item) =>{
                    if(item.idproducto === data.idproducto && item.idlote === data.idlote){
                         if(cantidad >=1){
                            item.cantidad=cantidad;
                         item.total=(Number(item.cantidad)* Number(item.precio));
                            newdatos=item;
                        setdatosv(datosv=>[...datosv]);  
                        calcTotal(datosv);
                        }
                        if(cantidad === ""){
                            item.cantidad="";          
                            item.total=(Number(item.cantidad)* Number(item.precio));
                            newdatos=item;
                        setdatosv(datosv=>[...datosv]);  
                        calcTotal(datosv);
                        }
                   
                    }
                    return true; 
                });
               return newdatos;
        }
    
         
      
    const descontarCantidad = (data, cantidad) => {
        datos.map(item =>{
            if(item.idproducto === data.idproducto && item.idlote===data.idlote) {
                item.cantidad=Number(item.cantidad)+ Number(data.cantidad);
                if(item.cantidad >= cantidad){
                    item.cantidad=(Number(item.cantidad)-Number(cantidad));
                    AgregarCantidad(data,cantidad)
                    setdatos(datos => [...datos])
                }else{
                    AgregarCantidad(data,item.cantidad)
                    let anterior=Number(item.cantidad);
                    item.cantidad=(Number(item.cantidad)-Number(anterior));
                    setdatos(datos => [...datos]) 
                }
            }
            return true;
        }) 
    }
    
    

            const calcTotal=(data )=>{       
                   let subTotal=0;
                   data.map((item)=>{       
                   subTotal=(Number(subTotal)+ Number(item.total)).toFixed(2);
                    console.log("sutbotal: "+ subTotal);
                    return true;
                })
                setSubtotal(subTotal);
                setTotal(subTotal)
            }

      

const devolverProducto = (data) => {
// let result=false;
for (let i in datos){
  if(datos[i].idproducto && data.idproducto && datos[i].idlote === data.idlote){
    datos[i].cantidad=(Number(datos[i].cantidad)+Number(data.cantidad));
    setdatos(datos => [...datos]);
   // result =true
   return true;
  }
//  return result
}

  /*   let res=false;
   res=datos.map((item)=>{
              if(item.idproducto === data.idproducto && item.idlote === data.idlote){
                  item.cantidad=(Number(item.cantidad)+Number(data.cantidad));

                   setdatos(datos => [...datos])
                 
                   res= true;
              }
              return true;     
          });
          return res;*/
  
}


       const eliminar=(data)=>{
           console.log(data) 
          datosv.map((item, index)=>{
              if(data.idproducto===item.idproducto && data.idlote === item.idlote){
                  if(devolverProducto(data)){
                      console.log("numero de indice: " + index)
                  datosv.splice(index,1)     
                  calcTotal(datosv);
                  setdatosv(datosv=>[...datosv]);
                
                  }
              }
              return true;
          })

            }        
const detalleItem = (data,codigoFac) => {
  let item={
    "iddetalle":0,
    "idfactura":codigoFac,
    "idproducto":data.idproducto,
    "cantidad":data.cantidad,
    "precio":data.precio,
    "idlote":data.idlote

  }
 
  return item
}

 async function vender() {

let fact={
    "idfactura":0, 
    "idcliente": idcliente, 
    "motivo_anulacion":motivo_anulacion,
    "estado": estado 
   
}

    let ingresado=await Datos.NuevoReg("factura",fact);
    if(ingresado !== null){
       
        if(ingresado.message==="Success"){
          console.log(ingresado.res)
          let codfactura=ingresado.res[0].idfactura;
            await Promise.all(   
                datosv.map(async (item) =>{
                let row=detalleItem(item,codfactura)
                console.log(row)
                let detalleIngresado=await Datos.NuevoReg("detalle_factura",row);
                if(detalleIngresado !== null){
                    if(detalleIngresado.message === "Success" ){
                        console.log("detalle ingresado");
                    }
                }
            })
            )


  
    }
    }
  
    
   imprimirBoleta();
   
    
 }

const borraDatosVenta = () => {
    datosv.splice(0);
    setdatosv(datosv=>[...datosv]);
    setTotal("");
    setSubtotal("")
    setDescuento("")
    setCambio("")
    setRecibido("")

}

            
    
        

const ModificarPrecio=(data, nuevoPrecio)=>{
    datosv.map((item) =>{
        if(item.idproducto === data.idproducto && item.idlote === data.idlote){
            item.precio=nuevoPrecio;
            item.total=Number(item.cantidad)*Number(item.precio);
           
        }
        return true;
    })
     setdatosv(datosv => [...datosv]);
    calcTotal(datosv);
}
const ActualizarPrecio = (data) => {

   datosv.map((item) =>{
        if(item.idproducto === data.idproducto && item.idlote === data.idlote ){
            item.precio=obtenerNuevoPrecio(item)
            item.total=Number(item.cantidad)*Number(item.precio);
           
        }
        return true;
    })
 
     setdatosv(datosv => [...datosv]);
    calcTotal(datosv);  
}

const obtenerNuevoPrecio = (data) => { 
  for(let i in datos){
    if(datos[i].idproducto === data.idproducto && datos[i].idlote === data.idlote){
      let precio=data.precio === datos[i].precio_mayorista  ? datos[i].precio_unidad : datos[i].precio_mayorista;
      return precio
    }
  }
 }

const imprimirBoleta = async() => {
    swal("¡Desea imprimir el comprobante de venta?",
    {
        icon: "warning",
        buttons: {
          cancel: "No",
        Sí: true,
        },
      })
      .then((si) => {
        if (si) {
   
setvisible(true)
    return true;
 

        } else{
            consultarProducto();
          //  numero_orden();
            setIdCliente(datosc[0].idcliente);
            borraDatosVenta();
        }
      });
   
}


const nuevaVenta = () => {
  setvisible(false)
  consultarProducto();
  //numero_orden();
  setIdCliente(datosc[0].idcliente);
  borraDatosVenta();
  
 }
 const ClienteSelected=(idcliente)=>{
  setIdCliente(idcliente);
  console.log(idcliente)
  for(let i  in datosc){
    if(Number(datosc[i].idcliente) ===Number( idcliente)){
 setclieteSelect(datosc[i])
    }
  }
 }

return (
<div className="">
  {/**   */} 
  <div className={visible === true ? 'modal visible' : 'modal'}>
    
<div className='' id="fct" tabindex="-1">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{nuevaVenta()}}></button>
      </div>
      <div className="modal-body" id='boleta'>
      <div >   
        <h6 className="modal-title">Comprobante de compra</h6>   
            <p>{clieteSelect !== undefined ? 'Cliente: '+clieteSelect.nombre+" "+clieteSelect.apellido : "Cliente: ________________"} </p>
            <p>{clieteSelect !== undefined ? 'Nit: '+clieteSelect.nit+" " : "Nit: CF"} </p>
            <p>{clieteSelect !== undefined ? 'Dirección: '+clieteSelect.direccion+" " : "Dirección: Ciudad"} </p>
            <p>Productos: </p>
<hr/>
        </div>

 <div className="colfac">
                    <table className="table">
                  
                        <thead >
                            <tr>
                                <th >cantidad</th> 
                                <th >Descripcion</th>
                                <th >precio</th>
                                <th  >Subtotal</th>
                             
                                
                            </tr>
                        </thead>
                        <tbody>
                            {datosv ? datosv.map((item,index) => (
                            <tr key={index} >
                          <td  >{item.cantidad}</td>
                                <td  >{item.descripcion}</td>
                               
                                <td  >{item.precio}</td>
                                
                                
                               
                                <td >{item.total}</td>   
                              
                            </tr>
                            ))
                            : null
                            }
                        </tbody>
                    </table>
                </div>
    <hr/>
    <div className="rowfoot" id="rowfoot">
    <div className="colf">
    
                    <span>Subtotal: {"Q "+subtotal+" "}</span>
                    </div>
                    <div className="colf">   
                    <span>Descuento: { "Q "+ descuento}</span> 
                    </div>                   
                    <div className="colf">
                    <span>Total: {"Q "+total+" "} </span> 
                    </div> 
    </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>nuevaVenta()}>Salir</button>
        <button type="button" className="btn btn-primary" onClick={()=>{nuevaVenta(); printJS("boleta","html")}}>Imprimir</button>
      </div>
    </div>
  </div>
</div>
  </div>

  
        
    
   {/**modal para ingreso de cliente */}

  <form
          className="modal fade "
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
          onSubmit={(e)=>{guardarCliente(e)}}
          
        >
  <div className="modal-dialog modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de Cliente</h5>

        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo </label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idcliente} onChange={(e) => setIdCliente(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
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
 

  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Número de Nit</label>
  
        <input type="text"  id="form1Example1" className="form-control" value={nit}  onChange={(e) => setNit(e.target.value)} required/>
      
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
  <input className="form-check-input" type="radio" name="estado" id="inlineRadio3" value={estadoc} checked={estadoc === "Activo" ? true : false} onChange={() => setEstadoc("Activo")} selected/>
  <label className="form-check-label" htmlFor="inlineRadio3">Activo</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="estado" id="inlineRadio4" value={estadoc} checked={estadoc === "No Activo" ? true : false} onChange={() => setEstadoc("No Activo")}/>
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
{/** fin del modal de ingreso cliente 
  * ---------------------------------------------------------------------------
  * comienzo del modal de precio 
 */}
 
 <div className="modal fade "  id="precioModal" tabIndex="-1" aria-labelledby="precioModalLabel" aria-hidden="true"  >
  <div className="modal-dialog  modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Seleccione el Precio</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
    
        <input type="text" id="form1Example1" className="form-control" value={idproducto}  hidden={true} onChange={()=>{}} />
   <label className="form-label" htmlFor="form1Example1" >Precio actual: Q{precioActual}</label>
  </div>

  <div className="form-outline mb-4">
      <h6>Precio por Rollo</h6>
      {precios ? 
      <select className="form-select" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={nuevoPrecio} onChange={(e)=>setNuevoPrecio(e.target.value)}>
      <option value="" >Seleccionar precio</option>
     { precios.map((item, index) =>(
        
      <option key={index} value={item.preciorollo} >{" " +item.preciorollo}</option>
     
      ))
     }
 </select>
      
      :null}
     
  </div>
  <div className="form-outline mb-4">
      <h6>Precios por yarda</h6>
      {precios ? 
      <select className="form-select" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={nuevoPrecio} onChange={(e)=>setNuevoPrecio(e.target.value)}>
       <option value="" >Seleccionar precio</option>
     { precios.map((item,index) =>(
        
      <option key={index} value={item.precioyarda} >{" " +item.precioyarda}</option>
     
      ))
     }
 </select>
      
      :null}
     
  </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>ActualizarPrecio()} >Aplicar</button>
      </div>
    </div>
  </div>
</div>
 {/** final del modal precio  _____________________________________________________*/}
 
    <div className="row">
 
        <div className="col-12 col-sm-12 col-md-9 col-lg-9">
          
    
        <h6>Lista de producto Disponible</h6>
        <SearchBar2
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar producto..."  
          
            />  

            <div className="col div-secc">
                <div className="table-wrap ">
                    <table className="table-item" >
                        
                        <thead >
                            <tr >
                                <th>#</th>
                                <th>Descripción</th>
                                <th>Cantidad</th>                                
                                <th>P/Mayorista</th>
                                <th>P/Unidad</th>                             
                                <th>Vence</th>
                            </tr>
                        </thead>
                        <tbody >
                            {datos ? datos.map((item,index) => (
                                <tr key={index} onClick={()=>{AgregarProducto(item,1)}}>
                                    <td >{item.idproducto}</td>
                                    <td >{item.nombre+ " "} {item.presentacio+ " "} {item.especificacion}</td>
                                    <td >{item.cantidad}</td>    
                                    <td >{Quetzal(item.precio_mayorista)}</td> 
                                    <td >{Quetzal(item.precio_unidad)}</td>
                                    <td >{item.vence}</td>
                                  
                                </tr>
                            ))
                            : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
<h6 className="text-black mt-3" >Lista de producto del cliente</h6>
            <div className="col div-secc "> 
            
                <div className="table-wrap">
                    <table className="table-subitem">
                  
                        <thead >
                            <tr>
                                <th></th>
                                <th>Descripcion</th>
                                <th>Cantidad</th> 
                                <th>Precio</th>
                                <th></th>
                                <th>Subtotal</th>
                                <th>Acción</th>
                             
                                
                            </tr>
                        </thead>
                        <tbody>
                            {datosv ? datosv.map((item,index) => (
                            <tr key={index} >
                                <td></td>
                                <td>{item.descripcion}</td>   
                                <td>
                                  
                                  <input type="number" className="input-val"  value= {item.cantidad} onChange={(e)=>{descontarCantidad(item,e.target.value)}}/>
                                  </td>
                                <td>
                                 
                                  <input type="number" className="input-val"  value={item.precio}  onChange={(e)=>{ModificarPrecio(item,e.target.value)}}/>
                                
                                 </td>
                                <td>
                                    <i className="bi bi-arrow-left-right icon-option"   aria-hidden="true" onClick={()=> ActualizarPrecio(item)}></i>
                                </td>
                                <td >{item.total}</td>   
                            
                                <td >
                                <i className="bi bi-trash-fill icon-option"   aria-hidden="true" onClick={()=> eliminar(item, item.idproducto)}></i>
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

  <div className="col-12 col-sm-12 col-md-3 col-lg-3 div-cobro">
          
  <div className="h-contain ">     
  <h5>Seleccionar cliente</h5>
              <div className="row">
              <div className="col-9">  
                  <select className="form-select form-select-sm" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={idcliente} onChange={(e)=>ClienteSelected(e.target.value)}>
                         {datosc ? datosc.map((item,index) =>(
                         <option key={index} value={item.idcliente} data-tokens={item.nombre}>{item.nombre+ " " +item.apellido}</option>))
                         :
                        null
                          }
                    </select>
              </div>
              <div className="col-3">
                  <button type="button" className="ml-2 btn btn-warning btn-sm" id='abrirModal' data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={(e)=>abrirIngreso(e.target)} >+</button>               
                  {/**data-bs-toggle="modal" data-bs-target="#exampleModal" */}
              </div> 
              </div>                                    
       </div>
       <hr/>
  <div className="row mb-2 mt-3">
  <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">Subtotal</label>
    <div className="col-sm-8">
    <label className="form-control"  >Q {subtotal } </label>
    </div>
  </div>

  <div className="row mb-2">
    <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">Descuento:</label>
    <div className="col-sm-8">
      <input type="number" className="form-control" value={descuento} onChange={(e)=>calcDescuento(e.target.value)}/> 
    </div>
  </div>
  <div className="row mb-2">
    <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">Total:</label>
    <div className="col-sm-8">
      <label  className="form-control tag-total" >Q {total}</label> 
    </div>
  </div>
  <div className="row mb-2">
    <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">Recibido:</label>
    <div className="col-sm-8">
      <input type="number" className="form-control" value={recibido} onChange={(e)=>calcCambio(e.target.value)}/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">Cambio:</label>
    <div className="col-sm-8">
      <label  className="form-control" >Q {cambio }</label>
    </div>
  </div>
  <div className="row d-flex justify-content-center">
    <button type="button" className="btn btn-primary w-75 mb-2 " onClick={() =>vender("Vendido","Tienda")} >Vender</button>
   </div> 
     
</div>


    </div>
    {/**detalles del comprobante de venta 
    <div className="rowfacd" id="facturas">
        <div>
            <h5>Comprobante  compra</h5>
            
        </div>

 <div className="colfac">
                    <table className="table">
                  
                        <thead >
                            <tr>
                                <th >cantidad</th> 
                                <th >Descripcion</th>
                                <th >precio</th>
                                <th  >Subtotal</th>
                             
                                
                            </tr>
                        </thead>
                        <tbody>
                            {datosv ? datosv.map((item,index) => (
                            <tr key={index} >
                          <td  >{item.cantidad}</td>
                                <td  >{item.descripcion}</td>
                               
                                <td  >{item.precio}</td>
                                
                                
                               
                                <td >{item.total}</td>   
                              
                            </tr>
                            ))
                            : null
                            }
                        </tbody>
                    </table>
                </div>
  
    <div className="rowfoot" id="rowfoot">
    <div className="colf">
                    <span>Subtotal: {"Q "+subtotal+" "}</span>
                    </div>
                    <div className="colf">   
                    <span>Descuento: { "Q "+ descuento}</span> 
                    </div>                   
                    <div className="colf">
                    <span>Total: {"Q "+total+" "} </span> 
                    </div> 
    </div>
</div>
*/}
</div>


    );
}
export default Venta;