import Metrica from "./metrica.js";
import path from "path"
import fs from "fs"
class ModuloMetricas {
    constructor() {
        this.arregloMetrica = [];
    }

    anadirMetricaCommit(numeroCommit, explicacion, pruebas, cobertura, cantidadLineas, complejidad, tipo, frecuencia) {
        const metricaExistente = this.buscarMetricaPorCommit(numeroCommit);
        if (metricaExistente) {
            this.actualizarMetricaExistente(metricaExistente, explicacion, pruebas, cobertura, cantidadLineas, complejidad, tipo, frecuencia);
        } else {
            this.agregarNuevaMetrica(numeroCommit, explicacion, pruebas, cobertura, cantidadLineas, complejidad,tipo, frecuencia);
        }
    }

    buscarMetricaPorCommit(numeroCommit) {
        return this.arregloMetrica.find(metrica => metrica.numeroCommit === numeroCommit);
    }

    actualizarMetricaExistente(metrica, explicacion, pruebas, cobertura, cantidadLineas, complejidad, tipo, frecuencia) {
        metrica.explicacion = explicacion;
        metrica.pruebas = pruebas;
        metrica.cobertura = cobertura;
        metrica.cantidadLineas = cantidadLineas;
        metrica.complejidad = complejidad;
        metrica.frecuencia = frecuencia;
        metrica.tipo = tipo;
    }

    agregarNuevaMetrica(numeroCommit, explicacion, pruebas, cobertura, cantidadLineas, complejidad, tipo, frecuencia) {
        const nuevaMetrica = new Metrica(numeroCommit, explicacion, tipo);
        nuevaMetrica.cargarMetricas(pruebas, cobertura, cantidadLineas, complejidad, frecuencia);
        this.arregloMetrica.push(nuevaMetrica);
    }

    ingresarMetricasDesdeArchivo(rutaArchivoTxt) {
        const archivoTxt = fs.readFileSync(path.join(__dirname, rutaArchivoTxt), 'utf8').trim();
        if (archivoTxt.length === 0) {
            return "Archivo Vacio";
        }
        const lines = archivoTxt.split('\n');
        for (let line of lines) {
            const [numeroCommit, explicacion, pruebas, cobertura, cantidadLineas, complejidad, tipo, frecuencia] = line.split(',').map(item => item.trim());
            this.anadirMetricaCommit(Number(numeroCommit), explicacion, Number(pruebas), Number(cobertura), Number(cantidadLineas), complejidad, tipo, Number(frecuencia));
        }
        return "Archivo Leido";
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
            frecuencia: metrica.frecuencia,
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
