"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_middleware_1 = require("../middleware/customer-middleware");
const router = express_1.Router();
router.use('/api', [customer_middleware_1.uploadGraphqlMiddleware, customer_middleware_1.customerGraphqlMiddleware]);
module.exports = router;
//# sourceMappingURL=customer-routes.js.map