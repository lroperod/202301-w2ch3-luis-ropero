/*
* DOCUMENTACION:
* https://www.youtube.com/watch?v=lV-7Ecg-CtI
* https://www.youtube.com/watch?v=FLpZE29R6JY
* https://www.youtube.com/watch?v=Kdvz_qvI_GM
* https://www.youtube.com/watch?v=FtQikMVdj-0
*
* ENUNCIADO:
* Haz el juego del Pasapalabra, el programa deberá lanzar la definición de una palabra y el usuario deberá adivinar que 
* palabra estamos tratando, por ejemplo:
* '>>>'With the letter "M", Capital of Spain, located in the center of the country.
* '>>>' "Madrid"
* '>>>'Correct, you have 1 Point!
*
* Tu juego debería hacer una pregunta por cada letra del alfabeto, al final del juego, y habiendo respondido todas las letras, 
* deberá indicarle al usuario cuantas letras ha fallado y cuantas ha acertado. Si el usuario responde con "pasapalabra" el 
* juego deberá estar preparado para entender que en ese momento, el usuario no responderá esa pregunta, y no estará acertada 
* ni fallada, la dejará para la siguiente ronda. El juego deberá, cuando finalize, mostrar un ranking de usuarios con el nombre 
* y ordenados por cantidad de letras acertadas.
*
* PRO
* Los usuarios deberán tener tiempo límite por cada juego, por ejemplo 130 segundos...
* https://www.freecodecamp.org/espanol/news/javascript-settimeout-como-establecer-un-temporizador-en-javascript-o-esperar-durantante-n-segundos/
*
* El programa no debería hacer distinciones entre mayúsculas, minúsculas... Ejemplo: "animal" == "ANIMAL" // "Animal" // 
* "aNiMal"...
* El programa debe estar preparado para aceptar el input "END" para terminar el juego en cualquier momento, si esto sucede, 
* el programa dirá cuantas letras ha acertado pero no entrará en el ranking.
* Prepara tu programa para que no repita siempre las mismas preguntas, por ejemplo, de la misma letra, se podrían hacer tres 
* preguntas diferentes.
* Ejemplo de preguntas y respuestas: https://www.github.com/misan7
*
*/

const prompt = require("prompt-sync")({ sigint: true }); 

