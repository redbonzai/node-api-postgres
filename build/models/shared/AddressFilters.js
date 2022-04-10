"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressFilters = void 0;
class AddressFilters {
    constructor(data) {
        this.id = data.id;
        this.line1 = data.line1;
        this.line2 = data.line2;
        this.city = data.city;
        this.state = data.state;
        this.zip = data.zip;
    }
    getCondition() {
        return [
            this.id ? `id = ${this.id}` : '',
            this.line1 ? `line1 LIKE '%${this.line1}%'` : '',
            this.line2 ? `line2 LIKE '%${this.line2}%'` : '',
            this.city ? `city LIKE '%${this.city}%'` : '',
            this.state ? `state LIKE '%${this.state}%'` : '',
            this.zip ? `zip LIKE '%${this.zip}%'` : '',
        ].filter(Boolean).join(' AND ');
    }
}
exports.AddressFilters = AddressFilters;
