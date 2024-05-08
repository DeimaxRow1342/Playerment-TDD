import buscarProyecto from './buscador';

describe('buscador', () => {
    it("no deberia encontrar proyectos cuando la lista esta vacia", () => {
        let proyectos = [];
        expect(buscarProyecto("ejercicio1", proyectos)).toEqual("");
    });
    it("Encuetra un proyecto cuando esta en la lista", () => {
        let proyectos = []
        proyectos.push("ejercicio1");
        expect(buscarProyecto("ejercicio1", proyectos)).toEqual("ejercicio1");
    });
});