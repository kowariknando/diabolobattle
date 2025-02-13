const request = require("supertest");
const app = require("../server"); // Import the Express app
const mongoose = require("mongoose");

beforeAll(async () => {
  // Connect to a test database (optional, if needed)
});

afterAll(async () => {
  await mongoose.connection.close(); // Close connection after tests
});

describe("GET /people/all", () => {
  it("should return an array of people", async () => {
    const response = await request(app).get("/people/all");

    expect(response.status).toBe(200); // Check if the response is OK
    expect(Array.isArray(response.body)).toBe(true); // Check if data is an array
  });
});
