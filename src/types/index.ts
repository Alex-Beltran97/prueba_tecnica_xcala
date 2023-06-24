export interface IItems {
  tem_product_id: string;
  item_product_sku: string;
  item_value: string;
  sku_img_src: string;
}

export interface IOrder {
  total_order_value: number;
  order_number: string;
  items: IItems[]
};
