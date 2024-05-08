
function buscarProyecto(nombreProyecto, proyectos) {
    if (proyectos.length == 0) {
        return [];
    }
    return proyectos.filter(proyecto => proyecto === nombreProyecto);
}

export default buscarProyecto;