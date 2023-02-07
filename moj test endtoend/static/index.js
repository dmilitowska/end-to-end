const areaForm =document.querySelector("#area-form")

areaForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const userInput = document.querySelector("#area-input").value
    const getData = async ()=>{
        try{
            let {data} = await axios.post("http://localhost:4000/area", {area:userInput})
            data = data[0]
            if(data){
                displayAreaInfo(data)
            }else{
                displayError(`could not find information about ${userInput}`)
            }
        }catch(err){
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
    // Insert the error message into the #country-info div
    document.getElementById("area-info").innerHTML = `
        <p>Error: ${error}</p>
      `
  
    // Clear the #fun-fact div
    // document.getElementById("fun-fact").innerHTML = ""
  }
