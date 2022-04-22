// disabled div

import React, { useState, useEffect, useCallback} from "react";
import './App.css';

const App = () =>{
    const [cookieCount, setCookieCount] = useState(0);
    // Number of each building
    const [itemList, setItemList] = useState({
        cursor: 0,
        grandma: 0
    });
    const [statusList, setStatusList] = useState({
        cursorStatus: 'unavailable',
        grandmaStatus: 'unavailable'
    });
    // Price of each building
    const [priceList, setPriceList] = useState({
        cursorPrice: 15,
        grandmaPrice: 100
    });

    const [cps, setCps] = useState((itemList.cursor * 1/10) + itemList.grandma);
    // enable the use of function in useEffect
    const statusChange = useCallback(() => {
        Object.entries(itemList).forEach(entry => {
            const [key] = entry;
            console.log(key);
        });
    }, [itemList]);

    // value * numeber of characters
    useEffect(() => {
        setCps((itemList.cursor * 1/10) + itemList.grandma);
        // infinity check
        if((1000/cps) !== 1.797693134862315E+308 * 1.001){
            const interval = setInterval(() => {
                setCookieCount(cookieCount + 1);
                statusChange();
            }, 1000/cps);
            return () => {
                clearInterval(interval);
            };
        }
    }, [itemList, priceList, statusList, cps, cookieCount, statusChange]);

    function purchase(item){
        let itemPrice = item + 'Price';
        if(cookieCount >= priceList[itemPrice]){
            // replicates itemList
            let itemListCopy = {...itemList};
            itemListCopy[item] = itemListCopy[item] + 1;
            // updates itemList(new item)
            setItemList(itemListCopy);
            // replicates priceList
            let priceListCopy = {...priceList};
            setCookieCount(cookieCount - Math.ceil(priceListCopy[itemPrice]));
            priceListCopy[itemPrice] = priceListCopy[itemPrice] * 1.15;
            // updates itemList(15% more expensive)
            setPriceList(priceListCopy);
            statusChange();
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
            <h3 id='cps'>CPS: {cps}</h3>
            <div id='shop'>
                <div id='cursorShop' className={'shopItem ' + statusList.cursorStatus} onClick={() => purchase('cursor')}>
                    <h4>Cursor</h4>
                    <p>Cost: {Math.ceil(priceList.cursorPrice)}</p>
                    <h2>{itemList.cursor}</h2>
                </div>
                <div id='grandma' className={'shopItem ' + statusList.grandmaStatus} onClick={() => purchase('grandma')}>
                    <h4>Grandma</h4>
                    <p>Cost: {Math.ceil(priceList.grandmaPrice)}</p>
                    <h2>{itemList.grandma}</h2>
                </div>
            </div>
        </div>
    );
}

export default App;