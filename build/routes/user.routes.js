"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.post('/signUp', user_controller_1.sign_up);
router.post('/login', user_controller_1.login);
exports.default = router;
