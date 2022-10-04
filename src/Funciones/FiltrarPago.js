import moment from "moment";
const PagosPorFecha = (datos,fecha) => { 
    
     let newDatos=[];
for(let i in datos){   
       
  
if(moment(datos[i].fecha).format("YYYY-MM-DD")===moment(fecha).format("YYYY-MM-DD")){
   newDatos.push(datos[i])
}
}
return newDatos;
 }

const TiposDePago = (datos, tipo) => { 
    let newDatos;
    for(let i in datos){
        if(datos[i].estado ===tipo){
            newDatos.push(datos[i]);
        }
    }
    return newDatos;
 }
 const GetTotal = (datos,fecha,estado) => { 
let total=0;
console.log(fecha,estado)
for(let i in datos){
    if(moment(datos[i].fecha).format("YYYY-MM-DD")===moment(fecha).format("YYYY-MM-DD") && datos[i].estado===estado){
        total=total+(datos[i].monto + datos[i].mora);
    }
}
return total;
  }

export {PagosPorFecha,TiposDePago,GetTotal}