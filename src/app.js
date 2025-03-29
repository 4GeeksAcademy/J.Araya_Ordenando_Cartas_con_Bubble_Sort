let estadoInicial;
let cartas;
let symbolColor = {
    "♠": true,
    "♣": true,
    "♥": false,
    "♦": false
};
let crearUnaCarta = (numeroDeCarta) => {

    let symbol = ["♠", "♣", "♥", "♦"];


    let cartaEscogida = {
        pinta: symbol[(Math.floor(Math.random() * symbol.length))],
        numero: (Math.floor(Math.random() * 12)) + 1
    };

    let cardHead = document.getElementById(`cardHead${numeroDeCarta}`)
    cardHead.innerHTML = cartaEscogida.pinta

    // if (symbolColor[cartaEscogida.pinta]) {
    //     cardHead.classList.add("negro");
    //   } else {
    //     cardHead.classList.add("rojo");
    //   }
      

    let cardNum = document.getElementById(`cardNum${numeroDeCarta}`)
    cardNum.innerHTML = cartaEscogida.numero
    cardNum.classList.add("num")

    let cardFoot = document.getElementById(`cardFoot${numeroDeCarta}`)
    cardFoot.innerHTML = cartaEscogida.pinta
    // symbolColor[cartaEscogida.pinta] ? cardFoot.classList.add("negro") : cardFoot.classList.add("rojo")
}

let crearNcartas = (cantidad) => {
    let listaDeCartasCreadas = []
    for (let i = 0; i < cantidad; i++) {
        if (i == 0) {
            crearUnaCarta(i)
            listaDeCartasCreadas.push({
                "number": document.getElementById("carta0").querySelector(`#cardNum${i}`).innerText,
                "symbol": document.getElementById("carta0").querySelector(`#cardHead${i}`).innerText,
              })
        } else {
            let nuevoDiv = document.createElement("div")
            nuevoDiv.id = `carta${i}`
            nuevoDiv.classList.add("col", "m-1")
            nuevoDiv.innerHTML = document.getElementById("carta0").innerHTML
            nuevoDiv.querySelector("#cardHead0").id = `cardHead${i}`;
            nuevoDiv.querySelector("#cardNum0").id = `cardNum${i}`;
            nuevoDiv.querySelector("#cardFoot0").id = `cardFoot${i}`;
            document.getElementById("groupCards0").appendChild(nuevoDiv)
            crearUnaCarta(i)
            listaDeCartasCreadas.push({
                "number": nuevoDiv.querySelector(`#cardNum${i}`).innerText,
                "symbol": nuevoDiv.querySelector(`#cardHead${i}`).innerText,
              })
        }
    }
    return listaDeCartasCreadas
}

let bubbleSort = (arr) => {
    let listaParaLosLogs = [JSON.parse(JSON.stringify(arr))]
    let wall = arr.length - 1; //iniciamos el wall o muro al final del arr
    while (wall > 0) {
      for (let i = 0; i < wall; i++) {
        if (parseInt(arr[i].number) > parseInt(arr[i + 1].number)) {
          let aux = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = aux;
          listaParaLosLogs.push(JSON.parse(JSON.stringify(arr)));
        }
  
      }
      wall--; //disminuir la pared para optimizar
    }
    return listaParaLosLogs;
  };

let ordenarCartas  = (arr) =>{
    let nuevoDiv = document.createElement("div")
    nuevoDiv.id = "ConsoleLog"
    nuevoDiv.innerHTML="ConsoleLog"
    document.getElementById("fila0").appendChild(nuevoDiv)
for (let i = 0; i < arr.length; i++) {
    let divSeparador = document.createElement("div")
    divSeparador.id = `groupCard${i+1}`
    divSeparador.classList.add("bckg","d-flex","justify-content-start")
    document.getElementById("fila0").appendChild(divSeparador)
    for (let j = 0; j < arr[i].length; j++) {
            let nuevoDiv = document.createElement("div")
            nuevoDiv.id = `carta${i},${j}`
            nuevoDiv.classList.add("col", "m-1")
            nuevoDiv.innerHTML = document.getElementById("carta0").innerHTML
            document.getElementById(`groupCard${i+1}`).appendChild(nuevoDiv);
            nuevoDiv.querySelector("#cardHead0").id = `cardHead${i},${j}`;
            nuevoDiv.querySelector("#cardNum0").id = `cardNum${i},${j}`;
            nuevoDiv.querySelector("#cardFoot0").id = `cardFoot${i},${j}`;
            document.getElementById(`cardHead${i},${j}`).innerHTML=arr[i][j].symbol;
            document.getElementById(`cardNum${i},${j}`).innerHTML = arr[i][j].number;
            document.getElementById(`cardFoot${i},${j}`).innerHTML = arr[i][j].symbol;
        }
   
}

}

window.addEventListener("DOMContentLoaded", () => {
    estadoInicial = document.getElementById("fila0").innerHTML;
  });

let limpiar = ()=>{
    document.getElementById("fila0").innerHTML=estadoInicial;
}

document.getElementById("draw").addEventListener("click", () =>{
    limpiar()
    cartas = crearNcartas(parseInt(document.getElementById("cantidad").value))
})

document.getElementById("sort").addEventListener("click", ()=>{
    ordenarCartas(bubbleSort(cartas))
})

// crearNcartas(5)