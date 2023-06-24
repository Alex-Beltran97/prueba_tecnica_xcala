import React, { useState, useEffect } from 'react';

import { getFirestore, getDocs, doc, collection, query } from "firebase/firestore";

import { Paper } from '@mui/material';

import app from '../db/dbConnection';
import { IItems, IOrder } from '../types';

const db = getFirestore(app);


const Home = () => {

  const [orders, setOrders] = useState<IOrder[]>([]);

  const getData = async () : Promise <void> =>{

    const q = query(collection(db, 'orders'));

    const querySnapshot = await getDocs(q);

    const orders : IOrder[] = [];
    
    querySnapshot.forEach( doc =>{
      orders.push(doc.data() as IOrder);
    })

    console.log(orders);

    setOrders([...orders.sort((a,b)=>{
      if(a.order_number>b.order_number) return 1;
      if(a.order_number<b.order_number) return -1;
      return 0
    })]);
  }

  useEffect(() => {
    getData();
  }, []);

  return (<>
    <div>Home</div>
    <ul>
      { JSON.stringify(orders.length) }
      { orders.map( (order:IOrder) => (
        <li key={order.order_number}>
          <ul style={{ marginLeft: '100px' }}>
            { order.items.map( (item: IItems, id) =>(
              <li key={item.tem_product_id ?? id}>
                <img src={item.sku_img_src} alt="" width="120px" />
                <p>Value: <b>{ item.item_value }</b></p>
                <p>Sku: { item.item_product_sku }</p>
                <p>id: { item.tem_product_id ? JSON.stringify(item.tem_product_id) : `No hay ID: ${ id }`}</p>
              </li>
            )) }
          </ul>
          <p>{ order.order_number }</p>
          <p>Valor total del pedido: <b>{ order.total_order_value }</b></p>
          <hr />
        </li>
      )) }
    </ul>
  </>
  );
};

export default Home;