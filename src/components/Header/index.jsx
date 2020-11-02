import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import "./index.less";

const Header = () => {
  const history = useHistory();
  const [selectedKeys, setSelectedKey] = useState([]);

  useEffect(() => {
    const keys = window.location.pathname.split("/");
    keys.map((k) => {
      if (
        k === "" ||
        k === "rooms" ||
        k === "customers" ||
        k === "booking" ||
        k === "apartments"
      ) {
        setSelectedKey(k);
      }
      return null;
    });

    history.listen((location, action) => {
      const keys = location.pathname.split("/");
      keys.map((k) => {
        if (
          k === "" ||
          k === "rooms" ||
          k === "customers" ||
          k === "booking" ||
          k === "apartments"
        ) {
          setSelectedKey(k);
        }
        return null;
      });
    });
  }, [history]);

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
        <Menu theme="dark" mode="horizontal" selectedKeys={selectedKeys}>
          <Menu.Item key="apartments" className="menuItem">
            <>
              <Link to="/apartments">
                <HomeOutlined />
                Appartements
              </Link>
            </>
          </Menu.Item>
          <Menu.Item key="rooms" className="menuItem">
            <Link to="/rooms">
              <>
                <img
                  src={process.env.PUBLIC_URL + "/assets/icons/bed.png"}
                  alt="bed icon"
                  width="20px"
                />{" "}
                {/* TODO: update & clean icon */}
                Chambres
              </>
            </Link>
          </Menu.Item>
          <Menu.Item key="customers" className="menuItem">
            <Link to="/customers">
              <>
                <TeamOutlined />
                Clients
              </>
            </Link>
          </Menu.Item>
          <Menu.Item key="booking" className="menuItem">
            <>
              <Link to="/booking">
                <CalendarOutlined />
                Reservations
              </Link>
            </>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
