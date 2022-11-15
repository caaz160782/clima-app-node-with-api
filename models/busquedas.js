const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

class Busquedas {
  historial = [];
  dbPath = './db/database.json';
  constructor() {
    // TODO leer DB si existe
    this.leerDB();
  }

  get paramsMapBox() {
    return {
       'access_token': process.env.MAPBOX_KEY,
       'proximity': 'ip',
       'language': 'es',
       'limit':5       
    }
  }

  get historialCapitalizado() {
     return this.historial.map(lugar => {
      let palabras = lugar.split(' ');
      palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
      return palabras.join(' ')
    });
  }

  async ciudad(lugar = '') {
    // peticion htpp
    try {
      const instance = axios.create({
           baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
           params: this.paramsMapBox        
      });
      const res = await instance.get();
      return res.data.features.map(lugar => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1]
      }));
      
    } catch (error) {
      return [];// retorn los lugares  
    }
  }

  async climaLugar(lat,lon) {
    try {
       const params={
              'appid': process.env.OPENWEATHER_KEY,
                lat,
                lon,
              'lang': 'es',       
              'units':'metric'
        } 
       const instance = axios.create({
        baseURL:"https://api.openweathermap.org/data/2.5/weather",
       //params :{...this.paramsWeather,lat,lon } 
        params
      })
      const res = await instance.get();
      const {weather,main } = res.data;
      return {
           desc:weather[0].description,
           min: main.temp_min,
           max: main.temp_max,
           temp:main.temp       
       }

    } catch (error) {
      console.log(error)
      return [];
    }
  }

  agregarHistorial(lugar) {
    //prevenis duplicadosgit 
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }
    this.historial = this.historial.splice(0, 5);
    this.historial.unshift(lugar.toLocaleLowerCase());    
    this.guardarDB();
  }

  guardarDB() {
    const payload = { historial: this.historial }

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    if (!fs.existsSync(this.dbPath)) {
    return ;
   }
  const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
  const data= JSON.parse(info)  
    this.historial = data.historial;    
}


}

module.exports = Busquedas;