const client = require("./db/connection")
const express = require("express")
const logger = require("./logger")
const cors = require("cors")

const app = express()


//MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(logger)

//ENDPOINTS
app.post("/area/", async(req, res) =>{
    const area = req.body.area
    if(!area){
        res.status(404).json({error: "please enter a valid area"})
        return
    }
    try{
        const result = await client.query("SELECT * FROM agents WHERE area = $1", [area])
        res.send(result.rows)

    }catch(err){
        res.send(err)

    }
})

module.exports = app
