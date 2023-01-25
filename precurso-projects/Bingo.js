/*
 * DOCUMENTACION:
 * https://www.youtube.com/watch?v=1q3yY4G65nc
 *
 * ENUNCIADO:
 * Realiza un programa que simule un Bingo. Cuando se ejecute, pedirá el nombre del jugador y deberá guardarse.
 * Durante el primer roundse mostrará un cartón con 15 números (excluyendo el 0 siempre), para pasar al siguiente roundel usuario deberá confirmar
 * mediante confirm() visualizándose otro número, si coincide con alguno de los existentes en el cartón, cambiará por una "X" o un 0. El cartón se mostrará,
 * al final de cada turno, con los cambios efectuados, indicándole al usuario qué número se ha encontrado. El programa deberá preguntar al usuario al inicio
 * de cada roundsi desea continuar, en caso de que se continúe, seguirá el mismo patrón que hasta el momento.
 *
 * Por supuesto, cuando todos los números de una misma linea estén en "X", mostrará un mensaje "LINEA!", pero la ejecución seguirá, el juego solo acabará
 * cuando todos los números estén a "X".
 *
 * Cuando el juego concluya, deberá decirle al usuario en cuantos turnos se ha completado el cartón. Por último, deberá preguntar si desea volver a jugar.
 *
 * Requisitos de la versión mínima:
 * Cartón con solo 5 números, sin necesidad de ser generados random. Solo necesitamos un número random cuando recorramos el cartón y veamos si hay alguna
 * coincidencia. No necesitamos asegurarnos que el número random de cada roundno haya salido en turnos anteriores, recuerda que estamos en la mínima versión
 * posible, eso ya lo solucionaremos. Si hay coincidencia, remplazaremos el número por una 'x' y mostramos el cartón modificado
 *
 * Sepáralo en funciones, englobado en una función global llamada bingo(), tal que:
 *
 * -Function! => Generar Numero Random Bombo
 *
 * -Function! => Nuevo round(Match carton[i] === randomNum)
 *
 * -Function! => Preguntar Nuevo Turno
 *
 */

const prompt = require("prompt-sync")({ sigint: true });
let randomNumbers = [];
let bingoCard = [];
const extractedNumbers = [];
let numberToPlay;
let line1Flag = false;
let line2Flag = false;
let line3Flag = false;
let endGame = false;
let nextTurn = "si";
let round = 1;

//Función para obtener nombre de usuario
const askUsername = () => {
  console.log("¡¡¡Bienvenido al juego del Bingo!!!");
  console.log("\n");
  console.log(
    "El juego cuenta con un sistema de puntacion que depende en funcion del numero de turnos que necesite para cantar bingo:"
  );
  console.log(
    "    * Si consigue Bingo antes de la ronda 16 obtendra 1500 puntos."
  );
  console.log(
    "    * Si consigue Bingo antes de la ronda 25 obtendra 1000 puntos."
  );
  console.log("    * En cualquier otra situación obtendra 500 puntos.");
  console.log("\n");
  let askUsernamePrompt = prompt("Por favor introduzca su nombre de usuario: ");
  while (askUsernamePrompt === "" || askUsernamePrompt.match(/ /g)) {
    askUsernamePrompt = prompt("Por favor, introduzca un nombre de usuario: ");
  }
  console.log("\n");
  console.log(`Su nombre de usuario introducido es: ${askUsernamePrompt}`);
  console.log("\n");
};

//Funcion para generar un array con 15 numeros aleatorios unicos
const randomNumberUnique = () => {
  randomNumbers = new Set();
  while (randomNumbers.size < 15) {
    randomNumbers.add(Math.floor(Math.random() * 20) + 1);
  }
  return Array.from(randomNumbers);
};

//Funcion para generar el carton
const newBingoCard = () => {
  const arrayRandomNumbers = randomNumberUnique();
  bingoCard = arrayRandomNumbers.map((number) => ({
    number: number,
    matched: false,
  }));
  return bingoCard;
};

//Función para mostrar el carton al usuario y confirmar si desea ese carton
const changeBingoCard = () => {
  let playThisCard;
  do {
    newBingoCard();

    console.log(
      "### El carton que se ha generado aleatoriamente con el que usted va a jugar es: ###"
    );
    console.log("\n");
    console.log(
      `Linea 1:  ${bingoCard[0].number}, ${bingoCard[1].number}, ${bingoCard[2].number}, ${bingoCard[3].number}, ${bingoCard[4].number}`
    );
    console.log(
      `Linea 2:  ${bingoCard[5].number}, ${bingoCard[6].number}, ${bingoCard[7].number}, ${bingoCard[8].number}, ${bingoCard[9].number}`
    );
    console.log(
      `Linea 3:  ${bingoCard[10].number}, ${bingoCard[11].number}, ${bingoCard[12].number}, ${bingoCard[13].number}, ${bingoCard[14].number}`
    );
    console.log("\n");

    playThisCard = prompt("Desea jugar con este carton (si/no): ");
    while (
      playThisCard.toLowerCase() !== "si" &&
      playThisCard.toLowerCase() !== "no"
    ) {
      playThisCard = prompt("Por favor introduzca si o no: ");
    }
  } while (playThisCard.toLowerCase() === "no");
};

