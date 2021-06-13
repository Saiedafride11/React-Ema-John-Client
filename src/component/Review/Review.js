import React, { useEffect, useState } from 'react';
// import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart]= useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const history = useHistory();

    const handleProceedCheckout = () => {
        // console.log("hello");
        // setCart([]);
        // processOrder();

        // setCart([]);
        // //img add er jnno setOrderPlaced
        // setOrderPlaced(true);
        // processOrder();

        history.push('/shipment')
    }

    const removeProduct = (productKey) => {
        // console.log("click", productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)

        fetch('https://damp-plains-27283.herokuapp.com/productByKeys', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
        // const counts = productKeys.map(key => savedCart[key])
        // console.log(counts)

        // const cartProducts = productKeys.map(key => {
        //     const product = fakeData.find(pd => pd.key === key);
        //     product.quantity = savedCart[key];
        //     return product;
        // })
        // // console.log(count);
        // setCart(cartProducts)

    }, []);

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    } 
    return (
        <div className="twin-container">
            <div className="product-container">
                <h1>Order Items: {cart.length}</h1>
                {
                    cart.map(pd => <ReviewItem product={pd} removeProduct={removeProduct} key={pd.key}></ReviewItem>)
                }
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;