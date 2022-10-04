const Decimal=(numero, opciones)=>{
    opciones=opciones || {};

    opciones.separadorDecimal=opciones.separadorDecimal || ".";
 
    opciones.numeroDecimal=opciones.numeroDecimal >=0 ? opciones.numeroDecimal : 2;
   
    const cifraMiles=3;
    
    //redondear y y convetirlo a cadema
    let numeroCadena=numero ? numero.toFixed(opciones.numeroDecimal) : "0.00";
    
    //comenzar desde la izquierda de la cadena 
    let posicionSeparador=numeroCadena.indexOf(opciones.separadorDecimal);
    if(posicionSeparador === -1) posicionSeparador=numeroCadena.length;
    let formatoSinDecimal="", indice=posicionSeparador;
    
    //ir contando de  3 en 3  comenzando desde la derecha
     while(indice>=0){
        let limiteInferior = indice - cifraMiles;
        //agregar separador si ya contamos 3
        formatoSinDecimal =(limiteInferior > 0 ? "": "") + numeroCadena.substring(limiteInferior,indice)+formatoSinDecimal;
        indice -= cifraMiles;
     }
     //armamo el resultado 
     let formatoSinSimbolo =`${formatoSinDecimal}${numeroCadena.substr(posicionSeparador,opciones.numeroDecimal +1)}`;
    
    //colocamos el simbolo y retornamos la cantidad
     return  formatoSinSimbolo ;
    }
    

const MonedaSS=(numero, opciones)=>{
    opciones=opciones || {};

    opciones.separadorDecimal=opciones.separadorDecimal || ".";
    opciones.separadorMiles=opciones.separadorMiles || ",";
    opciones.numeroDecimal=opciones.numeroDecimal >=0 ? opciones.numeroDecimal : 2;
   
    const cifraMiles=3;
    
    //redondear y y convetirlo a cadema
    let numeroCadena=numero ? numero.toFixed(opciones.numeroDecimal) : "0.00";
    
    //comenzar desde la izquierda de la cadena 
    let posicionSeparador=numeroCadena.indexOf(opciones.separadorDecimal);
    if(posicionSeparador === -1) posicionSeparador=numeroCadena.length;
    let formatoSinDecimal="", indice=posicionSeparador;
    
    //ir contando de  3 en 3  comenzando desde la derecha
     while(indice>=0){
        let limiteInferior = indice - cifraMiles;
        //agregar separador si ya contamos 3
        formatoSinDecimal =(limiteInferior > 0 ? opciones.separadorMiles : "") + numeroCadena.substring(limiteInferior,indice)+formatoSinDecimal;
        indice -= cifraMiles;
     }
     //armamo el resultado 
     let formatoSinSimbolo =`${formatoSinDecimal}${numeroCadena.substr(posicionSeparador,opciones.numeroDecimal +1)}`;
    
    //colocamos el simbolo y retornamos la cantidad
     return  formatoSinSimbolo ;
    }
    
const Moneda=(numero, opciones)=>{
opciones=opciones || {};
opciones.simbolo=opciones.simbolo || "Q";
opciones.separadorDecimal=opciones.separadorDecimal || ".";
opciones.separadorMiles=opciones.separadorMiles || ",";
opciones.numeroDecimal=opciones.numeroDecimal >=0 ? opciones.numeroDecimal : 2;
opciones.posicionSimbolo=opciones.posicionSimbolo || "i";
const cifraMiles=3;

//redondear y y convetirlo a cadema
let numeroCadena=numero ? numero.toFixed(opciones.numeroDecimal) : "0.00";

//comenzar desde la izquierda de la cadena 
let posicionSeparador=numeroCadena.indexOf(opciones.separadorDecimal);
if(posicionSeparador === -1) posicionSeparador=numeroCadena.length;
let formatoSinDecimal="", indice=posicionSeparador;

//ir contando de  3 en 3  comenzando desde la derecha
 while(indice>=0){
    let limiteInferior = indice - cifraMiles;
    //agregar separador si ya contamos 3
    formatoSinDecimal =(limiteInferior > 0 ? opciones.separadorMiles : "") + numeroCadena.substring(limiteInferior,indice)+formatoSinDecimal;
    indice -= cifraMiles;
 }
 //armamo el resultado 
 let formatoSinSimbolo =`${formatoSinDecimal}${numeroCadena.substr(posicionSeparador,opciones.numeroDecimal +1)}`;

//colocamos el simbolo y retornamos la cantidad
 return opciones.posicionSimbolo ==="i" ? opciones.simbolo + formatoSinSimbolo : formatoSinSimbolo + opciones.simbolo;
}

const Dolar=(cantidad)=>{
    let opciones={
    numeroDecimal:2,
    separadorDecimal:".",
    separadorMiles: ",",
    simbolo:"$",
    posicionSimbolo:"i"}
    return Moneda(cantidad,opciones);
}
const Quetzal=(cantidad)=>{
    let opciones ={
    numeroDecimal:2,
    separadorDecimal:".",
    separadorMiles: ",",
    simbolo:"Q",
    posicionSimbolo:"i",}
    return Moneda(cantidad,opciones);
}
export {Quetzal, Dolar,MonedaSS,Decimal}