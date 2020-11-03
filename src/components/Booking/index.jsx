import React, { useEffect, useState } from "react";
import { Button, Col, message, Popconfirm, Row, Space, Table } from "antd";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import "./index.less";
import {
  DeleteOutlined,
  // EditOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import layout from "../../constants/layout";

const Booking = () => {
  const history = useHistory();
  const [bookings, setBookings] = useState([]);
  const [bookingsLoaded, setBookingsLoaded] = useState(false);

  useEffect(() => {
    const data = [
      {
        key: "1",
        name: "John Brown",
        number: 32,
        address: "New York No. 1 Lake Park",
        bookings: "Appartement rue jean jaures",
      },
    ];

    if (!bookingsLoaded) {
      api
        .fetchCollection("booking")
        .then((response) => {
          if (response && "data" in response && response.data.length !== 0) {
            // console.log("response.data", response);
            if (response.data.bookings.length !== 0) {
              setBookings(response.data.bookings);
            } else {
              setBookings(data);
            }
            setBookingsLoaded(true);
          }
        })
        .catch((e) => {
          // console.log("errors", e);
          message.error("Une erreur est survenue");
          message.error(JSON.stringify(e));
        });
    }
  }, [bookingsLoaded]);

  const columns = [
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      render: (client) => client.firstName + " " + client.lastName,
    },
    {
      title: "Chambre",
      key: "room",
      dataIndex: "room",
      render: (room) => (
        <>
          <h4>{room.apartment.name}</h4>
          <h5>Emplacement: {room.area}</h5>
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
            onClick={() => history.push(`/booking/details/${record.id}`)}
          />
          {/* <Button
            icon={<EditOutlined />}
            onClick={() => history.push(`booking/edit/${record.id}`)}
          /> */}
          <Popconfirm
            title={`Êtes-vous sûr de vouloir supprimer la réservation « ${record.client.firstName}  ${record.client.lastName} » ?`}
            onConfirm={() => deleteBooking(record.id)}
          >
            <Button icon={<DeleteOutlined />} type="danger" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteBooking = (id) => {
    api
      .delete("room", id)
      .then((response) => {
        // console.log("response delete", response);
        if (response) {
          message.success("l'appartement bien été supprimé");
        } else {
        }
      })
      .catch((e) => {
        // console.log("error delete", e);
        message.error("Une erreur est survenue");
        message.error(JSON.stringify("erreur", e));
      });
  };

  // console.log("bookings", bookings);

  return (
    <div className="bookingContainer container">
      <div className="titleContainer">
        <h2>Réservations</h2>
        <div>
          <Link to="/booking/create">
            <Button icon={<PlusOutlined color="black" />}>
              Créer une Réservation
            </Button>
          </Link>
        </div>
      </div>
      <Row>
        <Col {...layout.col}>
          <div className="tableContainer">
            <Table
              loading={!bookingsLoaded}
              columns={columns}
              dataSource={bookings}
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

export default Booking;
