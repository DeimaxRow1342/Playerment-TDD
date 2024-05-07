import Metrica from "./metrica";

describe("Crear un apartado que configure el puntaje", () => {
    it("Si el numero de pruebas es menor o igual a 2 el puntaje es de 10", () => {
      const metrica = new Metrica();
      metrica.cargarMetricas(2, 0);
      expect(metrica.calcularPuntajeExamen(2)).toBe(10);
    });
});