/* Haz una calculadora. Un único programa al que le pasarás dos argumentos que recogerás mediante el método prompt(); 
el usuario podrá visualizar por consola la suma, resta, multiplicación y división entre ambos números. El resultado 
debería ser mostrado con 3 decimales como mucho (en caso de que hubieran). 

El programa debe gestionar y actuar correctamente (gestión de errores) en el caso de que el usuario introduzca cualquier cosa que no sean números.

    -Si el usuario introduce un solo numero, deberá mostrar SOLO su raíz cuadrada, si vuelve a introducir los dos, 
    volverá a mostrar las 4 operaciones de siempre.

    -Si el usuario introduce una letra, deberá mostrarle un aviso de que lo que ha introducido no es un número

    -Los resultados deberían almacenarse dentro de una array y mostrarlos de una forma amigable al usuario. */

// Getting user input in Node.js (https://www.codecademy.com/article/getting-user-input-in-node-js)    
const prompt=require("prompt-sync")({sigint:true}); 

const resultArray = [];


let digit1 = prompt("Bienvenido al programa Calculator, por favor introduzca el primer digito: ");
let digit2 = prompt("Introduzca el segundo digito: ");



// Bucle para evitar que los dos digitos introducidos sean un string vacio.
while (digit1 === '' && digit2 === '') {
    digit1 = prompt("Por favor introduzca un valor para el primer digito: ");
    digit2 = prompt("Por favor introduzca un valor para el segundo digito: ");
}

// Condicional para controlar la posibilidad 1: string vacio + string.
if (digit1 === '' && typeof digit2 === "string") {
  
    digit2 = Number(digit2);
   
    while (isNaN(digit2)|| digit2==="") {
        digit2 = prompt("Por favor introduzca un valor de tipo numerico para el segundo digito: ");
    }

    let resultSqrt = Math.sqrt(digit2);
    if (!Number.isInteger(resultSqrt)) {
        let resultRoundOut = resultSqrt.toFixed(3);
        resultArray.push(resultRoundOut);
    } else {
        resultArray.push(resultSqrt);
    }

    console.log(`La RAIZ CUADRADA del numero ${digit2} es ${resultArray[0]}`);
}
    

// Condicional para controlar la posibilidad 2: string + string vacio.
else if (typeof digit1 === "string" && digit2 === '') {
  
    digit1 = Number(digit1);
   
    while (isNaN(digit1)|| digit1==="") {
        digit1 = prompt("Por favor introduzca un valor de tipo numerico para el primer digito: ");
    }

    let resultSqrt = Math.sqrt(digit1);
    if (!Number.isInteger(resultSqrt)) {
        let resultRoundOut = resultSqrt.toFixed(3);
        resultArray.push(resultRoundOut);
    } else {
        resultArray.push(resultSqrt);
    }

    console.log(`La RAIZ CUADRADA del numero ${digit1} es ${resultArray[0]}`);
}

// Condicional para controlar la posibilidad 3: string + string.
else { (typeof digit1 === "string" && typeof digit2 === "string") 
    
    digit1 = Number(digit1);
    
    while (isNaN(digit1)) {
        digit1 = prompt("Por favor introduzca un valor de tipo numerico para el primer digito: ");
    }
    
    digit2 = Number(digit2);
    
    while (isNaN(digit2)) {
        digit2 = prompt("Por favor introduzca un valor de tipo numerico para el segundo digito: ");
    }

    digit1 = Number(digit1);
    digit2 = Number(digit2);
    
    const sum = digit1 + digit2;
    if (!Number.isInteger(sum)) {
        const resultRoundOutSum = sum.toFixed(3);
        resultArray.push(resultRoundOutSum);
    } else {
        resultArray.push(sum);
    }
    
    const rest = digit1 - digit2;
    if (!Number.isInteger(rest)) {
        const resultRoundOutRest = rest.toFixed(3);
        resultArray.push(resultRoundOutRest);
    } else {
        resultArray.push(rest);
    }
   
    const mult = digit1 * digit2;
    if (!Number.isInteger(mult)) {
        const resultRoundOutMult = mult.toFixed(3);
        resultArray.push(resultRoundOutMult);
    } else {
        resultArray.push(mult);
    }
    
    const div = digit1 / digit2;
    if (!Number.isInteger(div)) {
        const resultRoundOutDiv = div.toFixed(3);
        resultArray.push(resultRoundOutDiv);
    } else {
        resultArray.push(div);
    }
    
    console.log(`
\n La SUMA del numero ${digit1} y el numero ${digit2} es ${resultArray[0]}
\n La RESTA del numero ${digit1} y el numero ${digit2} es ${resultArray[1]}
\n La MULTIPLICACION del numero ${digit1} y el numero ${digit2} es ${resultArray[2]}
\n La DIVISION del numero ${digit1} y el numero ${digit2} es ${resultArray[3]}\n`);
}






   
    