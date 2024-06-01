class Metrica {
    constructor(numeroCommit, explicacion, tipo = 'convencional') {
        this.numeroCommit = numeroCommit;
        this.puntaje = 0;
        this.explicacion = explicacion;
        this.pruebas = null;
        this.cobertura = null;
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

    cargarMetricas(pruebas, cobertura){
        if(this.tipo == 'convencional'){
            this.pruebas = pruebas;
            this.cobertura = cobertura;
            this.puntaje = this.calcularPuntaje(cobertura);
        } else {
            this.pruebas = null;
            this.cobertura = null;
            this.puntaje = 0;
        }
    }

    calcularPuntaje(cobertura,){
        return this.calcularPuntajePorCobertura(cobertura);
       
    }
    calcularPuntajePorPruebas(pruebas) {
        if (pruebas === 0) {
            return 0; 
        } else {
            const porcentajeConPruebas = (pruebas / this.numeroCommit) * 100;
            if (porcentajeConPruebas < 60) {
                return 8;
            } 
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
}

export default Metrica;