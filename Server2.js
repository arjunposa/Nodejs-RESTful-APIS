const express = require("express")
const app = express()
const fs = require("fs")
const {join} = require("path")

//express middlewear for the reading json data
app.use(express.json())
//array of all users presented in the Data.json file
let Users = JSON.parse(fs.readFileSync(join(__dirname,"Data.json"),"utf-8"))

//get-user-request
app.get("/api/User", (req,res)=>{
  res.json(Users)
})

//post-user-request
app.post("/api/User", (req,res)=>{
  const newUser = req.body
  Users.push(newUser)
  fs.writeFile(join(__dirname,"Data.json"),JSON.stringify(Users), (err)=>{
  res.json(newUser)
  })
})

//patch-user-request 
app.patch("/api/User/:id",(req,res)=>{
  let id = req.params.id * 1
  let updateData = req.body
  let userToUpdate = Users.find(element => element.id === id)
  if(!userToUpdate) {
    return res.json({message:"no such user is founded"})
}
  Object.assign(userToUpdate,updateData)
  fs.writeFile(join(__dirname,"Data.json"),JSON.stringify(Users), (err)=>{
    res.json(userToUpdate)
  })
})

//delete-user-request
app.delete("/api/User/:id", (req,res)=>{
    let id = req.params.id * 1
    let userToDelete = Users.find(element => element.id === id)
    if(!userToDelete) {
        return res.json({message:"no such user is founded"})
    }
    Users.splice(userToDelete, 1)
    fs.writeFile(join(__dirname,"Data.json"),JSON.stringify(Users), (err)=>{
        res.json({message:"Data deleted"})
      })
})

app.listen(2023,"127.0.0.1",()=>{
    console.log("server started at 2023 port");
})
