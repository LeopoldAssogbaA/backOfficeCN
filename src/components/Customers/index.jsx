import React, { useEffect, useState } from "react";
import { Button, Col, message, Popconfirm, Row, Space, Table } from "antd";

import "./index.less";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";
import layout from "../../constants/layout";

const Customers = () => {
  const history = useHistory();
  const [customers, setCustomers] = useState([]);
  const [customersLoaded, setCustomersLoaded] = useState(false);

  useEffect(() => {
    const data = [
      {
        key: "1",
        name: "John Brown",
        number: 32,
        address: "New York No. 1 Lake Park",
        rooms: ["nice", "developer"],
      },
    ];

    if (!customersLoaded) {
      api
        .fetchCollection("client")
        .then((response) => {
          if (response && "data" in response && response.data.length !== 0) {
            // console.log("response.data", response);
            if (response.data.clients.length !== 0) {
              setCustomers(response.data.clients);
            } else {
              setCustomers(data);
            }
            setCustomersLoaded(true);
          }
        })
        .catch((e) => {
          // console.log("errors", e);
        });
    }
  }, [customersLoaded]);

  const columns = [
    {
      title: "Nom",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => text,
    },
    {
      title: "Prénom",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => text,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => text,
    },
    {
      title: "Téléphone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => text,
    },
    {
      title: "Date de naissance",
      dataIndex: "birthDate",
      key: "birthDate",
      render: (text) => text,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => history.push(`/customers/details/${record.id}`)}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => history.push(`customers/edit/${record.id}`)}
          />
          <Popconfirm
            title={`Êtes-vous sûr de vouloir supprimer le client « ${record.firstName} ${record.lastName} » ?`}
            onConfirm={() => deleteCustomer(record.id)}
          >
            <Button icon={<DeleteOutlined />} type="danger" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteCustomer = (id) => {
    // console.log(id);
    api
      .delete("client", id)
      .then((response) => {
        // console.log("response delete", response);
        if (response) {
          message.success("l'appartement bien été supprimé");
        } else {
        }
      })
      .catch((e) => {
        // console.log("error delete", e);
        message.error(JSON.stringify("erreur", e));
      });
  };

  return (
    <div className="customersContainer container">
      <div className="titleContainer">
        <h2>Clients</h2>
        <div>
          <Link to="/customers/create">
            <Button icon={<PlusOutlined color="black" />}>
              Ajouter un client
            </Button>
          </Link>
        </div>
      </div>
      <Row>
        <Col {...layout.col}>
          <div className="tableContainer">
            <Table
              loading={!customersLoaded}
              columns={columns}
              dataSource={customers}
              bordered
              pagination={false}
              // pagination={{ defaultPageSize: 8, total: customers.length }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Customers;
