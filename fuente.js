// Crea la tabla de postes
//Si alguien algun dia lee esto. De aqui para abajo hay un cagadal -- Eduardo Aguilar 
function tableCreate() {
    var divtabla = document.getElementById('containertablaprincipal');
    var divbotoncalcular = document.getElementById('boton-calcular');
    var tbl = document.createElement('table');
    tbl.classList.add('table');
    tbl.setAttribute('id', 'tablaprincipal');
    tbl.style.width = '100%';
    var thead = document.createElement('thead');
    var trhead = document.createElement('tr')
    trhead.innerHTML = ("<th scope='col'># Poste</th><th scope='col'>Contiene ramal</th><th scope='col'>Distancia</th><th scope='col'>S</th><th scope='col'>FP</th><th scope='col'>V</th><th scope='col'>RV</th>")
    tbl.appendChild(trhead);
    var tbdy = document.createElement('tbody');
    var numpostes = document.getElementById('numpostes').value;
    for (var i = 1; i <= numpostes; i++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');
        var td6 = document.createElement('td');
        var td7 = document.createElement('td');
        td1.innerHTML = i;
        td2.innerHTML= '<input class="form-check-input position-static" type="checkbox" value="1" aria-label="..." style="margin-left:1.2cm" onclick=clickHandle()> ';
        td3.innerHTML="<input class='form-control input-width cellwidth' placeholder='Metros'>";
        td4.innerHTML="<input class='form-control input-width cellwidth' placeholder='KVA'>";
        td5.innerHTML="<input class='form-control input-width cellwidth' placeholder='FP'>";
        td6.innerHTML="-";
        td7.innerHTML="-";
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tbdy.appendChild(tr);
        
    }
    tbl.appendChild(tbdy);
    divtabla.appendChild(tbl);
    tbdy.children[numpostes-1].children[2].children[0].setAttribute("disabled", "");
    
    divbotoncalcular.innerHTML = '<button class="btn btn-primary" onclick="asignarVoltajes()" type="button">Calcular</button>';

}



function asignarVoltajes(){
  var arrayDeVoltajes = decisionMaker();
  var tablaprincipal = document.getElementById('tablaprincipal');
  var voltajebase=document.getElementById('voltajebase').value;
  tablaprincipal.rows[1].cells[5].innerHTML = (voltajebase*1).toFixed(2); 
  tablaprincipal.rows[1].cells[6].innerHTML = '0.00%'; 
  for (var i = 2; i <= arrayDeVoltajes.length+1; i++) {
    var celdavoltaje = tablaprincipal.rows[i].cells[5];
    celdavoltaje.innerHTML = arrayDeVoltajes[i-2].toFixed(2);
    var celdaregulacion = tablaprincipal.rows[i].cells[6];
    celdaregulacion.innerHTML = ((voltajebase-arrayDeVoltajes[i-2])/arrayDeVoltajes[i-2]*100).toFixed(2) + '%';
  }
}


function clickHandle(){
  inputcreator(); 
} 



function arrayPostesConRamal() {
  var arraydePostes=[]; 
  var tablaprincipal = document.getElementById('tablaprincipal');
  for (var i = 1; i < tablaprincipal.rows.length; i++) {
    var caja = tablaprincipal.rows[i].cells[1].children[0].checked;
    arraydePostes.push(caja);
  }
  return arraydePostes;
}

function inputcreator(){
  var container = document.getElementById('inputboxes');
  container.innerHTML = ""; 
  arraydePostes = arrayPostesConRamal();
  for (var i = 0; i < arraydePostes.length; i++) {
    if (arraydePostes[i]==true) {    
    var div = document.createElement('div');
    div.setAttribute('style', 'margin-top: 0.2cm');
    var label = document.createElement('label');
    label.innerHTML = 'Numero de postes en ramal de poste ' + (i+1 ); 
    var input = document.createElement('input');
    input.classList.add('form-control');
    input.setAttribute('placeholder', 'Valor numerico');
    div.classList.add('row');
    label.classList.add('col');
    input.classList.add('col');
    div.appendChild(label);
    div.appendChild(input);
    container.appendChild(div);
    }
  }
  var divtablassecundarias = document.getElementById('tablassecundarias');
  divtablassecundarias.innerHTML = "";
}

function contador() {
  var n = 0; 
  var arraydePostes = arrayPostesConRamal();
  for (var i = 0; i < arraydePostes.length; i++) {
    if(arraydePostes[i]==true){n=n+1};
  }
  return n
}

