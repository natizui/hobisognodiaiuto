// encontrar o botao adicionar tarefa

const btnAdiconarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const btnCancelar = document.querySelector('.app__form-footer__button--cancel') 
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

function atualizarTarefas () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    console.log('atualizartarefa')
}

function criarElemenoTarefa (tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML=`
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
        `

    const paragrafo = document.querySelector('p')
    console.log('paragrafo', paragrafo)
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () =>{
       // debugger
       const novaDescricao = prompt("Qual é o novo nome da terfa?")
       //console.log('Nova descricao: ', novaDescricao)
       if (novaDescricao) {
        paragrafo.textContent = novaDescricao
       tarefa.descricao = novaDescricao
       atualizarTarefas()
       }
       
    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', './Fokus-projeto-base/imagens/edit.png')
    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    li.onclick = () => {
        paragrafoDescricaoTarefa.textContent = tarefa.descricao
        document.querySelectorAll('app__section-task-list-item-active')
            .forEach(elemento =>{
                elemento.classList.remove('app__section-task-list-item-active')
                console.log('removeu', elemento)
            })
        li.classList.add('app__section-task-list-item-active')
    }

    return li

}

    btnAdiconarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
    console.log('click')
})

formAdicionarTarefa.addEventListener('submit', (evento) =>{
    evento.preventDefault();
    //const descricaoTarefa = textarea.value
    const tarefa = {
        descricao: textarea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElemenoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    atualizarTarefas ()
    textarea.value = ''
    formAdicionarTarefa.classList.add('hidden')
    console.log('submit')
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElemenoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    console.log('chama criar elemento tarefa')
})

const limparFormulario = () => {
    textarea.value = '';
    formAdicionarTarefa.classList.add('hidden');
    console.log('limpar formulario')
}

btnCancelar.addEventListener('click', limparFormulario)