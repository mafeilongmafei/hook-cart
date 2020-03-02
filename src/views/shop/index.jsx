import React from "react"
import "./index.css"
import data from "@/until/data.js"
import  { Button } from "antd-mobile"
import { getData , pushData } from "@/until/local.js";





export default function shop(props) {


  const addCart = function (e) {
    let id = e.currentTarget.dataset.id - 0;
    console.log(e.currentTarget);
    data.forEach(item=>{
      if(item.id == id) {
        pushData(item)
      }
    })


  }
  const navto = () => {
    props.history.push("/cart")
  }
    return (
      <div className="container  pa">
        <ul className="clearFix">
          {data.map(item => {
            return (
              <li key={item.title}>
                <img src={item.image} />
                <p>{item.title}</p>
                <div className="shopPrice">
                  <span className="price">{item.price}</span>
                  <span className="count">{item.saleNum}</span>
                </div>
                <Button
                  data-id={item.id}
                  onClick={e => {
                    addCart(e);
                  }}
                >
                  加入购物车
                </Button>
              </li>
            );
          })}
        </ul>
        <div className="nav">
          <Button
            onClick={navto}
            type="primary"
          >
            去购物车
          </Button>
        </div>
      </div>
    );
};