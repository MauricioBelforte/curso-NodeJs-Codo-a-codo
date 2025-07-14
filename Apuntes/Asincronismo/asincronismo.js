
console.log('Primero: Este mensaje se muestra primero.');
setTimeout(() => {
 console.log('Tercero: Este mensaje se muestra después de 2 segundos.');
}, 2000);
console.log('Segundo: Este mensaje se muestra mientras esperamos el temporizador.');
