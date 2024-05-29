import Practicas from "./datosPracticas.js";
import Metrica from "./metrica.js";
import MetricaArray from "./metricasArray.js";

describe("Crear un programa gamificado para TDDLab", () => {
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
  
  it("Se debe añadir un primer commit en las metricas", () => {
    let numCommit = 1;
    let metric = new Metrica(numCommit)
    expect(metric.getNumeroCommit()).toEqual(1);
  });

  it("Se debe añadir un segundo commit en las metricas", () => {
    let numCommit1 = 2;
    
    let metric = new Metrica(numCommit1)
    expect(metric.getNumeroCommit()).toEqual(2);
  });

  it("Se debe añadir un Puntaje ademas del numero de commit en las metricas", () => {
    let numCommit1 = 1;
    let puntaje = 100;
    
    let puntCommit = new Metrica(numCommit1, puntaje)
    expect(puntCommit.getPuntaje()).toEqual(100);
  });

  it("Se debe añadir un Puntaje ademas del numero de commit en las metricas", () => {
    let numCommit2 = 2;
    let puntaje = 90;
    
    let puntCommit = new Metrica(numCommit2, puntaje)
    expect(puntCommit.getPuntaje()).toEqual(90);
  });

  it("Se añade ademas del numero de commit y el puntaje la explicacion del commit en las metricas", () => {
    let numCommit = 1;
    let puntaje = 100;
    let explicacion = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
    
    let explica = new Metrica(numCommit, puntaje,explicacion)
    expect(explica.getExplicacion()).toEqual("Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla");
  });
  
  it("Se añade ademas del numero de commit y el puntaje la explicacion de un segundo commit en las metricas", () => {
    let numCommit = 2;
    let puntaje = 90;
    let explicacion = "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz";
    
    let explica = new Metrica(numCommit, puntaje, explicacion)
    expect(explica.getExplicacion()).toEqual("Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz");
  });

  it("Se logra añadir un commit dentro un array de metricas", () => {
    let numCommit = 1;
    let puntaje = 100;
    let explicacion = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
    let metricArray = new MetricaArray();
    expect(metricArray.desplegarMetrica()).toEqual([]);
  });

  it("Se logra mostrar un commit en el array de metricas", () => {
    let numCommit = 1;
    let puntaje = 100;
    let explicacion = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
    let metricArray = new MetricaArray();
    metricArray.anadirMetricaCommit(numCommit,puntaje,explicacion);

    let arrayDeMetrica = [{
      numeroCommit: 1,
      puntaje: 100,
      explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla"
    }]
    expect(metricArray.desplegarMetrica()).toEqual(arrayDeMetrica);
  });

  it("Se logra mostrar dos commits en un array de metricas", () => {
    let numCommit1 = 1;
    let puntaje1 = 100;
    let explicacion1 = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
    
    let numCommit2 = 2;
    let puntaje2 = 90;
    let explicacion2 = "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz";

    let metricArray = new MetricaArray();
    metricArray.anadirMetricaCommit(numCommit1,puntaje1,explicacion1);
    metricArray.anadirMetricaCommit(numCommit2,puntaje2,explicacion2);

    let arrayDeMetrica = [{
      numeroCommit: 1,
      puntaje: 100,
      explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla"
    },
    {
      numeroCommit: 2,
      puntaje: 90,
      explicacion: "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz"
    }]
    expect(metricArray.desplegarMetrica()).toEqual(arrayDeMetrica);
  });

  it("Se logra mostrar mas de dos commits en un array de metricas", () => {
    let numCommit1 = 1;
    let puntaje1 = 100;
    let explicacion1 = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
    
    let numCommit2 = 2;
    let puntaje2 = 90;
    let explicacion2 = "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz";

    let numCommit3 = 3;
    let puntaje3 = 95;
    let explicacion3 = "Se añade la funcionalidad para devolver Fizz cuando se ingrese el numero 3";

    let metricArray = new MetricaArray();
    metricArray.anadirMetricaCommit(numCommit1,puntaje1,explicacion1);
    metricArray.anadirMetricaCommit(numCommit2,puntaje2,explicacion2);
    metricArray.anadirMetricaCommit(numCommit3,puntaje3,explicacion3);

    let arrayDeMetrica = [{
      numeroCommit: 1,
      puntaje: 100,
      explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla"
    },
    {
      numeroCommit: 2,
      puntaje: 90,
      explicacion: "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz"
    },
    {
      numeroCommit: 3,
      puntaje: 95,
      explicacion: "Se añade la funcionalidad para devolver Fizz cuando se ingrese el numero 3"
    }]
    expect(metricArray.desplegarMetrica()).toEqual(arrayDeMetrica);
  });

  it("Se deberia añadir una metrica de manera correcta", () => {
    let practica = new Practicas("FizzBuzz");
    let numCommit1 = 1;
    let puntaje1 = 100;
    let explicacion1 = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
    practica.anadirMetrica(numCommit1,puntaje1,explicacion1);
    expect(practica.motrarMetricas()).toEqual([
      {
        numeroCommit: 1,
        puntaje: 100,
        explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla"
    }]);
  });

  it("Debe poder añadir una métrica a una práctica y verificar que se añadió correctamente", () => {
    const practica = new Practicas();
    practica.cargarDatos("Calculadora", "Prueba unitaria para suma", "2024-05-01", "https://github.com/example/Calculadora");
    practica.anadirMetrica(1, 85, "Primer commit");
    const metricas = practica.motrarMetricas();
    expect(metricas.length).toEqual(1);
    expect(metricas[0]).toEqual({ numeroCommit: 1, puntaje: 85, explicacion: "Primer commit" });
  });

  it("No debe añadir una métrica si el número de commit es inválido", () => {
    const practica = new Practicas();
    practica.cargarDatos("Calculadora", "Prueba unitaria para suma", "2024-05-01", "https://github.com/example/Calculadora");
    practica.anadirMetrica(null, 90, "Explicación válida");
  
    const metricas = practica.motrarMetricas();
    expect(metricas.length).toEqual(0);
  });
//mal
  it("Debe actualizar una métrica existente correctamente", () => {
    const practica = new Practicas();
    practica.cargarDatos("Calculadora", "Prueba unitaria para suma", "2024-05-01", "https://github.com/example/Calculadora");
    practica.anadirMetrica(1, 85, "Corrección de errores");
    practica.anadirMetrica(2, 75, "Primer commit");
    const metricas = practica.motrarMetricas();
    expect(metricas.find(m => m.numeroCommit === 1).puntaje).toEqual(85);
  });

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
    practica.anadirMetrica(1, 85, "Primer commit");
    practica.anadirMetrica(2, 75, "Segundo commit");
    practica.eliminarMetrica(1);
    const metricas = practica.motrarMetricas();
    expect(metricas.length).toEqual(1);
    expect(metricas[0]).toEqual({ numeroCommit: 2, puntaje: 75, explicacion: "Segundo commit" });
  });
  
  it("Si se ingresa una prueba se muestra el numero de pruebas", () => {
    const metrica = new Metrica();
    metrica.cargarMetricas(7);
    expect(metrica.pruebas).toEqual(7);
  });

  it("Si se ingresa numero de pruebas y cobertura se retorna la cobertura, ademas del numero de pruebas", () => {
    const metrica = new Metrica();
    metrica.cargarMetricas(7, 93);
    expect(metrica.cobertura).toEqual(93);
  });

  it("Si se ingresa 5 pruebas, se calcula el puntaje como 1000 puntos", () => {
    const metrica = new Metrica(1, 0, "Prueba de commit");
    metrica.cargarMetricas(5, 93);
    metrica.puntaje = metrica.calcularPuntaje(metrica.puntaje);
    expect(metrica.getPuntaje()).toEqual(1000);
  });

  it("Si se ingresa 5 pruebas, se calcula el puntaje como 1000 puntos", () => {
    const metrica = new Metrica(1, 0, "Prueba de commit");
    metrica.cargarMetricas(5, 93);
    metrica.puntaje = metrica.calcularPuntaje(metrica.puntaje);
    expect(metrica.getPuntaje()).toEqual(1000);
  });

  it("Si se ingresa 7 pruebas, no se contempla en el rango ideal por lo que se reduce el puntaje en 100 puntos, retornando 900 puntos", () => {
    const metrica = new Metrica(1, 0, "Prueba de commit");
    metrica.cargarMetricas(7, 93);
    metrica.puntaje = metrica.calcularPuntaje(metrica.puntaje);
    expect(metrica.getPuntaje()).toEqual(900);
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

});

