const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
morgan.token('number', (req) =>{
    if(req.body.name ===undefined) return""
    return `{name: ${req.body.name}, number: ${req.body.number}}`
})

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :number'))
let people =[ 
    {
        id: 1,
        name: "Testi Testisson",
        number: "69696969"
    },
    {
        id: 2,
        name: "Testi Testissonein",
        number: "6942069"
    },
    {
        id: 3,
        name: "Jacques de Matin",
        number: "22-22-22-22"
    },
    {
        id: 4,
        name: "Jacques du Matin",
        number: "22-22-22-22"
    }, 
    {
        id: 5,
        name: "Jacques de Journee",
        number: "22-22-22-22"
    }
]
  
  app.get('/api/persons', (request, response) => {
      response.json(people)
    })


app.get('/info', (request, response) => {
    const d = new Date()
        response.send('Phonebook has info for '+ people.length +' people <br>'+ d.getUTCDate())
      })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = people.find(person => person.id === id)
    console.log(person)
    
    if (person) {
        response.json(person)
        } else {
        response.status(404).end()
        }
    })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    people = people.filter(person => person.id !== id)  
    response.status(204).end()
})


app.post('/api/persons', (request, response) => {
        const body = request.body
        if (!body.name) {
          return response.status(400).json({ 
            error: 'name missing' 
          })
        }
        if (!body.number) {
            return response.status(400).json({ 
              error: 'number missing' 
            })
          }

          if(people.find(person => person.name === body.name)){
            console.log("Hello world")
            return response.status(400).json({ 
                error: 'Name must be unique' 
              })
          }
        const person = {
          id: parseInt(Math.random()*10000),
          name: body.name,
          number: body.number || false,
        
        }
      
        people = people.concat(person)
      
        response.json(person)
      })
      
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})