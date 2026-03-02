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
            link.href = `/planets/${planet.id}`
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

const requestedUrl = window.location.href.split('/').pop()
if (requestedUrl) {
    window.location.href = '../404.html'
}
else {
    renderGifts()
}

const renderPLanet = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop())
    const response = await fetch(`/planets/${requestedID}`) // CHECK
    const data = await response.json()

    const planetContent = document.getElementById('planet-content')
    let planet 

    if (planet) {
        planet = data.find(planet => planet.id === requestedID)
        document.querySelector('title').textContent = planet.name
        document.querySelector('description').textContent = planet.description
        document.querySelector('gravity').textContent = 'Gravity: ' + planet.gravity
        document.querySelector('danger').textContent = 'Danger Level: ' + planet.danger
        document.querySelector('planet-image').src = planet.image
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'Planet Not Found 😞'
        planetContent.appendChild(message)
    }
}

renderPLanet()