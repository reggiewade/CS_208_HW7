const {describe, expect, test} = require("@jest/globals");

// supertest is a framework that allows to easily test web APIs
const supertest = require('supertest');
const app = require('./../app');
const request = supertest(app);

describe('REST APIs for registered_students', () =>
{
    describe('GET /registered_students', () =>
    {
        test('should return a 200 (ok) status code', async() =>
        {
            const response = await request.get('/registered_students');
            expect(response.status).toBe(200);
        })
    });

    describe('POST /add_student_to_class', () =>
    {
        test('should return a 200 (ok) status code', async() =>
        {
            
        })
    });

    describe('DELETE /drop_student_from_class', () =>
    {
        // TODO: add your tests
    });

    describe('GET /students_taking_class/:classCode', () =>
    {
        // TODO: add your tests
    });

    describe('GET /classes_taken_by_student/:studentId', () =>
    {
        // TODO: add your tests
    });
});
