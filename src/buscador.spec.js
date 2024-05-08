import buscarProyecto from './buscador';

describe('buscador', () => {
    it("no deberia encontrar proyectos cuando la lista esta vacia", () => {
        let proyectos = [];
        expect(buscarProyecto("ejercicio1", proyectos)).toEqual("");
    });
});