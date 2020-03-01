import Trip from "@/views/trip/index.jsx"
import traffic from "@/views/traffic"
import mine from "@/views/mine"
import history from "@/views/history"
import Start from "@/views/start"
import shop from "@/views/shop"
import cart from "../views/cart"



export default [
  {
    path: "/trip",
    component: Trip,
    exact: true,
    title: "出行",
    icon: "../../assets/images/出行.png",
    selectIcon: "../../assets/images/出行(1).png"
  },
  {
    path: "/traffic",
    component: traffic,
    exact: true,
    title: "交通",
    icon: "../../assets/images/交通.png",
    selectIcon: "../../assets/images/交通(1).png"
  },
  {
    path: "/history",
    component: history,
    exact: true,
    title: "历史",
    icon: "../../assets/images/历史.png",
    selectIcon: "../../assets/images/历史(1).png"
  },
  {
    path: "/mine",
    component: mine,
    exact: true,
    title: "我的",
    icon: "../../assets/images/我的.png",
    selectIcon: "../../assets/images/我的(1).png"
  },
  {
    path: "/start",
    component: Start,
    exact: true
  },
  {
    path: "/shop",
    component: shop,
    exact: true
  },
  {
    path: "/cart",
    component: cart,
    exact: true
  }
];