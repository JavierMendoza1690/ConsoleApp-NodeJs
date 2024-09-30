const colors = require("colors");
const {
  mostrarMenu,
  pausaInput,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer.js");
const Tareas = require("./models/tareas.js");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo.js");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    // imprimiendo el menu
    opt = await mostrarMenu();

    switch (opt) {
      case "1":
        // crear opcion
        const desc = await leerInput("Descripcion: ");
        tareas.crearTarea(desc);

        break;
      case "2":
        tareas.listadoCompleto();

        break;

      case "3": //mostrar tareas completadas
        tareas.listarPendientesCompletadas();
        break;

      case "4": //mostrar tareas pendientes
        tareas.listarPendientesCompletadas(false);
        break;

      case "5": // completado || pendiente
        const ids = await mostrarListadoChecklist(tareas.listadoArr); //llama funcion en inquire
        tareas.toggleCompletadas(ids);
        break;

      case "6": //Borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar(`¿Está seguro?`.yellow);
          if (ok) {
            tareas.borrarTarea(id);
            console.log("\n     Tarea borrada");
          }
        }

        break;
    }

    guardarDB(tareas.listadoArr);
    await pausaInput();
  } while (opt !== "0");
};

main();
