import Metrica from "./metrica.js";

class ModuloMetricas {
    constructor() {
        this.arregloMetrica = [];
    }

    anadirMetricaCommit(numeroCommit, puntaje, explicacion, pruebas, cobertura) {
        const metricaExistente = this.buscarMetricaPorCommit(numeroCommit);
        if (metricaExistente) {
            this.actualizarMetricaExistente(metricaExistente, puntaje, explicacion);
        } else {
            this.agregarNuevaMetrica(numeroCommit, puntaje, explicacion, pruebas, cobertura);
        }
    }

    buscarMetricaPorCommit(numeroCommit) {
        return this.arregloMetrica.find(metrica => metrica.numeroCommit === numeroCommit);
    }

    actualizarMetricaExistente(metrica, puntaje, explicacion) {
        metrica.puntaje = puntaje;
        metrica.explicacion = explicacion;
    }

    agregarNuevaMetrica(numeroCommit, puntaje, explicacion, pruebas, cobertura) {
        const nuevaMetrica = new Metrica(numeroCommit, puntaje, explicacion);
        nuevaMetrica.cargarMetricas(pruebas, cobertura);
        this.arregloMetrica.push(nuevaMetrica);
    }

    desplegarMetrica() {
        return this.arregloMetrica.map(metrica => this.formatearMetrica(metrica));
    }

    formatearMetrica(metrica) {
        return {
            numeroCommit: metrica.getNumeroCommit(),
            pruebas: metrica.pruebas,
            cobertura: metrica.cobertura,
            puntaje: metrica.getPuntaje(),
            explicacion: metrica.getExplicacion()
        };
    }

    eliminarMetricaCommit(numeroCommit) {
        this.arregloMetrica = this.arregloMetrica.filter(metrica => metrica.numeroCommit !== numeroCommit);
    }

    calcularPuntaje(numeroCommit) {
        const metrica = this.buscarMetricaPorCommit(numeroCommit);
        if (metrica) {
            return metrica.calcularPuntajePorCobertura(metrica.cobertura);
        }
    }
}

export default ModuloMetricas;
