import Metrica from "./metrica.js";

class ModuloMetricas {
    constructor() {
        this.arregloMetrica = [];
    }

    anadirMetricaCommit(numeroCommit, explicacion, pruebas, cantidadLineas, cobertura, tipo) {
        const metricaExistente = this.buscarMetricaPorCommit(numeroCommit);
        if (metricaExistente) {
            this.actualizarMetricaExistente(metricaExistente, explicacion, pruebas, cantidadLineas, cobertura, tipo);
        } else {
            this.agregarNuevaMetrica(numeroCommit, explicacion, pruebas, cantidadLineas, cobertura, tipo);
        }
    }

    buscarMetricaPorCommit(numeroCommit) {
        return this.arregloMetrica.find(metrica => metrica.numeroCommit === numeroCommit);
    }

    actualizarMetricaExistente(metrica, explicacion, pruebas, cantidadLineas, cobertura, tipo) {
        metrica.explicacion = explicacion;
        metrica.pruebas = pruebas;
        metrica.cantidadLineas = cantidadLineas;
        metrica.cobertura = cobertura;
        metrica.tipo = tipo;
    }

    agregarNuevaMetrica(numeroCommit, explicacion, pruebas, cantidadLineas, cobertura, tipo) {
        const nuevaMetrica = new Metrica(numeroCommit, explicacion, tipo);
        nuevaMetrica.cargarMetricas(pruebas, cantidadLineas, cobertura);
        this.arregloMetrica.push(nuevaMetrica);
    }

    desplegarMetrica() {
        return this.arregloMetrica.map(metrica => this.formatearMetrica(metrica));
    }

    formatearMetrica(metrica) {
        return {
            numeroCommit: metrica.getNumeroCommit(),
            pruebas: metrica.pruebas,
            cantidadLineas: metrica.cantidadLineas,
            cobertura: metrica.cobertura,
            puntaje: metrica.getPuntaje(),
            explicacion: metrica.getExplicacion(),
            tipo: metrica.getTipo()
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
