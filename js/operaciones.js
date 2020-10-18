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
    var dirigido = document.getElementById('insertarDirigido').checked;
    var pesoArista = document.getElementById('insertarPesoArista').value;
    // Valida que existan los vertices en el array Vertices
    cont=0;
    validacion=-1;
    for(i=0;i<Vertices.length;i++){
        if((Vertices[i] == inicio) || (Vertices[i] == termino)){
            cont++;
        }
        if((Vertices[i] == inicio) && (Vertices[i] == termino)){
          cont=2;
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
              if((verticeRemovido==Aristas[index][0]) || (verticeRemovido==Aristas[index][1])){  
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
        if((removerInicio == Aristas[index][0]) && (removerTermino == Aristas[index][1]) && (removerDireccion == Aristas[index][2]) && (removerPesoArista == Aristas[index][3])){
          tablaAristas.splice(index,1);
          Aristas.splice(index,1);
        }
        index++;
      }
      console.log("Arista eliminada:"+"\n\tEntre: '"+removerInicio+"' y '"+removerTermino+"'.");
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
      MatrizAdy[aux2][aux1]+=1;
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

// Determina el grado de un grafo y devuelve un array con [nombreVertices,gradoEntrada,gradoSalida]
function gradoGrafo(){
  var entradaAristas = 0;
  var salidaAristas = 0;
  var gradoNodos=[];
  for(var i=0; i<Vertices.length; i++) {
      gradoNodos[i] =new Array();
  }
  for(i=0; i<Vertices.length; i++){
      for(k=0; k<Aristas.length; k++){
          if(Aristas[k][2] == false){
            if((Aristas[k][0] == Vertices[i]) && (Aristas[k][1] == Vertices[i])){
              salidaAristas++;
              entradaAristas++;
            }
            else {
              if(Aristas[k][0] == Vertices[i]){
                salidaAristas++;
                entradaAristas++;
              }
              else{
                if(Aristas[k][1] == Vertices[i]){
                  salidaAristas++;
                  entradaAristas++;
                }
              }
            }            
          }
          else{
            if(Aristas[k][2] == true){
              if((Aristas[k][0] == Vertices[i]) && (Aristas[k][1] == Vertices[i])){
                salidaAristas++;
                entradaAristas++;
              }
              else {
                if(Aristas[k][0] == Vertices[i]){
                  salidaAristas++;
                }
                else{
                  if(Aristas[k][1] == Vertices[i]){
                    entradaAristas++;
                  }
                }
              }
            }
          }
      }
      gradoNodos[i][0]=Vertices[i];
      gradoNodos[i][1]=entradaAristas;
      gradoNodos[i][2]=salidaAristas;
      entradaAristas=0;
      salidaAristas=0;
  }
  return gradoNodos;
}

// Ejercicio 1
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
    var printMatrizCamino= document.getElementById("tablaMatrizCamino");
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

// Ejercicio 2
function recorridoMinimo (){
  var printCamino = document.getElementById("caminoRecorrido");
  var sumaCamino = document.getElementById("tamañoRecorrido");
  var inicio = document.getElementById("caminoInicial").value;
  var final = document.getElementById("caminoFinal").value;

  var aristasAux=[], inicioAux=inicio, termino=1, iteraciones=0;
  var CaminoGuardado=[], RecorridoGuardado=[];
  CaminoGuardado.push(inicioAux);
  aristasAux=Aristas;
  console.log(aristasAux);
  console.log("Arreglo de aristas auxiliar.");
  do{
    var arrayAuxPeso = [], arrayAuxDestino = []
    for(var i=0; i<aristasAux.length; i++){
      if(aristasAux[i][1]!==aristasAux[i][0]){
        if(aristasAux[i][0]==inicioAux && aristasAux[i][2]==true){
            arrayAuxPeso.push(aristasAux[i][3]);
            arrayAuxDestino.push(aristasAux[i][1]);
            console.log("Arista dirigida desde el vertice analizado");
        }
        else{
            if(aristasAux[i][2]==false){
                if(aristasAux[i][1]==inicioAux){
                    arrayAuxPeso.push(aristasAux[i][3]);
                    arrayAuxDestino.push(aristasAux[i][0]);
                    console.log("Arista no dirigida hacia el vertice analizado");
                }
                else{
                    if(aristasAux[i][0]==inicioAux){
                    arrayAuxPeso.push(aristasAux[i][3]);
                    arrayAuxDestino.push(aristasAux[i][1]);
                    console.log("Arista no dirigida desde el vertice analizado");
                    }
                }
            }
        }
      }
    }
    for(var w=0; w<arrayAuxDestino.length;w++){
      for(var l=0; l<aristasAux.length; l++){
        if(arrayAuxDestino[w]==aristasAux[l][0] && arrayAuxPeso[w]==aristasAux[l][3] && aristasAux[l][1]==inicioAux){
            aristasAux.splice(l,1);
        }
        else{
            if(arrayAuxDestino[w]==aristasAux[l][1] && arrayAuxPeso[w]==aristasAux[l][3] && aristasAux[l][0]==inicioAux){
            aristasAux.splice(l,1);
            }
        }
      }
    }
    console.log(aristasAux);
    console.log("Arreglo despues de eliminar las aristas utilizadas.");
    if(iteraciones > 0){
      for(var x=0; x<CaminoGuardado.length; x++){
        for(var b=0; b<arrayAuxDestino.length; b++){
          if(CaminoGuardado[x]==arrayAuxDestino[b]){
              arrayAuxDestino.splice(b,1);
          }
        }
      }
    }
    console.log(arrayAuxDestino);
    console.log("Arreglo despues de eliminar las aristas que se devuelvan a vertices ya utilizados.");
    console.log ("Se guardaron todas las posibles aristas del vertice analizado.");
    var arrayDepeso =[], arrayDedir=[], n=0;
    console.log(arrayAuxDestino);
    console.log(arrayAuxPeso);
    do{
      if(arrayAuxPeso[n]>arrayAuxPeso[n+1]){// tamaño n
        arrayDepeso.splice(0,1,arrayAuxPeso[n+1]); // tamaño n+1
        arrayAuxPeso.splice(n,0,arrayDepeso[0]);// tamaño n+1
        arrayAuxPeso.splice(n+2,1); // tamaño n
        arrayDepeso.splice(0,1);
        arrayDedir.splice(0,1,arrayAuxDestino[n+1]);
        arrayAuxDestino.splice(n,0,arrayDedir[0]);
        arrayAuxDestino.splice(n+2,1);
        arrayDedir.splice(0,1);
        n=0;
      }
      else{
        n++;
      }
    }while(n!=arrayAuxDestino.length);
      console.log(arrayAuxDestino);
      console.log(arrayAuxPeso);
      console.log("Se guardo del mas pequeño al mas grande.");

      CaminoGuardado.push(arrayAuxDestino[0]);
      RecorridoGuardado.push(arrayAuxPeso[0]);
      inicioAux=arrayAuxDestino[0];
      console.log(inicioAux);
      console.log("Nuevo vertice a analizar");
      if(inicioAux==final){
          termino=0;
      }
      iteraciones++;
  }while(termino!=0);
  var contador=0;
  for(i=0; i<RecorridoGuardado.length; i++){
    var aux=parseInt(RecorridoGuardado[i]);
    contador += aux;
  }
  printCamino.innerHTML = "El camino es: "+CaminoGuardado;
  sumaCamino.innerHTML = "El tamaño es: "+contador;
}

// Ejercicio 3
function hamilton(){
  resultadoHamilton = document.getElementById("resultadoHamilton");
  var grado = [];
  grado = gradoGrafo(Vertices,Aristas);
  
  // Verifica que no tenga ningun vertice de grado 1
  for (i=0; i<grado.length; i++){
      // Si el grado(entrada+salida) es 1. Entonces no es hamiltoniano
      if((grado[i][1] + grado[i][2]) <= 1){
          console.error("No es Hamiltoniano");
          alert("No es Hamiltoniano");
          resultadoHamilton.innerHTML = false;
          return false;
      }
  }
  // Verifica que sea conexo
  MatrizAdyacencia();
  if( Conexo() == false) {
      alert("El grafo no es conexo");
      console.error("El grafo no es conexo");
      resultadoHamilton.innerHTML = false;
      return false;
  }
  else{
    console.log("El grafo es Hamiltoniano");
    resultadoHamilton.innerHTML = true
  }
}
function euler(){
  resultadoEuler = document.getElementById("resultadoEuler");
  var grado = [];
  grado = gradoGrafo(Vertices,Aristas);
  // Verifica que no tenga aristas dirigidas
  for(i=0; i<Aristas.length; i++){
      if(Aristas[i][2] == true){
          console.error("El grafo no es Euleriano");
          alert("No es euleriano");
          resultadoEuler.innerHTML = false
          return 0;
      }
  }
  // Verifica que sea conexo
  MatrizAdyacencia();
  if( Conexo() == false) {
      console.error("El grafo no es Euleriano porque no es conexo");
      alert("El grafo no es Euleriano\nporque no es conexo")
      resultadoEuler.innerHTML = false
      return false;
  }
  // Verifica que tenga exactamente 2 vértices son de grado impar y los guarda en verticesImpares.
  var verticesImpares = [];
  var contadorVerticesImpares = 0;
  for(i=0; i<grado.length; i++){
      if((grado[i][1])%2 == 1){
          contadorVerticesImpares++;
          verticesImpares.push(grado[i][0]);
      }
  }
  if (contadorVerticesImpares !=2){
      console.error("El grafo no es Euleriano");
      alert("El grafo no es Euleriano");
      resultadoEuler.innerHTML = false
      return 0;
  }
  else {
    console.log("El grafo es Euleriano");
    resultadoEuler.innerHTML = true
  }
}

// Ejercicio 4
//Entra una arista, un Inicio y un Termino
function MaxFlow (I, F) {
  //Se copia el arreglo de aristas, para no alterar el original.
  let auxArista = Arista.slice();
  var Peso = 1000;
  var z = 0;
  var menorPeso = [];
  var auxTermino;
  var Camino = [];
  
  //Nos sitúamos en la posición X
  for (let i = 0, u = 0; i < auxArista.length; i++) {        
      //Verificaciones.
      if ((auxArista[i][0] === I && auxArista[i][3] !== 0 && auxArista[i][0]!==auxArista[i][1]) || (auxArista[i][1]===I && auxArista[i][3]!==0 && auxArista[i][2]==false && auxArista[i][0]!==auxArista[i][1])) {
          
          if((auxArista[i][0]===I) && (auxArista[i][2]===true || auxArista[i][2]===false)) {
              auxTermino = auxArista[i][1];
              console.log("Nuestro camino empieza con la Arista [" + auxArista[i] + "]. Determinamos el 'termino' [" + auxTermino + "]");

              Camino[u] = auxArista[i].slice();
              console.log("Guardamos el camino [" + Camino[u] + "]");
          }
          else{
              if(auxArista[i][1]===I && auxArista[i][2]===false){ 
                  auxTermino = auxArista[i][0];
                  console.log("Nuestro camino empieza con la Arista no dirigida [" + auxArista[i] + "]. Determinamos el 'termino' [" + auxTermino + "]");

                  Camino[u] = auxArista[i].slice();
                  console.log("Guardamos el camino [" + Camino[u] + "]");
              }
          }       
      
          for (let k = 0; k < auxArista.length; k++) {

              //Si fue visitado, no entra. Sin embargo, si su peso aún no es cero, puede entrar.
              if (auxArista[k][3] !== 0) {       
                  
                  if (auxTermino === auxArista[k][0]) {
                      console.log("Identificamos que [" + auxArista[k] + "] posee el 'inicio' que necesitamos para nuestro camino");
                      console.log("Además, el peso de [" + auxArista[k] + "] es [" + auxArista[k][3] + "] por tanto es distinto de 0"); 

                      //¿Es el "termino" el Nodo final que buscamos?
                      if (auxArista[k][1] === F) {

                          console.log("Junto con lo anterior, obtenemos el final de nuestro camino");

                          u++;
                          Camino[u] = auxArista[k].slice();
                          console.log("Guardamos el camino [" + Camino[u] + "]");


                          
                          for (let n = 0; n < Camino.length; n++) {
                              if (Camino[n][3] <= Peso) {
                                  Peso = Camino[n][3];
                              }
                          }
                          menorPeso[z] = Peso;
                          
                          //Restamos
                          for (let x = 0; x < auxArista.length; x++){
                              if ((auxArista[x][0] === I && auxArista[x][3] !== 0 && auxArista[x][0]!==auxArista[x][1]) || (auxArista[x][1]===I && auxArista[x][3]!==0 && auxArista[x][2]==false && auxArista[x][0]!==auxArista[x][1])) {
                                  
                                  if((auxArista[x][0]===I) && (auxArista[x][2]===true || auxArista[x][2]===false)) {
                                      auxArista[x][3] -= menorPeso[z];
                                      auxTermino = auxArista[x][1];
                                      
                                  }
                                  else{
                                      if(auxArista[x][1]===I && auxArista[x][2]===false){ 
                                          auxArista[x][3] -= menorPeso[z];
                                          auxTermino = auxArista[i][0];
                                      }
                                  }       
                              
                                  for (let y = 0; y < auxArista.length; y++) {

                                      if (auxArista[y][3] !== 0) {       
                                          
                                          if (auxTermino === auxArista[y][0]) {
                                              
                                              if (auxArista[y][1] === F) {

                                                  auxArista[y][3] -= menorPeso[z];
                                                  z++;
                                              }

                                              else {  
                                                  
                                                  auxArista[y][3] -= menorPeso[z];
                                                  auxTermino = auxArista[y][1];
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                          z++;
                          u = 0;
                      }
                      else {  
                          auxTermino = auxArista[k][1];
                          console.log("Obtenemos el 'termino' [" + auxTermino + "] de la Arista [" + auxArista[k] + "]");
                          u++;
                          Camino[u] = auxArista[k].slice();
                          console.log("Guardamos el camino [" + Camino[u] + "]");
                      }
                  }
              }
          }     
      }
  }//FIN DEL PRIMER FOR
  for (let w = 0; w < auxArista.length; w++) {
      console.log(auxArista[w]);
  }
}

// Ejercicio 5
function caminomenor (verticef,aristaf){
  var menor = 9999*9999, posicionA=0;
    for(var i=0;i<=aristaf.length;i++){
      if(aristaf[i][0] == verticef || aristaf[i][1] == verticef){
          if(Arista[i][3] < menor){
              menor = Arista[i][3];
              posicionA =i;
          }
      }
    }
    return posicionA, menor;
} 
function arbolsprim (){
  var printArbol = document.getElementById("arbol");
  var Arista=Aristas;
  var Vertice=Vertices;
  var vertice1=Arista[0][0];
  var auxvertice=[];
  auxvertice[0]=vertice1;
  console.log(auxvertice);
  var arbol = [];
  console.log(Vertice.length);

  var prueba=[];
  var prueba2=[];
  for(i=0;i<=auxvertice.length;i++){
      if(prueba.length==0){
          prueba=caminomenor(auxvertice[i],Arista);
      }
      else{
          prueba2=caminomenor(auxvertice[i],Arista);
          if(prueba2[0]<prueba[0]){
              prueba=prueba2;
          }
      }
  }
  var cont=0;
  for(i=0;i<=auxvertice.length;i++){
      if(auxvertice[i]==Arista[posicionA][0] || auxvertice[i]==Arista[posicionA][1]){
          cont++;
      }
  }
  if(cont==1){
      arbol.push(Arista[posicionA][0],Arista[posicionA][1]);
      for(var i=0;i<=auxvertice.length;i++){
          if(auxvertice[i]==Arista[posicionA][0] || auxvertice[i]==Arista[posicionA][1]){
              posicionV=i;    
          }
      }
      if(auxvertice[posicionV] != Arista[posicionA][0]){
                  auxvertice.push(Arista[posicionA][0]);
              }
              else{
                  auxvertice.push(Arista[posicionA][1]);
              }
      Arista.splice(posicionA,1);
      console.log("El arbol es: ",arbol[0]+arbol[1]); 
  }
  else{
      Arista.splice(posicionA,1);
  }
  console.log(arbol);
  printArbol.innerHTML = arbol;
  return arbol;
}