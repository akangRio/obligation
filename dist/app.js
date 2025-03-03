"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = require("./config/swagger");
const uploadRoute_1 = __importDefault(require("./routes/uploadRoute"));
const aiRoute_1 = __importDefault(require("./routes/aiRoute"));
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || "3000", 10);
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
(0, swagger_1.setupSwagger)(app);
app.use("/", routes_1.default);
app.use("/upload", uploadRoute_1.default);
app.use("/ai", aiRoute_1.default);
app.listen(port, () => {
    console.log(`This app listening on http://localhost:${port}/`);
});
exports.default = app;
