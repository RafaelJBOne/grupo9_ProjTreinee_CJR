var nome1 = 'Fernando'
var numero1 = 29

let nome2 = 'Enzo'
let numero2 = '12'

var --> Sobrescreve o valor da variável (no escopo global)

let --> Define o valor da variável apenas no escopo local

const possuiFaculdade = True (não pode ser mudado)

{
''''''''''''''''''''
''''''''''''''''''''
''''''''''''''''''''
}

Obs: tudo que for definido dentro das chaves não roda no escopo global do programa

TIPO DE DADOS:

let s = 'string';	String
let n = 10;		Number
let b = true;		Boolean
let nulo = null;	Null
let indefinido;		Undefined
let o = {};		Object (Dicionário de Python)
let sym = Symbol()	Symbol ()

typeof variável 	Retorna o tipo de dado da variável


OPERADORES BÁSICOS:

soma: +
subtracao: -
multiplicacao: *
divisao: /
expoente: **
modulo/resto: % --> PODE DAR NEGATIVO (-12 % 5 = -2)

let num = 5
++num
num = 6

let num = 5
--num
num = 4


let x = 5
x += 10 // 15
x -= 10 // 5
x *= 10 // 50
x /= 10 // 5
x %= 10 // 5
x **= 10 // 9765625

3 == '3' // True
3 != '3' // True

3 === '3' // False --> Os operandos têm que ser iguais e do mesmo tipo
3 !== '3' // True --> Os operandos não sejam iguais e/ou não sejam do mesmo tipo


true && true // True (AND lógico)
true || true // True (OR lógico)
!true // False (not True = False)

idade = 23

idade >= 18 ? 'Maior de Idade' : 'Menor de idade' // Maior de Idade --> (condicao) ? true : false


CONCATENAÇÃO:

nome = 'Fernando'
sobrenome = 'Sardinha'

nome + ' ' + sobrenome // Fernando Sardinha


CONDICIONAIS:

if condição_1 {
   ação_1
} else if condição_2 {
   ação_2
} else {
   ação_3
}



for (let i = 0; i < 5; i++) {
    ação
}



while (condição) {
    ação	    -->	Verifica e depois executa
}



do {
    ação	    -->	Executa e depois verifica
} while (condição)



for (let i = 0; i < 1; i++) {
    if (i === 5) {
	break;
    }
    console.log(i)
}

LOG: 0 1 2 3 4


for (let i = 0; i < 1; i++) {
    if (i === 5) {
	continue;
    }
    console.log(i)
}

LOG: 0 1 2 3 4 6 7 8 9


switch ('a') {
    case 'a':
	console.log('a');
	break;
    case 'b':
	console.log('b');
	break;
    default:
	console.log('default');
}


FUNÇÕES:

function soma (a, b, ...) {
    console.log('Somando...', a, b);
    return a + b;
}

// Função anônima (sem nome)
const sub = funcition (a, b) {
    console.log('Subtraindo...', a, b);
    return a - b;
}

// Arrow function
const mult = (a, b) => {
    console.log('Multiplicando...', a, b);
    return a * b;
}

OBJETOS:

// Object Literal
const pessoa = {
    nome: 'Fernando',
    sobrenome: 'Sardinha',
    idade = 30,
    fala() {
	console.log('A minha idade atual é ${this.idade}.');
    },
    aumentaIdade() {
	this.idade++;
    },
};

console.log(pessoa.nome)

// Array

const pessoas = []

function criaPessoa(nome, sobrenome, idade) {
   return {
	nome,
	sobrenome,
	idade,
	fala() {
	    console.log('A minha idade atual é ${this.idade}.');
	},
	aumenta_idade() {
	    this.idade++;
	},
    };
}

const pessoa1 = criaPessoa('Fernanda', 'Sardinha', 30);
const pessoa2 = criaPessoa('Ramon', 'Dino', 25);
const pessoa3 = criaPessoa('Renato', 'Cariri', 20);

pessoas.push(pessoa1);
pessoas.push(pessoa2);
pessoas.push(pessoa3);

pessoas.forEach((pessoa) => {
    pessoa.fala();
});


// JAVASCRIPT ASSÍNCRONO:

// Callback:

function funcaoCallback() {
    console.log('Função Callback');
}

setTimeout(funcaoCallback, 5000);

// Promise:

const promessa = new Promise((resolve, reject) => {
    let condicao = true;
    if (condicao) {
        setTimeout(() => {
            resolve({nome: 'Fernando', idade:25});
        }, 3000);
    } else {
        reject(Error("Um erro ocorreu na promise"));
    }
});

promessa.then((resolucao) => {          // IMPRIME A PROMISE DEPOIS -> Processamento Assíncrono
    console.log(resolucao);
}).catch((rejeitada) => {               // TRATAMENTO DE UM ERRO
    console.log('deu erro aqui')
})

console.log('rodou aqui')

// Async/Await:

const promessa = new Promise((resolve, reject) => {
    let condicao = true;
    if (condicao) {
        setTimeout(() => {
            resolve({nome: 'Fernando', idade:25});
        }, 3000);
    } else {
        reject(Error("Um erro ocorreu na promise"));
    }
});

async function funcaoAssincrona() {
    try {
        res = await promessa;               // IMPRIME A PROMISE DEPOIS -> Processamento Assíncrono
        console.log(res);
    } catch (error) {                       // TRATAMENTO DE UM ERRO
        console.log('deu erro aqui');
    }
}

funcaoAssincrona();
console.log('rodou aqui')