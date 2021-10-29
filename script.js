'use strict';

// ELEMENTOS HTML ///////////////////////////////////////////////////////
// Visor
const visor = document.querySelector('.secao-visor');

// Botões Numéricos
const btnNumeros = document.querySelectorAll('.numero');

// Botões Operadores
const btnOperadores = document.querySelectorAll('.operadores');

// VARIÁVEIS INICIAIS ///////////////////////////////////////////////////
let a, b, sinal, stringA, stringB;
let arrSinal = [undefined, undefined, '/', '*', '-', '+'];

// FUNÇÕES //////////////////////////////////////////////////////////////
// Limpa
const limpa = function () {
  stringA = undefined;
  a = undefined;
  stringB = undefined;
  b = undefined;
  sinal = undefined;
  visor.value = '';

  console.log(stringA, stringB, a, b, sinal);
};

// Apaga
const apaga = function () {
  let arrVisor = Array.from(visor.value);
  let numeroApagado = arrVisor.pop(); //numeroApagado => Type Number; .pop() altera array original
  console.log(arrVisor, numeroApagado);

  visor.value = arrVisor.join('');
  arrVisor.push(numeroApagado);
  console.log(arrVisor, a, b, Number(arrVisor.join('')));

  if (b === Number(arrVisor.join(''))) {
    stringB = undefined + visor.value;
    b = Number(Array.from(stringB).splice(9).join(''));

    console.log(stringB, b);
  } else if (a === Number(arrVisor.join(''))) {
    stringA = undefined + visor.value;
    a = Number(Array.from(stringA).splice(9).join(''));

    console.log(stringA, a);
  }
};

// Operadores
const divide = function (a, b) {
  return a % b > 0 ? (a / b).toFixed(3) : a / b;
};
const multiplica = function (a, b) {
  return a * b;
};
const subtrai = function (a, b) {
  return a - b;
};
const soma = function (a, b) {
  return a + b;
};
const igual = function (a, b) {
  if (sinal === '/') {
    visor.value = a = divide(a, b);
    stringB = undefined;
  } else if (sinal === '*') {
    visor.value = a = multiplica(a, b);
    stringB = undefined;
  } else if (sinal === '-') {
    visor.value = a = subtrai(a, b);
    stringB = undefined;
  } else if (sinal === '+') {
    visor.value = a = soma(a, b);
    console.log(a);
    stringB = undefined;
  }
};

// FUNCIONALIZANDO BOTÕES ///////////////////////////////////////////////////////////////////////////////
// Numéricos
const arrNumeros = Array.from(btnNumeros);
arrNumeros.forEach(function (num, i) {
  num.addEventListener('click', function () {
    if (i === 10) {
      igual(a, b);
    } else {
      if (sinal === undefined) {
        stringA += num.textContent;
        a = Number(Array.from(stringA).splice(9).join(''));
        visor.value = a;

        console.log(stringA, a);
      } else {
        stringB += num.textContent;
        b = Number(Array.from(stringB).splice(9).join(''));
        visor.value = b;

        console.log(stringB, b);
      }
    }
  });
});

// Operadores
const setaSinal = function (i) {
  sinal = arrSinal[i];
  stringB = undefined;
};

const arrOperadores = Array.from(btnOperadores);
for (const [i, operador] of arrOperadores.entries()) {
  operador.addEventListener('click', function () {
    if (i === 0) limpa();
    if (i === 1) {
      apaga();
      return;
    }

    if (b === undefined) {
      setaSinal(i);

      console.log(stringB, sinal);
      return sinal;
    } else {
      if (sinal === '/') {
        visor.value = a = divide(a, b);
        setaSinal(i);

        console.log(a, sinal, stringB);
      } else if (sinal === '*') {
        visor.value = a = multiplica(a, b);
        setaSinal(i);

        console.log(a, sinal, stringB);
      } else if (sinal === '-') {
        visor.value = a = subtrai(a, b);
        setaSinal(i);

        console.log(a, sinal, stringB);
      } else if (sinal === '+') {
        visor.value = a = soma(a, b);
        setaSinal(i);

        console.log(a, sinal, stringB);
      }
    }
  });
}
