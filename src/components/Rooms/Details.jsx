import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Card, Row, Col, Divider, Popconfirm, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import api from "../../services/api";

import "./Details.less";

const { Meta } = Card;

const RoomsDetails = ({ match }) => {
  const history = useHistory();
  const [room, setRoom] = useState(null);
  const [roomLoaded, setRoomLoaded] = useState(false);

  useEffect(() => {
    const id = match.params.id;
    if (!roomLoaded && id !== undefined) {
      api.fetch("room", id).then((response) => {
        console.log("response fetch room", response.data.room);
        setRoom(response.data.room);
        setRoomLoaded(true);
      });
    }
  }, [roomLoaded, match]);

  const Desription = () =>
    roomLoaded && (
      <>
        <h4>Prix: {room.price} Euros</h4>
        <Divider orientation="left">Appartement</Divider>
        <h4>{room.apartment.name}</h4>
      </>
    );

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

  const layout = {
    xs: { span: 22, offset: 1 },
    sm: { span: 18, offset: 3 },
    md: { span: 20, offset: 2 },
    lg: { span: 12, offset: 6 },
    xl: { span: 12, offset: 6 },
  };
  console.log("match.params.id", match.params.id);
  return (
    <div className="apartmentsDetailsContainer container">
      <div className="titleContainer">
        <h2> Détails</h2>
      </div>
      <div className="cardContainer">
        <Row>
          <Col {...layout}>
            <Card
              loading={!roomLoaded}
              cover={<img alt="example" src="/assets/img/bedroom.jpg" />}
              actions={[
                <EditOutlined
                  disabled
                  key="edit"
                  onClick={() => {
                    history.push(`/rooms/edit/${match.params.id}`);
                  }}
                />,
                <Popconfirm
                  title={`Êtes-vous sûr de vouloir supprimer l'appartement « ${
                    roomLoaded && room.area
                  } » ?`}
                  onConfirm={() => deleteRoom(match.params.id)}
                >
                  <DeleteOutlined key="ellipsis" />
                </Popconfirm>,
              ]}
            >
              <Meta
                title={roomLoaded && "Emplacement " + room.area}
                description={<Desription />}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withRouter(RoomsDetails);
