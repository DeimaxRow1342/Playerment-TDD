import Practicas from "./practicas.js";

describe("Crear un programa gamificado para TDDLab Praticas", () => {
  it("Si ingreso el nombre de una practica, me regresa el nombre", () => {
    const practica = new Practicas();
    practica.cargarDatos("FizzBuzz");
    expect(practica.nombre).toEqual("FizzBuzz");
  });
  it("Si ingreso el nombre y la descripcion de una practica, me regresa el nombre y la descripcion en una clase", () => {
    const practica = new Practicas();
    practica.cargarDatos("FizzBuzz", "Una practica de TDD donde se retorna una cadena de Fizz, Buzz o FizzBuzz de acuerdo a ciertas reglas");
    expect(practica.descripcion).toEqual("Una practica de TDD donde se retorna una cadena de Fizz, Buzz o FizzBuzz de acuerdo a ciertas reglas");
  });
  it("Si ingreso el nombre, la descripcion y la fecha de una practica, me regresa el nombre, la descripcion y la fecha en una clase", () => {
      const practica = new Practicas();
      practica.cargarDatos("FizzBuzz", "Una practica de TDD donde se retorna una cadena de Fizz, Buzz o FizzBuzz de acuerdo a ciertas reglas","20/02/2024");
      expect(practica.fecha).toEqual("20/02/2024");
  });
  it("Si ingreso el nombre, la descripcion, la fecha y el enlace de una practica, me regresa el nombre, la descripcion, la fecha y el enlace en una clase", () => {
    const practica = new Practicas();
    practica.cargarDatos("FizzBuzz", "Una practica de TDD donde se retorna una cadena de Fizz, Buzz o FizzBuzz de acuerdo a ciertas reglas","20/02/2024", "https://github.com/DeimaxRow1342/SecuenciaFizzBuzz");
    expect(practica.enlace).toEqual("https://github.com/DeimaxRow1342/SecuenciaFizzBuzz");
  });
  it("Si ingreso el nombre de una práctica y luego la busco, debería regresar la práctica", () => {
    const practica = new Practicas();
    practica.cargarDatos("FizzBuzz");
    expect(practica.obtenerPractica("FizzBuzz")).toEqual(practica);
  });
  it("Si ingreso el nombre de una práctica y luego la elimino, debería ser nula", () => {
    const practica = new Practicas();
    practica.cargarDatos("FizzBuzz");
    practica.eliminarDatos("FizzBuzz");
    expect(practica.obtenerPractica("FizzBuzz")).toBeUndefined(); 
  });
  it('Se deberia añadir una metrica de manera correcta', () => {
    let practica = new Practicas("Prueba1", "Descripcion de prueba1", new Date());
    let numCommit1 = 1;
    let explicacion1 = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
    let pruebas1 = null;
    let cobertura1 = null;
    let cantidadLineas1 = null; // Cambiado a null
    practica.anadirMetrica(numCommit1, explicacion1, pruebas1, cobertura1, cantidadLineas1, "convencional");
    expect(practica.motrarMetricas()).toEqual([
        {
            numeroCommit: 1,
            puntaje: 0,
            explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla",
            pruebas: null,
            cobertura: null, 
            cantidadLineas: null, 
            tipo: null,
        },
    ]);
  });

  it("Debe poder añadir una métrica a una práctica y verificar que se añadió correctamente", () => {
    const practica = new Practicas();
    practica.cargarDatos("Calculadora", "Prueba unitaria para suma", "2024-05-01", "https://github.com/example/Calculadora");
    practica.anadirMetrica(1, "Primer commit", 0, 0, "convencional", 20);
    const metricas = practica.motrarMetricas();
    expect(metricas.length).toEqual(1);
    expect(metricas[0]).toEqual({ numeroCommit: 1, puntaje: 24, explicacion: "Primer commit", pruebas: 0, cobertura: 0, tipo: "convencional", cantidadLineas: 20 });
  });

  it("No debe añadir una métrica si el número de commit es inválido", () => {
    const practica = new Practicas();
    practica.cargarDatos("Calculadora", "Prueba unitaria para suma", "2024-05-01", "https://github.com/example/Calculadora");
    practica.anadirMetrica(null, 90, "Explicación válida");
  
    const metricas = practica.motrarMetricas();
    expect(metricas.length).toEqual(0);
  });
//mal
  it("Should not allow non-incremental commit numbers", () => {
    const practica = new Practicas();
    practica.cargarDatos("Test", "Test Description", "2024-01-01", "http://example.com");
    expect(practica.anadirMetrica(1, 90, "Initial commit")).toBe(true);  
    expect(practica.anadirMetrica(1, 95, "Duplicate commit")).toBe(false);  
    expect(practica.anadirMetrica(0, 95, "Invalid commit")).toBe(false);  
    expect(practica.anadirMetrica(2, 95, "Second commit")).toBe(true);  
  });

  it("Se debe poder eliminar un commit correctamente", () => {
    const practica = new Practicas();
    practica.cargarDatos("FizzBuzz");
    practica.anadirMetrica(1, "Primer commit", 0, 0, "convencional", 20);
    practica.anadirMetrica(2, "Segundo commit", 0, 0, "convencional", 20);
    practica.eliminarMetrica(1);
    const metricas = practica.motrarMetricas();
    expect(metricas.length).toEqual(1);
    expect(metricas[0]).toEqual({ numeroCommit: 2, puntaje: 24, explicacion: "Segundo commit", pruebas: 0, cobertura: 0, tipo: "convencional", cantidadLineas: 20 });
  });
  //PRUEBAS FINALES DEL PROGRAMA FUNCIONAL
  it("Debe retornar falso si se intenta añadir un commit no secuencial", () => {
    const practica = new Practicas();
    practica.cargarDatos("Test Project", "Descripción del test", "2024-01-01", "http://example.com");
    expect(practica.anadirMetrica(1, 100, "Primer commit")).toBe(true);
    expect(practica.anadirMetrica(3, 90, "Saltando un commit")).toBe(false);
  });

  it("debería devolver nulo al buscar una práctica inexistente", () => {
    const practica = new Practicas();
    practica.cargarDatos("FizzBuzz");
    expect(practica.obtenerPractica("NotFound")).toBeUndefined();
  });

  it("debería devolver nulo al buscar una práctica inexistente", () => {
    const practica = new Practicas();
    practica.cargarDatos("FizzBuzz");
    practica.cargarDatos("NombreActualizado", "ActualizadoDescripción", "2025-01-01", "https://newurl.com");
    expect(practica.nombre).toEqual("NombreActualizado");
    expect(practica.descripcion).toEqual("ActualizadoDescripción");
    expect(practica.fecha).toEqual("2025-01-01");
    expect(practica.enlace).toEqual("https://newurl.com");
  });

  it("debe realizar un seguimiento preciso del último número de confirmación", () => {
    const practica = new Practicas();
    practica.anadirMetrica(1, 100, "Configuración inicial");
    practica.anadirMetrica(2, 90, "Added new feature");
    expect(practica.lastCommitNumber).toEqual(2);
  });

  it("debe calcular correctamente el número total de pruebas ejecutadas", () => {
    const practica = new Practicas();
    practica.pruebas = [1, 2, 3, 4, 5];
    expect(practica.contarPruebas()).toEqual(5);
  });

  it("debería permitir la eliminación de todas las métricas", () => {
    const practica = new Practicas();
    practica.anadirMetrica(1, 100, "First");
    practica.anadirMetrica(2, 100, "Second");
    practica.eliminarMetrica(1);
    practica.eliminarMetrica(2);
    expect(practica.motrarMetricas()).toEqual([]);
  });

  it("se debería mostrar correctamente todas las métricas agregadas", () => {
    const practica = new Practicas();
    practica.anadirMetrica(1, 100, "First commit");
    practica.anadirMetrica(2, 90, "Second commit");
    const metrics = practica.motrarMetricas();
    expect(metrics.length).toEqual(2);
  });

  it("debe informar con precisión el número de confirmación más alto", () => {
    const practica = new Practicas();
    practica.anadirMetrica(1, 90, "Commit one");
    practica.anadirMetrica(2, 95, "Commit two");
    expect(practica.lastCommitNumber).toEqual(2);
  });

  it("debería rechazar métricas con números de confirmación no enteros", () => {
    const practica = new Practicas();
    expect(practica.anadirMetrica("uno", 100, "Non-integer commit")).toEqual(false);
  });

  it("no debe modificar la matriz de métricas directamente desde el exterior", () => {
    const practica = new Practicas();
    const initialMetrics = practica.motrarMetricas();
    initialMetrics.push({ numeroCommit: 3, puntaje: 80, explicacion: "Edición externa" });
    expect(practica.motrarMetricas()).not.toContain({ numeroCommit: 3, puntaje: 80, explicacion: "Edición externa" });
  });

  it("debe eliminar una métrica por número de confirmación y verificar que se haya eliminado", () => {
    const practica = new Practicas();
    practica.anadirMetrica(1, 85, "First commit");
    practica.anadirMetrica(2, 90, "Second commit");
    practica.eliminarMetrica(1);
    const metrics = practica.motrarMetricas();
    expect(metrics.some(m => m.numeroCommit === 1)).toEqual(false);
    expect(metrics.length).toEqual(1);
    expect(metrics[0].numeroCommit).toEqual(2);
  });

  it("debería manejar la eliminación de una confirmación inexistente", () => {
    const practica = new Practicas();
    practica.anadirMetrica(1, 85, "First commit");
    practica.eliminarMetrica(2); // Intentar eliminar una confirmación inexistente
    const metrics = practica.motrarMetricas();
    expect(metrics.length).toEqual(1);
    expect(metrics[0].numeroCommit).toEqual(1);
  });

  it("debería permitir eliminar una métrica en una lista de múltiples métricas sin afectar a otras", () => {
    const practica = new Practicas();
    practica.anadirMetrica(1, 85, "First commit");
    practica.anadirMetrica(2, 90, "Second commit");
    practica.anadirMetrica(3, 95, "Third commit");
    practica.eliminarMetrica(2);
    const metrics = practica.motrarMetricas();
    expect(metrics.length).toEqual(2);
    expect(metrics.find(m => m.numeroCommit === 1)).not.toEqual(undefined);
    expect(metrics.find(m => m.numeroCommit === 2)).toEqual(undefined);
    expect(metrics.find(m => m.numeroCommit === 3)).not.toEqual(undefined);
  });

  it("debe actualizar la lista de métricas correctamente después de eliminar varias métricas en secuencia", () => {
    const practica = new Practicas();
    practica.anadirMetrica(1, 80, "First commit");
    practica.anadirMetrica(2, 85, "Second commit");
    practica.anadirMetrica(3, 90, "Third commit");
    practica.eliminarMetrica(1);
    practica.eliminarMetrica(3);
    const metrics = practica.motrarMetricas();
    expect(metrics.length).toEqual(1);
    expect(metrics[0].numeroCommit).toEqual(2);
  });
  it("debe editar el nombre de una práctica correctamente", () => {
    const practica = new Practicas();
    practica.cargarDatos("Calculadora", "Prueba unitaria para suma", "2024-05-01", "https://github.com/example/Calculadora");
    practica.editarDatos("Totalizador");
    expect(practica.nombre).toEqual("Totalizador");
  });
  it("debe editar el nombre y la descripcion de una práctica correctamente", () => {
    const practica = new Practicas();
    practica.cargarDatos("Calculadora", "Prueba unitaria para suma", "2024-05-01", "https://github.com/example/Calculadora");
    practica.editarDatos("Totalizador", "Prueba unitaria para suma y resta");
    expect(practica.nombre).toEqual("Totalizador");
    expect(practica.descripcion).toEqual("Prueba unitaria para suma y resta");
  });
  it("debe editar el nombre, descripcion y fecha de una práctica correctamente", () => {
    const practica = new Practicas();
    practica.cargarDatos("Calculadora", "Prueba unitaria para suma", "2024-05-01", "https://github.com/example/Calculadora");
    practica.editarDatos("Totalizador", "Prueba unitaria para suma y resta", "2023-07-03");
    expect(practica.nombre).toEqual("Totalizador");
    expect(practica.descripcion).toEqual("Prueba unitaria para suma y resta");
    expect(practica.fecha).toEqual("2023-07-03");
  });
  it("debe editar el nombre, descripcion y fecha de una práctica correctamente", () => {
    const practica = new Practicas();
    practica.cargarDatos("Calculadora", "Prueba unitaria para suma", "2024-05-01", "https://github.com/example/Calculadora");
    practica.editarDatos("Totalizador", "Prueba unitaria para suma y resta", "2023-07-03", "https://github.com/example/Totalizador");
    expect(practica.nombre).toEqual("Totalizador");
    expect(practica.descripcion).toEqual("Prueba unitaria para suma y resta");
    expect(practica.fecha).toEqual("2023-07-03");
    expect(practica.enlace).toEqual("https://github.com/example/Totalizador");
  });
  //recomendaciones 
  it('debería retornar "no existen commits" cuando el número de commits es 0', () => {
    const practica = new Practicas();
    const recomendacion = practica.obtenerRecomendacion();
    expect(recomendacion).toEqual("no existen commits");
  });
  it('debería retornar "el numero de pruebas agregadas esta siendo agregada de buena manera, buen trabajo!" cuando el número de commits es igual al número de pruebas y es distinto de 0', () => {
    const practica = new Practicas();
    practica.pruebas = ['prueba1', 'prueba2']; // Agregar pruebas
    practica.anadirMetrica(1, "Explicación 1", [], 90, "tipo1");
    practica.anadirMetrica(2, "Explicación 2", [], 90, "tipo2");
    const recomendacion = practica.obtenerRecomendacion();
    expect(recomendacion).toEqual("el numero de pruebas agregadas fue agregada de buena manera, buen trabajo!");
  });
  it('debería retornar "el numero de pruebas agregadas fue implementada de muy mala forma, ten cuidado!" cuando el número de commits es distinto al número de pruebas', () => {
    const practica = new Practicas();
    practica.pruebas = ['prueba1', 'prueba2', 'prueba3']; // Agregar pruebas
    practica.anadirMetrica(1, "Explicación 1", [], 90, "tipo1");
    practica.anadirMetrica(2, "Explicación 2", [], 90, "tipo2");

    const recomendacion = practica.obtenerRecomendacion();
    expect(recomendacion).toEqual("el numero de pruebas agregadas fue implementada de muy mala forma, ten cuidado!");
  });
  //ranking
  test('debería generar un ranking basado en el desempeño de los ejercicios', () => {
    const practicas = new Practicas();
    practicas.cargarDatos("Ejercicio1", "Descripción1", "2024-01-01", "http://link1.com");
    practicas.anadirMetrica(1, "Commit1", 10, 80, "convencional");
    practicas.anadirMetrica(2, "Commit2", 20, 90, "convencional");

    const ranking = practicas.generarRanking();
    
    expect(ranking).toEqual([
        { nombre: "Ejercicio1", puntaje: 48 } 
    ]);
});
test('debería mostrar la posición relativa en el ranking', () => {
  const practicas = new Practicas();
  const otraPractica = new Practicas();
  practicas.cargarDatos("Ejercicio1", "Descripción1", "2024-01-01", "http://link1.com");
  otraPractica.cargarDatos("Ejercicio2", "Descripción2", "2024-01-02", "http://link2.com");

  practicas.anadirMetrica(1, "Commit1", 10, 80, "convencional");
  otraPractica.anadirMetrica(1, "Commit1", 5, 70, "convencional");

  const ranking = [practicas, otraPractica].map(p => p.generarRanking());
  const posicion = practicas.obtenerPosicionEnRanking(ranking);

  expect(posicion).toBe(1); // Ejercicio1 debería estar primero
});
test('debería proporcionar un panel detallado de puntuación', () => {
  const practicas = new Practicas();
  practicas.cargarDatos("Ejercicio1", "Descripción1", "2024-01-01", "http://link1.com");
  practicas.anadirMetrica(1, "Commit1", 10, 80, "convencional");

  const panel = practicas.detallePuntuacion();

  expect(panel).toEqual({
      nombre: "Ejercicio1",
      metricas: [
          { numeroCommit: 1, pruebas: 10, cobertura: 80, puntaje: 24, explicacion: "Commit1", tipo: "convencional" }
      ]
  });
});



});

