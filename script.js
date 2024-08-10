const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const botaoImagem = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector ('#timer')

const musica = new Audio('./Fokus-projeto-base/sons/luna-rise-part-one.mp3');
const audioZero = new Audio('./Fokus-projeto-base/sons/beep.mp3');
const audioIniciado = new Audio('./Fokus-projeto-base/sons/play.wav');
const audioPausado = new Audio('./Fokus-projeto-base/sons/pause.mp3');

let tempoDecarridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () =>{
    tempoDecarridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () =>{
    tempoDecarridoEmSegundos = 300
   alterarContexto('descanso-curto')
   curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () =>{
    tempoDecarridoEmSegundos = 900
   alterarContexto('descanso-longo')
   longoBt.classList.add('active')
});

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
     html.setAttribute('data-contexto', contexto)
     banner.setAttribute('src', `./Fokus-projeto-base/imagens/${contexto}.png`)
     switch(contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;        
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longo.</strong>`
            break    

        default:
            break;
     }
};

const contagemRegressiva = () =>{
    if(tempoDecarridoEmSegundos <= 0){
       audioZero.play()
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoDecarridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniiarouPausar)


function iniiarouPausar(){
    if (intervaloId){
        audioPausado.play()
        zerar()
        return
    }
    audioIniciado.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    botaoImagem.setAttribute('src', `./Fokus-projeto-base/imagens/pause.png`)
}

function zerar () {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    botaoImagem.setAttribute('src', `./Fokus-projeto-base/imagens/play_arrow.png`)
    intervaloId = null 
}

function mostrarTempo() {
    const tempo = new Date(tempoDecarridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'} )
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()