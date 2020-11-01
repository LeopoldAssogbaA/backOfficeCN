import React from "react";
import { Space, Table, Tag } from "antd";

import "./index.less";

const Apartments = () => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Chambres",
      key: "rooms",
      dataIndex: "rooms",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          Invite {record.name}
          Delete
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      number: 32,
      address: "New York No. 1 Lake Park",
      rooms: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      number: 42,
      address: "London No. 1 Lake Park",
      rooms: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      number: 32,
      address: "Sidney No. 1 Lake Park",
      rooms: ["cool", "teacher"],
    },
    {
      key: "1",
      name: "John Brown",
      number: 32,
      address: "New York No. 1 Lake Park",
      rooms: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      number: 42,
      address: "London No. 1 Lake Park",
      rooms: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      number: 32,
      address: "Sidney No. 1 Lake Park",
      rooms: ["cool", "teacher"],
    },
    {
      key: "1",
      name: "John Brown",
      number: 32,
      address: "New York No. 1 Lake Park",
      rooms: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      number: 42,
      address: "London No. 1 Lake Park",
      rooms: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      number: 32,
      address: "Sidney No. 1 Lake Park",
      rooms: ["cool", "teacher"],
    },
    {
      key: "1",
      name: "John Brown",
      number: 32,
      address: "New York No. 1 Lake Park",
      rooms: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      number: 42,
      address: "London No. 1 Lake Park",
      rooms: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      number: 32,
      address: "Sidney No. 1 Lake Park",
      rooms: ["cool", "teacher"],
    },
  ];
  return (
    <div className="apartmentsContainer container">
      <div className="titleContainer">
        <h2>Appartements</h2>
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

export default Apartments;
