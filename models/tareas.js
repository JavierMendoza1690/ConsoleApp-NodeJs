const { writeFileSync, readFileSync, existsSync } = require("node:fs");
const Tarea = require("./tarea");
const { leerDB } = require("../helpers/guardarArchivo");
const colors = require("colors");

class Tareas {
  _listado = {};

  // RETORNA UN ARREGLO CON CON LA INFORMACION DE LAS TAREAS ACTUALES ESTÉN O NO PENDIENTES
  get listadoArr() {
    const listado = [];

    // Object.keys(objeto) retorna un arreglo con las llaves del objeto
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  // ELIMINA LA TAREA QUE SE ENVIE POR ID
  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  // CARGA TAREAS QUE EXISTEN EL EL ARCHIVO JSON (BASE DE DATOS)
  cargarTareasFromArray(arrayTareas = []) {
    arrayTareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  //   agregar tarea en el listado

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    // crea un array con las llaves del objeto listado
    const arrayLlaves = Object.keys(this._listado);
    console.log();

    arrayLlaves.forEach((key, i) => {
      let idx = `${i + 1}.`.green;
      let descripcion = this._listado[key].desc;

      let estado = this._listado[key].completadoEn
        ? "Completado".green
        : "Pendiente".red;

      console.log(`${idx} ${descripcion} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    // crea un array con las llaves del objeto listado
    const arrayLlaves = Object.keys(this._listado);
    let contador = 0;
    console.log();

    arrayLlaves.forEach((key) => {
      let descripcion = this._listado[key].desc;

      let estado = this._listado[key].completadoEn
        ? "Completado".green
        : "Pendiente".red;

      let fechaCompletada = this._listado[key].completadoEn;

      if (completadas && estado == "Completado".green) {
        contador++;
        console.log(
          `${
            (contador.toString() + ".").green
          } ${descripcion} :: ${fechaCompletada.green}`
        );
      } else if (!completadas && estado == "Pendiente".red) {
        contador++;
        console.log(
          `${(contador.toString() + ".").red} ${descripcion} :: ${estado}`
        );
      }
    });
  }

  toggleCompletadas = (ids = []) => {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach(tarea =>{
      
      if(!ids.includes(tarea.id)){
        const tareaAux = this._listado[tarea.id];
        tareaAux.completadoEn=null;
      }

    })
  };
}

module.exports = Tareas;
