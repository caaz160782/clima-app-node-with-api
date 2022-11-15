const Busquedas = require('./models/busquedas');
const { inquirerMenu, pausa, leerInput,listarLugares } = require('./helpers/inquirer');


const main = async() => {
  let opt;
  do {
    opt = await inquirerMenu();    
    const busquedas = new Busquedas();
     switch (opt) {
      case 1:// buscar ciudad
         const lugar = await leerInput('¿Qué ciudad deseas buscar?');
         const lugares = await busquedas.ciudad(lugar);      
         const idLugar = await listarLugares(lugares);
         if (idLugar !== '0') {
           console.clear();
           const lugarSeleccionado = lugares.find(l => l.id === idLugar);
             busquedas.agregarHistorial(lugarSeleccionado.nombre);
           //Muestra Información  del lugar seleccionado
           const climaLugar = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);
           console.log("\n**************************\n".green);
           console.log('Información de la ciudad\n'.yellow);
           console.log('Ciudad:', lugarSeleccionado.nombre);
           console.log('Lat:', lugarSeleccionado.lat);
           console.log('Long:', lugarSeleccionado.lng);
           console.log('Temperatura:', climaLugar.temp);
           console.log('Minima:', climaLugar.min);
           console.log('Maxima:', climaLugar.max);
           console.log('Como esta el clima:', climaLugar.desc);
         }     
      break;
       case 2:
          busquedas.historialCapitalizado.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`)
        })
      break;      
    }    
    if(opt !==3 )await pausa();
  }while(opt !==3)
} 

main();
