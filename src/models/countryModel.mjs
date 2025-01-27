
export class CountryModel {
    constructor(data) {
      // Información básica
      this.name = {
        common: data.name.common,
        official: data.name.official,
        nativeName: data.name.nativeName || {}
      };
  
      this.independent= data.independent;
      this.unMember= data.unMember;
      this.status= data.status;
      this.currencies= data.currencies || {};
      this.capital= data.capital || [];
      this.region= data.region;
      this.subregion= data.subregion;
      this.languages= data.languages ;
      this.latLng = data.latlng;
      this.landlocked= data.landlocked;
      this.borders= data.borders || [];
      this.area= data.area;
      this.flag= data.flag;
      this.maps= data.maps ;
      this.population= data.population;
      this.gini= data.gini;
      this.fifa= data.fifa;
      this.timezones= data.timezones;
      this.continent= data.continent;
      this.flags= data.flags;
      this.startOfWeek= data.startOfWeek;
      this.capitalInfo= data.capitalInfo;
  
    }
  
    // Método estático para transformar datos de la API
    static fromAPI(apiCountries) {
      return apiCountries.map(countryData => new CountryModel(countryData));
    }
  
    // Método para obtener información resumida
    getSummary() {
      return {
        name: this.name.common,
        region: this.geography.region,
        population: this.population,
        flag: this.symbols.flag
      };
    }
  
    // Método para verificar si dos países son iguales
    equals(otherCountry) {
      return this.contact.cca3 === otherCountry.contact.cca3;
    }
  
    // Método para encontrar países por región
    static findByRegion(countries, region) {
      return countries.filter(country => country.region === region);
    }
  
    static findSpanishSpeakingCountries(countries) {
      return countries.filter(country => {
        // Si languages es undefined, retorna false
        if (!country.languages) return false;
  
        // Convierte los lenguajes a un array y busca los países de habla hispana
        const languagesArray = Object.values(country.languages);
  
        // Comprueba si alguno de los lenguajes es español
        return languagesArray.some(lang =>
          lang.toLowerCase().includes('spanish')
        );
      });
    }
  
    // Método para ordenar países por población
    static sortByPopulation(countries, ascending = false) {
      return countries.sort((a, b) =>
        ascending
          ? a.demographics.population - b.demographics.population
          : b.demographics.population - a.demographics.population
      );
    }
  }
  
  