// Will be run by the script `npm run seed`
// This will seed our database with a bunch of pets
// We can modify this later after building out our API

const mongoose = require('mongoose')
const Pet = require('./pet')
const db = require('../../config/db')

const startPets = [
    { name: 'Sparky', type: 'dog', age: 2, adoptable: true},
    { name: 'Leroy', type: 'dog', age: 10, adoptable: true},
    { name: 'Biscuits', type: 'cat', age: 3, adoptable: true},
    { name: 'Hulk Hogan', type: 'hamster', age: 1, adoptable: true}
]

// Connect to db
mongoose.connect(db, {
    useNewUrlParser: true
})
// remove all pets
    .then(() => {
        Pet.deleteMany()
            .then(deletedPets => {
                console.log('the deleted pets:', deletedPets)
                // now add pets to db
                Pet.create(startPets)
                    .then(newPets => {
                        console.log('new pets:', newPets)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })
// add the start pets

//  always close connection, whether it's a success or failure