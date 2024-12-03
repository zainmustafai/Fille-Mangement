import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { indexRouter } from "./routes/__index_router__";
const app = express();

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript with Express!");
});
app.use("/api", indexRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
