import { doc, setDoc } from "firebase/firestore";

import { db, ordersFilteredCollection } from '../db/fireStore';

import { IOrders } from "../types";

import moment from 'moment';

export const createNewDoc = async (data: IOrders, order_number: string) =>{
  try {
    await setDoc(doc(db, "ordersFiltered", order_number), {...data, timestamp: moment().valueOf()});    
  } catch (error) {
    console.log(error);
  };
};