import { useHistory, withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Select, TreeSelect, message } from "antd";

import "./Form.less";
import { RollbackOutlined, SaveOutlined } from "@ant-design/icons";
import layout from "../../constants/layout";
import api from "../../services/api";

const BookingForm = ({ match }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const initialValues = {};
  const [apartmentId, setApartmentId] = useState(null);
  const [apartments, setApartments] = useState([]);
  const [apartmentsLoaded, setApartmentsLoaded] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customersLoaded, setCustomersLoaded] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [bookingsLoaded, setBookingsLoaded] = useState(false);

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
            // console.log("response.data", response);
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

  useEffect(() => {
    if (!apartmentsLoaded) {
      api.fetchCollection("apartment").then((response) => {
        // console.log("response fetch apartment", response);
        setApartments(
          response.data.apartments.map((a) => ({
            value: a.id,
            title: a.name,
            key: a.id,
            disabled: true,
            children: a.rooms.map((r) => ({
              value: a.id + "?emplacement=" + r.area,
              title: "Emplacement: " + r.area + ", " + a.name,
              key: a.id + "?emplacement=" + r.area,
            })),
          }))
        );
        setApartmentsLoaded(true);
      });
    }
  }, [apartmentsLoaded, match]);

  useEffect(() => {
    if (!customersLoaded) {
      api
        .fetchCollection("client")
        .then((response) => {
          if (response && "data" in response && response.data.length !== 0) {
            // console.log("response fetch clients", response.data.clients);
            setCustomers(response.data.clients);
            setCustomersLoaded(true);
          }
        })
        .catch((e) => {
          // console.log("errors", e);
          message.error("Une erreur est survenue");
          message.error(JSON.stringify(e));
        });
    }
  }, [customersLoaded]);

  const onFormFinish = (values) => {
    // console.log("onFormFinish(), values:", values);
    const newRoowId = values.roomId.split("?emplacement=")[0];
    // console.log("newRoowId", newRoowId);
    const newCustomerId = values.clientId.split("?id=")[1];
    // console.log("newCustomerId", newCustomerId);

    const bookedCustomer = customers.find((c) => c.id === newCustomerId);
    if (bookedCustomer.bookings.length !== 0) {
      return message.error(
        "Choisissez un autre client, ce dernier à déjà une réservation en cours"
      );
    }

    // const bookedRoom = bookings.find(b => b)

    const bookdedRoomIndex = apartments.findIndex((r) => r.key === newRoowId);
    // console.log("bookdedRoom", apartments[bookdedRoomIndex].title);
    // console.log("bookings", bookings[0].room.apartment.name);

    const apartBooked = bookings.find(
      (b) => b.room.apartment.name === apartments[bookdedRoomIndex].title
    );

    if (apartBooked !== undefined) {
      return message.error(
        "Choisissez une autre chambre. Cette chambre est déja réservée."
      );
    }

    const currentCustomer = customers.find((c) => c.id === newCustomerId);

    for (const [key, value] of Object.entries(currentCustomer)) {
      console.log(`${key}: ${value}`);

      if (value === undefined || value === null) {
        return message.error(
          `Le champ "${key}" est manquant pour ${currentCustomer.firstName} ${currentCustomer.lastName}. Veuillez le renseigner.`
        );
      }
    }

    api
      .create("client", { clientId: newCustomerId, apartmentId: newRoowId })
      .then((response) => {
        // console.log("response", response);
        if (response.status === 201) {
          message.success("Votre réservation à été enregistrée.");
          history.push("/booking");
        }
      });
  };

  const getFormItemLayout = () =>
    Object.keys(layout.form.wrapperCol).reduce((formItemLayout, breakpoint) => {
      formItemLayout[breakpoint] = {
        span: layout.form.wrapperCol[breakpoint].span,
        offset: layout.form.labelCol[breakpoint].span,
      };
      return formItemLayout;
    }, {});

  function onChange(value) {
    // console.log(`selected ${value}`);
    setApartmentId(value);
  }

  return (
    <div className="bookingFormContainer container">
      <div className="titleContainer">
        <h2>
          {match.params.id !== undefined ? "Edition" : "Création"} d'une
          réservation
        </h2>
      </div>
      <Row>
        <Col {...layout.col}>
          <div className="formContainer">
            <Form
              {...layout.form}
              initialValues={initialValues}
              form={form}
              onFinish={onFormFinish}
            >
              <Form.Item
                label="Client"
                name="clientId"
                value="clientId"
                rules={[
                  {
                    required: true,
                    message: "Choisissez un client",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Choisissez un client"
                  optionFilterProp="children"
                  onChange={(e) => onChange(e)}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {customersLoaded &&
                    customers.map((customer) => {
                      return (
                        <Select.Option
                          key={customer.id}
                          value={`${customer.firstName} ${customer.lastName} ?id=${customer.id}`}
                        >
                          {`${customer.firstName} ${customer.lastName}`}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>

              <Form.Item
                label="Chambre"
                name="roomId"
                rules={[
                  {
                    required: true,
                    message: "Choisissez une chambre",
                  },
                ]}
              >
                <TreeSelect
                  style={{ width: "100%" }}
                  value={apartmentId}
                  dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  treeData={apartmentsLoaded && apartments}
                  placeholder="Please select"
                  treeDefaultExpandAll
                  onChange={(e) => onChange(e)}
                />
              </Form.Item>

              <Form.Item wrapperCol={getFormItemLayout()}>
                <Button
                  style={{ marginRight: "1em" }}
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => form.submit()}
                >
                  {match.params.id !== undefined ? "Enregister" : "Créer"}
                </Button>
                <Button
                  type="default"
                  icon={<RollbackOutlined />}
                  onClick={() => history.push("/booking")}
                />
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(BookingForm);
