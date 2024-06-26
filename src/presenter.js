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
  document.getElementById("showRankingButton").addEventListener("click", mostrarRanking);
  
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
//ranking
function mostrarRanking() {
  const rankingContainer = document.getElementById("rankingContainer");
  rankingContainer.innerHTML = ''; // Limpiar contenido previo

  const rankingList = generarRankingGeneral();
  if (rankingList.length === 0) {
    rankingContainer.innerHTML = "<p>No hay prácticas para mostrar en el ranking.</p>";
    return;
  }

  const tablaRanking = document.createElement("table");
  tablaRanking.innerHTML = `
    <thead>
      <tr>
        <th>Posición</th>
        <th>Nombre</th>
        <th>Puntaje</th>
        <th>Detalle</th>
      </tr>
    </thead>
    <tbody>
      ${rankingList.map((item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${item.nombre}</td>
          <td>${item.puntaje}</td>
          <td><button onclick="mostrarDetalle('${item.nombre}')">Ver Detalle</button></td>
        </tr>
      `).join('')}
    </tbody>
  `;
  rankingContainer.appendChild(tablaRanking);
}

function generarRankingGeneral() {
  return practicas.map(practica => practica.generarRanking()[0])
                  .sort((a, b) => b.puntaje - a.puntaje);
}

function mostrarDetalle(nombre) {
  const practica = practicas.find(practica => practica.nombre === nombre);
  if (practica) {
    const detalle = practica.detallePuntuacion();
    const detalleContainer = document.createElement("div");
    detalleContainer.innerHTML = `
      <h3>Detalle de ${detalle.nombre}</h3>
      <table>
        <thead>
          <tr>
            <th>Commits</th>
            <th>Pruebas</th>
            <th>Cobertura</th>
            <th>Cantidad de Lineas</th>
            <th>Complejidad</th>
            <th>Frecuencia</th>
            <th>Puntaje</th>
            <th>Explicación</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          ${detalle.metricas.map(metrica => `
            <tr>
              <td>${metrica.numeroCommit}</td>
              <td>${metrica.pruebas}</td>
              <td>${metrica.cobertura}</td>
              <td>${metrica.cantidadLineas}</td>
              <td>${metrica.complejidad}</td>
              <td>${metrica.frecuencia}</td>
              <td>${metrica.puntaje}</td>
              <td>${metrica.explicacion}</td>
              <td>${metrica.tipo}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    const rankingContainer = document.getElementById("rankingContainer");
    rankingContainer.appendChild(detalleContainer);
  } else {
    alert("No se encontró la práctica.");
  }

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

    const metricasPractica = practicaSeleccionada.motrarMetricas();
    metricasPractica.forEach(metrica => {
      const metricaContainer = document.createElement('div');
      metricaContainer.style.marginBottom = '15px';

      const metricaContent = `
        <p><strong>Commit ${metrica.numeroCommit}:</strong></p>
        <p style="margin-left: 20px;">Número de pruebas: ${metrica.pruebas || 'N/A'}</p>
        <p style="margin-left: 20px;">Porcentaje de cobertura: ${metrica.cobertura || 'N/A'}</p>
        <p style="margin-left: 20px;">Cantidad de Líneas: ${metrica.cantidadLineas || 'N/A'}</p>
        <p style="margin-left: 20px;">Complejidad: ${metrica.complejidad || 'N/A'}</p>
        <p style="margin-left: 20px;">Frecuencia: ${metrica.frecuencia || 'N/A'} dia(s)</p>
        <p style="margin-left: 20px;">Explicación: ${metrica.explicacion}</p>
        <p style="margin-left: 20px;">Puntaje: ${metrica.puntaje}</p>
      `;

      metricaContainer.innerHTML = metricaContent;

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.style.marginLeft = '20px';
      btnEliminar.addEventListener('click', function() {
        if (confirm("¿Estás seguro de eliminar este commit?")) {
          practicaSeleccionada.eliminarMetrica(metrica.numeroCommit);
          ingresarAMetricaDePractica(nombrePractica); 
        }
      });

      metricaContainer.appendChild(btnEliminar);
      proyectoContainer.appendChild(metricaContainer);
    });

    const formMetrica = document.createElement('form');

    const inputNumeroCommit = document.createElement('input');
    inputNumeroCommit.type = 'number';
    inputNumeroCommit.placeholder = 'Número de commit';

    const inputPruebas = document.createElement('input');
    inputPruebas.type = 'number';
    inputPruebas.placeholder = 'Pruebas';

    const inputCantidadLineas = document.createElement('input'); // Nueva línea para cantidad de líneas de código
    inputCantidadLineas.type = 'number'; // Tipo número para asegurar que se ingresen solo números
    inputCantidadLineas.placeholder = 'Cobertura '; // Placeholder para guiar al usuario

    const inputCobertura = document.createElement('input');
    inputCobertura.type = 'number';
    inputCobertura.placeholder = 'Cantidad de líneas de código';

    const inputComplejidad = document.createElement('input'); 
    inputComplejidad.type = 'text'; 
    inputComplejidad.placeholder = 'Complejidad(Excelente, Bueno, Regular, Deficiente)';

    //const inputFrecuencia = document.createElement('input'); 
    //inputFrecuencia.type = 'text'; 
    //inputFrecuencia.placeholder = 'Frecuencia';

    const inputFechaInicio = document.createElement('input');
    inputFechaInicio.type = 'date';
    inputFechaInicio.placeholder = 'Fecha de inicio';

    const inputFechaFin = document.createElement('input');
    inputFechaFin.type = 'date';
    inputFechaFin.placeholder = 'Fecha de fin';

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

    selectTipo.addEventListener('change', function() {
      if (selectTipo.value === 'refactoring') {
        inputPruebas.style.display = 'none';
        inputCobertura.style.display = 'none';
        inputCantidadLineas.style.display = 'none'; // Ocultar el campo de cantidad de líneas para refactorización
        inputComplejidad.style.display = 'none';
        inputFrecuencia.style.display = 'none';
      } else {
        inputPruebas.style.display = 'block';
        inputCobertura.style.display = 'block';
        inputCantidadLineas.style.display = 'block'; // Mostrar el campo de cantidad de líneas para convencional
        inputComplejidad.style.display = 'block';
        inputFrecuencia.style.display = 'block';
      }
      
    });
    
    //-----------------------------------------------------------------------------------------
    const btnAgregarMetricaDesdeArchivo = document.createElement('button');
    btnAgregarMetricaDesdeArchivo.textContent = 'Agregar Métrica desde Archivo';

    btnAgregarMetricaDesdeArchivo.addEventListener('click', function() {
      //event.preventDefault();
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.txt'; // Acepta solo archivos de texto
      input.addEventListener('change', function() {
        const file = input.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(event) {
            const content = event.target.result;
            const lineas = content.split('\n');
            lineas.forEach(linea => {
              const valores = linea.split(','); // Suponiendo que las métricas están separadas por comas
              const numeroCommit = parseInt(valores[0]);
              const explicacion = valores[1];
              const pruebas = parseInt(valores[2]);
              const cobertura = parseInt(valores[3]);
              const cantidadLineas = parseInt(valores[4]);
              const complejidad = valores[5];
              const tipo = valores[6];
              const frecuencia = parseInt(valores[7]);

              if (!isNaN(numeroCommit) && explicacion && !isNaN(pruebas) && !isNaN(cobertura) && !isNaN(cantidadLineas) && !isNaN(frecuencia)) {
                const result = practicaSeleccionada.anadirMetrica(numeroCommit, explicacion, pruebas, cobertura, cantidadLineas, complejidad, tipo, frecuencia);
                if (result) {
                  alert('Métricas agregadas exitosamente.');
                } else {
                  alert('Número de commit inválido. Los números de commit deben ser secuenciales y únicos.');
                }
                ingresarAMetricaDePractica(nombrePractica);  
              } else {
                alert('Por favor, ingresa valores válidos.');
              }
            });
          };
          reader.readAsText(file);
        } else {
          alert('No se seleccionó ningún archivo');
        }
      });
      input.click(); // Abre el cuadro de diálogo para seleccionar un archivo
    });

    document.getElementById("proyectoForm").insertAdjacentElement('afterend', btnAgregarMetricaDesdeArchivo);
    //-----------------------------------------------------------------------------------------

    const btnConfirmMetrica = document.createElement('button');
    btnConfirmMetrica.textContent = 'Agregar Métrica';

    const messageDiv = document.createElement('div');
    formMetrica.appendChild(messageDiv);
    btnConfirmMetrica.addEventListener('click', (event) => {
      event.preventDefault();
      const numeroCommit = parseInt(inputNumeroCommit.value);
      const explicacion = inputExplicacion.value;
      const pruebas = parseInt(inputPruebas.value);
      const cobertura = parseInt(inputCobertura.value);
      const cantidadLineas = parseInt(inputCantidadLineas.value);
      const complejidad = inputComplejidad.value;
      //const frecuencia = inputFrecuencia.value;
      const tipo = selectTipo.value;

      const fechaInicio = new Date(inputFechaInicio.value);
      const fechaFin = new Date(inputFechaFin.value);
      const frecuencia = Math.round((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));

      if (!isNaN(numeroCommit) && explicacion) {
        const result = practicaSeleccionada.anadirMetrica(numeroCommit, explicacion, pruebas, cobertura, cantidadLineas, complejidad, tipo, frecuencia);
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
    
    //boton para ver recomendaciones
    const btnVerRecomendaciones = document.createElement('button');
    btnVerRecomendaciones.textContent = 'Ver recomendaciones del proyecto';
    btnVerRecomendaciones.addEventListener('click', function() {
      const recomendacion = practicaSeleccionada.obtenerRecomendacion();
      alert(recomendacion);
    });
    proyectoContainer.appendChild(btnVerRecomendaciones);

    formMetrica.appendChild(inputNumeroCommit);
    formMetrica.appendChild(inputPruebas);
    formMetrica.appendChild(inputCobertura);
    formMetrica.appendChild(inputCantidadLineas); // Agregar el input de cantidad de líneas
    formMetrica.appendChild(inputComplejidad);
    //formMetrica.appendChild(inputFrecuencia);
    formMetrica.appendChild(inputFechaInicio);
    formMetrica.appendChild(inputFechaFin);
    formMetrica.appendChild(inputExplicacion);
    formMetrica.appendChild(selectTipo); 
    formMetrica.appendChild(btnConfirmMetrica);
    proyectoContainer.appendChild(formMetrica);
  }
  

}

window.eliminarPractica = eliminarPractica;
window.desplegarFormularioEditar = desplegarFormularioEditar;
window.ingresarAMetricaDePractica = ingresarAMetricaDePractica;
window.mostrarDetalle = mostrarDetalle;