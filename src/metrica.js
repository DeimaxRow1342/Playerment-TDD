class Metrica {
    constructor(numeroCommit, explicacion, tipo = 'convencional') {
        this.numeroCommit = numeroCommit;
        this.puntaje = 0;
        this.explicacion = explicacion;
        this.pruebas = null;
        this.cobertura = null;
        this.cantidadLineas = null;
        this.tipo = tipo;
    }
    getNumeroCommit() {
        return this.numeroCommit;
    }
    getPuntaje() {
        return this.puntaje;
    }
    getExplicacion() {
        return this.explicacion;
    }
    getTipo() {
        return this.tipo;
    }
    
    cargarMetricas(pruebas, cantidadLineas, cobertura){
        if(this.tipo == 'convencional'){
            this.pruebas = pruebas;
            this.cobertura = cobertura;
            this.cantidadLineas = cantidadLineas;
            this.puntaje = this.calcularPuntaje(cobertura, cantidadLineas, pruebas);
        } else {
            this.pruebas = null;
            this.cobertura = null;
            this.cantidadLineas = null;
            this.puntaje = 0;
        }
    }
    calcularPuntaje(cobertura, cantidadLineas, pruebas){
        const puntajePruebas = this.calcularPuntajePorPruebas(pruebas);
        const puntajeCobertura = this.calcularPuntajePorCobertura(cobertura);
        const puntajeCantidadDeLineas = this.calcularPuntajePorCantidadLineas(cantidadLineas);
        return puntajePruebas + puntajeCobertura + puntajeCantidadDeLineas;
       
    }

    calcularPuntajePorCantidadLineas(cantidadLineas) {
        if (cantidadLineas <= 0) {
            return 0;
        } else if (cantidadLineas < 20) {
            return 20;
        } else if (cantidadLineas >= 20 && cantidadLineas <= 40) {
            return 16;
        } else if (cantidadLineas > 40 && cantidadLineas <= 60) {
            return 12;
        } else {
            return 8;
        }
    }

    calcularPuntajePorPruebas(pruebas) {
            const porcentajeConPruebas = (pruebas / this.numeroCommit) * 100;
            if (porcentajeConPruebas < 60) {
                return 8;
            } else if (porcentajeConPruebas >= 60 && porcentajeConPruebas < 80) {
                return 12;
            } else if (porcentajeConPruebas >= 80 && porcentajeConPruebas < 100) {
                return 16;
            }else if (porcentajeConPruebas === 100) {
                return 20;
            } else {
                return 0;
            
        }
    }

    calcularPuntajePorCobertura(cobertura){
        if(cobertura < 70 && cobertura > 0)
            return 8;
        else if(cobertura >= 70 && cobertura < 80)
            return 12;
        else if(cobertura >= 80 && cobertura <= 90)
            return 16;
        else if(cobertura > 90)
            return 20;
        else
            return 0;
    }

    calcularPuntajePorComplejidad(complejidad){
        if(complejidad === "Excelente"){
            return 20;
        } else if (complejidad === "Bueno"){
            return 16;
        } 
    }
}
export default Metrica;