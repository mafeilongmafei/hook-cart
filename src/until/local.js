export const getData = () => {
  let data = window.localStorage.getItem("shopList");
  return JSON.parse(data || "[]");
};



export const pushData = (data) =>{
    let arr = getData();
    arr.push(data)
    window.localStorage.setItem("shopList", JSON.stringify(arr));
}

export const setData = data => {
  window.localStorage.setItem("shopList", JSON.stringify(data));
};