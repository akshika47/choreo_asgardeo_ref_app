import './styles.css';
import {useAuthContext} from "@asgardeo/auth-react";
import React from 'react';

export default function Orders(){
  const {
    httpRequest,
    getAccessToken
  } = useAuthContext();
    return (
        <div>
            <h1>Hi</h1>
        </div>);
}
