import host from "../Host/Host";
import Header from "../Host/Header";

class Datos{
    Consulta(table){
        return fetch(`${host+table}/view`,Header.headerGets())
        .then(response => response.json())
        .then((respDatos)=>respDatos)
        .catch((error) =>error);
    }

    ConsutaID(table, id){
        return fetch(`${host+table}/view/${id}`,Header.headerGets())
        .then(response=>response.json())
        .then((respDatos) => respDatos)
        .catch((error) =>error);
    }
    ConsutaIDUser(table, id){
        return fetch(`${host+table}/emp/${id}`,Header.headerGets())
        .then(response=>response.json())
        .then((respDatos) => respDatos)
        .catch((error) =>error);
    }
    NuevoReg(table,datos){
        return fetch(`${host+table}`,Header.headerPostCB(datos))
        .then(response =>response.json())
        .then((respDatos)=> respDatos)
        .then((error)=>error);
    }
    ActualizarReg(table,datos){
        return fetch(`${host+table}/update`,Header.headerPostCB(datos))
        .then(response =>response.json())
        .then((respDatos)=>respDatos)
        .catch((error)=>error);
    }
    BorrarReg(table, id){
        return fetch(`${host+table}/delete/${id}`,Header.headerGets())
        .then(response=>response.json())
        .then((respDatos)=>respDatos)
        .catch((error)=> error);
    }
    ConsultaUser(data){
        return fetch(`${host}usuario/login`,Header.headerPostCBL(data))
        .then(respnse =>respnse.json())
        .then(respDatos =>respDatos)
        .catch((error)=>error);
    }
    ConsultaPermiso(id){
        return fetch(`${host}permiso/emp/${id}`,Header.headerGets())
        .then(response=>response.json())
        .then((respDatos)=>respDatos)
        .catch((error)=>error);
    }
    ConsultaAbonoXP(id){
        return fetch(`${host}abono/viewxp/${id}`,Header.headerGets())
        .then(response=>response.json())
        .then((respDatos)=>respDatos)
        .catch((error)=>error);  
    }

    UploadImg(datos){
        console.log(datos)
        const formDatos=new FormData();
        formDatos.append('foo',datos);
         
        return fetch(host+'img/upload',{
         method:"POST",
        
         body:formDatos
        })
         .then((response)=>response.json())
         .then(result => result)
         .catch((error)=>console.log("error: "+error))
    }
    ViewImg(name){
      return  fetch(`${host}imgs/view/${name}`,{
            method: 'GET',
            mode:'cors',
            headers:{
              'Accept': 'application/json',
              "X-Content-Type-Options": "nosniff"
           


            },
           
          })
          .then((response)=>response)
          .then(resdatos=>resdatos)
          .catch((error)=>console.log(error))  
    }
    
    DeleteImg(name){
return  fetch(`${host}/img/delete/${name}`,{
            method: 'GET',
            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
           
          })
          .then((response)=>response.json())
          .then(resdatos=>resdatos)
          .catch((error)=>console.log(error))
    }

    consultarInforme(datos){
    
        return  fetch(host+`informe`,Header.headerPostCB(datos))
                  .then(response => response.json())
                  .then((responsedatos) => responsedatos)
                  .catch((error) => error);
      }
      
      ConsultaInfo(table){
        return fetch(`${host+table}/view`,Header.headerGETCBI())
        .then(response => response.json())
        .then((respDatos)=>respDatos)
        .catch((error) =>error);
    }
}
export default new Datos();