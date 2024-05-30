import ModuloMetricas from "./moduloMetricas.js";

describe("Crear un programa gamificado para TDDLab", () => {
    it("Se logra añadir un commit dentro un array de metricas", () => {
        let numCommit = 1;
        let explicacion = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
        let metricArray = new ModuloMetricas();
        expect(metricArray.desplegarMetrica()).toEqual([]);
    });
    it("Si la metrica ya existe esta se debe modificar", () => {
        let numCommit = 1;
        let explicacion = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
        let pruebas = 0;
        let cobertura = 0;
        let metricArray = new ModuloMetricas();
        metricArray.anadirMetricaCommit(numCommit, explicacion, pruebas, cobertura);
        let explicacionNueva = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla y se añade un mensaje de error";
        metricArray.anadirMetricaCommit(numCommit, explicacionNueva, pruebas, cobertura);
        let arrayDeMetrica = {
          numeroCommit: 1,
          puntaje: 0,
          explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla y se añade un mensaje de error",
          pruebas: 0,
          cobertura: 0
        }
        expect(metricArray.buscarMetricaPorCommit(numCommit)).toEqual(arrayDeMetrica);
    });
    it("deberia actualizar la metrica", () => {
        let numCommit = 1;
        let explicacion = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
        let pruebas = 0;
        let cobertura = 0;
        let metricArray = new ModuloMetricas();
        metricArray.anadirMetricaCommit(numCommit, explicacion, pruebas, cobertura);
        let explicacionNueva = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla y se añade un mensaje de error";
        metricArray.actualizarMetricaExistente(metricArray.buscarMetricaPorCommit(numCommit), explicacionNueva);
        let arrayDeMetrica = {
          numeroCommit: 1,
          puntaje: 0,
          explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla y se añade un mensaje de error",
          pruebas: 0,
          cobertura: 0
        }
        expect(metricArray.buscarMetricaPorCommit(numCommit)).toEqual(arrayDeMetrica);
    });
    it("Se logra eliminar un commit en el array de metricas", () => {
        let numCommit = 1;
        let explicacion = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
        let pruebas = 0;
        let cobertura = 0;
        let metricArray = new ModuloMetricas();
        metricArray.anadirMetricaCommit(numCommit, explicacion, pruebas, cobertura);
        metricArray.eliminarMetricaCommit(numCommit);
        expect(metricArray.desplegarMetrica()).toEqual([]);
    });
    it('debe eliminar un commit en el array de métricas', () => {
        const numCommit = 1;
        const explicacion = "Se añade la funcionalidad de retornar el número 1, porque no sigue ninguna regla";
        const pruebas = 0;
        const cobertura = 0;
        let moduloMetricas = new ModuloMetricas();
        moduloMetricas.anadirMetricaCommit(numCommit, explicacion, pruebas, cobertura);
        expect(moduloMetricas.desplegarMetrica().length).toBe(1);
        moduloMetricas.eliminarMetricaCommit(numCommit);
        expect(moduloMetricas.desplegarMetrica().length).toBe(0);
        expect(moduloMetricas.desplegarMetrica()).toEqual([]);
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

    it("Se deberia poder calcular el puntaje desde modulo metricas", () =>{
        const modMetricas = new ModuloMetricas();
        modMetricas.anadirMetricaCommit(1, "Se añade la funcionalidad para devolver Fizz cuando se ingrese el numero 3", 5, 92);
        expect(modMetricas.calcularPuntaje(1)).toEqual(20); 
    })    
});