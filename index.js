import express from 'express';
import AuthenticationController from './src/controllers/AuthenticationController.js';
import AdminFilter  from "./src/controllers/admin/AdminFilter.js";
import GetAdmin from "./src/controllers/admin/GetAdmin.js";

const app = express();

app.use("/", AuthenticationController);
app.use("/", AdminFilter);
app.use("/", GdetAdmin);
export const authentication = app;