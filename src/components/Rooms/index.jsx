import React from "react";
import { Space, Table, Tag } from "antd";

import "./index.less";

const Rooms = () => {
  const columns = [
    {
      title: "Appartement",
      dataIndex: "apartmentId",
      key: "apartmentId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Nombre",
      dataIndex: "number",
      key: "number",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Surface",
      dataIndex: "area",
      key: "area",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Prix",
      dataIndex: "price",
      key: "price",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          Invite {record.lastName}
          Delete
        </Space>
      ),
    },
  ];

  const data = [
    {
      number: 1,
      area: "65m2",
      price: "400 Euros",
      apartmentId: "Duplex Avenue Victor Hugo",
    },
    {
      number: 1,
      area: "65m2",
      price: "400 Euros",
      apartmentId: "Duplex Avenue Victor Hugo",
    },
    {
      number: 1,
      area: "65m2",
      price: "400 Euros",
      apartmentId: "Duplex Avenue Victor Hugo",
    },
    {
      number: 1,
      area: "65m2",
      price: "400 Euros",
      apartmentId: "Duplex Avenue Victor Hugo",
    },
    {
      number: 1,
      area: "65m2",
      price: "400 Euros",
      apartmentId: "Duplex Avenue Victor Hugo",
    },
    {
      number: 1,
      area: "65m2",
      price: "400 Euros",
      apartmentId: "Duplex Avenue Victor Hugo",
    },
    {
      number: 1,
      area: "65m2",
      price: "400 Euros",
      apartmentId: "Duplex Avenue Victor Hugo",
    },
    {
      number: 1,
      area: "65m2",
      price: "400 Euros",
      apartmentId: "Duplex Avenue Victor Hugo",
    },
    {
      number: 1,
      area: "65m2",
      price: "400 Euros",
      apartmentId: "Duplex Avenue Victor Hugo",
    },
    {
      number: 1,
      area: "65m2",
      price: "400 Euros",
      apartmentId: "Duplex Avenue Victor Hugo",
    },
    {
      number: 1,
      area: "65m2",
      price: "400 Euros",
      apartmentId: "Duplex Avenue Victor Hugo",
    },
    {
      number: 1,
      area: "65m2",
      price: "400 Euros",
      apartmentId: "Duplex Avenue Victor Hugo",
    },
  ];
  return (
    <div className="roomsContainer container">
      <div className="titleContainer">
        <h2>Chambres</h2>
      </div>
      <div className="tableContainer">
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={{ defaultPageSize: 10, total: 13 }}
        />
      </div>
    </div>
  );
};

export default Rooms;
