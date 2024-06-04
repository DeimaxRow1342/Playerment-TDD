import Metrica from "./metrica.js";

describe("Crear un programa gamificado para TDDLab metricas", () => {
  
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

  it("Si se ingresa una prueba se muestra el numero de pruebas", () => {
    const metrica = new Metrica();
    metrica.cargarMetricas(7);
    expect(metrica.pruebas).toEqual(7);
  });

  it("Si se ingresa numero de pruebas y cobertura se retorna la cobertura, ademas del numero de pruebas", () => {
    const metrica = new Metrica();
    metrica.cargarMetricas(7, 50, 93);
    expect(metrica.cobertura).toEqual(93);
    expect(metrica.pruebas).toEqual(7);
  });

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
  it("deberia devolver el tipo de la metrica que por defecto es convencional", () => {
    const metrica = new Metrica();
    expect(metrica.getTipo()).toEqual('convencional');
  });
  it("Si paso el tipo de refactoring, deberia devolver el tipo de la metrica", () => {
    const metrica = new Metrica(1, 'Se refactoriza el codigo', 'refactoring');
    expect(metrica.getTipo()).toEqual('refactoring');
  });
  
  it("Si el tipo de metrica es convencional se carga las metricas y se calcula el puntaje correspondiente", () => {
    const metrica = new Metrica(1, 'Se refactoriza el codigo', 'convencional');
    metrica.cargarMetricas(7, 50, 93);  // Se añadió cantidadLineas = 50
    const puntajeEsperado = metrica.calcularPuntaje(93, 50, 7); // Puntaje calculado con la función correcta
    expect(metrica.getPuntaje()).toEqual(puntajeEsperado);
  });
  it("Si el tipo de metrica es refactoring no se calcula el puntaje", () => {
    const metrica = new Metrica(1, 'Se refactoriza el codigo', 'refactoring');
    metrica.cargarMetricas(7, 93);
    expect(metrica.getPuntaje()).toEqual(0);
    expect(metrica.pruebas).toEqual(null);
    expect(metrica.cobertura).toEqual(null);
  });
  //puntaje de pruebas agregadas
  it('debe devolver 0 si las pruebas agregadas son 0', () => {
    const metrica = new Metrica();
    expect(metrica.calcularPuntajePorPruebas(0)).toBe(0);
  });
  it('debe devolver 8 si menos del 60% de los commits tienen pruebas', () => {
    const metrica = new Metrica(5, 'explicacion');
    expect(metrica.calcularPuntajePorPruebas(2)).toBe(8);
  });
  it('debe devolver 12 si entre el 60-79% de los commits tienen pruebas', () => {
    const metrica = new Metrica(5, 'explicacion');
    expect(metrica.calcularPuntajePorPruebas(3)).toBe(12);
  });
  it('debe devolver 16 si entre el 80-99% de los commits tienen pruebas', () => {
    const metrica = new Metrica(5, 'explicacion');
    expect(metrica.calcularPuntajePorPruebas(4)).toBe(16);
  });
  it('debe devolver 20 si el 100% de los commits tienen pruebas', () => {
    const metrica = new Metrica(5, 'explicacion');
    expect(metrica.calcularPuntajePorPruebas(5)).toBe(20);
    
  });
  
  it("Debe calcular el puntaje total sumando pruebas y cobertura", () => {
    const metrica = new Metrica(5, 'explicacion');
    const puntajeEsperado = metrica.calcularPuntaje(85, 50, 3); // Ajustado para incluir cantidadLineas = 50
    expect(puntajeEsperado).toEqual(40);
  });
//Calculo de Porcentaje en base a cantida de lineas
  it("Debe calcular el puntaje con 20 pts para un commit con menos de 20 lineas",() => {
    const metrica = new Metrica();
    expect(metrica.calcularPuntajePorCantidadLineas(0)).toEqual(0);
  })

  it("Debe calcular el puntaje con 20 pts para un commit con menos de 20 lineas",() => {
    const metrica = new Metrica();
    expect(metrica.calcularPuntajePorCantidadLineas(19)).toEqual(20);
  })

  it("Debe calcular el puntaje con 16 pts para un commit con 20 a 40 lineas", () => {
    const metrica = new Metrica();
    expect(metrica.calcularPuntajePorCantidadLineas(30)).toEqual(16);
  });

  it("Debe calcular el puntaje con 12 pts para un commit con 40 a 60 lineas", () => {
    const metrica = new Metrica();
    expect(metrica.calcularPuntajePorCantidadLineas(50)).toEqual(12);
  });

  it("Debe calcular el puntaje con 8 pts para un commit con mas de 60 lineas", () => {
    const metrica = new Metrica();
    expect(metrica.calcularPuntajePorCantidadLineas(70)).toEqual(8);
  });

  it("Debe devolver 0 para un commit con un numero negativo de lineas", () => {
    const metrica = new Metrica();
    expect(metrica.calcularPuntajePorCantidadLineas(-10)).toEqual(0);
  });

  //Calculo de Porcentaje en base a la complejidad
  
});
