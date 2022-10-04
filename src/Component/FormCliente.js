import React,{useState,useEffect,useContext} from 'react'
import swal from 'sweetalert';
import Datos from '../Host/Datos';

function FormCliente(consulta, datosCL) {
    const [idcliente, setIdCliente] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState(""); 
    const [direccion, setDreccion] = useState("");
    const [dpi, setDpi] = useState("");
    const [f_perfil, setF_perfil] = useState(); 
    const [f_casa, setF_casa] = useState();
    const [f_dpi, setF_dpi] = useState();
    const [ubicacion, setUbicacion] = useState(""); 
    const [estado, setEstado] = useState("Activo");
    const [latitudes, setLatitudes] =useState("");
    const [longitudes, setLongitudes] =useState("");
    const [linkMap, setLinkMap]=useState("");
    

    const [datos, setdatos] = useState([]);  
    const [encontrado, setencontrado] = useState([]);
    const [buscar, setbuscar] = useState("");
    const [accion, setAccion] = useState("new");

    const [getIDPI, setGetIDPI] = useState("");
    const [getICASA, setGetICASA] = useState("");
    const [getIPERFIL, setGetIPERIL] = useState("");
    const[prev_perfil, setPrev_perfil]=useState();
const [prev_casa, setPrev_casa ]   =useState();
const [prev_dpi, setPrev_dpi ]   =useState();
const[classTag, setClassTag]=useState("tag_copy")

  
const getUbicacion=()=>{

    navigator.permissions.query({name:'geolocation'}).then(function(result) {
      
      if (result.state == 'granted') {
        navigator.geolocation.getCurrentPosition(MostrarPosicion,MostraError);
    
        report(result.state);
    //    geoBtn.style.display = 'none';
      } else if (result.state == 'prompt') {
        report(result.state);
      //  geoBtn.style.display = 'none';
        navigator.geolocation.getCurrentPosition(MostrarPosicion,MostraError);
      } else if (result.state == 'denied') {
        report(result.state);
        
        navigator.geolocation.getCurrentPosition(MostrarPosicion,MostraError);
        //geoBtn.style.display = 'inline';
      }
      result.addEventListener('change', function() {
        report(result.state);
      });
    });
    } 
    
    
    
    function report(state) {
      console.log('Permission ' + state);
    }
      const MostrarPosicion = (position) => { 
        setUbicacion(position.coords.latitude+","+position.coords.longitude);
       }
    const MostraError = (error) => { 
    switch(error.code){
    case  error.PERMISSION_DENIED: 
    swal("Aviso","No se puede obtener la ubicación, por favor habilite los permisos","warning");
    break;
    case error.POSITON_UNAVAILABLE:
    swal("Aviso","La ubicacion no esta disponible","warnind");
    break;
    case error.TIMEOUT:
    swal("Aviso","Se agoto el tiepo para obtener la ubicación","warning");
    break;
    case error.UNKNOWN_ERROR:
    swal("Aviso","Hubo un error al intentar obtener la ubicacion","warning");
    break;
    default:
    break;
    }
     }

     const SubirImagen =async (file) => { 
        const datosImg=await Datos.UploadImg(file);
        if(datosImg !== null) {
         if(datosImg.message !== "Success"){
           swal("Aviso","No se pudo cargar la imagen","error");
         }
        }
       }
       const Preview = (file,setPreview) => { 
       setPreview(file.url)
       }
       
       const GetPreview = (file,setPreview) => { 
         let reader=new FileReader();
         reader.onloadend=function(e){
           setPreview(reader.result)
         }
         reader.readAsDataURL(file)
       }
        
         
       const VerImagen = async (name,tipo) => { 
       const datosImg=await Datos.ViewImg(name);
       if(datosImg){
         console.log(datosImg)
        switch(tipo){
         case "Dpi":
           Preview(datosImg,setGetIDPI)
           //setGetIDPI(URL.createObjectURL(datosImg));
           break;
           case "Casa":
             Preview(datosImg,setGetICASA)
             //setGetICASA(URL.createObjectURL (datosImg));
             break;
             case "Perfil":
               Preview(datosImg,setGetIPERIL)
               //setGetIPERIL(URL.createObjectURL (datosImg));
               break;
         default:
           break;
        }
       }else{
         swal("Aviso","No se encotro la imgane","warning");
       }
       
        }
       const BorarImagen = async (name) => { 
         const datosImg =await Datos.DeleteImg(name);
         if(datosImg){
           if(datosImg.message ==="Archivo eliminado"){
             
           }
         }
        }
           const limpiar=()=>{
             setIdCliente(0);
             setNombre("");
             setTelefono("");
             setApellido("");
             setEstado("Activo");
           }
           const Ingresar=async()=>{
             const fperfil=f_perfil;
             const fdpi=f_dpi;
             const fcasa=f_casa;
             console.log(fcasa)
             let datos={
               idcliente:0,
               nombre:nombre,
               apellido:apellido,
               telefono:telefono,
               direccion:direccion,
               dpi:dpi,
               f_perfil:f_perfil.name,
               f_casa:f_casa.name,
               f_dpi:f_dpi.name,
               ubicacion:ubicacion,
               estado:estado
             }
          
             let cliente=await Datos.NuevoReg("cliente",datos);
             if(cliente !== null){
               if(cliente.message==="Success"){
                 console.log(fperfil)
                 SubirImagen(fperfil);
                 SubirImagen(fcasa);
                 SubirImagen(fdpi);
       
                 swal("Cliente","Ingresdo exitosamente","success");
                limpiar();
                 consulta();
               }else{
                 swal("Cliente","No se pudo Ingresar, verifique los datos","warning");
               }
             }
           }
           const Actualizar=async()=>{
             let datos={
               idcliente:idcliente,
               nombre:nombre,
               apellido:apellido,
               telefono:telefono,
               direccion:direccion,
               dpi:dpi,
               f_perfil:f_perfil.name,
               f_casa:f_casa.name,
               f_dpi:f_dpi.name,
               ubicacion:ubicacion,
               estado:estado
             }
             console.log(datos);
             let cliente=await Datos.ActualizarReg("cliente",datos);
             if(cliente !== null){
               if(cliente.message==="Success"){
                 swal("Cliente","Ingresdo exitosamente","success");
                 limpiar();
                 consulta();
               }else{
                 swal("Cliente","No se pudo Ingresar, verifique los datos","warning");
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
  return (
    
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
    <label className="form-label" htmlFor="form1Example1" >Nombre</label>
 
        <input type="text" id="form1Example1" className="form-control" value={nombre}  onChange={(e) => setNombre(e.target.value)} />
       
</div>
<div className="form-outline mb-4">
    <label className="form-label" htmlFor="form1Example1" >Apellido</label>

      <input type="text" id="form1Example1" className="form-control" value={apellido}  onChange={(e) => setApellido(e.target.value)} />
    

</div>
<div className="form-outline mb-4">

     <label className="form-label" htmlFor="form1Example1" >Telefono</label>
      <input type="text" id="form1Example1" className="form-control" value={telefono}  onChange={(e) => setTelefono(e.target.value)} />

</div>
<div className="form-outline mb-4">
    <label className="form-label" htmlFor="form1Example1" >Dirección</label>
 
        <input type="text" id="form1Example1" className="form-control" value={direccion}  onChange={(e) => setDreccion(e.target.value)} />
       
</div>
<div className="form-outline mb-4">
    <label className="form-label" htmlFor="form1Example1" >Numero de DPI</label>

      <input type="text" id="form1Example1" className="form-control" value={dpi}  onChange={(e) => setDpi(e.target.value)} />
    

</div>
<div className="form-outline mb-4">
        <label for="formFile" className="form-label" htmlFor="form1Example1" >Foto del Cliente</label>
      <div className="custom-file"> 
  <input type="file" className="form-control"  id="formFile"  aria-describedby="inputGroupFileAddon01" name={f_perfil} onChange={(e)=>{setF_perfil(e.target.files[0]); GetPreview(e.target.files[0],setPrev_perfil)}} />
  <img src={prev_perfil} alt="..." height={50} width={50}></img>
</div>

    {/**   <input type="text" id="form1Example1" className="form-control" value={f_perfil}  onChange={(e) => setF_perfil(e.target.value)} />
*/} 
</div>

<div className="form-outline mb-4">
    <label for="formFile" className="form-label" htmlFor="form1Example1" >Foto  de la casa</label>
    <div className="custom-file">
  <input type="file" className="form-control"  id="formFile" aria-describedby="inputGroupFileAddon01" name={f_casa} onChange={(e)=>{setF_casa(e.target.files[0]); GetPreview(e.target.files[0],setPrev_casa)}}/>
  <img src={prev_casa} alt="..." height={50} width={50}></img>
</div>
         {/**  <input type="text" id="form1Example1" className="form-control" value={f_casa}  onChange={(e) => setF_casa(e.target.value)} />
   */}     
</div>

<div className="form-outline mb-4">
    <label className="form-label" htmlFor="form1Example1" >Foto del DPI</label>
    <div className="custom-file">
      
  <input type="file" className="form-control"  id="formFile" aria-describedby="inputGroupFileAddon01" name={f_dpi} onChange={(e)=>{setF_dpi(e.target.files[0]); GetPreview(e.target.files[0],setPrev_dpi)}}/>
  <img src={prev_dpi} alt="..." height={50} width={50}></img>
</div>
    {/**    <input type="text" id="form1Example1" className="form-control" value={f_dpi}  onChange={(e) => setF_dpi(e.target.value)} />
    */}  

</div>
<div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" >Ubicación</label>
     <div className='input-group'>
     <input type="text" className="form-control" placeholder="ej: 14.02,-90.3" disabled={true} aria-label="Recipient's username" aria-describedby="basic-addon2" value={ubicacion}  onChange={(e) => setUbicacion(e.target.value)}/>
<span className="input-group-text" id="basic-addon2" onClick={()=>{getUbicacion()}}><i className='bi bi-geo-alt-fill'></i> </span>
</div>

    

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
      <button type="button" className="btn btn-primary" onClick={()=>GuardarCambios()} >Guardar</button>
    </div>
  </div>
</div>
  )
}

export default FormCliente