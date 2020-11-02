import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Card, Row, Col, Divider, List, Popconfirm, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import api from "../../services/api";

import "./Details.less";

const { Meta } = Card;

const ApartmentsDetails = ({ match }) => {
  const history = useHistory();
  const [apartments, setApartments] = useState(null);
  const [apartmentsLoaded, setApartmentsLoaded] = useState(false);
  const currentApart =
    apartmentsLoaded && apartments.find((a) => a.id === match.params.id);
  console.log("currentApart", currentApart);

  useEffect(() => {
    const id = match.params.id;
    if (!apartmentsLoaded && id !== undefined) {
      api.fetchCollection("apartment").then((response) => {
        console.log("response fetch apartment", response);
        setApartments(response.data.apartments);
        setApartmentsLoaded(true);
      });
    }
  }, [apartmentsLoaded, match]);

  const Desription = () =>
    apartmentsLoaded && (
      <>
        <ul>
          <li>
            <span>Nombre: {currentApart.number}</span>
          </li>
          <li>
            <span>
              Adresse: {currentApart.street} {currentApart.zipCode}
            </span>
          </li>
        </ul>
        <Divider orientation="left">Chambres</Divider>
        <List
          size="small"
          // bordered
          dataSource={currentApart.rooms}
          renderItem={(item) => (
            <List.Item>
              <span> Emplacement: {item.area}</span>
              <span> {item.price} Euros</span>
            </List.Item>
          )}
        />
      </>
    );

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
              loading={!apartmentsLoaded}
              cover={<img alt="example" src="/assets/img/apart2.jpg" />}
              actions={[
                <EditOutlined
                  disabled
                  key="edit"
                  onClick={() => {
                    history.push(`/apartments/edit/${currentApart.id}`);
                  }}
                />,
                <Popconfirm
                  title={`Êtes-vous sûr de vouloir supprimer l'appartement « ${currentApart.name} » ?`}
                  onConfirm={() => deleteApartment(currentApart.id)}
                >
                  <DeleteOutlined key="ellipsis" />
                </Popconfirm>,
              ]}
            >
              <Meta
                title={apartmentsLoaded && currentApart.name}
                description={<Desription />}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withRouter(ApartmentsDetails);
