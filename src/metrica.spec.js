import Practicas from "./practicas.js";
import Metrica from "./metrica.js";
import ModuloMetricas from "./moduloMetricas.js";

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

  it("Se añade ademas del numero de commit y el puntaje la explicacion del commit en las metricas", () => {
    let numCommit = 1;
    let explicacion = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
    
    let explica = new Metrica(numCommit, explicacion)
    expect(explica.getExplicacion()).toEqual("Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla");
  });
  
  it("Se añade ademas del numero de commit y el puntaje la explicacion de un segundo commit en las metricas", () => {
    let numCommit = 2;
    let explicacion = "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz";
    
    let explica = new Metrica(numCommit, explicacion)
    expect(explica.getExplicacion()).toEqual("Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz");
  });

  it("Se logra añadir un commit dentro un array de metricas", () => {
    let numCommit = 1;
    let explicacion = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
    let metricArray = new ModuloMetricas();
    expect(metricArray.desplegarMetrica()).toEqual([]);
  });

  it("Se logra mostrar un commit en el array de metricas", () => {
    let numCommit = 1;
    let explicacion = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
    let pruebas = 0;
    let cobertura = 0;
    let metricArray = new ModuloMetricas();
    metricArray.anadirMetricaCommit(numCommit, explicacion, pruebas, cobertura);

    let arrayDeMetrica = {
      numeroCommit: 1,
      puntaje: 0,
      explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla",
      pruebas: 0,
      cobertura: 0
    }
    expect(metricArray.buscarMetricaPorCommit(numCommit)).toEqual(arrayDeMetrica);
  });

  it("Se logra mostrar dos commits en un array de metricas", () => {
    let numCommit1 = 1;
    let explicacion1 = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
    let pruebas1 = 0;
    let cobertura1 = 0;
    
    let numCommit2 = 2;
    let explicacion2 = "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz";
    let pruebas2 = 0;
    let cobertura2 = 0;

    let metricArray = new ModuloMetricas();
    metricArray.anadirMetricaCommit(numCommit1,explicacion1,pruebas1,cobertura1);
    metricArray.anadirMetricaCommit(numCommit2,explicacion2,pruebas2,cobertura2);

    let arrayDeMetrica = [{
      numeroCommit: 1,
      puntaje: 0,
      explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla",
      pruebas: 0,
      cobertura: 0
    },
    {
      numeroCommit: 2,
      puntaje: 0,
      explicacion: "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz",
      pruebas: 0,
      cobertura: 0
    }]
    expect(metricArray.desplegarMetrica()).toEqual(arrayDeMetrica);
  });

  it("Se logra mostrar mas de dos commits en un array de metricas", () => {
    let numCommit1 = 1;
    let explicacion1 = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
    let pruebas1 = 0;
    let cobertura1 = 0;
    
    let numCommit2 = 2;
    let explicacion2 = "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz";
    let pruebas2 = 0;
    let cobertura2 = 0;

    let numCommit3 = 3;
    let explicacion3 = "Se añade la funcionalidad para devolver Fizz cuando se ingrese el numero 3";
    let pruebas3 = 0;
    let cobertura3 = 0;

    let metricArray = new ModuloMetricas();
    metricArray.anadirMetricaCommit(numCommit1,explicacion1,pruebas1,cobertura1);
    metricArray.anadirMetricaCommit(numCommit2,explicacion2,pruebas2,cobertura2);
    metricArray.anadirMetricaCommit(numCommit3,explicacion3,pruebas3,cobertura3);

    let arrayDeMetrica = [{
      numeroCommit: 1,
      puntaje: 0,
      explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla",
      pruebas: 0,
      cobertura: 0
    },
    {
      numeroCommit: 2,
      puntaje: 0,
      explicacion: "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz",
      pruebas: 0,
      cobertura: 0
    },
    {
      numeroCommit: 3,
      puntaje: 0,
      explicacion: "Se añade la funcionalidad para devolver Fizz cuando se ingrese el numero 3",
      pruebas: 0,
      cobertura: 0
    }]
    expect(metricArray.desplegarMetrica()).toEqual(arrayDeMetrica);
  });

  it("Se deberia añadir una metrica de manera correcta", () => {
    let practica = new Practicas("FizzBuzz");
    let numCommit1 = 1;
    let explicacion1 = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
    let pruebas1 = 0;
    let cobertura1 = 0;
    practica.anadirMetrica(numCommit1,explicacion1,pruebas1,cobertura1);
    expect(practica.motrarMetricas()).toEqual([
      {
        numeroCommit: 1,
        puntaje: 0,
        explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla",
        pruebas: 0,
        cobertura: 0
    }]);
  });

  it("Debe poder añadir una métrica a una práctica y verificar que se añadió correctamente", () => {
    const practica = new Practicas();
    practica.cargarDatos("Calculadora", "Prueba unitaria para suma", "2024-05-01", "https://github.com/example/Calculadora");
    practica.anadirMetrica(1, "Primer commit", 0, 0);
    const metricas = practica.motrarMetricas();
    expect(metricas.length).toEqual(1);
    expect(metricas[0]).toEqual({ numeroCommit: 1, puntaje: 0, explicacion: "Primer commit", pruebas: 0, cobertura: 0 });
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
    practica.anadirMetrica(1, "Primer commit", 0, 0);
    practica.anadirMetrica(2, "Segundo commit", 0, 0);
    practica.eliminarMetrica(1);
    const metricas = practica.motrarMetricas();
    expect(metricas.length).toEqual(1);
    expect(metricas[0]).toEqual({ numeroCommit: 2, puntaje: 0, explicacion: "Segundo commit", pruebas: 0, cobertura: 0 });
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

  /* Puntaje metricas por cobertura */
  it("debe retornar 0 si la cobertura es 0", () => {
    const metrica = new Metrica();
    expect(metrica.calcularPuntajePorCobertura(0)).toEqual(0);
  });
  it("Si la cobertura es menor a 70 y mayor a 0, el puntaje es 8", () =>{
    const metrica = new Metrica();
    expect(metrica.calcularPuntajePorCobertura(69)).toEqual(8);
  })
  it("Si la cobertura esta entre 70-79, el puntaje es 12", () =>{
    const metrica = new Metrica();
    expect(metrica.calcularPuntajePorCobertura(71)).toEqual(12);
  })
  it("Si la cobertura esta entre 80-90, el puntaje es 16", () =>{
    const metrica = new Metrica();
    expect(metrica.calcularPuntajePorCobertura(82)).toEqual(16);
  })
  it("Si la cobertura es mayor a 90, el puntaje es 20", () =>{
    const metrica = new Metrica();
    expect(metrica.calcularPuntajePorCobertura(91)).toEqual(20);
  })
  /* Puntaje modulo metrica */
  it("Se deberia poder calcular el puntaje desde modulo metricas", () =>{
    const modMetricas = new ModuloMetricas();
    modMetricas.anadirMetricaCommit(1, "Se añade la funcionalidad para devolver Fizz cuando se ingrese el numero 3", 5, 92);
    expect(modMetricas.calcularPuntaje(1)).toEqual(20); 
  })
});

