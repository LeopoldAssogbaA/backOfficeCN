import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import "./index.less";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/assets/img/cnIcon.jpg"}
            alt="logo"
          />
        </Link>
      </div>
      <div className="menuContainer">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">
            <Link to="/apartments">
              <HomeOutlined />
              Appartements
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/rooms">
              <img
                src={process.env.PUBLIC_URL + "/assets/icons/bed.png"}
                alt="bed icon"
                width="20px"
              />{" "}
              {/* TODO: update & clean icon */}
              Chambres
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/customers">
              <TeamOutlined />
              Utilisateurs
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="booking">
              <CalendarOutlined />
              Reservations
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
