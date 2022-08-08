import { Router } from "express"
import crypto from "crypto"
import jwt from "jsonwebtoken"

const router = Router()

import employeeSchema from "../models/employee.js"
import "../database.js"
import verifyToken from "../jwt/jwt.js"

router.get("/", (req, res) => res.render("index.ejs"))

router.post("/", async (req, res) => {
    const employee = employeeSchema(req.body)
    employee.password = await crypto.createHash("sha256").update(req.body.password).digest("base64")

    employee.save()
        .then((data) => res.json(data))
        .catch((error) => console.log(error))
})

router.post("/login", async (req, res) => {
    const {email} = req.query
    const password = await crypto.createHash("sha256").update(req.query.password).digest("base64")

    employeeSchema
        .findOne({email: email, password: password})
        .then((data) => {
            if(data == null) {
                res.json(data)
            }else {
                jwt.sign({employee: data}, process.env.SECRET_KEY, (err, token) => {
                    if(!err) {
                        res.json({
                            token
                        })
                    }else {
                        console.log(err)
                    }
                })
            }
        })
        .catch((error) => console.log(error))
})

router.get("/employees", verifyToken, async (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (error, data) => {
        if(!error) {
            employeeSchema
                .find()
                .then((data) => res.json(data))
                .catch((error) => console.log(error))
        }else {
            res.sendStatus(403)
        }
    })
})

router.get("/employees/:id", verifyToken, async (req, res) => {
    const {id} = req.params

    jwt.verify(req.token, process.env.SECRET_KEY, (error, data) => {
        if(!error) {
            employeeSchema
                .findById(id)
                .then((data) => res.json(data))
                .catch((error) => console.log(error))
        }else {
            res.sendStatus(403)
        }
    })
})

router.get("/functions", async (req, res) => {
    res.render("Functions.ejs")
})

export {router}