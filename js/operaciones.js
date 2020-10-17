var Vertices=[]
var Aristas=[]
var MatrizAdy=[]
var MatrizCam=[]

// Tabla de la pagina
var mostarVertices = document.getElementById("verticesTabla");
var tablaVertices = [];
var mostarAristas = document.getElementById("aristasTabla");
var tablaAristas = [];

var setVertice = function (){
    var verticeIngresado = document.getElementById("insertarVertice").value;
    var validacion=0;
    // Valida que el valor ingresado no este repetido ni sea nulo
    for(i=0;i<Vertices.length;i++){
        if(verticeIngresado == Vertices[i]){
          validacion=-1;
          console.error("ERROR: Vertice '"+verticeIngresado+"' Repetido");
          alert("Error al ingresar el vertice.\nVertice repetido");
        }
    }
    if(verticeIngresado==""){
       validacion=-1
       console.error("ERROR: Vertice ingresado nulo");
       alert("Error al ingresar el vertice.\nVertice nulo");
    }
    // Si la validacion es correcta, Lo inserta en el array de Vertices
    if(validacion == 0){
        Vertices.push(verticeIngresado);
        console.log("Vertice ingresado: "+verticeIngresado);
        // Lo ingresa en la tabla de la pagina
        tablaVertices.push("<tr>"+verticeIngresado+"</tr>")
        mostarVertices.innerHTML = tablaVertices;
    }
}

var setArista = function (){
    var inicio = document.getElementById('insertarInicioArista').value;
    var termino = document.getElementById('insertarTerminoArista').value;
    var dirigido = document.getElementById('dirigido').checked;
    var pesoArista = document.getElementById('insertarPesoArista').value;
    // Valida que existan los vertices en el array Vertices
    cont=0;
    validacion=-1;
    for(i=0;i<Vertices.length;i++){
        if( (Vertices[i] == inicio) || (Vertices[i] == termino)){
            cont++;
        }
    }
    if((cont == 2) && (pesoArista%1 == 0) && (pesoArista >= 1)){
      validacion=0;
    }
    else{
       console.error("Error al ingresar la arista, uno de los vertices no se encuentra en el array");
       alert("Error al ingresar la arista.\nUno de los vertices no se encuentra en el array.");
    }
    // Si la validacion es correcta, Lo inserta en el array de Aristas
    if (validacion == 0){
        Aristas.push([inicio,termino,dirigido,pesoArista]);   
        console.log("Arista ingresado:"+"\n\tInicio: "+inicio+"\n\tTermino: "+termino+"\n\tPeso de la arista: "+pesoArista+"\n\t¿Dirigido?: "+dirigido);
        // Lo ingresa en la tabla de la pagina
        tablaAristas.push("<tr><td>"+inicio+"</td><td>"+termino+"</td><td>"+dirigido+"</td><td>"+pesoArista+"</td></tr>")
        mostarAristas.innerHTML = tablaAristas;
    }
}

var removeVertice = function (){
    var verticeRemovido = document.getElementById("removerVertice").value;
    var validacion=1;
    // Valida que el vertice ingresado exista en el array Vertices y que no sea nulo
    for(i=0;i<Vertices.length;i++){
        if(verticeRemovido == Vertices[i]){
          validacion=0;
        }
    }
    if(verticeRemovido == ""){
        validacion=-1;
        console.error("ERROR: Vertice ingresado nulo");
        alert("Error al remover el vertice.\nVertice ingresado nulo");
    }
    // Si la validacion es correcta, procede a remover
    if (validacion == 0) {
        // Lo elimina del array Vertices
        var index=0;
        while(index<Vertices.length){
          if(verticeRemovido == Vertices[index]){
            Vertices.splice(index,1);
            tablaVertices.splice(index,1);
          }
          index++;
        }
        // Lo elimina de las  aristas relacionadas
        index=0;
        while(index<Aristas.length){
              if((verticeRemovido==Aristas[index][0])||(verticeRemovido==Aristas[index][1])){  
                tablaAristas.splice(index,1);
                Aristas.splice(index,1);
                index=0;
              }
              index++;
        }
        console.log("Vertice eliminado: "+verticeRemovido);
        mostarVertices.innerHTML = tablaVertices;
        mostarAristas.innerHTML = tablaAristas;
    }
}

var removeArista = function (){
    var removerInicio = document.getElementById('removerInicioArista').value;
    var removerTermino = document.getElementById('removerTerminoArista').value;
    var removerDireccion = document.getElementById('removerDirigido').checked;
    var removerPesoArista = document.getElementById('removerPesoArista').value;
    // Valida que tanto el vertice inicial como el final existan en el array 'Vertices'
    cont=0;
    validacion=-1;
    for(i=0;i<Vertices.length;i++){
        if( (Vertices[i]==removerInicio)||(Vertices[i]==removerTermino)){
            cont++;
        }
    }
    if((cont==2) && (removerPesoArista%1==0) && (removerPesoArista>=1)){
      validacion=0;
    }
    else{
      alert("Error al remover la arista");
      console.error("Error al remover la arista");
    }
    // Si la validacion es correcta, procede a eliminar
    if (validacion == 0){
      var index=0;
      while(index<Aristas.length){
        if((removerInicio == Aristas[index][0]) && (removerTermino == Aristas[index][1])(removerDireccion == Aristas[index][2]) && (removerPesoArista == Aristas[index][3])){
          tablaAristas.splice(index,1);
          Aristas.splice(index,1);
        }
        index++;
      }
      console.log("Arista eliminada:"+"\n\tEntre: "+removerInicio+" y Termino: "+removerTermino);
      mostarAristas.innerHTML = tablaAristas;
    }
}

