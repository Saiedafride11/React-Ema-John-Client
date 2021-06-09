import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch('https://damp-plains-27283.herokuapp.com/product/'+ productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data)
        })
    },[productKey])

    // const product = fakeData.find(pd => pd.key === productKey);
    // console.log(product);
    return (
        <div>
            <h1>{productKey} ProductDetails</h1>
           <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;