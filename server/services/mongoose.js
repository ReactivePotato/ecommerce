import mongoose from 'mongoose'
import config from '../config'

mongoose.connection.on('connected', () => {
  console.log('DB is connected')
})

mongoose.connection.on('error', (err) => {
  console.log(`Cannot connect to DB ${err}`)
  process.exit(1)
})

exports.connect = async(mongoURL=config.mongoURL) => {
  mongoose.connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  return mongoose.connection
}