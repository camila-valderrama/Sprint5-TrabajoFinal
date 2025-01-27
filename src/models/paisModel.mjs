import mongoose from "mongoose"

// Esquema para nombres nativos
const NativeNameSchema = new mongoose.Schema({
  common: { type: String },
  official: { type: String }
}, { _id: false });

// Esquema para nombres
const NameSchema = new mongoose.Schema({
  common: { type: String },
  official: { type: String },
  nativeName: {
    type: Map,
    of: NativeNameSchema
  }
}, { _id: false });

// Esquema para monedas
const CurrencySchema = new mongoose.Schema({
  name: { type: String },
  symbol: { type: String }
}, { _id: false });

// Esquema para información de mapas
const MapsSchema = new mongoose.Schema({
  googleMaps: { type: String },
  openStreetMaps: { type: String }
}, { _id: false });

// Esquema para información de capital
const CapitalInfoSchema = new mongoose.Schema({
  latlng: { type: [Number] }
}, { _id: false });


//// ESQUEMA PRINCIPAL DE PAIS
const PaisSchema = new mongoose.Schema({
  creador: {type: String, default:'Camila Valderrama'},
  name: { type: NameSchema, required: true },
  independent: { type: Boolean },
  unMember: { type: Boolean },
  status: { type: String },
  currencies: {
    type: Map,
    of: CurrencySchema
  },
  capital: { type: [String] },
  region: { type: String },
  subregion: { type: String },
  languages: {
    type: Map,
    of: String
  },
  latLng: { type: [Number] },
  landlocked: { type: Boolean },
  borders: { type: [String] },
  area: { type: Number },
  flag: { type: String },
  maps: { type: MapsSchema },
  population: { type: Number },
  gini: {
    type: Map,
    of: Number
  },
  fifa: { type: String },
  timezones: { type: [String] },
  continent: { type: String },
  flags: {
    png: { type: String },
    svg: { type: String },
    alt: { type: String }
  },
  startOfWeek: { type: String },
  capitalInfo: { type: CapitalInfoSchema },

  // Campos de Mongoose
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'Grupo-01' }
)


export default mongoose.model('PaisModel', PaisSchema)