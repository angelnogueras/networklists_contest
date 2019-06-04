const dotenv = require('dotenv').config()
const path = require('path')
const homedir = require('os').homedir()
const Edgegrid = require('edgegrid')


const eg = new Edgegrid({
  path: path.join(homedir, '.edgerc'),
  section: process.env.SECTION
})

module.exports = eg
