import React,{useState,useContext, useEffect} from 'react'
import { CuentaContext, DataContext } from '../Context/Context';
import swal from 'sweetalert';
import Datos from '../Host/Datos';
import DropDown from '../Component/DropDown';
import { ObtenerTipoPago,ConvetirPagoAData } from '../Funciones/Funciones';
import moment from 'moment';
import ls from 'local-storage';

function FormPago(ConsultaAbono, ConsultarCuenta) {
    const [idabono, setIdAbono] = useState("");
    const [idcuenta, setIdCuenta] = useState("");
    const [idempleado, setIdEmpleado] = useState(ls.get("usuario").idempleado);
    const [concepto, setConcepto] = useState("");
    const [monto, setMonto]=useState("");
    const [tipo_pago, setTipo_pago]=useState("");
    const [comprobante, setComprobante]=useState("");
    const [mora, setMora]=useState("");
    const [estado, setEstado] = useState("Cancelado");
    const [prox_pago, setProx_Pago] =useState("");
    const [datos, setdatos] = useState([]);  

    const [tipoPago, setTipoPago] = useState([]);
    const [filterTipoPago, setFilterPago] = useState([]);

    const [buscarTipoPago, setBuscarTipoPago] =useState("");
    
const {selectedCuenta, selectedAbono, accion,setAccion} =useContext(CuentaContext);

useEffect(()=>{
  setIdEmpleado(ls.get("usuario").idempleado)
    CunsultaTipoPago();
   // AbrirActualizar();
},[])




    const limpiar=()=>{
     
        setIdAbono(0) ;
        setIdCuenta(0);
      //  setIdEmpleado("");
        setMonto("");
        setConcepto("");
      setTipo_pago("")
      setComprobante("")
        setBuscarTipoPago("")
        setEstado("Cancelado");
        setAccion("new")
      }
      const Ingresar=async()=>{
        let datos={
          idabono:0,
          idcuenta: selectedCuenta.idcuenta,
          idempleado:idempleado,
          concepto:concepto,
          monto:monto,
          tipo_pago:tipo_pago,
          comprobante:comprobante,
          //fecha:moment(fecha).format("YYYY-MM-DD"),
          mora:mora,
          prox_pago:moment(new Date()).format("YYYY-MM-DD"),
          estado:estado
        }
     
        let Abono=await Datos.NuevoReg("abono",datos);
        if(Abono !== null){
          if(Abono.message==="Success"){
            swal("Abono","Ingresdo exitosamente","success");
            limpiar();
            ConsultaAbono(true,selectedCuenta.idcuenta)
            ConsultarCuenta();
          }else{
            swal("Abono","No se pudo Ingresar, verifique los datos","warning");
          }
        }
      }
      const Actualizar=async()=>{
        let datos={
          idabono:idabono,
          idcuenta: selectedCuenta.idcuenta,
          idempleado:idempleado,
          concepto:concepto,
          monto:monto,
          tipo_pago:tipo_pago,
          comprobante:comprobante,
          //fecha:moment(fecha).format("YYYY-MM-DD"),
          mora:mora,
          prox_pago:moment(new Date()).format("YYYY-MM-DD"),
          estado:estado
        }
        console.log(datos);
        let Abono=await Datos.ActualizarReg("abono",datos);
        if(Abono !== null){
          if(Abono.message==="Success"){
            swal("Abono","Ingresdo exitosamente","success");
            limpiar();
            ConsultarCuenta();
            ConsultaAbono(true,selectedCuenta.idcuenta);
          }else{
            swal("Abono","No se pudo Ingresar, verifique los datos","warning");
          }
        }
      }
      const GuardarCambios=()=>{
        if(accion==="new"){
          Ingresar();
        }else{
          Actualizar();
        }
      }
      
const CunsultaTipoPago = async() => {
    const datosPago=await Datos.Consulta("tipoPago");
    if(datosPago !==null){
  setTipoPago(datosPago.res);
  setFilterPago(datosPago.res)
    }
  }
      const AbrirActualizar=()=>{
        console.log(selectedAbono)
        if(selectedAbono.length > 0){
          console.log(selectedAbono)
       let TipoActual=ObtenerTipoPago(tipoPago,datos.tipo_pago)
       setBuscarTipoPago(TipoActual.nombre);
  //setCuentaSeleccionada(datos)
  setIdAbono(selectedAbono.idabono)
  setIdCuenta(selectedAbono.idcuenta);
  setIdEmpleado(selectedAbono.idempleado);
  setConcepto(selectedAbono.concepto);
  setMonto(selectedAbono.monto);
  setTipo_pago(selectedAbono.tipo_pago);
  setComprobante(selectedAbono.comprobante);
  setMora(selectedAbono.mora)
  setEstado(selectedAbono.estado)
  setAccion("update");
  
        }
      }

      const BusquedaPago=(e)=>{
    let buscarTexto=e.target.value;
    setBuscarTipoPago(buscarTexto);
    let text=buscarTexto.replace(/^\w/,(c) =>c.toLowerCase());
    setBuscarTipoPago(buscarTexto);
    
    setTipoPago(filterTipoPago.filter((item)=>{ 
        return   item.nombre.toLowerCase().includes(text) ;   
      }).map(({idtipopago, nombre})=>{
        return{idtipopago, nombre}
      })
     );
    
      }
  return (
 
    <div className="modal-dialog modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de Abono</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo de abono</label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idabono} onChange={(e) => setIdAbono(e.target.value)} />

  </div>
 
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Concepto</label>
        <input type="text" id="form1Example1" className="form-control" value={concepto}  onChange={(e) => setConcepto(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
  <label className="form-label" htmlFor="form1Example1" >Monto</label>
      <div className='input-group'>
          <span className="input-group-text">Q</span>
          <input type="text" id="form1Example1" className="form-control" value={monto}  onChange={(e) => setMonto(e.target.value)} />
          <span className="input-group-text">.00</span>
      </div>
       
  </div>

  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Tipo de Pago</label>
      <DropDown 
        dato = {ConvetirPagoAData(tipoPago)} 
        selected={tipo_pago} 
        setSelected={setTipo_pago}  
        value={buscarTipoPago}  
        setValue={setBuscarTipoPago} 
        onChange={BusquedaPago}
      />
  
   
      

  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Comprobante</label>
        <input type="text" id="form1Example1" className="form-control" value={comprobante}  onChange={(e) => setComprobante(e.target.value)} />

  </div>
  <label className="form-label" htmlFor="form1Example1" >Mora</label>
      <div className='input-group'>
          <span className="input-group-text">Q</span>
          <input type="text" id="form1Example1" className="form-control" value={mora}  onChange={(e) => setMora(e.target.value)} />
          <span className="input-group-text">.00</span>
      </div>

  
  <div className="form-outline mb-4 center">
       <label className="form-label" htmlFor="form1Example1">Estado</label>
       <div className="form-outline mb-4">
        <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={estado} checked={estado === "Cancelado" ? true : false} onChange={() => setEstado("Cancelado")} selected/>
  <label className="form-check-label" htmlFor="inlineRadio1">Cancelar</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={estado} checked={estado === "Atrasado" ? true : false} onChange={() => setEstado("Atrasado")}/>
  <label className="form-check-label" htmlFor="inlineRadio2">Atrasado</label>
  </div>
</div>

  </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={()=>GuardarCambios()} >Guardar</button>
      </div>
    </div>
  </div>
  )
}

export default FormPago