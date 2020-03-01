import  React from "react";
import {  Link } from "react-router-dom";

export default function Footer () {
    return (
      <div className="footer">
        <Link to="/trip">出行</Link>
        <Link to="/traffic">交通</Link>
        <Link to="/history">历史</Link>
        <Link to="/mine">我的</Link>
      </div>
    );
}