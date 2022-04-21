// disabled div

import React, { useState, useEffect} from "react";
import './App.css';

const App = () =>{
    const [cookieCount, setCookieCount] = useState(0);
    const [itemList, setItemList] = useState({
        cursor: 0,
        grandma: 0
    });
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
        if(1000/((itemList.cursor * 1/10) + itemList.grandma) !== 1.797693134862315E+308 * 1.001){
            const intervalVar = 1000/((itemList.cursor * 1/10) +itemList.grandma);
            const interval = setInterval(() => {
                setCookieCount(cookieCount + 1);
            }, intervalVar);
            return () => {
                clearInterval(interval);
            };
        }
    });

    function purchase(item){
        let itemPrice = item + 'Price';
        if(cookieCount >= priceList[itemPrice]){
            alert(itemList[item]);
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
                <div id='cursorShop' className={'shopItem ' + statusList.cursorStatus} onClick={() => purchase('cursor')}>
                    <h4>Cursor</h4>
                    <p>Cost: {Math.ceil(priceList.cursorPrice)}</p>
                    <h2>{itemList.cursor}</h2>
                </div>
                <div id='grandma' className={'shopItem ' + statusList.grandmaStatus} onClick={() => purchase('grandma')}>
                    <h4>Grandma</h4>
                    <p>Cost: {priceList.grandmaPrice}</p>
                    <h2>{itemList.grandma}</h2>
                </div>
            </div>
        </div>
    );
}

export default App;