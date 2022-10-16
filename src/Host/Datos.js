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

    consultarInforme(tabla,datos){
    
        return  fetch(host+`${tabla}`,Header.headerPostCB(datos))
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