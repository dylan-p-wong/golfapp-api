"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const customer_routes_1 = __importDefault(require("./routes/customer-routes"));
if (process.env.NODE_ENV !== 'PROD') {
    require('dotenv').config();
}
const app = express_1.default();
const port = process.env.port || 4000;
app.set('trust proxy', 1);
app.use(cors_1.default({
    origin: 'http://localhost:3000',
    credentials: true
}));
mongoose_1.default.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
app.use(cookie_parser_1.default());
app.use('/customers', customer_routes_1.default);
app.listen(port, () => {
    console.log(`Server running`);
});
//# sourceMappingURL=app.js.map