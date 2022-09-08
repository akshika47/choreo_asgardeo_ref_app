import React, {useState, useEffect} from "react";
import {useAuthContext} from "@asgardeo/auth-react";
import './styles.css';
import {HttpRequestConfig} from "@asgardeo/auth-spa/src/models/http-client";

interface Product {
  ItemId: string;
  Name: string;
  ImageURL: string;
  Price: number;
}

export default function Test() {

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

  return (
    <div className="products-page">
      <div
        className="hero-image"
      >
        <div className="container">
          <div className="hero-text">
            <div className="title">My store</div>
            <div className="sub-title">Lorem Ipsum dollar</div>
          </div>
        </div>
      </div>
      <img className="header-image" src=""/>
      <div className="content">
        <div className="filter">
          <div>
            <label className="selector-label" htmlFor="brandSelector">Brand</label>
            <div className="selector">
              <select id="brandSelector" onChange={(event) => {
                setBrand(event.currentTarget.value)
              }}>
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
        </div>
        <div className="products">
          {
            products.map((product) => (
              <div key={product.ItemId} className="product">
                <img
                  src="https://demo.nopcommerce.com/images/thumbs/0000041_htc-one-m8-android-l-50-lollipop_415.jpeg"/>
                <div className="details">
                  <span className="name">{product.Name}</span>
                  <span className="price">$ {product.Price.toFixed(2)}</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>

  )
}

