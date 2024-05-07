import Metrica from "./metrica";

describe("Crear un apartado que configure el puntaje", () => {
    it("Si el numero de pruebas es menor o igual a 2 el puntaje es de 10", () => {
      const metrica = new Metrica();
      metrica.cargarMetricas(2, 0);
      expect(metrica.calcularPuntajePruebas(2)).toBe(10);
    });
    it("Si el numero de pruebas es mayor a 2 el puntaje es de 0", () => {
      const metrica = new Metrica();
      metrica.cargarMetricas(3, 0);
      expect(metrica.calcularPuntajePruebas(3)).toBe(0);
    });
    it("Si el numero de cobertura es mayor o igual a 95 el puntaje es de 10", () => {
        const metrica = new Metrica();
        metrica.cargarMetricas(3, 95);
        expect(metrica.calcularPuntajeCobertura(95)).toBe(10);
    });
    it("Si el numero de cobertura es menor a 95 el puntaje es de 0", () => {
        const metrica = new Metrica();
        metrica.cargarMetricas(3, 95);
        expect(metrica.calcularPuntajeCobertura(90)).toBe(0);
    });
});