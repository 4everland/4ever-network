"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.POSC__factory = exports.IERC20__factory = exports.Ownable__factory = void 0;
var Ownable__factory_1 = require("./factories/Ownable__factory");
__createBinding(exports, Ownable__factory_1, "Ownable__factory");
var IERC20__factory_1 = require("./factories/IERC20__factory");
__createBinding(exports, IERC20__factory_1, "IERC20__factory");
var POSC__factory_1 = require("./factories/POSC__factory");
__createBinding(exports, POSC__factory_1, "POSC__factory");
