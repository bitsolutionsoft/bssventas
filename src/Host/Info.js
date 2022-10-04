
import Datos from "./Datos";


let Info={
    id:"",
    nombre:"",
    descripcion:"",
    direccion:"",
    mora:"",
    diasmora:"",
};

async function  ConsultarInfo (newDatos)  { 

    let datos=await Datos.ConsultaInfo("ajuste");
    if(datos!==null){
        if(datos.message==="Success"){
        console.log(datos.res[0])
        newDatos.nombre=datos.res[0].nombre;
        newDatos.id=datos.res[0].id;
        newDatos.descripcion=datos.res[0].descripcion;
        newDatos.direccion=datos.res[0].direccion;
        newDatos.mora=datos.res[0].mora;
        newDatos.diasmora=datos.res[0].diasmora;

        //  newDatos.push(datos.res[0])
          
        }
    }
 
    } 



ConsultarInfo(Info)
console.log(Info)
/*
var Nombre=newDatos.nombre
var Descripcion=newDatos.descripcion;
var Direccion=newDatos.direccion;
var Desarrollador="BitSolutionSoft";
var Mora=newDatos.mora;
var DiasPasado=newDatos.diasmora;
console.log(newDatos)*/


export {Info}