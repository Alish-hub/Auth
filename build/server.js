"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const ormconfig_1 = require("./config/ormconfig");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
// import annotRoute from "./routes/annot.route";
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json());
app.use('/user', user_routes_1.default);
// app.use('/annot',annotRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield ormconfig_1.datasource.initialize()
        .then(() => {
        console.log("database connected successfully");
    })
        .catch((err) => console.log({ errorMessage: err }));
    console.log(`server is running in port ${PORT}`);
}));
