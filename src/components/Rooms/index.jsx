import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Col, message, Popconfirm, Row, Space, Table } from "antd";
import { v4 as uuidv4 } from "uuid";

import api from "../../services/api";

import "./index.less";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import layout from "../../constants/layout";

const Rooms = () => {
  const history = useHistory();
  const [rooms, setRooms] = useState([]);
  const [roomsLoaded, setRoomsLoaded] = useState(false);

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

    if (!roomsLoaded) {
      api
        .fetchCollection("room")
        .then((response) => {
          if (response && "data" in response && response.data.length !== 0) {
            console.log("response.data", response);
            if (response.data.rooms.length !== 0) {
              setRooms(response.data.rooms);
            } else {
              setRooms(data);
            }
            setRoomsLoaded(true);
          }
        })
        .catch((e) => {
          console.log("errors", e);
        });
    }
  }, [roomsLoaded]);

  const columns = [
    {
      title: "Appartement",
      dataIndex: "apartment",
      key: "apartment",
      render: (apartment) => apartment.name,
    },
    {
      title: "Emplacement",
      dataIndex: "area",
      key: "area",
      render: (text) => text,
    },
    {
      title: "Prix",
      dataIndex: "price",
      key: "price",
      render: (text) => text + " Euros",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => history.push(`/rooms/details/${record.id}`)}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => history.push(`/rooms/edit/${record.id}`)}
          />
          <Popconfirm
            title={`Êtes-vous sûr de vouloir supprimer l'appartement « ${record.name} » ?`}
            onConfirm={() => deleteRoom(record.id)}
          >
            <Button icon={<DeleteOutlined />} type="danger" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteRoom = (id) => {
    api
      .delete("room", id)
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

  return (
    <div className="roomsContainer container">
      <div className="titleContainer">
        <h2>Chambres</h2>
        <div>
          <Link to="/rooms/create">
            <Button icon={<PlusOutlined color="black" />}>
              Ajouter une chambre
            </Button>
          </Link>
        </div>
      </div>
      <Row>
        <Col {...layout}>
          <div className="tableContainer">
            <Table
              loading={!roomsLoaded}
              columns={columns}
              dataSource={rooms.map((r) => ({ ...r, key: uuidv4() }))}
              bordered
              // pagination={false}
              pagination={{
                defaultPageSize: 8,
                total: roomsLoaded && rooms.length,
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Rooms;
