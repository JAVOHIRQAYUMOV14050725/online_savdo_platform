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
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const _routes_1 = require("./routes");
const _config_1 = require("./config");
require("./models/connections.model");
const _errors_1 = require("./middleware");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/my/first/portfolio", _routes_1.mainRouter);
app.use(_errors_1.errorHandler);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _config_1.sequelizeConfig.authenticate();
        console.log('Database connected...');
        yield _config_1.sequelizeConfig.sync({ alter: false });
        console.log('All models were synchronized successfully.');
    }
    catch (err) {
        console.error('Unable to connect to the database:', err);
    }
}))();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map