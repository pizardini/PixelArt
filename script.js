function randomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function salvarCores() {
  const pegarCores = document.getElementsByClassName('color');
  const coresSalvas = [];

  for (let i = 0; i < pegarCores.length; i += 1) {
    coresSalvas.push(pegarCores[i].style.backgroundColor);
  }
  localStorage.setItem('colorPalette', JSON.stringify(coresSalvas));
}

function salvarPixels() {
  const pegarPixels = document.getElementsByClassName('pixel');
  const pixelsSalvos = [];

  for (let i = 0; i < pegarPixels.length; i += 1) {
    pixelsSalvos.push(pegarPixels[i].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(pixelsSalvos));
}

function salvarQuadro() {
  const valor = document.getElementById("board-size").value;
  localStorage.setItem('boardSize', valor)
}

/*
function coresIniciaisRand() {
    let cores = document.getElementsByClassName("color");
    for (let i = 0; i < cores.length; i += 1) {
        if (i == 0) {
            cores[i].style.backgroundColor = 'black';
        }
        else {
            cores[i].style.backgroundColor = randomColor();
        }
    }
}
*/

function limparSelecionado() {
  document.getElementById('cor1').classList.remove('selected');
  document.getElementById('cor2').classList.remove('selected');
  document.getElementById('cor3').classList.remove('selected');
  document.getElementById('cor4').classList.remove('selected');
}

function selecionarCor(event) {
  limparSelecionado();
  event.target.classList.add('selected');
}

function coresIniciais() {
  const cores = document.getElementsByClassName('color');

  cores[0].style.backgroundColor = 'black';
  cores[1].style.backgroundColor = 'blue';
  cores[2].style.backgroundColor = 'red';
  cores[3].style.backgroundColor = 'green';
}

function adicionarEventoCores() {
  const cores = document.getElementsByClassName('color');

  for (let i = 0; i < cores.length; i += 1) {
    cores[i].addEventListener('click', selecionarCor);
  }
}

function trocarCores() {
  const pegarCor = document.getElementsByClassName('color');
  pegarCor[0].style.backgroundColor = 'black';
  for (let i = 1; i < (pegarCor.length-1); i += 1) {
    pegarCor[i].style.backgroundColor = randomColor();
  }
  salvarCores();
}

function setarCores() {
  if (localStorage.getItem('colorPalette') == null) {
    coresIniciais();
    salvarCores();
  } else {
    const coresCarregadas = JSON.parse(localStorage.getItem('colorPalette'));
    const pegarCor = document.getElementsByClassName('color');

    for (let i = 0; i < pegarCor.length; i += 1) {
      pegarCor[i].style.backgroundColor = coresCarregadas[i];
    }
  }
}

function carregarPixels() {
  if (localStorage.getItem('pixelBoard') !== null) {
    const pixelsCarregados = JSON.parse(localStorage.getItem('pixelBoard'));
    const pegarPixel = document.getElementsByClassName('pixel');
    for (let i = 0; i < pegarPixel.length; i += 1) {
      pegarPixel[i].style.backgroundColor = pixelsCarregados[i];
    }
  }
}

function carregarQuadro() {
  if (localStorage.getItem('boardSize') !== null) {
    let valorCarregado;
    valorCarregado = localStorage.getItem('boardSize');
    valor = valorCarregado;
  }
  else {
    valor = 5;
  }
  if (valor > 50) {
    valor = 50
  }
  if (valor < 5) {
    valor = 5
  }
    const matriz = document.querySelector('#pixel-board');
    for (let i = 0; i < valor; i += 1) {
      const line = document.createElement('div');
      line.className = 'linha';
      for (let j = 0; j < valor; j += 1) {
        const cell = document.createElement('div');
        cell.className = 'pixel';
        cell.addEventListener('click', pintarPixel);
        line.appendChild(cell);
      }
      matriz.appendChild(line);
    }
  
}

function pintarPixel(event) {
  const cor = document.getElementsByClassName('selected')[0].style.backgroundColor;
  event.target.style.backgroundColor = cor;
  salvarPixels();
}

function gerarQuadro() {
  limparDivs()
  let valor = document.getElementById("board-size").value;
  
  if (valor > 50) {
    valor = 50
  }
  if (valor < 5) {
    valor = 5
  }

  const matriz = document.querySelector('#pixel-board');
  for (let i = 0; i < valor; i += 1) {
    const line = document.createElement('div');
    line.className = 'linha';
    for (let j = 0; j < valor; j += 1) {
      const cell = document.createElement('div');
      cell.className = 'pixel';
      cell.addEventListener('click', pintarPixel);
      line.appendChild(cell);
    }
    matriz.appendChild(line);
    salvarQuadro();
  }
}

function limparDivs() {
  document.getElementById("pixel-board").textContent= '';
}

function limparCores() {
  const pixels = document.getElementsByClassName('pixel');

  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = 'white';
  }
  salvarPixels();
}

setarCores();
adicionarEventoCores();
carregarQuadro();
carregarPixels();
