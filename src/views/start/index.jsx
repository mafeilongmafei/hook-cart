import React, { useEffect, useState, useMemo } from "react";
import { Toast } from "antd-mobile";
import start from "./index.module.css";

export default function Start() {
  let [status, setStatus] = useState("开始");
  let is_start_end = true;
  let watchId; //监视者的id
  var map, marker;
  //将gps坐标转成高德坐标
  const convertFrom =(lnglat, type) => {
 
  return new Promise((resolve , reject)=>{
      window.AMap.convertFrom(lnglat, "gps", function(status, result) {
        if (result.info === "ok") {
          var lnglats = result.locations[0]; // Array.<LngLat>
          resolve({
            latitude: lnglats.Q,
            longitude: lnglats.R
            
          });
        }
      });
  })
  };
  //绘制路线位置
  var lineArr = [];
  //开始绘制线路
  const draw = (map, marker) => {
  
    console.log(lineArr);
    // 绘制轨迹
    var polyline = new window.AMap.Polyline({
      map: map,
      path: lineArr,
      showDir: true,
      strokeColor: "#28F", //线颜色
      // strokeOpacity: 1,     //线透明度
      // strokeWeight: 6, //线宽
      strokeStyle: "solid"  //线样式
    });
    var passedPolyline = new window.AMap.Polyline({
      map: map,
      // path: lineArr,
      strokeColor: "#AF5", //线颜色
      // strokeOpacity: 1,     //线透明度
      strokeWeight: 6, //线宽
      // strokeStyle: "solid"  //线样式
    });
    marker.on("moving", function(e) {
      passedPolyline.setPath(e.passedPath);
    });
    map.setFitView();
  };
  //初始化地图
  const initMap = async () => {
    map = new window.AMap.Map("container", {
      resizeEnable: true,
      zoom: 20,
      viewMode: "3D"
    });
    marker = new window.AMap.Marker({
      map: map,
      icon: "https://webapi.amap.com/images/car.png",
      offset: new window.AMap.Pixel(-26, -13),
      autoRotation: true,
      angle: -90
    });
  };
  //开始监听
  const showPosition = async position => {
    let address = position.coords;
    let result = await convertFrom([address.longitude, address.latitude], "gps");
    lineArr.push([result.longitude, result.latitude]);
    draw(map, marker);
  };
  const error = err => {
    Toast.fail("定位失败");
  };
  //监听用户位置
  const onWatchAddress = () => {
    //获取用户位置
    watchId = navigator.geolocation.watchPosition(showPosition, error);
  };

  //获取用户位置 同时判断用户支持不
  const getLocation = cal => {
    Toast.loading("定位中");
    if (navigator.getGamepads) {
       cal();
    } else {
      Toast.fail("浏览器不支持定位", 2);
    }
    //  if (navigator.geolocation){
    //     navigator.geolocation.getCurrentPosition(po => {
    //       // console.log(po.coords);
    //       convertFrom([po.coords.longitude, po.coords.latitude], "gps").then(res=>{
    //         console.log(res)
    //       })
    //     });
    //   }
    
  };
  //开始
  const setCity = () => {
    if (is_start_end) {
      //开始监视用户位置
      onWatchAddress()
      setStatus("退出");
      is_start_end = false
     
     
    
    
    } else {
      //停止监视用户位置
      navigator.geolocation.clearWatch(watchId);
      setStatus("开始");
      lineArr = []
    }
  };

 

  useEffect(() => {
    getLocation(initMap);
  }, []);

  return (
    <div id={start.container}>
      <div id="container" style={{ height: "100%" }}>
        <div className={start.start} onClick={setCity}>
          {status}
        </div>
      </div>
    </div>
  );
}
