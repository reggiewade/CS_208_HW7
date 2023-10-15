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
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const birth_date = req.body.birth_date;

        console.log("first_name        = " + first_name);
        console.log("last_name       = " + last_name);
        console.log("birth_date = " + birth_date);

        if (first_name === undefined)
        {
            res.status(400).json({"error": "bad request: expected parameter 'code' is not defined"});
            return;
        }

        if (last_name === undefined)
        {
            res.status(400).json({"error": "bad request: expected parameter 'title' is not defined"});
            return;
        }

        if (birth_date === undefined)
        {
            res.status(400).json({"error": "bad request: expected parameter 'description' is not defined"});
            return;
        }

        let createdStudent = {
            id: null, // will be initialized by the database, after we insert the record
            firstName: first_name,
            lastName: last_name,
            birthDate: birth_date,
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
    // TODO: implement this route or the PATCH route below
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
    // TODO: implement this route or the PUT route above
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
    // TODO: implement this route
});


module.exports = router;
