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

// TotalRevenue

exports.TotalRevenue = async (req,res) =>{
    try{

        const TotalRevenue = await salesModel.aggregate([
            {
                $group : {
                    _id : null,
                    total : {
                        $sum : {
                            $multiply: [
                                { $toDouble: "$quantity" },
                                { $toDouble: "$price" }
                            ]
                        }
                    }
                }
            }
        ])
        res.status(200).json({
            status : "success",
            totalRevenue : TotalRevenue["0"].total
        })

    }catch(e){
        res.status(500).json({
            status : "fail",
            data : e.toString()
        })
    }
};

//quantity-by-product

exports.quantityByProduct = async (req,res) =>{
    try {
        const quantityByProduct = await salesModel.aggregate([
            {
                $group : {
                    _id : "$product",
                    totalQuantity : {
                        $sum : "$quantity"
                    }
                }
            }
        ])
        res.status(200).json({
            status : "success",
            totalQuantity : quantityByProduct
        })
    }catch (e){
        res.status(200).json({
            status : "fail",
            data : e.toString()
        })
    }
}

// top-products

exports.topProducts = async (req,res) =>{
    try {
        let topProducts = await salesModel.aggregate([
            {
                $group : {
                    _id : " $product ",
                    total : {
                        $sum : {
                            $multiply : [
                                { $toDouble: "$quantity" },
                                { $toDouble: "$price" }
                            ]
                        }
                    }

                }
            },
            {
                $sort : {
                    total : -1
                }
            },
            {
                $limit : 5
            },
        ])

        res.status(200).json({
            status : "success",
            totalQuantity : topProducts
        })
    }catch (e) {
        res.status(200).json({
            status : "fail",
            data : e.toString()
        })
    }
}

//average-price

exports.averagePrice = async (req,res) =>{
    try {
        let averagePrice = await salesModel.aggregate([{
            $group : {
                _id : null,
                avgPrice : { $avg : "$price" }
            }
        }
        ])

        res.status(200).json({
            status : "success",
            avgPrice : averagePrice[0].avgPrice
        })
    }catch (e) {
        res.status(200).json({
            status : "fail",
            data : e.toString()
        })
    }
}





// revenue-by-month
exports.revenueByMonth =  async (req,res) =>{
    try {
        const revenueByMonth = await salesModel.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' },
                    },
                    total : {
                        $sum : {
                            $multiply : [
                                { $toDouble: "$quantity" },
                                { $toDouble: "$price" } ]
                        }
                    }
                },
            },
            {
                $project: {
                    _id: 0,
                    year: '$_id.year',
                    month: '$_id.month',
                    totalRevenue: 1,
                },
            },
        ]);

        res.json(revenueByMonth);
    } catch (e) {
        res.status(500).json({
            status : "fail",
            data: e.toString()
        })
    }
}

//sales/highest-quantity-sold
exports.highestQuantitySold  = async (req, res) => {
    try {
        const highestQuantitySold = await salesModel.aggregate([
            {
                $group: {
                    _id: {
                        date: '$date',
                    },
                    maxQuantity: { $max: '$quantity' },
                    product: { $first: '$product' },
                },
            },
            {
                $project: {
                    _id: 0,
                    date: '$_id.date',
                    product: 1,
                    maxQuantity: 1,
                },
            },
        ]);

        res.json(highestQuantitySold);
    }catch (e) {

        res.status(500).json({
            status : "fail",
            data: e.toString()
        })
    }
}

// ... (previous code)

// sales department-salary-expense
 exports.departmentSalaryExpense = async (req, res) => {
     try {
         const departmentSalaryExpense = await salesModel.aggregate([
             {
                 $group: {
                     _id: '$department',
                     totalSalaryExpense: { $sum: '$price' },
                 },
             },
         ]);
         res.json(departmentSalaryExpense);
     }catch (e) {

         res.status(500).json({
             status : "fail",
             data: e.toString()
         })
     }
 }








































