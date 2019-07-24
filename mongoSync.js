const cities = require('./city.list.json')
const mongoose = require('mongoose')
const { MONGO_URL } = require('./config')

mongoose.connect(MONGO_URL, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false })
const db = mongoose.connection
db.on('error', (err) => {
  console.error('Mongoose connection error', err)
  process.exit(1)
})
db.once('open', async () => {
  try {
    console.log('Mongoose connected successfully! Start syncing...')
    const Cities = require('./models/cities')
    const createCity = c => (new Cities({
      _id: c.id,
      name: c.name,
      country: c.country,
      location: {
        type: 'Point',
        coordinates: [c.coord.lon, c.coord.lat]
      },
      lat: c.coord.lat,
      lng: c.coord.lon
    }))
    const allCount = cities.length
    let savedCount = 0
    let errorCount = 0
    for (let index = 0; index < allCount; index++) {
      const city = createCity(cities[+index])
      try {
        await city.save()
        savedCount++
        if (savedCount % 100 === 0) {
          console.log(`Saved: ${savedCount} from ${allCount}, Failed: ${errorCount}`)
        }
      } catch (err) {
        console.error(`Failed to save city: ${city._id} Error: ${err}`)
        errorCount++
        continue
      }
    }
    console.log(`Sync completed! All: ${allCount}, Saved: ${savedCount}, Failed: ${errorCount}`)
    db.close()
    process.exit(0)
  } catch (err) {
    console.error(`Sync failed! ${err}`)
    db.close()
    process.exit(1)
  }
})
