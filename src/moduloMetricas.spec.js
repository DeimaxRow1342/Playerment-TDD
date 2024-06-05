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
      let complejidad = "Regular";
      let tipo = 'convencional';
      let metricArray = new ModuloMetricas();
      metricArray.anadirMetricaCommit(numCommit, explicacion, pruebas, cantidadLineas, cobertura, complejidad, tipo);
      let explicacionNueva = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla y se añade un mensaje de error";
      metricArray.anadirMetricaCommit(numCommit, explicacionNueva, pruebas, cantidadLineas, cobertura, complejidad, tipo);
      let arrayDeMetrica = {
          numeroCommit: 1,
          pruebas: 0,
          cantidadLineas: 0,
          cobertura: 10,
          complejidad: "Regular",
          puntaje: 40,
          explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla y se añade un mensaje de error",
          tipo: 'convencional'
      }
      expect(metricArray.buscarMetricaPorCommit(numCommit)).toEqual(arrayDeMetrica);
    });

    it("deberia actualizar la metrica", () => {
      let numCommit = 1;
      let explicacion = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla";
      let pruebas = 0;
      let cantidadLineas = 0;
      let cobertura = 10;
      let complejidad = "Regular"
      let tipo = 'convencional';
      let metricArray = new ModuloMetricas();
      metricArray.anadirMetricaCommit(numCommit, explicacion, pruebas, cantidadLineas, cobertura, complejidad, tipo);
      let explicacionNueva = "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla y se añade un mensaje de error";
      metricArray.actualizarMetricaExistente(metricArray.buscarMetricaPorCommit(numCommit), explicacionNueva, pruebas, cantidadLineas, cobertura, complejidad, tipo);
      let arrayDeMetrica = {
          numeroCommit: 1,
          pruebas: 0,
          cantidadLineas: 10,
          cobertura: 0,
          complejidad: "Regular",
          puntaje: 48,
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
      metricArray.anadirMetricaCommit(1, "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla", 0, 0, 0, "Regular", 'convencional');
      metricArray.anadirMetricaCommit(2, "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz", 0, 0, 0, "Regular", 'convencional');
      expect(metricArray.desplegarMetrica()).toEqual([
          {
              numeroCommit: 1,
              pruebas: 0,
              cantidadLineas: 0,
              cobertura: 0,
              complejidad: "Regular",
              frecuencia: undefined,
              puntaje: 40,
              explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla",
              tipo: 'convencional'
          },
          {
              numeroCommit: 2,
              pruebas: 0,
              cantidadLineas: 0,
              cobertura: 0,
              complejidad: "Regular",
              frecuencia: undefined,
              puntaje: 40,
              explicacion: "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz",
              tipo: 'convencional'
          }
      ]);
    });
    
    it("Se logra mostrar mas de dos commits en un array de metricas", () => {
      let metricArray = new ModuloMetricas();
      metricArray.anadirMetricaCommit(1, "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla", 0, 0, 0, "Regular", 'convencional');
      metricArray.anadirMetricaCommit(2, "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz", 0, 0, 0, "Regular", 'convencional');
      metricArray.anadirMetricaCommit(3, "Se añade la funcionalidad para devolver Fizz cuando se ingrese el numero 3", 0, 0, 0, "Regular", 'convencional');
      expect(metricArray.desplegarMetrica()).toEqual([
          {
              numeroCommit: 1,
              pruebas: 0,
              cantidadLineas: 0,
              cobertura: 0,
              complejidad: "Regular",
              puntaje: 40,
              explicacion: "Se aniade la funcionalidad de retornar el numero 1, porque no sigue ninguna regla",
              tipo: 'convencional',
              frecuencia: undefined
          },
          {
              numeroCommit: 2,
              pruebas: 0,
              cantidadLineas: 0,
              cobertura: 0,
              complejidad: "Regular",
              puntaje: 40,
              frecuencia: undefined,
              explicacion: "Se añade la funcionalidad de regresar el mismo numero para un numero que no siga las reglas del FizzBuzz",
              tipo: 'convencional'
          },
          {
              numeroCommit: 3,
              pruebas: 0,
              cantidadLineas: 0,
              cobertura: 0,
              complejidad: "Regular",
              puntaje: 40,
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

    it("El proyecto debería leer un archivo de texto vacio y devolver mensaje de Archivo Vacio", ()=>{
      const modMetricas = new ModuloMetricas();
      expect(modMetricas.ingresarMetricasDesdeArchivo('archivoMetricas_1.txt')).toEqual("Archivo Vacio");
    });

    it("Se deberia leer un archivo de texto que no este vacio y devolver mensaje de Archivo Leido", ()=>{
      const modMetricas = new ModuloMetricas();
      expect(modMetricas.ingresarMetricasDesdeArchivo('archivoMetricas_2.txt')).toEqual("Archivo Leido");
    });

    it("El proyecto debería leer un archivo de texto con el formato especificado que contenga un commit, y mostrar el commit en el array", () => {
      const modMetricas = new ModuloMetricas();
      const filePath = 'archivoMetricas_3.txt';
      const result = modMetricas.ingresarMetricasDesdeArchivo(filePath);
  
      const expectedArray = [
          {
              numeroCommit: 1,
              explicacion: 'explicacion01',
              pruebas: 100,
              cantidadLineas: 98,
              cobertura: 12,
              complejidad: "Bueno",
              tipo: 'convencional',
              frecuencia: 2,
              puntaje: 72,
          }
      ];
  
      expect(result).toEqual("Archivo Leido");
      expect(modMetricas.desplegarMetrica()).toEqual(expectedArray);
    });

    it("El proyecto debería leer un archivo de texto con dos commits, y mostrar los commit en el array", () => {
      const modMetricas = new ModuloMetricas();
      const filePath = 'archivoMetricas_4.txt';
      const result = modMetricas.ingresarMetricasDesdeArchivo(filePath);
  
      const expectedArray = [
          {
              numeroCommit: 1,
              explicacion: 'explicacion01',
              pruebas: 100,
              cantidadLineas: 98,
              cobertura: 12,
              complejidad: "Bueno",
              tipo: 'convencional',
              frecuencia: 2,
              puntaje: 72,
          },
          {
            numeroCommit: 2,
            explicacion: 'explicacion02',
            pruebas: 200,
            cantidadLineas: 198,
            cobertura: 22,
            complejidad: "Excelente",
            tipo: 'convencional',
            frecuencia: 3,
            puntaje: 52,
        }
      ];
  
      expect(result).toEqual("Archivo Leido");
      expect(modMetricas.desplegarMetrica()).toEqual(expectedArray);
    });

});