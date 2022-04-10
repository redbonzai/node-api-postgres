import {Router} from 'express';
import {logger} from "./general/logger";
import {apiValidation} from "./general/apiValidation";
import {apiCors} from "./general/cors";
import {errorHandler} from "./general/errorHandling";

import {addressRouter} from "../../routing/addresses";

export let v1Router = Router();

v1Router.use(logger)
v1Router.use(apiCors)
v1Router.use(apiValidation)

v1Router.use('/addresses', addressRouter)

v1Router.use(errorHandler)