//Funcion para mostrar el carton
const showBingoCard = () => {
  console.log("### Su carton es: ###");
  console.log(
    `Linea 1:  ${bingoCard[0].number}, ${bingoCard[1].number}, ${bingoCard[2].number}, ${bingoCard[3].number}, ${bingoCard[4].number}`
  );
  console.log(
    `Linea 2:  ${bingoCard[5].number}, ${bingoCard[6].number}, ${bingoCard[7].number}, ${bingoCard[8].number}, ${bingoCard[9].number}`
  );
  console.log(
    `Linea 3:  ${bingoCard[10].number}, ${bingoCard[11].number}, ${bingoCard[12].number}, ${bingoCard[13].number}, ${bingoCard[14].number}`
  );
  console.log("\n");
};

//Funcion para generar el numero del bombo
const randomNumberToPlay = () => {
  numberToPlay = Math.floor(Math.random() * 20) + 1;
  return numberToPlay;
};

//Funcion para comprobar si el numero del bombo conincide con alguno del carton y sacar numeros aleatorios unicos
const checkSuccessBingoCard = () => {
  do {
    randomNumberToPlay();
  } while (extractedNumbers.includes(numberToPlay));

  console.log(`El numero que ha salido es: ${numberToPlay}`);
  extractedNumbers.push(numberToPlay);

  bingoCard.forEach((bingoCard) => {
    if (bingoCard.number === numberToPlay) {
      bingoCard.number = "X";
      bingoCard.matched = true;
      console.log(
        "Enhorabuena el numero que ha salido se encuentra en su carton!!!"
      );
      console.log("\n");
    }
  });
};

//Funcion para comprobar si hay linea
const singLine = () => {
  if (!line1Flag) {
    const firstFiveNumberAreTrue = bingoCard
      .slice(0, 5)
      .every((bingoCard) => bingoCard.matched === true);
    if (firstFiveNumberAreTrue) {
      console.log(
        "LINEA!!! Enhorabuena ha acertado todos los numeros de la línea 1."
      );
      line1Flag = true;
    }
  }

  if (!line2Flag) {
    const seconddFiveNumberAreTrue = bingoCard
      .slice(5, 10)
      .every((bingoCard) => bingoCard.matched === true);
    if (seconddFiveNumberAreTrue) {
      console.log(
        "LINEA!!! Enhorabuena ha acertado todos los numeros de la línea 2."
      );
      line2Flag = true;
    }
  }

  if (!line3Flag) {
    const thirdFiveNumberAreTrue = bingoCard
      .slice(10, 15)
      .every((bingoCard) => bingoCard.matched === true);
    if (thirdFiveNumberAreTrue) {
      console.log(
        "LINEA!!! Enhorabuena ha acertado todos los numeros de la línea 3."
      );
      line3Flag = true;
    }
  }
};

//Funcion para comprobar si hay bingo
const checkBingo = () => {
  const allNumbersAreTrue = bingoCard
    .slice(0, 15)
    .every((bingoCard) => bingoCard.matched === true);
  if (allNumbersAreTrue) {
    console.log(
      "BINGO!!! Enahorabuena ha acertado todos los numeros del carton."
    );
    console.log("\n");
    endGame = true;
    nextTurn === "no";
  }
};

//Funcion para jugar otra turno
const playNextTurn = () => {
  while (nextTurn === "si" && endGame === false) {
    console.log(`Ronda ${round}:`);
    checkSuccessBingoCard();
    showBingoCard();
    singLine();
    checkBingo();

    if (endGame === false) {
      nextTurn = prompt("Desea jugar otro turno (si/no): ");
      round++;
      console.log("\n");

      while (
        nextTurn.toLowerCase() !== "si" &&
        nextTurn.toLowerCase() !== "no"
      ) {
        nextTurn = prompt("Por favor introduzca si o no: ");
      }
    }
  }
};
//Funcion para otorgar puntos
const points = () => {
  if (endGame) {
    if (round < 16) {
      console.log("Enhorabuena ha alcanzado la maxima puntucion: 1500 puntos.");
    } else if (round < 25) {
      console.log("Enhorabuena ha alcanzado una puntucion de: 1000 puntos.");
    } else {
      console.log("Enhorabuena ha alcanzado una puntucion de: 500 puntos.");
    }
  }
};

const bingo = () => {
  askUsername();
  changeBingoCard();
  playNextTurn();
  points();
};

bingo();
