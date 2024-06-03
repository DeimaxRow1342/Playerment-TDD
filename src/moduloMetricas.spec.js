import ModuloMetricas from "./moduloMetricas.js";

describe("Crear un programa gamificado para TDDLab ModuloMetricas", () => {
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
      let cantidadLineas = 10;
      let cobertura = 0;
      let tipo = 'convencional';
      let metricArray = new ModuloMetricas();
      metricArray.anadirMetricaCommit(numCommit, explicacion, pruebas, cantidadLineas, cobertura, tipo);
      let explicacionNueva = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla y se añade un mensaje de error";
      metricArray.anadirMetricaCommit(numCommit, explicacionNueva, pruebas, cantidadLineas, cobertura, tipo);
      let arrayDeMetrica = {
          numeroCommit: 1,
          pruebas: 0,
          cantidadLineas: 10,
          cobertura: 0,
          puntaje: 28,
          explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla y se añade un mensaje de error",
          tipo: 'convencional'
      }
      expect(metricArray.buscarMetricaPorCommit(numCommit)).toEqual(arrayDeMetrica);
    });

    it("deberia actualizar la metrica", () => {
      let numCommit = 1;
      let explicacion = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
      let pruebas = 0;
      let cantidadLineas = 10;
      let cobertura = 0;
      let tipo = 'convencional';
      let metricArray = new ModuloMetricas();
      metricArray.anadirMetricaCommit(numCommit, explicacion, pruebas, cantidadLineas, cobertura, tipo);
      let explicacionNueva = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla y se añade un mensaje de error";
      metricArray.actualizarMetricaExistente(metricArray.buscarMetricaPorCommit(numCommit), explicacionNueva, pruebas, cantidadLineas, cobertura, tipo);
      let arrayDeMetrica = {
          numeroCommit: 1,
          pruebas: 0,
          cantidadLineas: 10,
          cobertura: 0,
          puntaje: 28,
          explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla y se añade un mensaje de error",
          tipo: 'convencional'
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

    //
    it("Se logra eliminar un commit en el array de metricas", () => {
      let numCommit = 1;
      let explicacion = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
      let pruebas = 0;
      let cantidadLineas = 10;
      let cobertura = 0;
      let tipo = 'convencional';
      let metricArray = new ModuloMetricas();
      metricArray.anadirMetricaCommit(numCommit, explicacion, pruebas, cantidadLineas, cobertura, tipo);
      metricArray.eliminarMetricaCommit(numCommit);
      expect(metricArray.desplegarMetrica()).toEqual([]);
  });
    
    it("Se logra mostrar dos commits en un array de metricas", () => {
      let metricArray = new ModuloMetricas();
      metricArray.anadirMetricaCommit(1, "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla", 0, 0, 0, 'convencional');
      metricArray.anadirMetricaCommit(2, "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz", 0, 0, 0, 'convencional');
      expect(metricArray.desplegarMetrica()).toEqual([
          {
              numeroCommit: 1,
              pruebas: 0,
              cantidadLineas: 0,
              cobertura: 0,
              puntaje: 8,
              explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla",
              tipo: 'convencional'
          },
          {
              numeroCommit: 2,
              pruebas: 0,
              cantidadLineas: 0,
              cobertura: 0,
              puntaje: 8,
              explicacion: "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz",
              tipo: 'convencional'
          }
      ]);
    });
    
    it("Se logra mostrar mas de dos commits en un array de metricas", () => {
      let metricArray = new ModuloMetricas();
      metricArray.anadirMetricaCommit(1, "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla", 0, 0, 0, 'convencional');
      metricArray.anadirMetricaCommit(2, "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz", 0, 0, 0, 'convencional');
      metricArray.anadirMetricaCommit(3, "Se añade la funcionalidad para devolver Fizz cuando se ingrese el numero 3", 0, 0, 0, 'convencional');
      expect(metricArray.desplegarMetrica()).toEqual([
          {
              numeroCommit: 1,
              pruebas: 0,
              cantidadLineas: 0,
              cobertura: 0,
              puntaje: 8,
              explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla",
              tipo: 'convencional'
          },
          {
              numeroCommit: 2,
              pruebas: 0,
              cantidadLineas: 0,
              cobertura: 0,
              puntaje: 8,
              explicacion: "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz",
              tipo: 'convencional'
          },
          {
              numeroCommit: 3,
              pruebas: 0,
              cantidadLineas: 0,
              cobertura: 0,
              puntaje: 8,
              explicacion: "Se añade la funcionalidad para devolver Fizz cuando se ingrese el numero 3",
              tipo: 'convencional'
          }
      ]);
    });
 
    it("Se deberia poder calcular el puntaje desde modulo metricas", () =>{
      const modMetricas = new ModuloMetricas();
      const numCommit = 1;
      const explicacion = "Se añade la funcionalidad para devolver Fizz cuando se ingrese el numero 3";
      const pruebas = 5;
      const cantidadLineas = 92;
      const cobertura = 10;
      const tipo = 'convencional';

      modMetricas.anadirMetricaCommit(numCommit, explicacion, pruebas, cantidadLineas, cobertura, tipo);
      expect(modMetricas.calcularPuntaje(numCommit)).toEqual(8); 
    });  
});