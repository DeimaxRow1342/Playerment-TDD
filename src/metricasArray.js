import Metrica from "./metrica.js"

class MetricaArray{
    constructor(){
        this.metricaArray = [];
    } 

    anadirMetricaCommit(numeroCommit, puntaje, explicacion, pruebas, cobertura) {
    const existingMetric = this.metricaArray.find(m => m.numeroCommit === numeroCommit);
    if (existingMetric) {
      // Actualiza la métrica existente
      existingMetric.puntaje = puntaje;
      existingMetric.explicacion = explicacion;
    } else {
      // Añade una nueva métrica

      const commitMetric = new Metrica(numeroCommit, puntaje, explicacion);
      commitMetric.cargarMetricas(pruebas, cobertura);
      this.metricaArray.push(commitMetric);
    }
  }

  desplegarMetrica() {
    return this.metricaArray.map(metrica => ({
      numeroCommit: metrica.getNumeroCommit(),
      pruebas: metrica.pruebas, 
      cobertura: metrica.cobertura,
      puntaje: metrica.getPuntaje(),
      explicacion: metrica.getExplicacion()
    }));
  }

  eliminarMetricaCommit(numeroCommit) {
    this.metricaArray = this.metricaArray.filter(metrica => metrica.numeroCommit !== numeroCommit);
  }

}

export default MetricaArray;







ahora pasame la implementacion de la historia de usuario, pasame todo el codigo complito de los archivos  que cambies














  antes de implementar quiero crear una rama que se llame Examen-GustavoValencia



historia de usuario
Como estudiante de Tdd 
Quiero poder buscar un proyecto tdd de la lista 
Para encontrar facil y rapidamente uno de mis proyectos
criterios de confirmain
-En la lista principal de proyectos tdd se tiene un campo de busqueda por nombre. Si se ingresa un nombre en este campo para buscar, se muestran en la lista solo los nombbres de los proyectos tdd que coinciden
- En caso de buscar con un nombre de proyecto tdd que no exista en la lista de proyectos, se muestra el mensaje "El proyecto tdd no existe"