import { Router } from "express";
import { addCustomer, getCustomer } from "../controller/customer.controller.js";


const customer=Router()


customer.post("/",addCustomer)
customer.get("/",getCustomer)


export default customer

