import Metrica from "./metrica.js";

class ModuloMetricas {
    constructor() {
        this.arregloMetrica = [];
    }

    anadirMetricaCommit(numeroCommit, explicacion, pruebas, cobertura, cantidadLineas, complejidad, tipo) {
        const metricaExistente = this.buscarMetricaPorCommit(numeroCommit);
        if (metricaExistente) {
            this.actualizarMetricaExistente(metricaExistente, explicacion, pruebas, cobertura, cantidadLineas, complejidad, tipo);
        } else {
            this.agregarNuevaMetrica(numeroCommit, explicacion, pruebas, cobertura, cantidadLineas, complejidad,tipo);
        }
    }

    buscarMetricaPorCommit(numeroCommit) {
        return this.arregloMetrica.find(metrica => metrica.numeroCommit === numeroCommit);
    }

    actualizarMetricaExistente(metrica, explicacion, pruebas, cobertura, cantidadLineas, complejidad, tipo) {
        metrica.explicacion = explicacion;
        metrica.pruebas = pruebas;
        metrica.cobertura = cobertura;
        metrica.cantidadLineas = cantidadLineas;
        metrica.complejidad = complejidad;
        metrica.tipo = tipo;
    }

    agregarNuevaMetrica(numeroCommit, explicacion, pruebas, cobertura, cantidadLineas, complejidad, tipo) {
        const nuevaMetrica = new Metrica(numeroCommit, explicacion, tipo);
        nuevaMetrica.cargarMetricas(pruebas, cobertura, cantidadLineas, complejidad);
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
            complejidad: metrica.complejidad,
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
