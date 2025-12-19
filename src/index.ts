import express from 'express'
import type {Express} from 'express'

const PORT = 8000
const app:Express = express()

type Pet = {
  name: string,
  species: string,
  adopted: boolean,
  age: number
}

const pet:Pet = {
  name: "Rubik",
  species: "Cat",
  adopted: true,
  age: 3
}

app.get('/', (req, res)=> {
  res.json(pet)
})

app.listen(PORT, ():void =>{
  console.log("Listening on port: ", PORT)
})