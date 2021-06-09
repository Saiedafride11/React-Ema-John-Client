import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    // console.log('Form Submitted', data);
    const savedCart = getDatabaseCart();
    const orderDetails = {...loggedInUser, products: savedCart, shipments:data, orderTime: new Date()}

    fetch('https://damp-plains-27283.herokuapp.com/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        processOrder()
        alert('Your Orders Succesfully')
      }
    })
  };

  console.log(watch("example"));
  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      
      <input name="name" defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Plese Enter Your Name"/>
      {errors.name && <span className="error">Name is required</span>}

      <input name="email"  defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Plese Enter Your Email"/>
      {errors.email && <span className="error">Email is required</span>}

      <input name="address" {...register("address", { required: true })}placeholder="Plese Enter Your Address" />
      {errors.address && <span className="error">Address is required</span>}

      <input name="phone" {...register("phone", { required: true })} placeholder="Plese Enter Your Phone"/>
      {errors.phone && <span className="error">Phone is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;