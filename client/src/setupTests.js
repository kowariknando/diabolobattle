import { server } from "./mocks/server";
import "@testing-library/jest-dom";
import "whatwg-fetch"; // ✅ Ensures Axios can use `fetch` properly


// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that are declared during the tests.
afterEach(() => server.resetHandlers());

// Clean up after tests are finished.
afterAll(() => server.close());
