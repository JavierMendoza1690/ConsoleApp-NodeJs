// import inquirer from "inquirer";
const inquirer = require('inquirer');
const colors = require('colors');

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "Que desea hacer?",
    choices: ["opt1", "opt2", "opt3"],
  },
];

const mostrarMenu = async () => {
    // console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opción'.green);
    console.log('===========================\n'.green);
   
    const promp = inquirer.createPromptModule();
    const opt = promp(preguntas);
   
    return opt;
  };
   
  module.exports = {
    mostrarMenu
}
