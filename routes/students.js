let express = require('express');
let router = express.Router();
const db = require("./../db");


/**
 * GET /students
 *
 * @return a list of students (extracted from the students table in the database) as JSON
 */
router.get("/students", async function (req, res)
{
    try {
        const listOfAllStudents = await db.getAllStudents();
        console.log("list of students: ", listOfAllStudents);

        //converts to JSON format and returns to client
        res.send(listOfAllStudents);
    }
    catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ "error": "Internal Server Error" });
    }

});


/**
 * GET /students/{id}
 *
 * @return the student with id = {id} (extracted from the students table in the database) as JSON
 *
 * @throws a 404 status code if the student with id = {id} does not exist
 */
router.get("/students/:id", async function (req, res)
{
    try {
        const id = req.params.id;
        console.log("id = ", id);

        const studentWithId = await db.getStudentWithId(id);
        console.log("studentWithId:", studentWithId);

        if (studentWithId == null) {
            console.log("No student with id: " + id + " exists");
            res.status(404).json({"error": "student with id " + id + " not found"});
            return;
        }
        res.send(studentWithId);
    }
    catch (err) {
        console.log("Error:", err.message);
        res.status(500).json({"error": "Internal server error"});
    }
});


/**
 * POST /students
 * with the following form parameters:
 *      firstName
 *      lastName
 *      birthDate (in ISO format: yyyy-mm-dd)
 *
 * The parameters passed in the body of the POST request are used to create a new student.
 * The new student is inserted into the students table in the database.
 *
 * @return the created student (which was inserted into the database), as JSON
 */
router.post("/students", async function (req, res)
{
    try
    {
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const birthDate = req.body.birth_date;

        console.log("first_name        = " + firstName);
        console.log("last_name       = " + lastName);
        console.log("birth_date = " + birthDate);

        if (firstName === undefined)
        {
            res.status(400).json({"error": "bad request: expected parameter 'firstName' is not defined"});
            return;
        }

        if (lastName === undefined)
        {
            res.status(400).json({"error": "bad request: expected parameter 'lastName' is not defined"});
            return;
        }

        if (birthDate === undefined)
        {
            res.status(400).json({"error": "bad request: expected parameter 'birthDate' is not defined"});
            return;
        }

        let createdStudent = {
            id: null, // will be initialized by the database, after we insert the record
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
        };

        createdClass = await db.addNewStudent(createdStudent);

        // return 201 status code (i.e., created)
        res.status(201).json(createdStudent);
    }
    catch (err)
    {
        console.error("Error:", err.message);
        res.status(422).json({"error": "failed to add new student to the database"});
    }
});


/**
 * PUT /students/{id}
 * with the following form parameters:
 *      firstName
 *      lastName
 *      birthDate
 *
 * The parameters passed in the body of the PUT request are used to
 * update the existing student with id = {id} in the students table in the database.
 *
 * @return the updated student as JSON
 *
 * @throws a 404 status code if the student with id = {id} does not exist
 */
router.put("/students/:id", async function (req, res)
{
    try
    {
        const id = req.params.id;
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const birthDate = req.body.birth_date;

        console.log("id          = " + id);
        console.log("firstName        = " + firstName);
        console.log("lastName       = " + lastName);
        console.log("birthDate = " + birthDate);

        if (firstName === undefined)
        {
            res.status(400).json({"error": "bad request: expected parameter 'firstName' is not defined"});
            return;
        }

        if (lastName === undefined)
        {
            res.status(400).json({"error": "bad request: expected parameter 'lastName' is not defined"});
            return;
        }

        if (birthDate === undefined)
        {
            res.status(400).json({"error": "bad request: expected parameter 'birthDate' is not defined"});
            return;
        }


        let studentToUpdate = await db.getStudentWithId(id);
        console.log({studentToUpdate}); // this will pretty print the class object

        if (studentToUpdate == null)
        {
            console.log("No student with id " + id + " exists.");

            // return 404 status code (i.e., error that the class was not found)
            res.status(404).json({"error": "failed to update the student with id = " + id + " in the database because it does not exist"});
            return;
        }

        // override the values of all the fields from studentToUpdate with the values from the parameters
        studentToUpdate.firstName = firstName;
        studentToUpdate.lastName = lastName;
        studentToUpdate.birthDate = birthDate;

        await db.updateExistingStudentInformation(studentToUpdate);
        res.json(studentToUpdate);
    }
    catch (err)
    {
        console.error("Error:", err.message);
        res.status(422).json({"error": "failed to update the student with id = " + req.params.id + " in the database"});
    }
});


/**
 * PATCH /students/{id}
 * with the following optional form parameters:
 *      firstName
 *      lastName
 *      birthDate
 *
 * The optional parameters passed in the body of the PATCH request are used to
 * update the existing student with id = {id} in the students table in the database.
 *
 * @return the updated student as JSON
 *
 * @throws a 404 status code if the student with id = {id} does not exist
 */
router.patch("/students/:id", async function (req, res)
{
    try
    {
        const id = req.params.id;
        const firstName = req.body.firstName || null;    // if the parameter is not specified, then assign null to code
        const lastName = req.body.lastName || null;
        const birthDate = req.body.birth_date || null;

        console.log("id          = " + id);
        console.log("firstName        = " + firstName);
        console.log("lastName       = " + lastName);
        console.log("birthDate = " + birthDate);

        // there is no need to check if the parameters are defined, because they are optional
        // for a PATCH request


        let studentToUpdate = await db.getClassWithId(id);
        console.log({studentToUpdate});

        if (classToUpdate == null)
        {
            console.log("No student with id " + id + " exists.");

            // return 404 status code (i.e., error that the class was not found)
            res.status(404).json({"error": "failed to update the student with id = " + id + " in the database because it does not exist"});
            return;
        }

        // Override the values of all the fields from classToUpdate with the values from the parameters.
        // If a parameter is not specified in the request, then the corresponding field in classToUpdate
        // will not be updated and will still have the old value.
        if (firstName != null)
        {
            studentToUpdate.firstName = firstName;
        }

        if (lastName != null)
        {
            studentToUpdate.lastName = lastName;
        }

        if (birthDate != null)
        {
            studentToUpdate.birthDate = birthDate;
        }

        await db.updateExistingStudentInformation(studentToUpdate);
        res.json(studentToUpdate);
    }
    catch (err)
    {
        console.error("Error:", err.message);
        res.status(422).json({"error": "failed to update the student with id = " + req.params.id + " in the database"});
    }
});


/**
 * DELETE /students/{id}
 *
 * Deletes the student with id = {id} from the students table in the database.
 *
 * @throws a 404 status code if the student with id = {id} does not exist
 */
router.delete("/students/:id", async function (req, res)
{
    try
    {
        const id = req.params.id;
        console.log("id = " + id);

        const studentToDelete = await db.getStudentWithId(id);
        console.log({studentToDelete});

        if (studentToDelete == null)
        {
            console.log("No student with id " + id + " exists.");

            // return 404 status code (i.e., error that the class was not found)
            res.status(404).json({"error": "failed to delete the student with id = " + id + " from the database because it does not exist"});
            return;
        }

        await db.deleteExistingStudent(id);

        res.status(204).send(); //there is no return value
    }
    catch (err)
    {
        console.error("Error:", err.message);
        res.status(422).json({"error": "failed to delete the student with id = " + req.params.id + " from the database"});
    }
});


module.exports = router;
