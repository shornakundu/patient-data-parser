// Importing modules 
const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');

app.set("view engine", "ejs"); //Setting view engine to ejs
app.use(express.static(__dirname + "/public")); //Serve public directory for static files 
app.use('/', router); //Initialize router 

app.listen(process.env.port || 3000); //Listen at local host port 3000
console.log("Listening at port 3000");

router.get('/', function (req, res) {
    // Read JSON file 
    fs.readFile('./patient.json', 'utf-8', (err, patient_json) => {
        if (err) {
            console.log(err) //Log error if there is an error reading the file 
        } else {
            const patient = JSON.parse(patient_json); //Parse JSON file data to convert into a Javascript object

            //Extract values for patient full name, gender, organization, number of conditions and list of conditions
            let first_name = patient["name"]["given"];
            let last_name = patient["name"]["family"];
            let gender = patient["gender"];
            let organization = patient["managingOrganization"]["display"];
            let conditions = patient["conditions"];
            let num_conditions = conditions.length;

            //Render page with patient data 
            res.render("index", {
                first_name: first_name,
                last_name: last_name,
                gender: gender,
                organization: organization,
                conditions: conditions,
                num_conditions: num_conditions
            });
        }
    });
});





