import express from 'express'
import path from 'path'
import cors from 'cors'
import sockjs from 'sockjs'

// import { renderToStaticNodeStream } from 'react-dom/server'
// import React from 'react'

import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import mongooseService from './services/mongoose'
import passportJWT from './services/passport'
import passport from 'passport'
import axios from 'axios'
import config from './config'
import Html from '../client/html'
import User from './model/User.model'

const { readFile, writeFile, unlink } = require('fs').promises

require('colors')

mongooseService.connect()

// const user = new User({
//   email: 'test@gmail.com',
//   password: 'abra'
// })
// user.save()

// let Root
// try {
//   // eslint-disable-next-line import/no-unresolved
//   Root = require('../dist/assets/js/ssr/root.bundle').default
// } catch {
//   console.log('SSR not found. Please run "yarn run build:ssr"'.red)
// }

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  passport.initialize(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  cookieParser()
]

passport.use('jwt', passportJWT.jwt)

middleware.forEach((it) => server.use(it))

server.post('/api/v1/auth', async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findAndValidateUser(req.body)
    const payload = { uid: user.id }
    console.log(payload)
    const token = jwt.sign(payload, config.secret, { expiresIn: '1800s' })
    user.password = ''
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

server.get('/api/v1/goods', async (req, res) => {
  await readFile(`${__dirname}/goods.json`, { encoding: 'utf-8' })
    .then((data) => {
      res.json(JSON.parse(data))
    })
    .catch(async () => {
      await axios
        .get(
          'https://raw.githubusercontent.com/ovasylenko/skillcrcuial-ecommerce-test-data/master/data.json'
        )
        .then(async ({ data }) => {
          await writeFile(`${__dirname}/goods.json`, JSON.stringify(data), { encoding: 'utf-8' })
          res.json(JSON.parse(data))
        })
        .catch((err) => console.log(err))
    })
})

server.get('/api/v1/currency', async (req, res) => {
  await axios
    .get('https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,CAD')
    .then(({ data }) => {
      res.json(data)
    })
})

server.delete('/api/v1/logs', async (req, res) => {
  await unlink(`${__dirname}/logs.json`)
  res.json({ status: 'deleted' })
})

server.get('/api/v1/getlogs', async (req, res) => {
  await readFile(`${__dirname}/logs.json`, { encoding: 'utf-8' })
    .then((data) => {
      res.json(JSON.parse(data))
    })
    .catch((err) => err)
})

server.get('/api/v1/test/cookies', (req, res) => {
  console.log(req.cookies)
  res.cookie('serverCookie', 'test', { maxAge: 90000, httpOnly: true })
  res.json({ status: req.cookies })
})

server.post('/api/v1/writelog', (req, res) => {
  readFile(`${__dirname}/logs.json`, { encoding: 'utf-8' }).then((data) => {
    const fileData = JSON.parse(data)
    fileData.push(req.body)
    writeFile(`${__dirname}/logs.json`, JSON.stringify(fileData), { encoding: 'utf-8' })
    res.json(fileData)
  })
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

// const [htmlStart, htmlEnd] = Html({
//   body: 'separator',
//   title: 'Skillcrucial'
// }).split('separator')

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

// server.get('/', (req, res) => {
//   const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
//   res.write(htmlStart)
//   appStream.pipe(res, { end: false })
//   appStream.on('end', () => {
//     res.write(htmlEnd)
//     res.end()
//   })
// })

// server.get('/*', (req, res) => {
//   const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
//   res.write(htmlStart)
//   appStream.pipe(res, { end: false })
//   appStream.on('end', () => {
//     res.write(htmlEnd)
//     res.end()
//   })
// })

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
