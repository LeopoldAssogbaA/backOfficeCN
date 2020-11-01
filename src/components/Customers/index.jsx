import React from "react";
import { Space, Table, Tag } from "antd";

import "./index.less";

const Customers = () => {
  const columns = [
    {
      title: "Nom",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Prénom",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Téléphone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date de naissance",
      dataIndex: "birthDate",
      key: "birthDate",
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
      key: "1",
      lastName: "Brown",
      firstName: "John",
      email: "johnBrown@email.com",
      phone: "06 62 62 62 62",
      birthDate: "1 janvier 1980",
    },
    {
      key: "1",
      lastName: "Brown",
      firstName: "John",
      email: "johnBrown@email.com",
      phone: "06 62 62 62 62",
      birthDate: "1 janvier 1980",
    },
    {
      key: "1",
      lastName: "Brown",
      firstName: "John",
      email: "johnBrown@email.com",
      phone: "06 62 62 62 62",
      birthDate: "1 janvier 1980",
    },
    {
      key: "1",
      lastName: "Brown",
      firstName: "John",
      email: "johnBrown@email.com",
      phone: "06 62 62 62 62",
      birthDate: "1 janvier 1980",
    },
    {
      key: "1",
      lastName: "Brown",
      firstName: "John",
      email: "johnBrown@email.com",
      phone: "06 62 62 62 62",
      birthDate: "1 janvier 1980",
    },
    {
      key: "1",
      lastName: "Brown",
      firstName: "John",
      email: "johnBrown@email.com",
      phone: "06 62 62 62 62",
      birthDate: "1 janvier 1980",
    },
    {
      key: "1",
      lastName: "Brown",
      firstName: "John",
      email: "johnBrown@email.com",
      phone: "06 62 62 62 62",
      birthDate: "1 janvier 1980",
    },
    {
      key: "1",
      lastName: "Brown",
      firstName: "John",
      email: "johnBrown@email.com",
      phone: "06 62 62 62 62",
      birthDate: "1 janvier 1980",
    },
    {
      key: "1",
      lastName: "Brown",
      firstName: "John",
      email: "johnBrown@email.com",
      phone: "06 62 62 62 62",
      birthDate: "1 janvier 1980",
    },
    {
      key: "1",
      lastName: "Brown",
      firstName: "John",
      email: "johnBrown@email.com",
      phone: "06 62 62 62 62",
      birthDate: "1 janvier 1980",
    },
    {
      key: "1",
      lastName: "Brown",
      firstName: "John",
      email: "johnBrown@email.com",
      phone: "06 62 62 62 62",
      birthDate: "1 janvier 1980",
    },
  ];
  return (
    <div className="customersContainer container">
      <div className="titleContainer">
        <h2>Clients</h2>
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

export default Customers;
