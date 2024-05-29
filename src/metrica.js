class Metrica {
    constructor(numeroCommit, puntaje, explicacion) {
        this.numeroCommit = numeroCommit;
        this.puntaje = puntaje;
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
    }

    calcularPuntaje(puntaje){
        if(this.pruebas >= 1 && this.pruebas <= 5){
            puntaje += 1000;
        }
        else if (this.pruebas > 5){
            puntaje += 1000;
            let contador = this.pruebas-5;
            for(contador; contador>0; contador--){
                puntaje -= 50;
            }
        }
        return puntaje;
    }
    calcularPuntajePorCobertura(cobertura){
        return 0;
    }
}

export default Metrica;