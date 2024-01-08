const salesModel = require("../models/salesModel")

// create data for  Sales Analytics

exports.create = async (req,res) =>{
    try{
        let reqBody = req.body
        let data = await salesModel.create(reqBody);
        res.status(201).json({
            status : "success",
            data : data
        })
    }catch(e){
        res.status(500).json({
            status : "fail",
            data : e.toString()
        })
    }
}

