"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const express_1 = require("express");
const getAddresses_1 = require("../middleware/v1/addresses/getAddresses");
const addAddress_1 = require("../middleware/v1/addresses/addAddress");
const bodyParser_1 = require("../middleware/v1/general/bodyParser");
const validateAddress_1 = require("../middleware/v1/addresses/validateAddress");
exports.addressRouter = (0, express_1.Router)();
exports.addressRouter.route('/')
    .get(getAddresses_1.getAddresses)
    .post(bodyParser_1.jsonParser, validateAddress_1.addressValidate, addAddress_1.addAddress);
