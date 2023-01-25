/*
 * DOCUMENTACION:
 * http://stackoverflow.com/questions/1290131/javascript-how-to-create-an-array-of-object-literals-in-a-loop
 * http://stackoverflow.com/questions/15742442/declaring-array-of-objects
 *
 * ENUNCIADO:
 * Después de ver toda la información el programa pedirá al usuario si es ADMIN/USER, dependiendo de la elección, 
 * el programa se comportará de la siguiente manera:

 *Si eres ADMIN, la función debería permitir:

 *Poder crear, más vuelos, pidiendo la información por prompt(), sin poder pasar de 15 vuelos, 
 *si se intenta introducir uno más, saltará un alert().
 *Poder eliminar vuelos mediante el ID.

 *Si eres USER la función debería permitir:

 *El usuario debe poder buscar por precio. Cuando el usuario ponga el precio, debera mostrar los vuelos que tengan 
 *ese precio o mas baratos.
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
 let askRoleUserPrompt;
 let flag;
 let flightDestination;
 let flightOrigin;
 let flightPrice;
 let flightScale;
 let arrayWithDeleteFlight = [];
 let arraySearchByPrice = [];

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
 
 const askRoleUser = () => {
    askRoleUserPrompt = prompt("Indique que rol posee (user o admin): ");
    console.log("\n");
    flag = false;
    do { 
        if (askRoleUserPrompt.toLowerCase() === "user" || askRoleUserPrompt.toLowerCase() === "admin") {
            flag = true;
        } else {
            askRoleUserPrompt = prompt("Por favor indique alguna de las opciones validas (user o admin): ");
        }
    } while (flag === false);
 }
 
 const actionsAllowedForAdmin = () => {
    
    let actionsAdmin;
    if (askRoleUserPrompt === "admin") {
        actionsAdmin = prompt("Con su rol podra crear o eliminar un vuelo. Por favor introduzca la palabra crear o eliminar: ");
        flag = false;
        do { 
            if (actionsAdmin.toLowerCase() === "crear" || actionsAdmin.toLowerCase() === "eliminar") {
                flag = true;
            } else {
                actionsAdmin = prompt("Por favor indique alguna de las opciones validas (crear o eliminar): ");
            }
        } while (flag === false);
    }

    switch (actionsAdmin) {
        case "crear":
        let accFlights =0; 
        let repeatCreationFlight;
        do{
            checkNewFlights();
            const newFlight = {};
            newFlight.id = flights.length;
            newFlight.to = flightDestination;
            newFlight.from = flightOrigin;
            newFlight.cost = flightPrice;
            newFlight.scale = flightScale;

            flights.push(newFlight);
            accFlights++;
            
            repeatCreationFlight = prompt("Desea crear otro vuelo (si/no): ");
            while (repeatCreationFlight.toLowerCase() !== "si" && repeatCreationFlight.toLowerCase() !== "no"){
                repeatCreationFlight= prompt("Por favor introduzca si o no: ");
            };

            if (accFlights===15){
                repeatCreationFlight= "no";
                console.log("\n");
                console.log("Ya ha introducido el maximo de vuelos permitidos.");
            }

            }while(repeatCreationFlight === "si");
            console.log("###Los vuelos ahora disponibles son###")
            console.log(flights);
            break;

        case "eliminar":
            let repeatDeleteFlight;
            arrayWithDeleteFlight = JSON.parse(JSON.stringify(flights));
        do{
            let flightDelete = prompt("Ingrese el numero de ID del vuelo que desea eliminar: ");
            while (flightDelete === '' || isNaN(flightDelete) || flightDelete.match(/ /g)) {
                flightDelete = prompt("Por favor introduzca un valor de tipo number: ");
            }
            flightDelete = parseInt(flightDelete);

            arrayWithDeleteFlight = arrayWithDeleteFlight.filter(flight => {
                return flight.id !== flightDelete;  
            });

            repeatDeleteFlight = prompt("Desea eliminar otro vuelo (si/no): ");
            while (repeatDeleteFlight.toLowerCase() !== "si" && repeatDeleteFlight.toLowerCase() !== "no"){
                repeatDeleteFlight= prompt("Por favor introduzca si o no: ");
            }
        }while(repeatDeleteFlight === "si");
        
        console.log("\n");
        console.log("Los vuelos ahora disponibles son:");
        console.log(arrayWithDeleteFlight);
        break;
    }
    
 }

 const checkNewFlights = () => {
   
    flightDestination = prompt("Por favor introduzca un valor para el destino del vuelo: ");
    while (flightDestination === '' || Number(flightDestination) || flightDestination.match(/ /g)) {
        flightDestination = prompt("Por favor introduzca un valor de tipo string: ");
    }

    flightOrigin = prompt("Por favor introduzca un valor para el origen del vuelo: ");
    while (flightOrigin === '' || Number(flightOrigin) || flightOrigin.match(/ /g)) {
        flightOrigin = prompt("Por favor introduzca un valor de tipo string: ");
    }

    flightPrice = prompt("Por favor introduzca un valor para el precio del vuelo: ");
    while (flightPrice === '' || isNaN(flightPrice) || flightPrice.match(/ /g)) {
        flightPrice = prompt("Por favor introduzca un valor de tipo number: ");
    }
    flightPrice = parseInt(flightPrice);

    flightScale = prompt("Por favor introduzca un valor (true/false) para la escala del vuelo: ");
    flag = false;
    do { 
        if (flightScale.toLowerCase() === "true" || flightScale.toLowerCase() === "false") {
            flag = true;
        } else {
            flightScale = prompt("Por favor indique alguna de las opciones validas (true o false): ");
        }
    } while (flag === false);
    flightScale = Boolean(flightScale);
 }

 const actionsAllowedForUser = () =>{
    if (askRoleUserPrompt === "user") {
        let actionUser = prompt("Con su rol podra buscar por precio los vuelos cuyo importe sea igual o inferior al valor introducido. Por favor introduzca el precio: ");
        while (actionUser === '' || isNaN(actionUser) || actionUser.match(/ /g)) {
            actionUser = prompt("Por favor introduzca un valor de tipo number: ");
        };
        actionUser = parseInt(actionUser);
       
        arraySearchByPrice = flights.filter(flight => {
            return flight.cost <= actionUser;  
        });
        console.log("\n");
        console.log(`Los vuelos con un importe inferior o igual a ${actionUser}€ son: `);
        console.log(arraySearchByPrice);
    }
 }

 const airlines = () => {
   
     askUsername();
     copyObjectFlights();
     convertScaleFlightsToString();
     showFlights();
     averageCostFlights();
     flightsWithScale();
     lastFlightOfDay();
     askRoleUser();
     actionsAllowedForAdmin();
     actionsAllowedForUser();
     
   
 }
 
 airlines();