import React, {useEffect, useState} from "react";
import {useAuthContext} from "@asgardeo/auth-react";
import {HttpRequestConfig} from "@asgardeo/auth-spa/src/models/http-client";
import {BasketItem, Product} from "./test";
import './styles.css'

export default function Products(){


 const [products, setProducts] = useState<Product[]>([])
 const [brand, setBrand] = useState('')
 const [type, setType] = useState('')

 const {
  httpRequest,
  getAccessToken
 } = useAuthContext();


 useEffect(() => {
  callAPI();
 }, [])

 const callAPI = async () => {
  const requestConfig: HttpRequestConfig = {
   headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    'X-Authorization': await getAccessToken()
   },
   method: "GET",
   url: `https://4f20c266-2aad-4d3e-ba1c-390cffe76423-prod.e1-us-east-azure.choreoapis.dev/ygtb/storage-service/1.0.0/getItem?brand=${brand}&itemType=${type}`
  };
  const {data} = await httpRequest(requestConfig);
  setProducts(data);
 }

 const getOrders = async () => {
  const requestConfig: HttpRequestConfig = {
   headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    'X-Authorization': await getAccessToken()
   },
   method: "GET",
   url: `https://4f20c266-2aad-4d3e-ba1c-390cffe76423-prod.e1-us-east-azure.choreoapis.dev/ygtb/storage-service/1.0.0/getPastOrders`
  };
  const orders = await httpRequest(requestConfig);
  console.log(orders);
 }

 const purchaseBasket = async () => {
  const requestConfig: HttpRequestConfig = {
   headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    'X-Authorization': await getAccessToken()
   },
   method: "POST",
   url: `https://4f20c266-2aad-4d3e-ba1c-390cffe76423-prod.e1-us-east-azure.choreoapis.dev/ygtb/storage-service/1.0.0/purchaseBasket`,
   data: localStorage.getItem("basket") || "[]"
  };
  console.log(await httpRequest(requestConfig));
 }

 const addItemToBasket = (ItemId: number) => {
  const tempBasketItem = localStorage.getItem("basket");
  const basketItems: BasketItem[] = tempBasketItem ? JSON.parse(tempBasketItem) as BasketItem[] : [];
  localStorage.setItem("basket", JSON.stringify([...basketItems, {ItemId, Quantity: 1}]));
  console.log('Added to Basket');
 };

 return (
   <div>
   <div className="filter">
    <div>
     <label className="selector-label" htmlFor="brandSelector">Brand</label>
     <div className="selector">
      <select id="brandSelector" onChange={(event) => {
       setBrand(event.currentTarget.value)
      }}>
       <option value="">
        Empty
       </option>
       <option value="Samsung">
        Samsung
       </option>
       <option value="Rolex">
        Rolex
       </option>
       <option value="Nikon">
        Nikon
       </option>
      </select>
     </div>
    </div>
    <div>
     <label className="selector-label" htmlFor="typeSelector">Type</label>
     <div className="selector">
      <select id="typeSelector" onChange={(event) => {
       setType(event.currentTarget.value)
      }}>
       <option value="">
        Empty
       </option>
       <option value="Phone">
        Phone
       </option>
       <option value="Camera">
        Camera
       </option>
       <option value="Watch">
        Watch
       </option>
      </select>
     </div>
    </div>
    <button onClick={callAPI}>
     Search
    </button>
    {' '}
    <button onClick={purchaseBasket}>Purchase Basket</button>
    {' '}
   </div>

 <div className="products">
  {
   products.map((product) => (
     <div key={product.ItemId} className="product">
      <img src={product.ImageURL}/>
      <div className="details">
       <span className="name">{product.Name}</span>
       <span className="price">$ {product.Price.toFixed(2)}</span>
      </div>
      <div className="details">
       <span className="count">Items available: {product.count}</span>
      </div>
      <div className="details">
       <button onClick= {()=>{addItemToBasket(product.ItemId)}}> Buy Item</button>
      </div>
     </div>
   ))
  }
 </div>
</div>
 );
}
