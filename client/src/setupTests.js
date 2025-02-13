import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Ensure TextEncoder is defined
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Ensure fetch and Response exist (fix Jest compatibility)
if (!global.fetch) {
    const fetch = require("node-fetch");
    global.fetch = fetch;
    global.Response = fetch.Response;
    global.Request = fetch.Request;
    global.Headers = fetch.Headers;
}