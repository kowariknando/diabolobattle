import { rest, setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

// ✅ Debugging: Print rest and setupServer
console.log("MSW rest:", rest);
console.log("MSW setupServer:", setupServer);

// ✅ Debugging: Check if the mock server starts
const server = setupServer(
    rest.get("http://localhost:5000/people/all", (req, res, ctx) => {
        console.log("Intercepted GET request!");
        return res(ctx.json([
            { _id: "1", name: "Alice", age: 25, city: "Madrid" },
            { _id: "2", name: "Bob", age: 30, city: "Paris" }
        ]));
    })
);

beforeAll(() => {
    console.log("Starting MSW mock server...");
    server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => {
    console.log("Closing MSW mock server...");
    server.close();
});

test("renders the People List title", async () => {
    render(<App />);
    const titleElement = screen.getByText(/People List/i);
    expect(titleElement).toBeInTheDocument();
});
