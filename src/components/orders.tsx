import './styles.css';
import {useAuthContext} from "@asgardeo/auth-react";
import React, {useState} from 'react';
import {OrderItem} from "./test";
import './styles.css';

export default function Orders() {

  const dummyItems: OrderItem[] = [
    {
      ItemId: 1,
      ImageURL: 'https://picsum.photos/200/300',
      Name: 'ss',
      Price: 333,
      Count: 1,
      count: 1
    },
    {
      ItemId: 2,
      ImageURL: 'https://picsum.photos/200/300',
      Name: 'ss',
      Price: 333,
      Count: 1,
      count: 1
    }
  ]

  const [orderItems, setOrderItems] = useState<OrderItem[]>(dummyItems);

  const {
    httpRequest,
    getAccessToken
  } = useAuthContext();
  return (
    <table className="order-items">
      <tr>
        <th></th>
        <th>Name</th>
        <th>Price</th>
        <th>Qty</th>
      </tr>
      {
        orderItems.map((item) => (
          <tr className="order-item" key={item.ItemId}>
            <td className="product-image">
              <img src={item.ImageURL}/>
            </td>
            <td>{item.Name}</td>
            <td>$ {item.Price.toFixed(2)}</td>
            <td>{item.Count}</td>
          </tr>
        ))
      }
    </table>);
}
