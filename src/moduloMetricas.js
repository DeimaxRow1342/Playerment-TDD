import Metrica from "./metrica.js";

class ModuloMetricas {
    constructor() {
        this.arregloMetrica = [];
    }

    anadirMetricaCommit(numeroCommit, explicacion, pruebas, cobertura) {
        const metricaExistente = this.buscarMetricaPorCommit(numeroCommit);
        if (metricaExistente) {
            this.actualizarMetricaExistente(metricaExistente, explicacion);
        } else {
            this.agregarNuevaMetrica(numeroCommit, explicacion, pruebas, cobertura);
        }
    }

    buscarMetricaPorCommit(numeroCommit) {
        return this.arregloMetrica.find(metrica => metrica.numeroCommit === numeroCommit);
    }

    actualizarMetricaExistente(metrica, explicacion) {
        metrica.explicacion = explicacion;
    }

    agregarNuevaMetrica(numeroCommit, explicacion, pruebas, cobertura) {
        const nuevaMetrica = new Metrica(numeroCommit, explicacion);
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