function buscarindex(nombre){
  for(index=0;index<Vertices.length;index++){
    if(nombre==Vertices[index]){
      return index;
    } 
  }
}

function MultiplicaMatriz(matrizA,matrizB,matrizResultado){
  for(i=0;i<Vertices.length;i++){
    for(j=0;j<Vertices.length;j++){
      matrizResultado[i][j]=0;
      for(k=0;k<Vertices.length;k++){
        matrizResultado[i][j]+=matrizA[i][k]*matrizB[k][j];
      }
    }   
  }
}

function SumaMatriz(matrizA,matrizB,matrizResultado){
  for(i=0;i<Vertices.length;i++){
    for(j=0;j<Vertices.length;j++){
      matrizResultado[i][j]=matrizA[i][j]+matrizB[i][j];
    }
  }
}

function MatrizAdyacencia() {
  for(var i=0; i<Vertices.length; i++) {
       MatrizAdy[i]=new Array();
  } 
  for(var i=0; i<Vertices.length; i++) {
    for(var j=0; j<Vertices.length; j++) {
      MatrizAdy[i][j]=0 
    }
  }
  for(var i=0;i<Aristas.length;i++){
    if(Aristas[i][2]==false){  
      var aux1=Aristas[i][0];
      var aux2=Aristas[i][1];
      aux1=buscarindex(aux1);
      aux2=buscarindex(aux2); 
      MatrizAdy[aux1][aux2]+=1;
      MatrizAdy[aux2][aux1]+=1;
    }else{
      var aux1=Aristas[i][0];
      var aux2=Aristas[i][1];
      aux1=buscarindex(aux1);
      aux2=buscarindex(aux2); 
      MatrizAdy[aux1][aux2]+=1;
    }
  }
}

function Conexo(){
  cont=Vertices.length;
  vali=true;
  if(Vertices.length == 0 && Aristas.length== 0){
    vali=false;
  }
  for(var i=0;i<Vertices.length;i++){
    for(var j=0;j<Vertices.length;j++){
      if(MatrizAdy[i][j]==0){
        cont--;
        if(cont==0){
          vali=false;
        }
      }
    }
    cont=Vertices.length;  
  }
  if(vali==true){
    console.log("El grafo es conexo");
    return true;
  }else{
    console.log("El grafo no es conexo");
    return false;
  }
}

function mostarMatrizCaminos(){
  var numeroIngresado= document.getElementById("matrizCamino").value;
  // Valida que el valor ingresado sea un numero entero y positivo
  var validacion=false;
  if((numeroIngresado%1==0) && (numeroIngresado>=0)){
    validacion=true;
  }
  else {
    alert("ERROR: El numero ingresado no es correcto");
    console.error("ERROR calculando la matriz de caminos: El numero ingresado no es correcto");
  }
  if(validacion == true){
    // Crea y rellena la matriz de adyacencia
    MatrizAdyacencia();
    // Definir y "llenar" matrices auxiliares
    MAUX=[]
    for(var i=0;i<Vertices.length;i++){
      MAUX[i]=new Array();
    }
    // Llenar la primera matriz auxiliar con una copia de la matriz adyacencia
    for(var i=0;i<Vertices.length;i++){
      for(var j=0;j<Vertices.length;j++){
        MAUX[i][j]=MatrizAdy[i][j];
      }
    }
    MAUX2=[]
    for(var i=0;i<Vertices.length;i++){
      MAUX2[i]=new Array();
    }
    // "llenar" matriz de caminos
    for(var i=0;i<Vertices.length;i++){
      MatrizCam[i]=new Array();
    }
    // Rellenar la matriz caminos con matriz identidad (caso numeroIngresado=0)
    for(var i=0;i<Vertices.length;i++){
      for(var j=0;j<Vertices.length;j++){
        if(i==j){
          MatrizCam[i][j]=1;
        }
        else {
          MatrizCam[i][j]=0;
        }
      }
    }
    // Ciclos 1-n
    for(var k=0;k<numeroIngresado;k++){
      if(k==0){
      // Caso 1 matriz caminos = matriz identidad + matriz adyacencia
      SumaMatriz(MatrizCam,MatrizAdy,MatrizCam);
      }
      else {
        MultiplicaMatriz(MAUX,MatrizAdy,MAUX2);
        SumaMatriz(MatrizCam,MAUX2,MatrizCam);
        // Copiando el contenido de matriz auxiliar 2 en matriz auxiliar 
        for(var i=0;i<Vertices.length;i++){
          for(var j=0;j<Vertices.length;j++){
            MAUX[i][j]=MAUX2[i][j];
          }
        }
      }
    }
    // Imprime si es conexo o no
    var isConexo = Conexo();
    var printConexo= document.getElementById("isConexo");
    printConexo.innerHTML = "¿El grafo es conexo? : "+isConexo;
    // Imprime la matriz
    var printMatrizCamino= document.getElementById("tablaEjercicio1");
    var tablaMatrizCamino= [];
    for(i=0; i<Vertices.length; i++){
      for(k=0; k<Vertices.length; k++){
        tablaMatrizCamino.push(MatrizCam[i][k]+" ");
      }
      tablaMatrizCamino.push("<br/>");
    }
    printMatrizCamino.innerHTML= tablaMatrizCamino;
  }
}