class Metrica {
    constructor(numeroCommit, explicacion) {
        this.numeroCommit = numeroCommit;
        this.puntaje = 0;
        this.explicacion = explicacion;
        this.pruebas = null;
        this.cobertura = null;
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

    cargarMetricas(pruebas, cobertura){
        this.pruebas = pruebas;
        this.cobertura = cobertura;
        this.puntaje = this.calcularPuntaje(cobertura);
    }

    calcularPuntaje(cobertura){
        return this.calcularPuntajePorCobertura(cobertura);
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