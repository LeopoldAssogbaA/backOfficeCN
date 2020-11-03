import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Card, Row, Col, Divider, Popconfirm, message, Empty } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import api from "../../services/api";

import "./Details.less";

const { Meta } = Card;

const CustomersDetails = ({ match }) => {
  const history = useHistory();
  const [customer, setCustomer] = useState(null);
  const [customerLoaded, setCustomerLoaded] = useState(false);

  useEffect(() => {
    const id = match.params.id;
    if (!customerLoaded && id !== undefined) {
      api.fetch("client", id).then((response) => {
        console.log("response fetch customer", response.data.client);
        setCustomer(response.data.client);
        setCustomerLoaded(true);
      });
    }
  }, [customerLoaded, match]);

  const Desription = () =>
    customerLoaded && (
      <>
        <ul>
          <li>
            <h4>Email:</h4>{" "}
            <a href={`mailto: ${customer.email}`}>
              {customer.email ? customer.email : "non renseigné"}
            </a>
            {customer.email}
          </li>
          <li>
            <h4>Nationalité: </h4>
            {customer.nationality}
          </li>
          <li>
            <h4>Téléphone: </h4>
            {customer.phone}
          </li>
          <li>
            <h4>Nationalité: </h4>
            {customer.nationality}
          </li>
          <li>
            <h4>Date de Nissance: </h4>
            {customer.birthDate}
          </li>
        </ul>
        <Divider orientation="left">Réservations</Divider>
        {customer.bookings.length < 0 ? (
          "Réservation"
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={"Aucune réservations"}
          />
        )}
      </>
    );

  const deleteCustomer = (id) => {
    api
      .delete("customer", id)
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
    <div className="customersDetailsContainer container">
      <div className="titleContainer">
        <h2> Détails</h2>
      </div>
      <div className="cardContainer">
        <Row>
          <Col {...layout.col}>
            <Card
              loading={!customerLoaded}
              cover={<img alt="example" src="/assets/img/avatar.jpg" />}
              actions={[
                <EditOutlined
                  disabled
                  key="edit"
                  onClick={() => {
                    history.push(`/customers/edit/${match.params.id}`);
                  }}
                />,
                <Popconfirm
                  title={`Êtes-vous sûr de vouloir supprimer l'appartement « ${
                    customerLoaded && customer.area
                  } » ?`}
                  onConfirm={() => deleteCustomer(match.params.id)}
                >
                  <DeleteOutlined key="ellipsis" />
                </Popconfirm>,
              ]}
            >
              <Meta
                title={
                  customerLoaded && `${customer.firstName} ${customer.lastName}`
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

export default withRouter(CustomersDetails);
