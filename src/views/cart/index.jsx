import React, { useEffect, useState, useReducer, useMemo , useCallback } from "react";
import { Stepper, Radio } from "antd-mobile";
import "./index.css";
import { GETDATA, CHECKALL, SETSELECT, EDITSHOPCOUNT } from "./actionType";
import Shop from "./shop";


//可以用createContext 实现跨组件传值问题
export default function Cart(props) {
  //是否全选
  let [allSelect, setAllSelect] = useState(false);

  let isChange = false
  let shopCount = 0;  //商品的数量
  //商品数据
  let [data, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case GETDATA:
        return Shop.getData();
        break;
      case CHECKALL:
        return Shop.checkAll(action.data);
        break;
      case SETSELECT:
        return Shop.setShopRadio(action.data);
        break;
      case EDITSHOPCOUNT:
        return Shop.edtShopCount(action.data);
        break;
      default:
        return state;
    }
  }, []);
//是否全部选中
 const isAll = () => {
   return data.every(item => {
     return item.select;
   });
 };
// 计算总价格
const countPrice = () =>{
  return data.reduce((prev , cur)=>{
    if(cur.select) {
      return prev + cur.selectCount * parseInt(cur.price);
    }else {
      return prev + 0
    }
  } , 0)
}

  //初始化data
  useEffect( () => {
    dispatch({ type: GETDATA });
   
  }, []);

  //一旦data变化,我们就判断他们是不是全部选中,和计算总价格
  //为啥要用两个useEffect 因为在useState 和 useReducer提供的方法中修改值后无法获取最新的state
   useEffect(() => {
     setAllSelect(isAll())
    
   });



    

 
  //单个商品是否选中
  const setSelect = e => {
    let dataset = e.target.dataset.id
    let arr = dataset.split("&")
    dispatch({ type: SETSELECT, data: arr });
   
     setAllSelect(isAll());



  };
  //点击全选
  const changSelect = () => {
    setAllSelect(!allSelect);
    dispatch({ type: CHECKALL, data: !allSelect });
  };
//修改购买数量
  const setStepper = (num ) =>{
    shopCount = num
    isChange = true
  }
//修改购买数量  因为ant修改的步长没有提供获取e的方法,所以我用了事件代理在父元素获取,知道修改购买数量是哪个id
const edit = (e)=>{
  if(isChange) {
     let id = e.currentTarget.dataset.id
     dispatch({ type: EDITSHOPCOUNT, data: [id, shopCount] });
     isChange = false
     shopCount = 0
  }
}


  return (
    <div className="container">
      <ul>
        {data.map(item => {
          return (
            <li className="clearFix cart" key={item.id}>
              <div className="radio">
                <Radio
                  checked={item.select}
                  onClick={setSelect}
                  data-id={item.id + "&" + item.select}
                ></Radio>
              </div>
              <div className="img">
                <img src={item.image} alt="" />
              </div>
              <div className="Stepper" onClick={edit} data-id={item.id}>
                <Stepper
                  style={{ width: "100%", minWidth: "100px" }}
                  showNumber
                  size="small"
                  defaultValue={item.selectCount}
                  min={1}
                  max={item.saleNum}
                  onChange={setStepper}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <div className="allSe">
        <Radio checked={allSelect} className="my-radio" onClick={changSelect}>
          全选
        </Radio>
        <h2>{"总价格:" +   countPrice()}</h2>
      </div>
    </div>
  );
}
