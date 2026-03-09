import {pool} from './database.js'
import './dotenv.js'
import planetData from '../data/planets.js'


// TODO if there is AN ERROR CHECK HERE FIRST BECAUSE YOU USED FLOAT FOR GRAVITY)
// TODO images conflict because u have them locally but yer using a database

const createPlanetsTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS planets;

    CREATE TABLE IF NOT EXISTS planets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        gravity FLOAT NOT NULL,
        danger VARCHAR(255) NOT NULL
    )
`

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 Table created successfully')
    }
    catch (err) {
        console.error('⚠️ Error creating planets table', err)
    }
}

const seedPlanetsTable = async () => {
    await createPlanetsTable()

    planetData.forEach((planet) => {
        const insertQuery = {
            text: 'INSERT INTO planets (name, description, image, gravity, danger) VALUES ($1, $2, $3, $4, $5)',
        }

        const values = [
            planet.name,
            planet.description,
            planet.image,
            planet.gravity,
            planet.danger
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ Error inserting planet data', err)
                return
            }

            console.log(`✅ Planet ${planet.name} inserted successfully!`)
        })
    })
}

seedPlanetsTable()