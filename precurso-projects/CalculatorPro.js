//Podrias hacer que la calculadora realice operaciones sean cuales sean el numero de argumentos pasados a la funcion?
//const prompt=require("prompt-sync")({sigint:true}); 

function sum() {
    let accSum = 0;
    for (num in arguments) {
      accSum += arguments[num];
    }
    return accSum;
  }
  
function rest() {
  let accRest;
  let arrayAux = [];
  for (num in arguments) {
    arrayAux.push(arguments[num]);
  }
  accRest = arrayAux.reduce(function (a, b) { return a - b; });
  accRest = +accRest.toFixed(3);
  return accRest;
}

function mult() {
  let accMult = 1;
  for (num in arguments) {
    accMult *= arguments[num];
  }
  return accMult;
}

function div() {
  let accDiv;
  let arrayAux = [];
  for (num in arguments) {
    arrayAux.push(arguments[num]);
  }
  accDiv = arrayAux.reduce(function (a, b) { return a / b; });
  accDiv = +accDiv.toFixed(3);
  return accDiv;
}

let d1;
let d2;

//Funcion para comprobar que el primer digito introducido por el usuario sea un dato de tipo number.
function checkFirstDigit() {
  d1 = prompt("Introduzca el primer digito: ");

  while (d1 === '' || isNaN(d1) || d1.match(/ /g)) {
    d1 = prompt("Por favor introduzca un valor para el primer digito: ");
  }
  return d1;
}

//Funcion para comprobar que el segundo digito introducido por el usuario sea un dato de tipo number.
function checkSecondDigit() {
  d2 = prompt("Introduzca el segundo digito: ");

while (d2 === '' || isNaN(d2) || d2.match(/ /g)) {
  d2 = prompt("Por favor introduzca un valor para el segundo digito: ");
}
  return d2;
}

checkFirstDigit();
checkSecondDigit();

d1 = Number(d1);
d2 = Number(d2);

const arrayNewOperation =[];

function calculator(d1, d2) {
 
  arrayNewOperation.push(`La suma de ${d1} y ${d2} es: `+ sum(d1, d2));
  arrayNewOperation.push(`La resta de ${d1} y ${d2} es: `+ rest(d1,d2));
  arrayNewOperation.push(`La multiplicacion de ${d1} y ${d2} es: ` + mult(d1,d2));
  arrayNewOperation.push(`La division de ${d1} y ${d2} es: ` + div(d1,d2));
 
  return arrayNewOperation;
}
calculator(d1, d2);

console.log(arrayNewOperation);
let repeatCalculator;

//Bucle para repetir la funcion calculator hasta que el usuario introduzca "n"
do {
  repeatCalculator = prompt("¿Desea realizar mas operaciones? ");
  
  while (repeatCalculator !== "y" && repeatCalculator !== "n") {
    repeatCalculator = prompt(`Por favor introduzca: "y" o "n": `);
  }

  switch (repeatCalculator) {
    case "y":
      checkFirstDigit();
      checkSecondDigit();

      d1 = Number(d1);
      d2 = Number(d2);
    
      const arrayFinal = calculator(d1, d2);
     
      console.log("\n El resutaldo de las operaciones realizadas es: ")
      console.log(arrayFinal);
      console.log("\n");
      break;
  
    case "n":
      console.log("Hasta pronto!!");
      break;
  }
} while (repeatCalculator === "y");
