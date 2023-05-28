// import cart collection 
const carts=require('../model/cartSchema')


//add to cart
exports.addtocart=async (req,res)=>{
    //get the product details from request

    const{id,title,price,image,quantity}=req.body


    //logic
    try{
        //check th product is already in cart
        const product=await carts.findOne({id})
        if(product){
            //product increment quantity
            product.quantity+=1
        //update grand total in mongodb
        product.grandtotal=product.price*product.quantity

        //to save changes mongdb
        product.save()
        //send response to the client
        res.status(200).json('product added to the cart successfully')

        }

        else{
            //product is not avilabe in the cart
            //add product the cart

            const newProduct =new carts({id,title,price,image,quantity,grandtotal:price})
            //save new product
            await newProduct.save()

            res.status(200).json('product added to cart')
        }
        
    }
    catch(error){
        res.status(401).json(error)

    }
}




exports.getcartitem=async (req,res)=>{
    try{
        const allcartitem=await carts.find()
        res.status(200).json(allcartitem)
    }
    catch(error){
        res.status(401).json(error)
    }

}
    //remove a product from cart

    exports.deletecartitem=async(req,res)=>{
        //get product id from request params
        const{id}=req.params
        try{
            //remove an item from cart
            const removeproduct=await carts.deleteOne({id})
            if(removeproduct.deletedCount!=0 ){
                //get remaining products
                //
                 const remainingproducts =await carts.find()
                 res.status(200).json(remainingproducts)
            }
            else{
                res.status(401).json('item not found')
            }

        }
        catch(error){
           res.status(401).json(error)

        }
    }



    //increment cart item count

    // exports.incrementcount=async(res,req)=>{
    //     //get product id from params
    //     const{id}=req.params
    //     try{

    //         //check the product in cart
    //         const product=await carts.findOne({id})
    //         if(product){
    //             //increment product and grand total
    //             product.quantity+=1
    //             product.grandtotal=product.price*product.quantity
    //             //save changes
    //             await product.save()
    //             //increment ,get all products from cart after updating in particular cart
    //             const allitem=await carts.find()
    //             res.status(200).json(allitem)


    //         }
    //         else{
    //             res.status(401).json('item not found')
    //         }
    //     }
    //     catch(error){
    //         res.status(401).json(error)
    //     }
    // }



    exports.incrementcount = async (req, res) => {
        // get product id from params
        const {id} = req.params;
        try {
          // check the product in cart
          const product = await carts.findOne({id});
          if (product) {
            // increment product and grand total
            product.quantity += 1;
            product.grandtotal = product.price * product.quantity;
            // save changes
            await product.save();
            // increment, get all products from cart after updating in particular cart
            const allitem = await carts.find();
            res.status(200).json(allitem);
          } else {
            res.status(401).json('item not found');
          }
        } catch (error) {
          res.status(401).json(error);
        }
      };
      
      exports.decrementcount= async (req, res) => {
        // get product id from params
        const { id } = req.params;
        try {
          // check the product in cart
          const product = await carts.findOne({ id });
          if (product) {
            // increment product and grand total
            product.quantity -= 1;
            if(product.quantity==0){
                await carts.deleteOne({id})
                const allitem=carts.find()
                res.status(200).json(allitem)
            }
            else{
                product.grandtotal = product.price * product.quantity;
                // save changes
                await product.save();
                // increment, get all products from cart after updating in particular cart
                const allitem = await carts.find();
                res.status(200).json(allitem);
                
            }
         
          } else {
            res.status(401).json('item not found');
          }
        } catch (error) {
          res.status(401).json(error);
        }
      };
      