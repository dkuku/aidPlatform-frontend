import axios from 'axios'

const url = process.env.REACT_APP_API

const backend = axios.create({
  baseURL: url,
  timeout: 10000,
})

export default backend

export * from './markers'
export * from './user'
export * from './stats'
export * from './modal'
export * from './mapCoords'
export * from './localStorage'
export * from './filters'
export * from './conversations'
export * from './api'
export * from './variables'