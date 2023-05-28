//logic resolving api's

//getallproducts logic

//import product collection 
const products=require ('../model/productSchema')


 exports.getallproducts=async (req,res)=>{
    //logic
    try{
            // getallProducts from products collection in  mongodb
            const allProducts = await products.find()
            res.status(200).json(allProducts)
    }

    catch(error){
        res.status(401).json(error)

    }

}


//2 view a particular product 

exports.viewProduct =async (req,res)=>{
    //get id from request
    const id=req.params.id
    //logic
    try{

//check id  in mongodb
const product=await products.findOne({id})
if(product){

    res.status(200).json(product)

}
else{
res.status(404).json("item not found")
}

    }
    catch(error){
        res.status(401).json(error)


    }

}


