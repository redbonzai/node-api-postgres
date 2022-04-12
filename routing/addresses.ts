import {Router} from 'express';
import {getAddresses} from "../middleware/v1/addresses/getAddresses";
import {addAddress} from "../middleware/v1/addresses/addAddress";
import {updateAddress} from "../middleware/v1/addresses/updateAddress";
import {jsonParser} from "../middleware/v1/general/bodyParser";
import {addressValidate} from "../middleware/v1/addresses/validateAddress";
import {deleteAddress} from "../middleware/v1/addresses/deleteAddress";

export let addressRouter = Router();

addressRouter.route('/')
    .get(getAddresses)
    .post(jsonParser, addressValidate, addAddress);

addressRouter.route('/:id')
    .patch(jsonParser, addressValidate, updateAddress)
    .delete(deleteAddress);
