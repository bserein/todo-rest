"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const credentials_json_1 = __importDefault(require("../credentials.json")); //need to tell it its okay to import a JSON file
const connectDB = () => {
    if (!(0, app_1.getApps)().length) {
        (0, app_1.initializeApp)({
            credential: (0, app_1.cert)(credentials_json_1.default) //this basically tells typescript this works, we know what were doing
        });
    }
    return (0, firestore_1.getFirestore)();
};
exports.connectDB = connectDB;
//this only initializes connection to firebase if you are not already connected
//if you ever want to use firebase you can copy this code and use it somewhere else
