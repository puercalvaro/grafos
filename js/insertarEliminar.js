var Vertices=[]
var Aristas=[]
var MatrizAdy=[]
var matrizCam=[]

var setVertice = function (){
    // Valor ingresado
    var name = document.getElementById("insertarVertice").value;
    // Validacion
    var validacion=0;
    for(i=0;i<Vertices.length;i++){
        if(name==Vertices[i]){
          validacion=-1
        }
    }
    if(name==""){
       validacion=-1
    }
    // Lo inserta en el array
    if(validacion==0){
        Vertices.push(name);
        // Log
        console.log("Vertice ingresado: "+name);
    }
    else {
      alert("Error al ingresar el vertice");
    }
}

var setArista = function (){
    // Ingreso de valores
    var inicio = document.getElementById('insertarInicioArista').value;
    var termino = document.getElementById('insertarTerminoArista').value;
    var dirigido = document.getElementById('dirigido').checked;
    var pesoArista = document.getElementById('insertarPesoArista').value;
    // Validacion
    cont=0;
    validacion=-1;
    for(i=0;i<Vertices.length;i++){
        if( (Vertices[i]==inicio)||(Vertices[i]==termino)){
            cont++;
        }
     }
     if((cont==2) && (pesoArista%1==0) && (pesoArista>=1)){
       validacion=0;
     }
    // Lo inserta en el array
    if (validacion == 0){
        Aristas.push([inicio,termino,dirigido,pesoArista]);   
        // Log
        console.log("Arista ingresado:"+"\nInicio: "+inicio+"\nTermino: "+termino+"\nPeso de la arista: "+pesoArista+"\n¿Dirigido?: "+dirigido);
    }
    else {
        alert("Error al ingresar la arista");
    }
}

var removeVertice = function (){
    // Valor a eliminar
    var name = document.getElementById("removerVertice").value;
    // Validacion
    var validacion=0;
    for(i=0;i<Vertices.length;i++){
        if(name == Vertices[i]){
          validacion=0
        }
    }
    if(name == ""){
        validacion=-1
     }
    // Lo elimina del array (vertices y aristas relacionadas)
    if (validacion == 0) {
        var index=0;
        while(index<Vertices.length){      
          if(name==Vertices[index]){
            Vertices.splice(index,1);
          }
          index++;
        }
        index=0;
        while(index<Aristas.length){
              if((name==Aristas[index][0])||(name==Aristas[index][1])){  
                Aristas.splice(index,1);
                index=0;
              }
              index++;
        }
        console.log("Vertice eliminado: "+name)
    }
    else {
        alert ("Error al remover el vertice");
    }
}

var removeArista = function (){
    // Valor a eliminar
    var inicio = document.getElementById("removerInicioArista").value;
    var termino = document.getElementById('removerTerminoArista').value;
    // Validacion
    cont=0;
    validacion=-1;
    for(i=0;i<Vertices.length;i++){
        if( (Vertices[i]==inicio)||(Vertices[i]==termino)){
            cont++;
        }
     }
     if((cont==2) && (pesoArista%1==0) && (pesoArista>=1)){
       validacion=0;
     }
    // Procede a eliminar
    if (validacion == 0){
        var index=0;
        while(index<Aristas.length){
            if((nombre==Aristas[index][0])&&(nombre2==Aristas[index][1])&&(tipo==Aristas[index][2])&&(tamaño==Aristas[index][3])){
             Aristas.splice(index,1);
            }
            index++;
        } 
        // Log
        console.log("Arista eliminada:"+"\nEntre: "+inicio+" y Termino: "+termino);
    }
    else {
        alert("Error al remover la arista");
    }
}