function tableCreate2(){
  var divinputboxes = document.getElementById('inputboxes');
  var divtablassecundarias = document.getElementById('tablassecundarias');
  divtablassecundarias.innerHTML = ""; 
  var n = contador();
  var numeroderows
  var arraydeindex = []; 
  var arraydepostesconramal = arrayPostesConRamal();
  for (var i = 0; i < arraydepostesconramal.length; i++) {
    if(arraydepostesconramal[i]==true){arraydeindex.push(i);}
  }
  for (var i = 0; i < n; i++) {
    var tbl = document.createElement('table');
    tbl.classList.add('table');
    tbl.style.width = '100%';
    var thead = document.createElement('thead');
    var trhead = document.createElement('tr');
    var tbdy = document.createElement('tbody');
    trhead.innerHTML = ("<th scope='col'># Poste</th><th scope='col'>Distancia</th><th scope='col'>S</th><th scope='col'>FP</th><th scope='col'>V</th><th scope='col'>RV</th>")
    tbl.appendChild(trhead);
    numeroderows = divinputboxes.children[i].children[1].value;
    for (var j=1; j<=numeroderows; j++){
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');
        var td6 = document.createElement('td');
        var td7 = document.createElement('td');
        td1.innerHTML = arraydeindex[i]+1 + "." + j ;
        td3.innerHTML="<input class='form-control input-width cellwidth' placeholder='Metros'>";
        td4.innerHTML="<input class='form-control input-width cellwidth' placeholder='KVA'>";
        td5.innerHTML="<input class='form-control input-width cellwidth' placeholder='FP'>";
        td6.innerHTML="-";
        td7.innerHTML="-";
        tr.appendChild(td1);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    divtablassecundarias.appendChild(tbl);
  }
}

function distanciaDeLosRamales() {
  var divtablassecundarias = document.getElementById('tablassecundarias');
  var divinputboxes = document.getElementById('inputboxes');
  var n = contador();
  var distanciasramales = []; 
  var numeroderows;
  var arraydepostesconramal = arrayPostesConRamal();
  for (var i = 0; i < n; i++) {
    var tbl = divtablassecundarias.children[i];
    var distanciasramal = []; 
    numeroderows = divinputboxes.children[i].children[1].value;
    for (var j=1; j<=numeroderows; j++){
        var distancia = tbl.rows[j].children[1].children[0].value;
        distanciasramal.push(distancia);
    }
    distanciasramales.push(distanciasramal);
  }
  return distanciasramales;
}

function potenciasDeLosRamales() {
  var divtablassecundarias = document.getElementById('tablassecundarias');
  var divinputboxes = document.getElementById('inputboxes');
  var n = contador();
  var potenciasramales = []; 
  var numeroderows;
  var arraydepostesconramal = arrayPostesConRamal();
  for (var i = 0; i < n; i++) {
    var tbl = divtablassecundarias.children[i];
    var potenciasramal = []; 
    numeroderows = divinputboxes.children[i].children[1].value;
    for (var j=1; j<=numeroderows; j++){
        var potencia = tbl.rows[j].children[2].children[0].value;
        potenciasramal.push(potencia);
    }
    potenciasramales.push(potenciasramal);
  }
  return potenciasramales;
}

function simplificarRamal(){
  var potenciasramales = potenciasDeLosRamales();
  var potenciassumadas = []; 
  for (var i = 0; i < potenciasramales.length; i++) {
    var sumaramal = 0
    for (var j = 0; j < potenciasramales[i].length; j++) {
      sumaramal += potenciasramales[i][j]*1000;
    }
    potenciassumadas.push(sumaramal);
  }
  return potenciassumadas;
}

function potenciaEnPoste(){
  var arraydepotenciassimplificadas = [];
  var tablaprincipal = document.getElementById('tablaprincipal');
  var numpostes = document.getElementById('numpostes').value;
  var potenciassumadas = simplificarRamal(); 
  var n = 0 
  var arraydepostesconramal = arrayPostesConRamal();
  var arrayPotencias=[];
  for (var i = 1; i <= numpostes; i++) {
    var potencia = tablaprincipal.rows[i].cells[3].children[0].value*1000;
    arrayPotencias.push(potencia);
  }
  for (var i = 0; i < arraydepostesconramal.length; i++) {
    if(arraydepostesconramal[i]==true){arraydepotenciassimplificadas.push(potenciassumadas[n]+arrayPotencias[i]*1); n++}
    else{arraydepotenciassimplificadas.push(arrayPotencias[i])}
  }
  return arraydepotenciassimplificadas;
}

function calculoVoltajesPrincipalesSiHayRamal() {
  var arrayDistancias=[]; 
  var arrayPotencias = potenciaEnPoste();
  var arrayResistencias=[]; 
  var arrayCorrientes=[];
  var potenciaPorTramo = [];
  var voltajeEnPoste = []; 
  var tempambiente=document.getElementById('tempambiente').value;
  var voltajebase=document.getElementById('voltajebase').value;
  var voltajedeposte = voltajebase; 
  var material=document.getElementById('materialcable');
  var calibre=document.getElementById('calibrecable');
  var numpostes = document.getElementById('numpostes').value;
  var resistividad, secciontransversal; 
  var tablaprincipal = document.getElementById('tablaprincipal');
  for (var i = 1; i < numpostes; i++) {
    var distancia = tablaprincipal.rows[i].cells[2].children[0].value*1;
    arrayDistancias.push(distancia);
  }
  // Asigna el valor de resistividad
  if (material.options[material.selectedIndex].value==1) {resistividad = 0.0000000282} else {resistividad = 0.0000000171}
  // Asigna el valor de seccion transversal
  if (calibre.options[calibre.selectedIndex].value==1) {secciontransversal = 0.0000535}
  if (calibre.options[calibre.selectedIndex].value==2) {secciontransversal = 0.0000674}
  if (calibre.options[calibre.selectedIndex].value==3) {secciontransversal = 0.000085}
  if (calibre.options[calibre.selectedIndex].value==4) {secciontransversal = 0.000107}
  // Calcula las resistencias de cada uno de los tramos de cable y los agrega a arrayResistencias
  for (var i = 0; i < arrayDistancias.length; i++) {
    var resistenciaTramo = (arrayDistancias[i]*resistividad/secciontransversal)*(0.0039*(tempambiente-20)+1);
    arrayResistencias.push(resistenciaTramo);
  }
  // Calcula la potencia que cada tramo de cable tiene que soportar 

  for (var i = 0; i < arrayPotencias.length-1; i++) {
    var sum = 0;
    for (var j = i+1; j < arrayPotencias.length; j++) {
      sum = sum + arrayPotencias[j]; 
    }
    potenciaPorTramo.push(sum);
  }
  for (var i = 0; i < potenciaPorTramo.length; i++) {
    voltajedeposte = voltajedeposte - 2*arrayResistencias[i]*potenciaPorTramo[i]/voltajedeposte;
    voltajeEnPoste.push(voltajedeposte);

  }

  return voltajeEnPoste

}

function voltajePosteSiNoHayRamal() {
  var arrayDistancias=[]; 
  var arrayPotencias=[]; 
  var arrayResistencias=[]; 
  var arrayCorrientes=[];
  var potenciaPorTramo = [];
  var voltajeEnPoste = []; 
  var tempambiente=document.getElementById('tempambiente').value;
  var voltajebase=document.getElementById('voltajebase').value;
  var voltajedeposte = voltajebase; 
  var material=document.getElementById('materialcable');
  var calibre=document.getElementById('calibrecable');
  var numpostes = document.getElementById('numpostes').value;
  var resistividad, secciontransversal; 
  var tablaprincipal = document.getElementById('tablaprincipal');
  // Captura los datos de potencias y los agrega a una lista de potencias.  
  for (var i = 1; i <= numpostes; i++) {
    var potencia = tablaprincipal.rows[i].cells[3].children[0].value*1000;
    arrayPotencias.push(potencia);
  }
  // Captura los datos de distancias y los agrega a una lista de distancias.  
  for (var i = 1; i < numpostes; i++) {
    var distancia = tablaprincipal.rows[i].cells[2].children[0].value*1;
    arrayDistancias.push(distancia);
  }
  // Asigna el valor de resistividad
  if (material.options[material.selectedIndex].value==1) {resistividad = 0.0000000282} else {resistividad = 0.0000000171}
  // Asigna el valor de seccion transversal
  if (calibre.options[calibre.selectedIndex].value==1) {secciontransversal = 0.0000535}
  if (calibre.options[calibre.selectedIndex].value==2) {secciontransversal = 0.0000674}
  if (calibre.options[calibre.selectedIndex].value==3) {secciontransversal = 0.000085}
  if (calibre.options[calibre.selectedIndex].value==4) {secciontransversal = 0.000107}
  // Calcula las resistencias de cada uno de los tramos de cable y los agrega a arrayResistencias
  for (var i = 0; i < arrayDistancias.length; i++) {
    var resistenciaTramo = (arrayDistancias[i]*resistividad/secciontransversal)*(0.0039*(tempambiente-20)+1);
    arrayResistencias.push(resistenciaTramo);
  }
  // Calcula la potencia que cada tramo de cable tiene que soportar 

  for (var i = 0; i < arrayPotencias.length-1; i++) {
    var sum = 0;
    for (var j = i+1; j < arrayPotencias.length; j++) {
      sum = sum + arrayPotencias[j]; 
    }
    potenciaPorTramo.push(sum);
  }
  for (var i = 0; i < potenciaPorTramo.length; i++) {
    voltajedeposte = voltajedeposte - 2*arrayResistencias[i]*potenciaPorTramo[i]/voltajedeposte;
    voltajeEnPoste.push(voltajedeposte);

  }

  return voltajeEnPoste 
}

function decisionMaker() {
  var n = contador();
  if (n==0) { return voltajePosteSiNoHayRamal()} else {asignarVoltajesSecundarios(); return calculoVoltajesPrincipalesSiHayRamal()}
}

function voltajesEnPostesDeRamal() {
  var tempambiente=document.getElementById('tempambiente').value;
  var material=document.getElementById('materialcable');
  var calibre=document.getElementById('calibrecable');
  var arrayDistanciasDeTodosLosRamales=distanciaDeLosRamales();
  var arraydeindex = []; 
  var voltajesentodoslospostesdelramal = []; 
  var arraydepostesconramal = arrayPostesConRamal();
  for (var i = 0; i < arraydepostesconramal.length; i++) {
    if(arraydepostesconramal[i]==true){arraydeindex.push(i);}
  }
  var l = 0;
  // Asigna el valor de resistividad
  if (material.options[material.selectedIndex].value==1) {resistividad = 0.0000000282} else {resistividad = 0.0000000171}
  // Asigna el valor de seccion transversal
  if (calibre.options[calibre.selectedIndex].value==1) {secciontransversal = 0.0000535}
  if (calibre.options[calibre.selectedIndex].value==2) {secciontransversal = 0.0000674}
  if (calibre.options[calibre.selectedIndex].value==3) {secciontransversal = 0.000085}
  if (calibre.options[calibre.selectedIndex].value==4) {secciontransversal = 0.000107}
  for (var i = 0; i < arrayDistanciasDeTodosLosRamales.length; i++) {
        var arrayPotencias=potenciasDeLosRamales()[i]; 
        var arrayDistancias=distanciaDeLosRamales()[i];
        var voltajebase = calculoVoltajesPrincipalesSiHayRamal()[l+1];
        var voltajedeposte  = voltajebase
        var arrayResistencias=[];
        var arrayCorrientes=[];
        var potenciaPorTramo = [];
        var voltajeEnPoste = []; 
        var resistividad, secciontransversal; 
        var tablaprincipal = document.getElementById('tablaprincipal');
        // Calcula las resistencias de cada uno de los tramos de cable y los agrega a arrayResistencias
        for (var k = 0; k < arrayDistancias.length; k++) {
          var resistenciaTramo = (arrayDistancias[k]*resistividad/secciontransversal)*(0.0039*(tempambiente-20)+1);
          arrayResistencias.push(resistenciaTramo);
        }
        // Calcula la potencia que cada tramo de cable tiene que soportar 
        var sum = 0;
        for (var h = 0; h < arrayPotencias.length; h++) {
          sum = sum + arrayPotencias[h]*1000; 
          potenciaPorTramo.push(sum);
        }

        for (var g = 0; g < potenciaPorTramo.length; g++) {
          voltajedeposte = voltajedeposte - 2*arrayResistencias[g]*potenciaPorTramo[g]/voltajedeposte;
          voltajeEnPoste.push(voltajedeposte);

        }
        voltajesentodoslospostesdelramal.push(voltajeEnPoste);
        l++;
  }
  return voltajesentodoslospostesdelramal;
}

function asignarVoltajesSecundarios(){
  var divtablassecundarias = document.getElementById('tablassecundarias');
  var divinputboxes = document.getElementById('inputboxes');
  var listadevoltajes = voltajesEnPostesDeRamal(); 
  var voltajebase=document.getElementById('voltajebase').value;
  var n = contador(); 
  var numeroderows;
  for (var i = 0; i < n; i++) {
    var tbl = divtablassecundarias.children[i]; 
    numeroderows = divinputboxes.children[i].children[1].value;
    console.log(numeroderows);
    for (var j=1; j<=numeroderows; j++){
        tbl.rows[j].children[4].innerHTML = listadevoltajes[i][j-1].toFixed(2);
        tbl.rows[j].children[5].innerHTML = (((voltajebase - listadevoltajes[i][j-1])/voltajebase)*100).toFixed(2) + '%';
    }
  }
}