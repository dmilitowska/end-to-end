const app = require("./app")
const dotenv = require("dotenv").config()

const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`server listening on port ${port}`)
})

