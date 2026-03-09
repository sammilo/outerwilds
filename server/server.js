import express from 'express'
import './config/dotenv.js'
import planetsRouter from './routes/planets.js'

// Initialize Express app
const app = express()

// Serve static files from the 'public' directory
app.use('/public', express.static('./public'))
app.use('/scripts', express.static('./public/scripts'))

app.use('/planets', planetsRouter)

// Check if the server is running
app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">The Planets</h1>')
})

// Start the server on the port specified in the environment variables or port 3001 
const PORT = process.env.PORT || 3001
    
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})