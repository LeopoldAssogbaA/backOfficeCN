import React, { useEffect, useState } from "react";
import { Button, Col, message, Popconfirm, Row, Space, Table, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import api from "../../services/api";

import "./index.less";
import layout from "../../constants/layout";

const Apartments = () => {
  const history = useHistory();
  const [apartments, setApartments] = useState([]);
  const [apartmentsLoaded, setApartmentsLoaded] = useState(false);

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

    if (!apartmentsLoaded) {
      api
        .fetchCollection("apartment")
        .then((response) => {
          if (response && "data" in response && response.data.length !== 0) {
            console.log("response.data", response);
            if (response.data.apartments.length !== 0) {
              setApartments(response.data.apartments);
            } else {
              setApartments(data);
            }
            setApartmentsLoaded(true);
          }
        })
        .catch((e) => {
          console.log("errors", e);
        });
    }
  }, [apartmentsLoaded]);

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
      render: (text) => text,
    },
    {
      title: "Chambres",
      key: "rooms",
      dataIndex: "rooms",
      render: (rooms) => (
        <>
          {rooms.map((room, i) => {
            let color = i % 2 === 0 ? "geekblue" : "green";

            return (
              <Tag color={color} key={uuidv4()}>
                {room.area.toUpperCase()}
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
        <Space size="small">
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => history.push(`apartments/details/${record.id}`)}
          />
          {/* <Button
            icon={<EditOutlined />}
            onClick={() => history.push(`apartments/edit/${record.id}`)}
          /> */}
          <Popconfirm
            title={`Êtes-vous sûr de vouloir supprimer l'appartement « ${record.name} » ?`}
            onConfirm={() => deleteApartment(record.id)}
          >
            <Button icon={<DeleteOutlined />} type="danger" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteApartment = (id) => {
    api
      .delete("apartments", id)
      .then((response) => {
        console.log("response delete", response);
        if (response) {
          message.success("l'appartement bien été supprimé");
        } else {
        }
      })
      .catch((e) => {
        console.log("error delete", e);
        message.error(JSON.stringify("erreur", e));
      });
  };

  // console.log("apartments", apartments);
  return (
    <div className="apartmentsContainer container">
      <div className="titleContainer">
        <h2>Appartements</h2>
        <div>
          <Link to="/apartments/create">
            <Button icon={<PlusOutlined color="black" />}>
              Ajouter un apparterment
            </Button>
          </Link>
        </div>
      </div>
      <Row>
        <Col {...layout}>
          <div className="tableContainer">
            <Table
              loading={!apartmentsLoaded}
              columns={columns}
              dataSource={apartments.map((a, i) => ({ ...a, key: uuidv4() }))}
              bordered
              pagination={false}
              // pagination={{ defaultPageSize: 10, total: 13 }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Apartments;
