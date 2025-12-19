import express from 'express'
import type {Express} from 'express'

const PORT = 8000
const app:Express = express()

type Pet = {
  name: string,
  species: string,
  adopted: boolean,
  age: number
}[]  //here we are declaring that this type Pet is an array of object

const pets:Pet = [{
  name: "Rubik",
  species: "Cat",
  adopted: true,
  age: 3
},{
   name: "Juby",
  species: "Dog",
  adopted: true,
  age: 2
}]

app.get('/', (req, res)=> {
  res.json(pets)
})

app.listen(PORT, ():void =>{
  console.log("Listening on port: ", PORT)
})