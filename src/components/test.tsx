import React, {useState, useEffect} from "react";
import './styles.css';
import Products from "./products";
import Orders from "./orders";

export interface Product {
  ItemId: number;
  Name: string;
  ImageURL: string;
  Price: number;
  count: number;
}

export interface BasketItem {
  ItemId: number;
  Count: number;
}

export interface OrderItem extends Product {
  Count: number;
}


function getBasket() {
  const tempBasketItem = localStorage.getItem("basket");
  const itemIds = [];
  if (tempBasketItem) {
    return tempBasketItem;
  } else {
    return "";
  }

}


export default function Test() {
  const [currentPage, setCurrentPage] = useState<'PRODUCTS' | 'ORDERS'>('ORDERS');

  return (
    <div className="products-page">
      <div
        className="hero-image"
      >
        <div className="container">
          <div className="hero-text">
            <div className="title">30 කඩේ</div>
            <div className="sub-title">All your needs at one shop</div>
          </div>
        </div>
      </div>
      <div className="content">
        {currentPage == 'PRODUCTS' && (
          <div>
            <button className="navigation"
                    onClick={() => setCurrentPage('ORDERS')}>
              View Orders
            </button>
            <Products/>
          </div>
        )}
        {currentPage == 'ORDERS' && (
          <div>
            <button className="navigation"
                    onClick={() => setCurrentPage('PRODUCTS')}>
              View Products
            </button>
            <Orders/>
          </div>
        )}
      </div>
    </div>
  )
}

