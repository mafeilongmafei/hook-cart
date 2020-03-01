import { getData, setData  } from "@/until/local.js";

export default class Shop {
  static checkAll(isAll) {
    let data = getData();
    data = data.map(item => {
      item.select = isAll;
      return item;
    });
    setData(data);
    return data;
  }
  static getData() {
    return getData();
  }
  static setShopRadio(da) {
    let [id, select] = da;
    select = select === "true" ? true : false;

    let data = getData();
    data = data.map(item => {
      if (item.id == id) {
        item.select = !select;
      }
      return item;
    });
    setData(data);
    return data;
  }
  static edtShopCount(da) {
    let [id, count] = da;
    let data = getData();
    data = data.map(item => {
      if (item.id == id) {
        item.selectCount = count - 0;
      }
      return item;
    });
    setData(data);
    return data;
  }
}
