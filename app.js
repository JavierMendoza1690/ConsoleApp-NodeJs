const colors = require('colors');
const  { mostrarMenu } = require('./helpers/inquirer.js');



const main = async()=>{
    console.clear();
    console.log('Hola Mundo');

    let opt = '';

    do{
        opt = await mostrarMenu();
        console.log({opt});

    }while( opt !=='0');


   

    
}

main();