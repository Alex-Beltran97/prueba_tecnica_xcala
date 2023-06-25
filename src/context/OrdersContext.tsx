import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { IItems, IOrder, IOrders } from '../types';

import { getDocs } from "firebase/firestore";

import { ordersCollection, productsCollection } from '../db/fireStore';
import { useProductsContext } from './ProductsContext';
import { createNewDoc } from '../actions/createDocs';

const OrdersContext = createContext<IOrder[] | undefined>(undefined);

export const useOrdersContext = () =>{
  if (OrdersContext) return useContext(OrdersContext);
};

interface Props  {
  children: ReactNode
}

const OrdersProvider = ({ children }: Props ) => {

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [products, setProducts] = useState<IItems[]>([]);

  const getOrdersData = async () : Promise<void> =>{

    const querySnapshot = await getDocs(ordersCollection);

    const orders : IOrder[] = [];
    
    querySnapshot.forEach( doc =>{
      orders.push(doc.data() as IOrder);
    })

    const dataSorted = [...orders.sort((a,b)=>{
      if(a.order_number>b.order_number) return 1;
      if(a.order_number<b.order_number) return -1;
      return 0
    })]

    const addingTrueValues = dataSorted.map( (order:IOrder) =>{

      const getImagesProducts = order.items.map( product => {

        const productsInfo = productsData?.find( productI => productI.item_product_sku === product.item_product_sku);

        return productsInfo;
      });

      const sumProducts = order.items.reduce( (acc, product) : any => {

          const numAcc = isNaN(parseInt(acc.item_value)) ? 0 : parseInt(acc.item_value);

          const sum = numAcc + parseInt(product.item_value);

          return {
            ...acc,
            item_value: sum
          }
      }, {} as IItems);

      return {
        ...order,
        true_total_order_value: sumProducts.item_value,
        items: getImagesProducts
      }
    });

    const productsTotalMatched = addingTrueValues.filter( (order : IOrder) : any =>{
        return order.total_order_value === order.true_total_order_value;
      }) as unknown;

    const allOrders : IOrders = {
      original: orders,
      calculated: productsTotalMatched as IOrder[]
    };

    setOrders([...allOrders.calculated]);

    for(let i = 0; i < allOrders.calculated.length; i++) {}

  };

  const productsData : IItems[] | undefined = useProductsContext();

  useEffect(() => {
    getOrdersData();
  }, [productsData]);

  useEffect(() => {
    setProducts(productsData as IItems[]);
  }, [productsData]);



  return (
    <OrdersContext.Provider value={orders}>
      { children }
    </OrdersContext.Provider>
  )
}

export default OrdersProvider;