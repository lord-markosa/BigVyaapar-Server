"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodbPass = exports.mongodbUser = exports.secretString = exports.port = void 0;
exports.port = process.env.PORT || 3000;
exports.secretString = process.env.SECRET_STRING || "secretString";
exports.mongodbUser = process.env.MONGODB_USER || "lordmarkosa";
exports.mongodbPass = process.env.MONGODB_PASS || "uvywRl3Rt8EVg0qF";
