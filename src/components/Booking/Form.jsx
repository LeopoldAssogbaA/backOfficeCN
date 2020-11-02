import { useHistory, withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Input,
  Form,
  Button,
  Row,
  Col,
  Select,
  TreeSelect,
  message,
} from "antd";

import "./Form.less";
import { RollbackOutlined, SaveOutlined } from "@ant-design/icons";
import layout from "../../constants/layout";
import api from "../../services/api";

const Option = Select;

const BookingForm = ({ match }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const initialValues = {};
  const [apartmentId, setApartmentId] = useState(null);
  const [apartments, setApartments] = useState([]);
  const [apartmentsLoaded, setApartmentsLoaded] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customersLoaded, setCustomersLoaded] = useState(false);

  useEffect(() => {
    if (!apartmentsLoaded) {
      api.fetchCollection("apartment").then((response) => {
        console.log("response fetch apartment", response);
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
            console.log("response fetch clients", response);
            setCustomers(response.data.clients);
            setCustomersLoaded(true);
          }
        })
        .catch((e) => {
          console.log("errors", e);
        });
    }
  }, [customersLoaded]);

  const onFormFinish = (values) => {
    console.log("onFormFinish(), values:", values);
    const newRoowId = values.roomId.split("?emplacement=")[0];
    console.log("newRoowId", newRoowId);
    const newCustomerId = values.clientId.split("?id=")[1];
    console.log("newCustomerId", newCustomerId);

    api
      .create("client", { clientId: newCustomerId, apartmentId: newRoowId })
      .then((response) => {
        console.log("response", response);
        if (response.status === 201) {
          message.success("Votre réservation à été enregistrée.");
          history.push("/booking");
        }
      });

    // check that question has one room at least
  };

  const formLayout = {
    labelCol: {
      xs: { span: 24 },
      md: { span: 4 },
      lg: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      md: { span: 20 },
      lg: { span: 22 },
    },
  };

  function onChange(value) {
    console.log(`selected ${value}`);
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
        <Col {...layout}>
          <div className="formContainer">
            <Form
              {...formLayout}
              initialValues={initialValues}
              form={form}
              onFinish={onFormFinish}
            >
              <Form.Item label="Client" name="clientId" value="clientId">
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
                        <Option
                          key={customer.id}
                          value={`${customer.firstName} ${customer.lastName} ?id=${customer.id}`}
                        >
                          {`${customer.firstName} ${customer.lastName}`}
                        </Option>
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
                    message: "Saisissez un titre",
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

              <Form.Item wrapperCol={formLayout}>
                <Button
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
