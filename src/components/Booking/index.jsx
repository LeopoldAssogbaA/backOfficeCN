import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm, Space, Table } from "antd";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import "./index.less";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

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
            console.log("response.data", response);
            if (response.data.bookings.length !== 0) {
              setBookings(response.data.bookings);
            } else {
              setBookings(data);
            }
            setBookingsLoaded(true);
          }
        })
        .catch((e) => {
          console.log("errors", e);
        });
    }
  }, [bookingsLoaded]);

  const columns = [
    {
      title: "Client",
      dataIndex: "name",
      key: "name",
      render: (text) => text,
    },
    {
      title: "Chambre",
      key: "bookings",
      dataIndex: "bookings",
      render: (text) => text,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <Button
            icon={<EditOutlined />}
            onClick={() => history.push(`booking/edit/${record.id}`)}
          />
          <Popconfirm
            title={`Êtes-vous sûr de vouloir supprimer l'appartement « ${record.name} » ?`}
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
    </div>
  );
};

export default Booking;
