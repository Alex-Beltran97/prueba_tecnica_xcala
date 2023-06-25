import React, { useState, useEffect } from 'react';

import { getDocs } from "firebase/firestore";

import { IItems, IOrder } from '../types';
import { ordersCollection, ordersFilteredCollection } from '../db/fireStore';

import { useProductsContext } from '../context/ProductsContext';
import { useOrdersContext } from '../context/OrdersContext';

const Home = () => {

  const orders = useOrdersContext();

  const getOrdersData = async () =>{
    const data = await getDocs(ordersFilteredCollection);

    data.forEach( doc =>{
      console.log(doc.data());
    })
  };

  useEffect(() => {
    getOrdersData();
  }, [orders]);

  return (<>
    <h1>Orders</h1>
      { JSON.stringify(orders!.length) }
    <hr />
    <ul>
      <h4>Order: </h4>
      {/* { orders.map( (order:IOrder) => (
        <li key={order.order_number}>
          <ul style={{ marginLeft: '100px' }}>
            { order.items.map( (item: IItems, id) =>(
              <li key={item.item_product_id ?? id}>
                <img src={item.sku_img_src ?? "#"} alt="" width="120px" />
                <p>Value: <b>{ item.item_value }</b></p>
                <p>Sku: { item.item_product_sku }</p>
                <p>id: { item.item_product_id ? JSON.stringify(item.item_product_id) : `No hay ID: ${ id }`}</p>
              </li>
            )) }
          </ul>
          <p>{ order.order_number }</p>
          <p>Verdadero valor total del pedido: <b>{ order.true_total_order_value }</b></p>
          <p>Valor total del pedido: <b>{ order.total_order_value }</b></p>
          <p>El precio coincide: <b>{ order.total_order_value === order.true_total_order_value ? "Si" : "No" }</b></p>
          <hr />
        </li>
      )) } */}
    </ul>
  </>
  );
};

export default Home;