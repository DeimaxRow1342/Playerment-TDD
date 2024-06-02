import ModuloMetricas from "./moduloMetricas";

class Practicas{
  constructor(){
    this.nombre = null;
    this.descripcion = null;
    this.fecha = null;
    this.enlace = null;
    this.ModuloMetricas = new ModuloMetricas();
    this.lastCommitNumber = 0;
    this.pruebas = [];
  }

  cargarDatos(nombre, descripcion, fecha, enlace){
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.enlace = enlace;
  }

  obtenerPractica(nombre){
    if(this.nombre == nombre){
        return this;
    }
  }
  

  anadirMetrica(numeroCommit, explicacion, pruebas, cobertura, tipo) {
    // Validar que el número de commit sea exactamente uno más que el último
    if (numeroCommit === this.lastCommitNumber + 1) {
        this.ModuloMetricas.anadirMetricaCommit(numeroCommit, explicacion, pruebas, cobertura, tipo);
        this.lastCommitNumber = numeroCommit; // Actualizar el último número de commit
        return true;
    }
    return false; 
  }

  motrarMetricas(){
    return this.ModuloMetricas.desplegarMetrica();
  }

  eliminarDatos(nombre){
    if(this.nombre == nombre){
        this.nombre = null;
        this.descripcion = null;
        this.fecha = null;
        this.enlace = null;
        this.tipo = null;
    }
  }
  editarDatos(nuevoNombre, nuevaDescripcion, nuevaFecha, nuevoEnlace, nuevoTipo){
    this.nombre = nuevoNombre;
    this.descripcion = nuevaDescripcion;
    this.fecha = nuevaFecha;
    this.enlace = nuevoEnlace;
    this.tipo = nuevoTipo;
  }

  eliminarMetrica(numeroCommit) {
    this.ModuloMetricas.eliminarMetricaCommit(numeroCommit);
  }  

  contarPruebas() {
    return this.pruebas.length;
  }
  obtenerRecomendacion() {
    const metricas = this.motrarMetricas();
    let recomendaciones = [];

    if (metricas.length === 0) {
      return "No hay métricas disponibles para generar una recomendación.";
    }
  }
  
}

export default Practicas;
