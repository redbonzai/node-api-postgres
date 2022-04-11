"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const express_1 = require("express");
const getAddresses_1 = require("../middleware/v1/addresses/getAddresses");
const addAddress_1 = require("../middleware/v1/addresses/addAddress");
const updateAddress_1 = require("../middleware/v1/addresses/updateAddress");
const bodyParser_1 = require("../middleware/v1/general/bodyParser");
const validateAddress_1 = require("../middleware/v1/addresses/validateAddress");
const deleteAddress_1 = require("../middleware/v1/addresses/deleteAddress");
exports.addressRouter = (0, express_1.Router)();
exports.addressRouter.route('/')
    .get(getAddresses_1.getAddresses)
    .post(bodyParser_1.jsonParser, validateAddress_1.addressValidate, addAddress_1.addAddress);
exports.addressRouter.route('/:id')
    .patch(bodyParser_1.jsonParser, validateAddress_1.addressValidate, updateAddress_1.updateAddress)
    .delete(deleteAddress_1.deleteAddress);
