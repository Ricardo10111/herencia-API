const Info = require('../models/info.model')
const sendEmail = require('../lib/email')

async function create(info) {
  const newInfo = await Info.create(info)

  try {
    await sendEmail(info)
  } catch (error) {
    console.error('Error al enviar el correo:', error)
  }
  return newInfo
}

async function getAll() {
  const allInfo = await Info.find()
  return allInfo
}

module.exports = { create, getAll }
