import React, {useState, useEffect} from "react";
import {useAuthContext} from "@asgardeo/auth-react";
import './styles.css';

export default function Test() {

    const [products, setProducts] = useState([])
    const [brand, setBrand] = useState('')
    const [type, setType] = useState('')

    const {
        httpRequest,
        getAccessToken
    } = useAuthContext();


    useEffect(() => {
        callAPI();
    }, [])

    // "https://4f20c266-2aad-4d3e-ba1c-390cffe76423-prod.e1-us-east-azure.choreoapis.dev/ygtb/storage-service/1.0.0/getItemBasedOnBrand?brand=string"
    const callAPI = async () => {
        const token = await getAccessToken();
        const requestConfig = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "GET",
            url: `https://4f20c266-2aad-4d3e-ba1c-390cffe76423-prod.e1-us-east-azure.choreoapis.dev/ygtb/storage-service/1.0.0/getItem?brand=${brand}&itemType=${type}`
        };
        requestConfig.headers['X-Authorization'] = token;
        const {data} = await httpRequest(requestConfig);
        setProducts(data);
    }

    return (
        <div>Test Page
            <div>
                <label htmlFor="brandSelector">Select brand</label>
                <select id="brandSelector" onChange={(event) => {
                    setBrand(event.currentTarget.value)
                }}>
                    <option value="Nike">
                        Nike
                    </option>
                    <option value="Rolex">
                        Rolex
                    </option>
                    <option value="Odel">
                        Odel
                    </option>
                </select>

                <label htmlFor="typeSelector">Select Type</label>
                <select id="typeSelector" onChange={(event) => {
                    setType(event.currentTarget.value)
                }}>
                    <option>
                        Nike
                    </option>
                    <option>
                        Rolex
                    </option>
                    <option>
                        Odel
                    </option>
                </select>
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

    )
}

