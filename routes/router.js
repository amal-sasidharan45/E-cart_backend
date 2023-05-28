// To define routes for client request ,creates routes folder and router.js file in that folder
                                
// ->Import express
const express=require('express')
// import productController
const productController=require('../controllers/productController')

const wishlistController=require('../controllers/wishlistController')
const cartController=require('../controllers/cartcontroller')

// ->using express create an object for router class inorder to setup path
const router=new express.Router()
// ->Resolving client request

//api -getallproduct request 
router.get('/products/all-products',productController.getallproducts)

//api-for get particular product

router.get('/products/view-product/:id',productController.viewProduct)

//api-for product added to the  wishlist 

router.post('/wishlist/add-to-wishlist',wishlistController.addtowishlist)

//api-for get wishlist products

router.get('/wishlist/get-wishlist',wishlistController.getWishlistitem)
//api -for remove wishlist
router.delete('/wishlist/remove-wishlist-item/:id',wishlistController.removewishlistitem)


//api -for remove addtocart
router.post('/cart/add-to-cart',cartController.addtocart)

router.get('/cart/get-cart',cartController.getcartitem)


router.delete('/cart/deleletcartitem/:id',cartController.deletecartitem)

//api for increment to increment products
router.get('/cart/incrementcart/:id',cartController.incrementcount)


//api for decrement products
router.get('/cart/decrementcart/:id',cartController.decrementcount)

//export routers
module.exports=router


