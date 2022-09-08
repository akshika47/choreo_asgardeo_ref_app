import React from "react"
import {useAuthContext} from "@asgardeo/auth-react";

export default function Test (){

  const {
      httpRequest,
      getAccessToken
  } = useAuthContext();

  const requestConfig = {
  headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
  method: "GET",
  url: "https://4f20c266-2aad-4d3e-ba1c-390cffe76423-prod.e1-us-east-azure.choreoapis.dev/ygtb/storage-service/1.0.0/getItemBasedOnBrand?brand=string"
  };

  const callAPI = async () => {
    const token = await getAccessToken();
    console.log(token);
    requestConfig.headers['X-Authorization'] =  token;
    httpRequest(requestConfig)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });
  }

  return (
    <div>Test Page
    <button onClick={callAPI}> get by Brand </button>
    </div>

  )
}
