const numeros = document.querySelectorAll('[data-numeros]')
const operadores = document.querySelectorAll('[data-operacoes]')
const resultadoDisplay = document.querySelector('[data-resultado]')
const limpar = document.querySelector('[data-limpar]')
const igual = document.querySelector('[data-equals]')
const positivoNegativo = document.querySelector('[data-positivo-negativo]')
const porcentagem = document.querySelector('[data-porcentagem]')
let resultadoSalvo = ''
let esperandoSerCalculado = ''
let operadorAtual = ''

document.addEventListener(
  'gesturestart', (e) => e.preventDefault()
);

limpar.addEventListener('click', () => {
  limparResultado()
})

igual.addEventListener('click', () => {
  calcular()
  operadorAtual = ''
})

let porcentagemAtual = ''
porcentagem.addEventListener('click', () => {
  if (operadorAtual != '') {
    porcentagemAtual = resultadoDisplay.innerText.toString().replace(',', '.') / 100
    calcular()
  }
})

positivoNegativo.addEventListener('click', () => {
  if (resultadoDisplay.innerText.includes('-')) {
    resultadoDisplay.innerHTML = `${resultadoDisplay.innerText.substr(1)}`
    return
  }

  resultadoDisplay.innerHTML = `-${resultadoDisplay.innerText}`
})

for (const numero of numeros) {
  adicionarNumero(numero)
}

function adicionarNumero(num) {

  num.addEventListener('click', () => {
    if (num.innerText == ',' && resultadoDisplay.innerText == '0') {
      resultadoDisplay.innerHTML += num.innerText
      return
    }

    if (resultadoDisplay.innerText == '0') {
      resultadoDisplay.innerHTML = num.innerText
      return
    }

    if (resultadoDisplay.innerText.includes(',') && num.innerText == ',') return

    for (const operador of operadores) {
      if (operador.classList.contains('destaque')) {
        resultadoDisplay.innerHTML = num.innerText
        operador.classList.remove('destaque')
        return
      }
    }

    resultadoDisplay.innerHTML += num.innerText
  })
}

for (const operador of operadores) {
  operador.addEventListener('click', () => {
    if (operadorAtual != '') {
      calcular()
    }

    let novoResultado = ''
    if (resultadoDisplay.innerText.includes(',')) {
      novoResultado = resultadoDisplay.innerText.toString().replace(',', '.')
    }

    if (novoResultado != '') {
      esperandoSerCalculado = novoResultado
    } else {
      esperandoSerCalculado = resultadoDisplay.innerText
    }

    selecionarOperador(operador)
    adicionarDestaque(operador, operadores)
  })
}

function calcular() {
  let novoResultado = resultadoDisplay.innerText
  if (resultadoDisplay.innerText.includes(',')) {
    novoResultado = resultadoDisplay.innerText.toString().replace(',', '.')
  }

  switch (operadorAtual) {
    case '+':
      if (isNaN(+esperandoSerCalculado + +novoResultado)) return


      if (porcentagemAtual != '') {
        resultadoSalvo = +esperandoSerCalculado + Number(esperandoSerCalculado * porcentagemAtual)
        resultadoDisplay.innerText = resultadoSalvo.toString().replace('.', ',')
      } else {
        resultadoSalvo = +esperandoSerCalculado + +novoResultado
        resultadoDisplay.innerHTML = resultadoSalvo.toString().replace('.', ',')
      }

      removerDestaque()
      break
    case '-':
      if (isNaN(+esperandoSerCalculado - +novoResultado)) return

      if (porcentagemAtual != '') {
        resultadoSalvo = +esperandoSerCalculado - Number(esperandoSerCalculado * porcentagemAtual)
        resultadoDisplay.innerText = resultadoSalvo.toString().replace('.', ',')
      } else {
        resultadoSalvo = +esperandoSerCalculado - +novoResultado
        resultadoDisplay.innerHTML = resultadoSalvo.toString().replace('.', ',')
      }

      removerDestaque()
      break
    case '*':
      if (isNaN(+esperandoSerCalculado * +novoResultado)) return

      if (porcentagemAtual != '') {
        resultadoSalvo = Number(esperandoSerCalculado * porcentagemAtual)
        resultadoDisplay.innerText = resultadoSalvo.toString().replace('.', ',')
      } else {
        resultadoSalvo = +esperandoSerCalculado * +novoResultado
        resultadoDisplay.innerHTML = resultadoSalvo.toString().replace('.', ',')
      }

      removerDestaque()
      break
    case '/':
      if (isNaN(+esperandoSerCalculado / +novoResultado)) return

      if (porcentagemAtual != '') {
        resultadoSalvo = Number(esperandoSerCalculado / porcentagemAtual)
        resultadoDisplay.innerText = resultadoSalvo.toString().replace('.', ',')
      } else {
        resultadoSalvo = +esperandoSerCalculado / +novoResultado
        resultadoDisplay.innerHTML = resultadoSalvo.toString().replace('.', ',')
      }

      removerDestaque()
      break

  }
}

function selecionarOperador(operador) {
  if (operador.innerText == 'x') {
    operadorAtual = '*'
  } else {
    operadorAtual = operador.innerText
  }
}

function adicionarDestaque(operador) {
  removerDestaque()

  if (operador.innerText == '%') {
    operador.classList.toggle('destaque-porcentagem')
  } else {
    operador.classList.toggle('destaque')
  }
}

function removerDestaque() {
  for (const operador of operadores) {
    if (operador.classList.contains('destaque')) operador.classList.remove('destaque')
  }
}

function limparResultado() {
  resultadoDisplay.innerHTML = '0'
  esperandoSerCalculado = ''
  resultadoSalvo = ''
  operadorAtual = ''
  porcentagemAtual = ''
  removerDestaque()
}