

//import wishlist  collection 
const wishlists=require('../model/wishlistSchema')
//add to wishlist login

exports.addtowishlist =async (req,res)=>{
    //get product details from request


    //using destructuring

    const {id,title,price ,image}=req.body

    try{
        //check if the product in the mongodb

        const item=await wishlists.findOne({id})
        if(item){
            res.status(403).json('This item is already exist')
        }
        else{
            //add the item to the wishlist
            const newProduct=new wishlists({id,title,price,image})
            //to store 
          await newProduct.save()
          res.status(200).json("product added to wishlist")

        }

    }

    catch(error){

        
        res.status(401).json(error)

        

    }
}

//get wishlist data -logic

exports.getWishlistitem=async(req,res)=>{
    //logic
    try{

        const allwishlistitem=await wishlists.find()
        res.status(200).json(allwishlistitem)


    }
    catch(error){

        
        res.status(401).json(error)

        

    }
}

//remove wishlist item

exports.removewishlistitem =async (req,res)=>{


    //get id from the request

    const{id}=req.params

    try{

        const removewishlistitem=await wishlists.deleteOne({id})
        if(removewishlistitem.deletedCount!=0 ){
            //get all wishlist item after removing wishlist item

            const allwishlist=await wishlists.find()//remaining wishlist item

            res.status(200).json(allwishlist)





        }
        else{
            res.status(401).json('Item not found')
        }
    }

    catch(error){

       res.status(401).json(error) 

    }


}


