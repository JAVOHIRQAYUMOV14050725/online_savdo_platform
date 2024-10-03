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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheDelete = exports.cacheGet = exports.cacheSet = void 0;
const _config_1 = require("../config");
const cacheSet = (key_1, value_1, ...args_1) => __awaiter(void 0, [key_1, value_1, ...args_1], void 0, function* (key, value, expiry = 3600) {
    yield _config_1.redis.set(key, JSON.stringify(value), 'EX', expiry);
});
exports.cacheSet = cacheSet;
const cacheGet = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield _config_1.redis.get(key);
    return data ? JSON.parse(data) : null;
});
exports.cacheGet = cacheGet;
const cacheDelete = (key) => __awaiter(void 0, void 0, void 0, function* () {
    yield _config_1.redis.del(key);
});
exports.cacheDelete = cacheDelete;
//# sourceMappingURL=cache.js.map