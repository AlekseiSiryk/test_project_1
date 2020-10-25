import React from "react";
import "./OrderBox.css";
const OrderBox = (props) => {
    return <aside className="aside">
        <h3 className="price">{props.price} грн</h3>
        <p>{props.jobEnd}</p>
        <button className="orderBtn">Замовити</button>
    </aside>
}
export default OrderBox