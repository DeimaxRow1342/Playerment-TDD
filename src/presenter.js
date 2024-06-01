import Practicas from "./practicas.js";
import Metrica from "./metrica.js";
import ModuloMetricas from "./moduloMetricas.js";

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
function desplegarFormularioEditar(nombre) {
  const practica = practicas.find(practica => practica.nombre === nombre);
  if (practica) {
    const modal = document.getElementById('myModal');
    modal.style.display = "block";
    const formularioExistente = document.getElementById('formulario-editar');
    if (formularioExistente) {
      formularioExistente.remove();
    }
    const formulario = document.createElement('form');
    formulario.id = 'formulario-editar';
    formulario.innerHTML = `
      <label for="nuevoNombre">Nombre:</label>
      <input type="text" id="nuevoNombre" value="${practica.nombre}">
      <label for="nuevaDescripcion">Descripción:</label>
      <input type="text" id="nuevaDescripcion" value="${practica.descripcion}">
      <label for="nuevaFecha">Fecha:</label>
      <input type="date" id="nuevaFecha" value="${practica.fecha}">
      <label for="nuevoEnlace">Enlace:</label>
      <input type="text" id="nuevoEnlace" value="${practica.enlace}">
      <button type="submit">Guardar</button>
    `;
    formulario.addEventListener('submit', function(event) {
      event.preventDefault();
      if (!confirm("¿Estás seguro de realizar los cambios?")) {
        return;
      }
      const nuevoNombre = document.getElementById('nuevoNombre').value;
      const nuevaDescripcion = document.getElementById('nuevaDescripcion').value;
      const nuevaFecha = document.getElementById('nuevaFecha').value;
      const nuevoEnlace = document.getElementById('nuevoEnlace').value;
      const existePractica = practicas.some(prac => (prac.nombre === nuevoNombre || prac.enlace === nuevoEnlace) && prac !== practica);
      if (existePractica) {
        alert("Ya existe un proyecto con el mismo nombre o enlace. Por favor, ingrese un nombre o enlace diferente.");
        return;
      }
      practica.editarDatos(nuevoNombre, nuevaDescripcion, nuevaFecha, nuevoEnlace);
      actualizarTablaPracticas();
      modal.style.display = "none";
    });
    document.getElementById('contenedorFormulario').appendChild(formulario);
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
}

function buscarPracticaPorNombre() {
  const searchName = document.getElementById('searchName').value;
  const foundPractica = practicas.find(practica => practica.nombre === searchName);
  if (foundPractica) {
    alert('Práctica encontrada: ' + foundPractica.nombre);
  } else {
    alert('No se encontró la práctica.');
  }
  
} //Esta es la funcion de buscar en el buscador

document.getElementById("searchButton").addEventListener("click", buscarPracticaPorNombre);

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
        <button onclick="desplegarFormularioEditar('${practica.nombre}')">Editar</button>
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

    const listaMetricasConvencional = document.createElement('ul');
    const listaMetricasRefactorizacion = document.createElement('ul');
    const metricasPractica = practicaSeleccionada.motrarMetricas();

    const contenedorMetricasConvencional = document.createElement('div');
    contenedorMetricasConvencional.innerHTML = '<h3>Métricas Convencionales</h3>';
    contenedorMetricasConvencional.appendChild(listaMetricasConvencional);
    
    const contenedorMetricasRefactorizacion = document.createElement('div');
    contenedorMetricasRefactorizacion.innerHTML = '<h3>Métricas de Refactorización</h3>';
    contenedorMetricasRefactorizacion.appendChild(listaMetricasRefactorizacion);

    metricasPractica.forEach(metrica => {
      const metricaItem = document.createElement('li');
      if (metrica.tipo === 'convencional') {
        metricaItem.textContent = `Commit: ${metrica.numeroCommit}, Numero de pruebas: ${metrica.pruebas}, Porcentaje de cobertura: ${metrica.cobertura}, Puntaje: ${metrica.puntaje}, Explicación: ${metrica.explicacion}`;
        listaMetricasConvencional.appendChild(metricaItem);
      } else {
        metricaItem.textContent = `Commit: ${metrica.numeroCommit}, Explicación: ${metrica.explicacion}`;
        listaMetricasRefactorizacion.appendChild(metricaItem);
      }

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', function() {
        if (confirm("¿Estás seguro de eliminar este commit?")) {
          practicaSeleccionada.eliminarMetrica(metrica.numeroCommit);
          ingresarAMetricaDePractica(nombrePractica); 
        }
      });

      metricaItem.appendChild(btnEliminar);
    });

    proyectoContainer.appendChild(contenedorMetricasConvencional);
    proyectoContainer.appendChild(contenedorMetricasRefactorizacion);

    const formMetrica = document.createElement('form');
    const inputNumeroCommit = document.createElement('input');
    inputNumeroCommit.type = 'number';
    inputNumeroCommit.placeholder = 'Número de commit';
    const inputPrueba = document.createElement('input');
    inputPrueba.type = 'number';
    inputPrueba.placeholder = 'Prueba';
    const inputCobertura = document.createElement('input');
    inputCobertura.type = 'number';
    inputCobertura.placeholder = 'Cobertura';
    const inputExplicacion = document.createElement('input');
    inputExplicacion.type = 'text';
    inputExplicacion.placeholder = 'Explicación';

    const selectTipo = document.createElement('select'); 
    selectTipo.style.width = '100%';
    const optionConvencional = document.createElement('option');
    optionConvencional.value = 'convencional';
    optionConvencional.textContent = 'Convencional';
    const optionRefactorizacion = document.createElement('option');
    optionRefactorizacion.value = 'refactoring';
    optionRefactorizacion.textContent = 'Refactorización';
    selectTipo.appendChild(optionConvencional);
    selectTipo.appendChild(optionRefactorizacion);

    const btnConfirmMetrica = document.createElement('button');
    btnConfirmMetrica.textContent = 'Agregar Métrica';

    const messageDiv = document.createElement('div');
    formMetrica.appendChild(messageDiv);
    btnConfirmMetrica.addEventListener('click', (event) => {
      event.preventDefault();
      const numeroCommit = parseInt(inputNumeroCommit.value);
      const explicacion = inputExplicacion.value;
      const prueba = parseInt(inputPrueba.value);
      const cobertura = parseInt(inputCobertura.value);
      const tipo = selectTipo.value;

      if (!isNaN(numeroCommit) && explicacion) {
        const result = practicaSeleccionada.anadirMetrica(numeroCommit, explicacion, prueba, cobertura, tipo);
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
    formMetrica.appendChild(inputExplicacion);
    formMetrica.appendChild(selectTipo); 
    formMetrica.appendChild(btnConfirmMetrica);
    proyectoContainer.appendChild(formMetrica);
  }
}

window.eliminarPractica = eliminarPractica;
window.desplegarFormularioEditar = desplegarFormularioEditar;
window.ingresarAMetricaDePractica = ingresarAMetricaDePractica;