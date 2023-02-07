const areaForm = document.querySelector("#area-form")

areaForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const userInput = document.querySelector("#area-input").value
    const getData = async () => {
        try {
            let { data } = await axios.post("http://localhost:4000/area", { area: userInput })
            data = data[0]
            if (data) {
                displayAreaInfo(data)
            } else {
                displayError(`could not find information about ${userInput}`)
            }
        } catch (err) {
            displayError(err)
        }
    }
    getData()
})

function displayAreaInfo(info) {
    document.getElementById("area-info").innerHTML = `
        <p>Agent Code: ${info.agent_code}</p>
        <p>Agent name: ${info.name}</p>
        <p>Phone number: ${info.phone}</p>
      `


    document.getElementById("commission").innerHTML = `
          <p>Commission: ${info.commission}</p>
        `
}

function displayError(error) {

    document.getElementById("area-info").innerHTML = `
        <p>Error: ${error}</p>
      `

}


const registerForm = document.querySelector("#auth-form-register")
registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const userData = {
        username: document.querySelector("#username-input-register").value,
        password: document.querySelector("#password-input-register").value
    }
    console.log(userData)

    const sendRegistration = async () => {
        try {

            const data = await axios.post("http://localhost:4000/register", userData)
            console.log(data)
        } catch (err) {
            console.log(err)

        }
    }
    sendRegistration()
})


const logIn = document.querySelector("#auth-form-login")
logIn.addEventListener("submit", (e) => {
    e.preventDefault()
    const userData = {
        username: document.querySelector("#username-input-login").value,
        password: document.querySelector("#password-input-login").value
    }
    console.log(userData)
    const sendLogIn = async () => {
        try {
            const { data } = await axios.post("http://localhost:4000/login", userData)
            setTokenToLocalStorage(data.token)
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
    sendLogIn()
})

const logOut = document.querySelector("#logout")
logOut.addEventListener("click", (e) => {
    e.preventDefault()
    removeTokenFromLocalStorage()
})



const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem("token", token)
}
const getTokenFromLocalStorage = (token) => {
    return window.localStorage.getItem("token", token)
}
const removeTokenFromLocalStorage = (token) => {
    window.localStorage.removeItem("token", token)
}

const getPayLoad = () => {
    const token = getTokenFromLocalStorage()
    if (!token) return false
    const parts = token.split(".")
    if (parts.length < 3) return false
    return JSON.parse(atob(parts[1]))
}

const userIsAuthenticated = () => {
    const payload = getPayLoad()
    if (!payload) return false
    const now = Math.round(Date.now() / 1000)
    return now < payload.exp
}

