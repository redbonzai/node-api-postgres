import {Router} from 'express';
import {getAddresses} from "../middleware/v1/addresses/getAddresses";
import {addAddress} from "../middleware/v1/addresses/addAddress";
import {jsonParser} from "../middleware/v1/general/bodyParser";
import {addressValidate} from "../middleware/v1/addresses/validateAddress";

export let addressRouter = Router();

addressRouter.route('/')
    .get(getAddresses)
    .post(jsonParser, addressValidate, addAddress);
