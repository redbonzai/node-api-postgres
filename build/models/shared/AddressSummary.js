"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressSummary = void 0;
class AddressSummary {
    constructor(data) {
        this.id = data.id;
        this.line1 = data.line1;
        this.line2 = data.line2;
        this.city = data.city;
        this.state = data.state;
        this.zip = data.zip;
    }
}
exports.AddressSummary = AddressSummary;
