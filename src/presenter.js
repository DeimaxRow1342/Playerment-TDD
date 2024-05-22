import Practicas from "./practicas.js";
import Metrica from "./metrica.js";
import MetricaArray from "./metricasArray.js";

let practicas = [];

document.addEventListener("DOMContentLoaded", function() {
  cargarPracticasIniciales();

  document.getElementById("proyectoForm").addEventListener("submit", function(event) {
    event.preventDefault();
    agregarNuevaPractica();
  });
});

function agregarNuevaPractica() {
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;
  const fecha = document.getElementById("fecha").value;
  const enlace = document.getElementById("enlace").value;

  const nuevaPractica = new Practicas();
  nuevaPractica.cargarDatos(nombre, descripcion, fecha, enlace);
  practicas.push(nuevaPractica);

  actualizarTablaPracticas();
}

function cargarPracticasIniciales() {
  let nombres = ["FizzBuzz", "Totalizador"];
  let descripciones = ["Una practica de TDD donde se retorna una cadena de Fizz, Buzz o FizzBuzz de acuerdo a ciertas reglas", "Una practica de TDD donde se realiza un totalizador que calcula el precio total de una cantidad de productos aplicando ciertos impuestos y descuentos"];
  let fechas = ["2024-02-20", "2024-03-24"];
  let enlaces = ["https://github.com/DeimaxRow1342/SecuenciaFizzBuzz", "https://github.com/Dylancalle/Tarea7"];

  for (let i = 0; i < nombres.length; i++) {
    const nuevaPractica = new Practicas();
    nuevaPractica.cargarDatos(nombres[i], descripciones[i], fechas[i], enlaces[i]);
    practicas.push(nuevaPractica);
  }

  actualizarTablaPracticas();
}


function eliminarPractica(nombre) {
  if(confirm("¿Estás seguro de eliminar la práctica?")) {
    const nuevaPractica = new Practicas();
    nuevaPractica.eliminarDatos(nombre);
    practicas = practicas.filter(practica => practica.nombre !== nombre);
    actualizarTablaPracticas();
  }
  else{
    console.log("No se eliminó la práctica");
  }

}

function actualizarTablaPracticas() {
  const contenido = document.querySelector("#tabla-practicas");
  contenido.innerHTML = practicas.map(practica => `
    <tr>
      <td>${practica.nombre}</td>
      <td>${practica.descripcion}</td>
      <td>${practica.fecha}</td>
      <td><a href="${practica.enlace}">Enlace</a></td>
      <td>
        <button onclick="eliminarPractica('${practica.nombre}')">Eliminar</button>
        <button onclick="ingresarAMetricaDePractica('${practica.nombre}')">Ver Métricas</button>
      </td>
    </tr>
  `).join('');
}

function ingresarAMetricaDePractica(nombrePractica) {
  const practicaSeleccionada = practicas.find(practica => practica.nombre === nombrePractica);
  const proyectoContainer = document.querySelector('#proyectoContainer');
  const tablaPracticas = document.querySelector('#tabla-practicas');
  const tablaEncabezados = document.querySelector('#tabla-encabezado');
  const formularioPractica = document.querySelector('#proyectoForm');

  tablaPracticas.style.display = 'none';
  formularioPractica.style.display = 'none';

  proyectoContainer.innerHTML = '';
  proyectoContainer.style.display = 'block'; 

  tablaEncabezados.style.display = 'none';

  if (practicaSeleccionada) {
    const tituloPracticaElement = document.createElement('h2');
    //tituloPracticaElement.textContent = Práctica: ${nombrePractica};
    tituloPracticaElement.textContent = `Práctica: ${nombrePractica}`;

    proyectoContainer.appendChild(tituloPracticaElement);

    const btnVolver = document.createElement('button');
    btnVolver.textContent = 'Volver a la lista de prácticas';
    btnVolver.addEventListener('click', function() {
      tablaEncabezados.style.display = 'table';
      proyectoContainer.innerHTML = ''; 
      tablaPracticas.style.display = 'table'; 
      formularioPractica.style.display = 'block';
    });
    proyectoContainer.appendChild(btnVolver);

    const listaMetricas = document.createElement('ul');
    const metricasPractica = practicaSeleccionada.motrarMetricas();
    metricasPractica.forEach(metrica => {
      const metricaItem = document.createElement('li');
      //metricaItem.textContent = Commit: ${metrica.numeroCommit}, Puntaje: ${metrica.puntaje}, Explicación: ${metrica.explicacion};
      
      metricaItem.textContent = `Commit: ${metrica.numeroCommit}, Numero de pruebas: ${metrica.pruebas}, Porcentaje de cobertura: ${metrica.cobertura}, Puntaje: ${metrica.puntaje}, Explicación: ${metrica.explicacion}`;


      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', function() {
        if (confirm("¿Estás seguro de eliminar este commit?")) {
          practicaSeleccionada.eliminarMetrica(metrica.numeroCommit);
          ingresarAMetricaDePractica(nombrePractica); 
        }
      });

    
      metricaItem.appendChild(btnEliminar);
      
      listaMetricas.appendChild(metricaItem);
    });
    proyectoContainer.appendChild(listaMetricas);

    const formMetrica = document.createElement('form');
    const inputNumeroCommit = document.createElement('input');
    inputNumeroCommit.type = 'number';
    inputNumeroCommit.placeholder = 'Número de commit';
    const inputPuntaje = document.createElement('input');
    inputPuntaje.type = 'number';
    inputPuntaje.placeholder = 'Puntaje';
    const inputPrueba = document.createElement('input');
    inputPrueba.type = 'number';
    inputPrueba.placeholder = 'Prueba';
    const inputCobertura = document.createElement('input');
    inputCobertura.type = 'number';
    inputCobertura.placeholder = 'Cobertura';
    const inputExplicacion = document.createElement('input');
    inputExplicacion.type = 'text';
    inputExplicacion.placeholder = 'Explicación';
    const btnConfirmMetrica = document.createElement('button');
    btnConfirmMetrica.textContent = 'Agregar Métrica';

    const messageDiv = document.createElement('div');
    formMetrica.appendChild(messageDiv);
    btnConfirmMetrica.addEventListener('click', (event) => {
      event.preventDefault();
      const numeroCommit = parseInt(inputNumeroCommit.value);
      const puntaje = parseInt(inputPuntaje.value);
      const explicacion = inputExplicacion.value;
      const prueba = parseInt(inputPrueba.value);
      const cobertura = parseInt(inputCobertura.value);

      if (!isNaN(numeroCommit) && !isNaN(puntaje) && explicacion) {
        const result = practicaSeleccionada.anadirMetrica(numeroCommit, puntaje, explicacion, prueba, cobertura);
        if (result) {
          alert('Commit added successfully.');
        } else {
          alert('Invalid commit number. Commit numbers must be sequential and unique.');
        }
        ingresarAMetricaDePractica(nombrePractica);  
      } else {
        alert('Please enter valid values.');
      }
    });

    formMetrica.appendChild(inputNumeroCommit);
    formMetrica.appendChild(inputPrueba);
    formMetrica.appendChild(inputCobertura);
    formMetrica.appendChild(inputPuntaje);
    formMetrica.appendChild(inputExplicacion);
    formMetrica.appendChild(btnConfirmMetrica);
    proyectoContainer.appendChild(formMetrica);
  }
}

window.eliminarPractica = eliminarPractica;
window.ingresarAMetricaDePractica = ingresarAMetricaDePractica;