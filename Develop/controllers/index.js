const express = require("express");

const router = express.Router()

router.get("/notes", (req, res)=>{
    console.log("connected")
})

module.exports = router