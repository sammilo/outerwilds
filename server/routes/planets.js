import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
// import planetData from '../data/planets.js'
import PlanetsController from '../controllers/planets.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Route to get all planets
router.get('/', PlanetsController.getPlanets)

// // Route to get all planets, using static data from planets.js
// router.get('/', (req, res) => {
//   res.status(200).json(planetData)
// })

router.get('/:planetId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/planet.html'))
})

export default router