const mongoose = require('mongoose')

if(process.argv.length <3){
    console.log("Give password as argument")
    process.exit
}

const password = process.argv[2]

const url = MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length <5){
    Person.find({}).then(result =>{
        console.log("Phonebook")
        result.forEach(data =>console.log(`${data.name} - ${data.number}`))
    })
}
if(process.argv.length ==5){
    const person = new Person({name: process.argv[3],number: process.argv[4]})
    person.save().then(result => {
        console.log("Added to database")
        mongoose.connection.close()
    })
}
