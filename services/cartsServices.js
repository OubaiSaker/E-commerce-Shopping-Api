const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

module.exports.createNewCart = async (user_id, product_id) => {
    try {
        const product = await Product.findById({ _id: product_id })
            .select('-imagePath -information');

        const newProduct = {
            _id: product._id,
            productName: product.productName,
            price: product.price,
            productQuantity: 1
        }

        const newCart = new Cart({
            _id: user_id,
            totalQuantity: 1,
            totalPrice: newProduct.price,
            selectedProducts: newProduct
        });
        await newCart.save();

        return newCart.totalQuantity;
    }
    catch (error) {
        throw new Error(error);
    }
}

module.exports.addToCart = async (user_id, product_id, cart) => {
    try {
        const product = await Product.findById({ _id: product_id })
            .select('-imagePath -information');
        //check if inserted product is already exist in cart
        let indexOfProduct = -1;
        for (i = 0; i < cart.selectedProducts.length; i++) {
            if (product._id.equals(cart.selectedProducts[i]._id)) {
                indexOfProduct = i;
                break;
            }
        }
        //inserted product not exist in user cart 
        if (indexOfProduct < 0) {
            const newProduct = {
                _id: product._id,
                productName: product.productName,
                price: product.price,
                productQuantity: 1
            }

            cart.totalQuantity += 1;
            cart.totalPrice += newProduct.price;
            cart.selectedProducts.push(newProduct);

            const updatedCart = await Cart.findByIdAndUpdate({ _id: user_id },
                { $set: cart },
                { new: true });

            return updatedCart.totalQuantity;
        }
        else {
            //inserted product is already exist in user cart
            cart.totalQuantity += 1;
            cart.totalPrice += product.price;
            cart.selectedProducts[indexOfProduct].price += product.price;
            cart.selectedProducts[indexOfProduct].productQuantity += 1;

            const updatedCart = await Cart.findByIdAndUpdate({ _id: user_id },
                { $set: cart },
                { new: true });

            return updatedCart.totalQuantity;
        }
    }
    catch (error) {
        throw new Error(error);
    }
}

module.exports.increaseItem = async (indexOfProduct, cart) => {
    try {
        //update user cart
        const productPrice = cart.selectedProducts[indexOfProduct].price / cart.selectedProducts[indexOfProduct].productQuantity;
        cart.selectedProducts[indexOfProduct].price += productPrice;
        cart.selectedProducts[indexOfProduct].productQuantity += 1;
        cart.totalPrice += productPrice;
        cart.totalQuantity += 1;
        //update user cart in data base
        const updatedCart = await Cart.findByIdAndUpdate({ _id: cart._id },
            { $set: cart },
            { new: true });
        //return updated user cart 
        return updatedCart;
    }
    catch (error) {
        throw new Error(error);
    }
}

module.exports.decreaseItem = async (indexOfProduct, cart) => {
    try {
        //update user cart 
        const productPrice = cart.selectedProducts[indexOfProduct].price / cart.selectedProducts[indexOfProduct].productQuantity;
        cart.totalPrice -= productPrice;
        cart.totalQuantity -= 1;
        cart.selectedProducts[indexOfProduct].price -= productPrice;
        cart.selectedProducts[indexOfProduct].productQuantity -= 1;
        //update user cart in database
        const updatedCart = await Cart.findByIdAndUpdate({ _id: cart._id },
            { $set: cart },
            { new: true });
        //return updated user cart
        return updatedCart;
    }
    catch (error) {
        throw new Error(error);
    }
}

module.exports.deleteItem = async (indexOfProduct, cart) => {
    try {
        if (cart.selectedProducts.length <= 1) {
            await Cart.deleteOne({ _id: cart._id });
            return null;
        }
        //update user cart 
        cart.totalQuantity -= cart.selectedProducts[indexOfProduct].productQuantity;
        cart.totalPrice -= cart.selectedProducts[indexOfProduct].price;
        cart.selectedProducts.splice(indexOfProduct, 1);
        //update user cart in database
        const updatedCart = await Cart.findByIdAndUpdate({ _id: cart._id },
            { $set: cart },
            { new: true });
        //return updated cart
        return updatedCart;
    }
    catch (error) {
        throw new Error(error);
    }
}

