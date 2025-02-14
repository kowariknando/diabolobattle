import { setupServer } from "msw/node";
import { rest } from "msw";

export const server = setupServer(
    rest.get("/people/all", (req, res, ctx) => {  // ✅ Use relative path
        console.log("✅ Mocked API hit: http://localhost/people/all");
        return res(ctx.json([
            { _id: "1", name: "Alice", age: 25, city: "Madrid" },
            { _id: "2", name: "Bob", age: 30, city: "Paris" }
        ]));
    })
);
