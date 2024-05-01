const currentPlanet = new URLSearchParams(window.location.search).get('planet') ?? 'mercury'
const html = document.documentElement
const URL = './data.json'
let tabIndex = 0
// console.log(html)
// console.log(currentPlanet === 'venus')
// html.classList.add(currentPlanet)

async function addContent() {
    html.classList.add('fade')
    const planetsData = await loadData(URL)
    // console.log(planetsData)
    const currentPlanetData = await getCurrentPlanetData(planetsData)
    await new Promise((resolve, reject) => {
        insertPlanetData(currentPlanetData)
        resolve()
    })
    setTimeout(() => {
        html.classList.remove('fade')
    }, 300)
}
async function loadData(url) {
    const response = await fetch(url)
    // console.log(response)
    const planetsData = await response.json()
    return planetsData
}
function getCurrentPlanetData(json) {
    // console.log(json)
    // console.log(currentPlanet)
    for (const planet of json) {
        // console.log(planet.name)
        if (currentPlanet.toLowerCase() === planet.name.toLowerCase()) {
            return planet
        }
    }
    console.warn(`планету с названием "${currentPlanet}" не найдено`)
    return null
}
function insertPlanetData(planetData) {
    // console.log(planetData)
    if (!planetData) {
        console.error('данные про планету отсутствуют')
        return null
    }
    const planetTitle = document.querySelector('.planet__info-title')
    const planetRotation = document.querySelector('#rotation')
    const planetRevolution = document.querySelector('#revolution')
    const planetRadius = document.querySelector('#radius')
    const planetTemperature = document.querySelector('#temperature')
    console.log(planetTemperature)
    const planetImages = document.querySelector('.planet__images')
    console.log(planetImages)
    const { geology, images, name, overview, radius, revolution, rotation, structure, temperature } = planetData
    // console.log(geology, images, name, overview, radius, revolution, rotation, structure, temperature)
    console.log(temperature)
    console.log(images)
    const imagesKeys = Object.keys(images)
    console.log(imagesKeys)
    imagesKeys.forEach((image, i) => {
        const img = document.createElement('img')
        img.src = `${images[image]}`
        img.alt = `${name} ${image}`
        // console.log(img)
        if (i === tabIndex) {
            img.classList.add('active')

        }
        planetImages.append(img)
    });
    const [overviewKeys, structureKeys, geologyKeys] = [overview, structure, geology].map(key => Object.values(key))
    console.log(overviewKeys, structureKeys, geologyKeys)

    const planetInfo = document.querySelector('.planet-info')
    console.log([overviewKeys, structureKeys, geologyKeys])
    const testArray = [overviewKeys, structureKeys, geologyKeys]
    testArray.forEach((key, i) => {
        const div = document.createElement('div')
        div.classList.add('planet-info__body')
        div.innerHTML = `
        <p class="planet-info__text">${key[0]}</p>
        <p class="planet-info__source">
          <span>Source :</span> 
          <a href="${key[1]}" class="planet-info__source-link">Wikipedia</a>
        </p>
        `
        if (i === tabIndex) { div.classList.add('active') }
        planetInfo.append(div)
    })




    html.classList.add(currentPlanet)
    let title = document.querySelector('.planet__info-title')
    title.textContent = name
    planetRotation.textContent = rotation
    planetRevolution.textContent = revolution
    planetRadius.textContent = radius
    planetTemperature.textContent = temperature

}
const planetButtons = document.querySelectorAll('.planet__button')
planetButtons.forEach((button, i) => {
    if (i === 0) {
        button.classList.add('active')
    }
    button.addEventListener('click', () => {
        tabIndex = i
        changePlanetInfo()
    })
});
function changePlanetInfo() {
    let planetInfoBodies = document.querySelectorAll('.planet-info__body')
    let planetImages = document.querySelectorAll('.planet__images img')

    planetInfoBodies.forEach((body, i) => {
        if (tabIndex === i) {
            body.classList.add('active')
        } else {
            body.classList.remove('active')
        }
    });
    planetButtons.forEach((button, i) => {
        if (tabIndex === i) {
            button.classList.add('active')
        } else {
            button.classList.remove('active')
        }
    });
    planetImages.forEach((image, i) => {
        if (tabIndex === i) {
            image.classList.add('active')
            if (tabIndex === 2) {
                planetImages[0].classList.add('active')
                image.classList.add('additional')
            }
        } else {
            image.classList.remove('active')
        }
    });
}
addContent()