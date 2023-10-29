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
            // version 1
            const response = await request.get('/students');
            expect(response.status).toBe(200);
        });

        test('should have Content-Type "application/json"', async() =>
        {
            const response = await request.get('/students');
            expect(response.header['content-type']).toMatch(/application\/json/);

            // or

            await request.get('/students').expect('Content-Type', /application\/json/);
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
        // TODO: add your tests
    });

    describe('PUT /students/:id', () =>
    {
        // TODO: add your tests
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
