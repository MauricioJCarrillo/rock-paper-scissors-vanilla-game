const modal = document.getElementById('modal');
const input_attempt_max = document.getElementById('input_attempt_max');
const mayor_a_zero = document.getElementById('mayor_a_zero');
const btnAcept = document.getElementById('btnAcept');
const attempt_max = document.getElementById('attempt_max');
const num_attempt = document.getElementById('num_attempt');
const userWins_score = document.getElementById('userWins_score');
const pcWins_score = document.getElementById('pcWins_score');
const draws_score = document.getElementById('draws_score');
const stone = document.getElementById('stone');
const paper = document.getElementById('paper');
const scissor = document.getElementById('scissor');
const btnPlay = document.getElementById('btnPlay');
const pc_option = document.getElementById('pc_option');
const winner = document.getElementById('winner');

function winMax() {
    numMax_intentos = Number(input_attempt_max.value);
    if(numMax_intentos === 0){
        mayor_a_zero.innerText = ('Ingresa un numero mayor a 0 (cero)');
    } else {
        modal.classList.add('hide');
        attempt_max.innerText = numMax_intentos;
    }
}

class Juego {
    constructor() {
        this.inicializar();
        this.agregarEventosClick();
    }

    toggleBtnPlay() {
        if(btnPlay.classList.contains('hide')){
            btnPlay.classList.remove('hide');
        }
        else btnPlay.classList.add('hide');
    }

    inicializar() {
        this.opcionUsuario = this.opcionUsuario.bind(this);
        this.numMax_intentos = Number(input_attempt_max.value);
        console.log('El numero de intentos es: ' + this.numMax_intentos);
        this.toggleBtnPlay();
        this.num_intento = 0;
        this.score_usuario = 0;
        this.score_pc = 0;
        this.score_empates = 0;
        this.opciones = {
            stone,
            paper,
            scissor
        }
        draws_score.innerText = this.score_empates;
        userWins_score.innerText = this.score_usuario;
        pcWins_score.innerText = this.score_pc;
        num_attempt.innerText = this.num_intento;
        winner.innerText = 'El ganador es:';
    }

    generarOpcionPc() {
        this.numOpciónPc = Math.floor(Math.random() * 3);
        this.opcionPc =  this.transformarNumeroASimbolo(this.numOpciónPc)
        console.log('La opción del pc es el simbolo: ' + this.opcionPc);
        pc_option.classList.remove('question');
        pc_option.classList.add(this.opcionPc);
    }

    transformarNumeroASimbolo(num) {
        switch(num) {
            case 0:
                return 'stone'
            case 1:
                return 'paper'
            case 2:
                return 'scissor'
        }
    }

    agregarEventosClick() {
        if(this.num_intento < this.numMax_intentos){
            this.opciones.stone.addEventListener('click', this.opcionUsuario);
            this.opciones.paper.addEventListener('click', this.opcionUsuario);
            this.opciones.scissor.addEventListener('click', this.opcionUsuario);
        }
        else {
            this.juegoTerminado();
        }
    }

    eliminarEventosClick() {
        this.opciones.stone.removeEventListener('click', this.opcionUsuario);
        this.opciones.paper.removeEventListener('click', this.opcionUsuario);
        this.opciones.scissor.removeEventListener('click', this.opcionUsuario);
    }

    opcionUsuario(ev) {
            this.num_intento++;
            const opcionUsuario = ev.target.dataset.option;
            console.log('La opción del usuario es: ' + opcionUsuario);
            this.generarOpcionPc();
            num_attempt.innerText = this.num_intento;
            if(opcionUsuario === this.opcionPc) {
                console.log('Es un empate');
                this.score_empates++;
                draws_score.innerText = this.score_empates;
            }
            else if(opcionUsuario === 'stone') {
                if(this.opcionPc === 'scissor'){
                    this.userWin();
                }
                else {
                    this.pcWin();
                }
            }
            else if(opcionUsuario === 'paper') {
                if(this.opcionPc === 'stone'){
                    this.userWin();
                }
                else {
                    this.pcWin();
                }
            }
            else if(opcionUsuario === 'scissor') {
                if(this.opcionPc === 'paper'){
                    this.userWin();
                }
                else {
                    this.pcWin();
                }
            }
            this.eliminarEventosClick();
            setTimeout(() => (
                pc_option.classList.add('question'),
                pc_option.classList.remove('stone', 'paper', 'scissor'),
                this.agregarEventosClick()
            ), 2000);
    }

    userWin() {
        console.log('Usuario ganó');
        this.score_usuario++;
        userWins_score.innerText = this.score_usuario;
    }

    pcWin() {
        console.log('PC ganó');
        this.score_pc++;
        pcWins_score.innerText = this.score_pc;
    }

    juegoTerminado() {
        console.log('El juego se acabó');
        if(this.score_usuario > this.score_pc ){
            winner.innerText = 'El ganador es: Usuario';
        }
        else if(this.score_usuario < this.score_pc) {
            winner.innerText = 'El ganador es: PC';
        }
        else {
            winner.innerText = 'El ganador es: Empate';
        }
        setTimeout(() => (
            this.eliminarEventosClick(),
            this.inicializar()
        )
        , 5000);
    }
}

function empezarJuego() {
    const juego = new Juego();
}