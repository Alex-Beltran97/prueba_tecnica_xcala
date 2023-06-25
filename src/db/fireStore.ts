import app from "./dbConnection";

import { getFirestore, query, collection } from 'firebase/firestore';

export const db = getFirestore(app);

export const ordersCollection = query(collection(db, 'orders'));

export const productsCollection = query(collection(db, 'products'));

export const ordersFilteredCollection = collection(db, 'ordersFiltered');