import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, Row, Col, Divider, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { format } from "date-fns";

import api from "../../services/api";

import "./Details.less";
import layout from "../../constants/layout";

const { Meta } = Card;

const BookingDetails = ({ match }) => {
  const [booking, setBooking] = useState(null);
  const [bookingLoaded, setBookingLoaded] = useState(false);

  useEffect(() => {
    const id = match.params.id;
    if (!bookingLoaded && id !== undefined) {
      api.fetch("booking", id).then((response) => {
        // console.log("response fetch booking", response.data.booking);
        setBooking(response.data.booking);
        setBookingLoaded(true);
      });
    }
  }, [bookingLoaded, match]);

  const Desription = () =>
    bookingLoaded && (
      <>
        <ul>
          <li>
            <h4>Date de réservation: </h4>
            <span>{format(new Date(booking.createdAt), "MM/dd/yyyy")} </span>
          </li>
        </ul>
        <Divider orientation="left">Client</Divider>
        <h4>{`${booking.client.firstName} ${booking.client.lastName}`}</h4>
        <Divider orientation="left">Chambre</Divider>
        <h4>{`${booking.room.apartment.name}, Emplacement: ${booking.room.area}`}</h4>
      </>
    );

  const deleteBooking = (id) => {
    api
      .delete("booking", id)
      .then((response) => {
        // console.log("response delete", response);
        if (response) {
          message.success("la réservation bien été supprimé");
        } else {
        }
      })
      .catch((e) => {
        // console.log("error delete", e);
        message.error("Une erreur est survenue");
        message.error(JSON.stringify("erreur", e));
      });
  };

  // console.log("match.params.id", match.params.id);
  return (
    <div className="bookingDetailsContaner container">
      <div className="titleContainer">
        <h2> Détails</h2>
      </div>
      <div className="cardContainer">
        <Row>
          <Col {...layout.col}>
            <Card
              loading={!bookingLoaded}
              cover={<img alt="example" src="/assets/img/booking.jpg" />}
              actions={[
                // <EditOutlined
                //   disabled
                //   key="edit"
                //   onClick={() => {
                //     history.push(`/booking/edit/${match.params.id}`);
                //   }}
                // />,
                <Popconfirm
                  title={`Êtes-vous sûr de vouloir supprimer la réservation de « ${
                    bookingLoaded &&
                    booking.client.firstName + " " + booking.client.lastName
                  } » ?`}
                  onConfirm={() => deleteBooking(match.params.id)}
                >
                  <DeleteOutlined key="ellipsis" />
                </Popconfirm>,
              ]}
            >
              <Meta
                title={
                  bookingLoaded &&
                  `Réservation de ${booking.client.firstName} ${booking.client.lastName}`
                }
                description={<Desription />}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withRouter(BookingDetails);
