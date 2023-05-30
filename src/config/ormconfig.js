"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.datasource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const user_entity_1 = require("../entities/user.entity");
dotenv_1.default.config();
exports.datasource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    entities: [user_entity_1.User],
});
