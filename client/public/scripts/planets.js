const renderPlanets = async () => {
    const response = await fetch('/planets')
    const data = await response.json()

    const mainContent = document.getElementById('main-content')
    
    if (data) {
        data.map(planet => {
            const card = document.createElement('div')
            card.classList.add('card')

            const topContainer = document.createElement('div')
            topContainer.classList.add('top-container')

            const bottomContainer = document.createElement('div')
            bottomContainer.classList.add('bottom-container')

            topContainer.style.backgroundImage = `url(${planet.image})`
        
            const name = document.createElement('h3')
            name.textContent = planet.name
            bottomContainer.appendChild(name)

            const description = document.createElement('p')
            description.textContent = 'Description: ' +planet.description
            bottomContainer.appendChild(description)

            const gravity = document.createElement('p')
            gravity.textContent = 'Gravity: ' + planet.gravity
            bottomContainer.appendChild(gravity)

            const danger = document.createElement('p')
            danger.textContent = 'Danger Level: ' + planet.danger
            bottomContainer.appendChild(danger)

            const link = document.createElement('a')
            link.textContent = 'Learn More >'
            link.setAttribute('role', 'button')
            link.href = `/planet.html?id=${planet.id}`
            bottomContainer.appendChild(link)

            card.appendChild(topContainer)
            card.appendChild(bottomContainer)

            mainContent.appendChild(card)
        })
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Planets to Display 😞'
        mainContent.appendChild(message)
    }
}

const renderPlanet = async () => {
    const requestedID = parseInt(new URLSearchParams(window.location.search).get('id'))
    const response = await fetch('/planets')
    const data = await response.json()

    const planetContent = document.getElementById('planet-content')
    const planet = data.find(p => p.id === requestedID)

    if (planet) {
        document.title = planet.name
        document.getElementById('name').textContent = planet.name
        document.getElementById('description').textContent = planet.description
        document.getElementById('gravity').textContent = 'Gravity: ' + planet.gravity
        document.getElementById('danger').textContent = 'Danger Level: ' + planet.danger
        document.getElementById('image').src = planet.image
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'Planet Not Found 😞'
        planetContent.appendChild(message)
    }
}

if (document.getElementById('main-content')) {
    renderPlanets()
} else if (document.getElementById('planet-content')) {
    renderPlanet()
}