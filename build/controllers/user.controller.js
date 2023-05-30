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
exports.login = exports.sign_up = void 0;
const ormconfig_1 = require("../config/ormconfig");
const user_entity_1 = require("../entities/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository = ormconfig_1.datasource.getRepository(user_entity_1.User);
const sign_up = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.findOne({
            where: { email: req.body.email },
        });
        console.log({ user });
        if (user) {
            return res.status(400).json({
                message: "Email already exist!please login in to use this services",
            });
        }
        const hassedPassword = bcrypt_1.default.hashSync(req.body.password, 12);
        console.log({ hassedPassword });
        const register = yield userRepository.save({
            userName: req.body.userName,
            email: req.body.email,
            password: hassedPassword,
            phoneNo: req.body.phoneNo,
            role: req.body.role,
        });
        console.log({ register });
        return res
            .status(200)
            .json({ message: "User registered successfully", register });
    }
    catch (err) {
        return res.status(500).json("Unable to register user");
    }
});
exports.sign_up = sign_up;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userRepository.findOneBy({ email: email });
        if (!user) {
            return res.status(401).json({ message: 'Email address not found' });
        }
        const confirm = bcrypt_1.default.compareSync(password, user.password);
        if (!confirm) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        return res.status(200).json({ message: 'Logged in successfullly', user });
    }
    catch (err) {
        return res.status(500).json({ message: "Couldn't login please try again" });
    }
});
exports.login = login;
