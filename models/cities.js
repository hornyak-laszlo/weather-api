const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citiesSchema = new Schema({
  _id: {
    type: Number
  },
  name: {
    type: String
  },
  country: {
    type: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  }
})

citiesSchema.index({ location: '2dsphere' })
module.exports = mongoose.model('Cities', citiesSchema)