let questions = [
    {
      letter: "a",
      answer: "abducir",
      status: 0,
      question:
        "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien",
    },
    {
      letter: "b",
      answer: "bingo",
      status: 0,
      question:
        "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso",
    },
    {
      letter: "c",
      answer: "churumbel",
      status: 0,
      question: "CON LA C. Niño, crío, bebé",
    },
    {
      letter: "d",
      answer: "diarrea",
      status: 0,
      question:
        "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida",
    },
    {
      letter: "e",
      answer: "ectoplasma",
      status: 0,
      question:
        "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación",
    },
    {
      letter: "f",
      answer: "facil",
      status: 0,
      question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad",
    },
    {
      letter: "g",
      answer: "galaxia",
      status: 0,
      question:
        "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas",
    },
    {
      letter: "h",
      answer: "harakiri",
      status: 0,
      question: "CON LA H. Suicidio ritual japonés por desentrañamiento",
    },
    {
      letter: "i",
      answer: "iglesia",
      status: 0,
      question: "CON LA I. Templo cristiano",
    },
    {
      letter: "j",
      answer: "jabali",
      status: 0,
      question:
        "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba",
    },
    {
      letter: "k",
      answer: "kamikaze",
      status: 0,
      question:
        "CON LA K. Persona que se juega la vida realizando una acción temeraria",
    },
    {
      letter: "l",
      answer: "licantropo",
      status: 0,
      question: "CON LA L. Hombre lobo",
    },
    {
      letter: "m",
      answer: "misantropo",
      status: 0,
      question:
        "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas",
    },
    {
      letter: "n",
      answer: "necedad",
      status: 0,
      question: "CON LA N. Demostración de poca inteligencia",
    },
    {
      letter: "ñ",
      answer: "señal",
      status: 0,
      question:
        "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.",
    },
    {
      letter: "o",
      answer: "orco",
      status: 0,
      question:
        "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien",
    },
    {
      letter: "p",
      answer: "protoss",
      status: 0,
      question:
        "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft",
    },
    {
      letter: "q",
      answer: "queso",
      status: 0,
      question:
        "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche",
    },
    { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor" },
    {
      letter: "s",
      answer: "stackoverflow",
      status: 0,
      question: "CON LA S. Comunidad salvadora de todo desarrollador informático",
    },
    {
      letter: "t",
      answer: "terminator",
      status: 0,
      question:
        "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984",
    },
    {
      letter: "u",
      answer: "unamuno",
      status: 0,
      question:
        "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914",
    },
    {
      letter: "v",
      answer: "vikingos",
      status: 0,
      question:
        "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa",
    },
    {
      letter: "w",
      answer: "sandwich",
      status: 0,
      question:
        "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso",
    },
    {
      letter: "x",
      answer: "botox",
      status: 0,
      question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética",
    },
    {
      letter: "y",
      answer: "peyote",
      status: 0,
      question:
        "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos",
    },
    {
      letter: "z",
      answer: "zen",
      status: 0,
      question:
        "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional",
    },
  ];

let answerUser;
let askUsernamePrompt;
let point;
let fails; 
const ranking = [];
let flagEndGame = false;


let questionsBackUp =[];
questionsBackUp = JSON.parse(JSON.stringify(questions));

class NewPlayer{
    name;
    score;

    constructor(name, score){
        this.name = name;
        this.score = score;
    }
}

//Funcioin para dar la bienvenida y recoger el nombre del participante
const askUsername = () => {
    console.log("¡¡¡Bienvenido al juego de Pasapalabra!!!");
    console.log("\n");
    console.log("El juego consiste el tipico pasapalabra que se emitia por television.");
    console.log("Si desea salir del juego, introduzca como respuesta la palabra END.");
    console.log("\n");
    askUsernamePrompt = prompt("Por favor introduzca su nombre de usuario: ");
    while (askUsernamePrompt === "" || askUsernamePrompt.match(/ /g)) {
        askUsernamePrompt = prompt("Por favor, introduzca un nombre de usuario: ")
    }
    console.log("\n");
    console.log(`Su nombre de usuario introducido es: ${askUsernamePrompt}`);
    console.log("\n");
}

const player = (name, points)=>{
    let player = new NewPlayer(askUsernamePrompt, point);
    if(answerUser!=="END"){
    ranking.push({namePlayer:player.name, totalPoint: player.score}); 
    }
}

//Funcion para leer las preguntas del rosco de pasapalabra y modificar la propiedad status del array questions en funcion de la respuesta del participante
const startGame = () => {
  let keepGoing = true;  
  do {
    questions.filter(letter =>letter.status===0).forEach(letter => {
      if (!keepGoing) {
        return;
      }
      console.log("\n");
      console.log(`${letter.question}`);
      answerUser = prompt("Respuesta: ")
      
      if (answerUser === "END") {
        keepGoing = false;} 
      
      else if (answerUser === "pasapalabra") {
        return;} 

      else if(answerUser.toLowerCase() === letter.answer){
        console.log("Correcto, has conseguido 1 punto.");
        console.log("\n");
        letter.status =1 ;} 
    
      else if(answerUser.toLowerCase() !== letter.answer){
        console.log("Respuesta incorrecta.");
        letter.status = -1;
      }
    })

    const endPlayGame= questions.find(element=> element.status=== 0)
    if(!endPlayGame){
        keepGoing=false;
    }
  }while(answerUser!=="END" && keepGoing===true);
}

//Funcion para contabilizar las respuestas acertadas
const checkPoints = () =>{
    point=  questions.filter(obj=>obj.status>0).reduce((acc, obj)=> acc + obj.status, 0);
    return point;    
}

let pointsAccumulator = checkPoints();

//Funcion para contabilizar las respuestas erroneas
const checkFails = () =>{
    fails=  questions.filter(obj=>obj.status<0).reduce((acc, obj)=> acc + obj.status, 0);
    fails = Math.abs(fails);
    return fails;
}

//Funcion para mostrar el total de aciertos y fallos del jugador
const showSuccessAndFails = () =>{
  console.log(`El usuario con nombre ${askUsernamePrompt} ha acertado ${point} letras y ha fallado ${fails} letras.`);
}

//Funcion para comenzar de nuevo el juego con un nuevo jugador
const nextPlayer = () =>{
  questions= JSON.parse(JSON.stringify(questionsBackUp));  
  console.log("\n");
  let playOtherPlayer = prompt("¿Desea otro jugador comenzar el juego de Pasapalabra? (si/no): ");
    while (playOtherPlayer.toLowerCase() !== "si" && playOtherPlayer.toLowerCase() !== "no"){
        playOtherPlayer= prompt("Por favor introduzca si o no: ");
    }

    if(playOtherPlayer==="si"){
        askUsername();
        startGame();
        checkPoints();
        checkFails();
        player(askUsernamePrompt, pointsAccumulator);
        showSuccessAndFails();
    }

    if(playOtherPlayer==="no") {
        flagEndGame = true;
        ranking.sort((a,b)=> b.totalPoint - a.totalPoint);
    }   
}

//Funcion para mostrar el ranking de todos los jugadores
const showRanking = () =>{
  console.log(ranking);  
}

const playPasapalabra =() =>{
    askUsername();
    startGame();
    checkPoints();
    checkFails();
    showSuccessAndFails();
    player(askUsernamePrompt, pointsAccumulator);
    while(flagEndGame===false){
        nextPlayer();   
    }
    showRanking(); 
}

playPasapalabra();