const {describe, expect, test} = require("@jest/globals");

// supertest is a framework that allows to easily test web APIs
const supertest = require('supertest');
const app = require('./../app');
const request = supertest(app);

describe('REST APIs for students', () =>
{
    describe('GET /students', () =>
    {
        test('should return a 200 (ok) status code', async() =>
        {
            const response = await request.get('/students');
            expect(response.status).toBe(200);
        });

        test('should have Content-Type "application/json"', async() =>
        {
            const response = await request.get('/students');
            expect(response.header['content-type']).toMatch(/application\/json/);
        });

        test('should contain the key "first_name" in the first class returned as a JSON response', async() =>
        {
            const response = await request.get('/students');
            const response_content_as_json = response.body;

            expect(response_content_as_json[0]).toHaveProperty('first_name');
        });

        test('should contain "Alice" in the first class code returned as a JSON response', async() =>
        {
            const response = await request.get('/students');
            const response_content_as_json = response.body;

            expect(response_content_as_json[0].first_name).toBe('Alice');
        });
    });

    describe('GET /students/:id', () =>
    {
        test('should return a 200 (ok) status code', async() =>
        {
            const response = await request.get('/students/1');
            const response_content_as_json = response.body;

            expect(response.status).toBe(200);
        })
    });

    describe('POST /students', () =>
    {
        test('should return a 201 (created) status code', async() =>
        {
            const form_data = {
                first_name: 'Reggie',
                last_name: 'Wade',
                birth_date: '2003-12-01'
            };

            const response = await request
                .post('/students')
                .type('form')
                .send(form_data);
            expect(response.status).toBe(201);
        })
    });

    describe('PUT /students/:id', () =>
    {
        test('should return a 422 (unprocessable entity) status code', async() =>
        {
            const form_data = {
                first_name: 'Alice',
                last_name: 'Angesi',
                birth_date: '1991-01-01'
            };

            const response = await request
                .put('/students/3')
                .type('form')
                .send(form_data);
            expect(response.status).toBe(422);
        })
    });

    describe('PATCH /students/:id', () =>
    {
        // TODO: add your tests
    });

    describe('DELETE /students/:id', () =>
    {
        // TODO: add your tests
    });
});
