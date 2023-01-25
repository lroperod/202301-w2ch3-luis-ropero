/**
 * DOCUMENTACION:
 * http://stackoverflow.com/questions/1290131/javascript-how-to-create-an-array-of-object-literals-in-a-loop
 * http://stackoverflow.com/questions/15742442/declaring-array-of-objects
 *
 * ENUNCIADO:
 * Programa una inferfaz de usuario para una aerolinea (por terminal...). Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos estarán declarados de manera global, cuando se llame a la función:
 * Se preguntará por el nombre de usuario y dará la bienvenida.
 * El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
 * A continuación, el usuario verá el coste medio de los vuelos.
 * También podrá ver cuantos vuelos efectúan escalas.
 * Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.
 */

const prompt = require("prompt-sync")({ sigint: true }); 

const flights = [
    { id: 00, to: "New York", from: "Barcelona", cost: 700, scale: false },
    { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
    { id: 02, to: "Paris", from: "Barcelona", cost: 210, scale: false },
    { id: 03, to: "Roma", from: "Barcelona", cost: 150, scale: false },
    { id: 04, to: "London", from: "Madrid", cost: 200, scale: false },
    { id: 05, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
    { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
    { id: 07, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
    { id: 08, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
    { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false },
];

let flightsDuplicate = [];
const target =[] ;

const askUsername = () => {
    let askUsernamePrompt = prompt("Bienvenido al sistema, por favor introduzca su nombre de usuario: ");
    while (askUsernamePrompt === "" || askUsernamePrompt.match(/ /g)) {
        askUsernamePrompt = prompt("Por favor, introduzca un nombre de usuario: ")
    }
    console.log("\n");
    console.log(`Su nombre de usuario introducido es: ${askUsernamePrompt}`);
    console.log("\n");
}

const copyObjectFlights = () => {
    flightsDuplicate = JSON.parse(JSON.stringify(flights));
}

const convertScaleFlightsToString = () => {
    flightsDuplicate.forEach((flight) => {
        if (flight.scale) {
            flight.scale = "realiza escala";
        } else {
            flight.scale= "no realiza ninguna escala"
    }
    })
}

const showFlights = () => {
    console.log("                             ### Vuelos disponibles ###");
    console.log("\n");
    flightsDuplicate.forEach((flight) => {
        console.log(`El vuelo con origuen: ${flight.from}, y destino: ${flight.to} tiene un coste de ${flight.cost}€ y ${flight.scale}.`);
       console.log("------------------------------------------------------------------------------------------------------------")
    })
    console.log("\n");
}

const averageCostFlights = () => {
    console.log("### Coste medio de los vuelos disponibles ###");
    console.log("\n");
    let costeMedio=0;
    
    flights.forEach((flight) => {
        costeMedio += flight.cost;
    });
    
    costeMedio= costeMedio/ flights.length;
    console.log(`${costeMedio} €.`);
    console.log("\n");
}

const flightsWithScale = () => {
    console.log("### Vuelos disponibles con escala ###");
    console.log("\n");
    flights.forEach((flight) => {
        if (flight.scale) {
            console.log(`El vuelo con origuen: ${flight.from}, y destino: ${flight.to} tiene escala.`);
            console.log("--------------------------------------------------------------------")
        }
    })
    console.log("\n");
}
const lastFlightOfDay = () => {
    console.log("### Los destinos de los ultimos 5 vuelos ###");
    console.log("\n");
    const newArray = flights.slice(-5);
    newArray.forEach((flight) => {   
            console.log(`El vuelo con id: ${flight.id}, tiene como destino: ${flight.to}.`);
            console.log("-------------------------------------------------------")
    })
    console.log("\n");
}

const airlines = () => {
    askUsername();
    copyObjectFlights();
    convertScaleFlightsToString();
    showFlights();
    averageCostFlights();
    flightsWithScale();
    lastFlightOfDay();
  
}

airlines();