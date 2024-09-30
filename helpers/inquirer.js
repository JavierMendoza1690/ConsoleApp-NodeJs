// import inquirer from "inquirer";
const inquirer = require("inquirer");
const colors = require("colors");
const { validate } = require("uuid");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1".magenta}. Crear Tarea`,
      },
      {
        value: "2",
        name: `${"2".magenta}. Listar Tarea`,
      },
      {
        value: "3",
        name: `${"3".magenta}. Listar Tareas Completadas`,
      },
      {
        value: "4",
        name: `${"4".magenta}. Listar Tareas Pendientes`,
      },
      {
        value: "5",
        name: `${"5".magenta}. Completar Tarea`,
      },
      {
        value: "6",
        name: `${"6".magenta}. Borrar Tarea`,
      },
      {
        value: "0",
        name: "0. Salir",
      },
    ],
  },
];

// GENERA LISTA TAREAS A BORRAR, RECIBE COMO ARGUMENTO TAREAS.LIST_ARRAY
const listadoTareasBorrar = async (tareas = []) => {

  // map retorna un nuevo arreglo con lo que se retorne en cada iteracion
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + 'Cancelar',
  })

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: 'Borrar',
      choices: choices,
    },
  ];



  const promp = inquirer.createPromptModule();
  const { id } = await promp(preguntas);
  
  return id;
};

// CONFIGURACION MENSAJE PRESIONE ENTER PARA CONTINUAR
const input = [
  {
    type: "input",
    name: "pausa",
    message: colors.yellow(`Presione ${"Enter".green} Para continuar`),
  },
];

// IMPRIME TODAS LAS OPCIONES DEL MENU
const mostrarMenu = async () => {
  console.clear();
  console.log("===========================".green);
  console.log("   Seleccione una opción".white);
  console.log("===========================\n".green);

  const promp = inquirer.createPromptModule();
  const { opcion } = await promp(preguntas);

  return opcion;
};

// PAUSA EL PROGRAMA HASTA PRESIONAR ENTER(DEPENDE DE LA FUNCION INPUT)
const pausaInput = async () => {
  const promp = inquirer.createPromptModule();
  console.log("\n");
  const { pausa } = await promp(input);
  return pausa;
};

//FUNCION REUSABLE MUESTRA EL MENSAJE ENVIADO COMO ARGUMENTO EN PANTALLA
const leerInput = async (mensaje) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message: mensaje,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const promp = inquirer.createPromptModule();
  const { desc } = await promp(question);

  return desc;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const promp = inquirer.createPromptModule();
  const { ok } = await promp(question);

  return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {

  // map retorna un nuevo arreglo con lo que se retorne en cada iteracion
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: (tarea.completadoEn)? true : false
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: 'Seleccione',
      choices: choices,
    },
  ];



  const promp = inquirer.createPromptModule();
  const { ids } = await promp(pregunta);
  
  
  return ids;
};


module.exports = {
  mostrarMenu,
  pausaInput,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
};
