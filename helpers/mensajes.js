const colors = require('colors');

const mostrarMenu = ()=>{

    console.clear();
    console.log('=========================='.gray);
    console.log('   SELECCIONE UNA OPCION'.green);
    console.log('==========================\n'.gray);

    console.log(`${'1'.cyan}.-Crear Tarea`);
    console.log(`${'2'.cyan}.-Listar Tareas`);
    console.log(`${'3'.cyan}.-Listar Tareas Completadas`);
    console.log(`${'4'.cyan}.-Listar Tareas Pendientes`);
    console.log(`${'5'.cyan}.-Compleatar Tarea(s)`);
    console.log(`${'6'.cyan}.-Borrar Tarea(s)`);
    console.log(`${'0'.cyan}.-Salir \n`);

    

}

module.exports = {
    mostrarMenu
}