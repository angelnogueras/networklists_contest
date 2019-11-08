const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const eg = require('./EdgeGrid')

const app = express()
const port = 4000

/* Loging */
app.use(morgan('combined'))

/* Static content folder */
app.use(express.static('public'))

/* Remove X-Powered-By response header */
app.disable('x-powered-by')

/**
 * NL endpoint
 */
app.get('/nl_ip', (req, res) => {
  call_nl(process.env.NL_IP, (data)=>{
    res.json(data)
  })
})

app.get('/nl_geo', (req, res) => {
  call_nl(process.env.NL_GEO, (data)=>{
    res.json(data)
  })
})

/**
 * Call NL API
 */
const call_nl = (netlist_name, callback) => {
  const api_endpoint = `/network-list/v2/network-lists/${netlist_name}`

  eg.auth({
    path: api_endpoint,
    method: 'GET',
    headers: {
      'Content-Type': "application/json"
    },
    body: ''
  })

  eg.send( (error, response, body) => {
    // Error handling to avoid connection issues
    try {
      let res = []
      const data = JSON.parse(body)
      if (data.list) {
        res = data.list
      }
      console.log(res)
      callback(res)
    } 
    catch (error) {
      console.error(error)
      callback([])
    }
  })
}

/* Start server */
app.listen(port, () =>
  console.log('\x1b[33m%s\x1b[0m', `Report console App listening on port ${port}!`)
)
