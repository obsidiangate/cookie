// disabled div

import React, { useState, useEffect} from "react";
import './App.css';

const App = () =>{
    const [cookieCount, setCookieCount] = useState(0);
    const [cursor, setCursor] = useState(0);
    const [grandma, setGrandma] = useState(0);
    const [statusList, setStatusList] = useState({
        cursorStatus: 'unavailable',
        grandmaStatus: 'unavailable'
    });
    const [priceList, setPriceList] = useState({
        cursorPrice: 15,
        grandmaPrice: 100
    });
    // value * numeber of characters
    useEffect(() => {
        // infinity check
        if(1000/((cursor * 1/10) +grandma) !== 1.797693134862315E+308 * 1.001){
            const intervalVar = 1000/((cursor * 1/10) +grandma);
            const interval = setInterval(() => {
                setCookieCount(cookieCount + 1);
            }, intervalVar);
            return () => {
                clearInterval(interval);
            };
        }
    });

    function purchase(itemPrice){
        if(cookieCount >= priceList[itemPrice]){
            setCursor(cursor + 1);
            let priceListCopy = {...priceList};
            setCookieCount(cookieCount - Math.ceil(priceListCopy[itemPrice]));
            priceListCopy[itemPrice] = priceListCopy[itemPrice] * 1.15;
            setPriceList(priceListCopy);
        }
    }

    return (
        <div className="App">
            <header>
                <h1 id='headerHeading'>Cookie Clickers</h1>
            </header>
            <br/>
            <img onClick={() => setCookieCount(cookieCount + 1)} src='./images/cookie.png' id='cookieImg' alt='Click this cookie'></img>
            <h3 id='cookieCount'>Cookies: {cookieCount}</h3>
            <div id='shop'>
                <div id='cursorShop' className={'shopItem ' + statusList.cursorStatus} onClick={() => purchase('cursorPrice')}>
                    <h4>Cursor</h4>
                    <p>Cost: {Math.ceil(priceList.cursorPrice)}</p>
                    <h2>{cursor}</h2>
                </div>
                <div id='grandma' className={'shopItem ' + statusList.grandmaStatus} onClick={() => purchase('grandmaPrice')}>
                    <h4>Grandma</h4>
                    <p>Cost: {priceList.grandmaPrice}</p>
                    <h2>{grandma}</h2>
                </div>
            </div>
        </div>
    );
}

export default App;