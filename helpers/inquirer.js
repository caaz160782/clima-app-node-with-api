const inquirer = require('inquirer');
require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      {
      value:1 ,
      name:`${'1'.magenta}. Buscar ciudad`
      },
      {
      value:2,
      name:`${'2'.magenta}. Historial`
      },
      {
      value:3,
      name:`${'3'.random}. Salir`
      },

    ]
  }
];

const inquirerMenu = async () => {
    console.clear();
    console.log("**************************".green);
    console.log(' Seleccione una opción '.yellow);
    console.log('**************************\n'.green);
    const { opcion } = await inquirer.prompt(preguntas);
   return opcion;
}

const pausa = async () => {
  const question = [{
    type: 'input',
    name: 'enter',
    message: `Presione ${'ENTER'.blue} para continuar`,
  }];
  console.log(`\n`);
  await inquirer.prompt(question);

}

const leerInput = async (msg) => {
    const question = [{
    type: 'input',
    name: 'desc',
      message: msg,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
    }
    }];
  
  console.log(`\n`);
  const quest = await inquirer.prompt(question);
  return quest.desc;  
}

const listarLugares = async (lugares =[]) => {
  const choices = lugares.map((lugar, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`
    }
  })

  choices.unshift({
    value: '0',
    name: '0.'.green + 'Cancelar'
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Seleccione lugar:',
      choices
    }]
  
  const { id } = await inquirer.prompt(preguntas)
  return id
}

const confirmar =async(message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];
    const { ok } = await inquirer.prompt(question)
  return ok 
}

const mostrarListadoCheck = async (tareas) => {
 
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked:(tarea.completadoEn)? true:false
    }
  })

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices
    }]
  
  const { ids } = await inquirer.prompt(pregunta)
  return ids
}



module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
  confirmar,
  mostrarListadoCheck
}