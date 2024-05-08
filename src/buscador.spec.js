import buscarProyecto from './buscador';

describe('buscador', () => {
    it("no deberia encontrar proyectos cuando la lista esta vacia", () => {
        let proyectos = [];
        expect(buscarProyecto("ejercicio1", proyectos)).toEqual([]);
    });
    it("Encuetra un proyecto cuando esta en la lista", () => {
        let proyectos = []
        proyectos.push("ejercicio1");
        expect(buscarProyecto("ejercicio1", proyectos)).toEqual(["ejercicio1"]);
    });
    it("Encuentra el proyecto cuando hay mas de un elemento en la lista", () => {
        let proyectos = [];
        proyectos.push("ejercicio1");
        proyectos.push("ejercicio2");
        proyectos.push("ejercicio3");
        expect(buscarProyecto("ejercicio2", proyectos)).toEqual(["ejercicio2"]);
    });
    it("Encuentra todas las coincidencias en la lista", () => {
        let proyectos = [];
        proyectos.push("ejercicio1");
        proyectos.push("ejercicio2");
        proyectos.push("ejercicio1");
        proyectos.push("ejercicio3");
        expect(buscarProyecto("ejercicio1", proyectos)).toEqual(["ejercicio1", "ejercicio1"]);
    });
    it("Encuentra las coincidencias en una lista con una palabra clave", () => {
        let proyectos = [];
        proyectos.push("ejercicio1");
        proyectos.push("ejercicio2");
        proyectos.push("ejercicio3");
        expect(buscarProyecto("ejerc", proyectos)).toEqual(["ejercicio1", "ejercicio2", "ejercicio3"]);
    });
});