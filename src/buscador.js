
function buscarProyecto(nombreProyecto, proyectos) {
    if (proyectos.length == 0) {
        return "";
    }
    const resultados =  proyectos.filter(proyecto => proyecto.includes(nombreProyecto));
    if (resultados.length == 0) {
        return "";
    }
    return resultados;
}

export default buscarProyecto;