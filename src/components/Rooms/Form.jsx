import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { RollbackOutlined, SaveOutlined } from "@ant-design/icons";
import { Input, Form, Button, Row, Col, message, Select } from "antd";

import "./Form.less";
import api from "../../services/api";
import layout from "../../constants/layout";

const { Option } = Select;

const RoomsForm = ({ match }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const initialValues = {};
  const [room, setRoom] = useState(null);
  const [roomLoaded, setRoomLoaded] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [apartmentsLoaded, setApartmentsLoaded] = useState(false);
  // handle rooms delete
  // const [roomsBeforeUpdate, setroomsBeforeUpdate] = useState([]);

  useEffect(() => {
    if (!apartmentsLoaded) {
      api.fetchCollection("apartment").then((response) => {
        console.log("response fetch apartment", response);
        setApartments(response.data.apartments);
        setApartmentsLoaded(true);
      });
    }
  }, [apartmentsLoaded, match]);

  useEffect(() => {
    const id = match.params.id;
    if (!roomLoaded && id !== undefined) {
      api.fetch("room", id).then((response) => {
        console.log("response fetch room", response);
        setRoom(response.data.room);
        form.setFieldsValue({
          number: response.data.room.number,
          area: response.data.room.area,
          price: response.data.room.price,
          apartment: response.data.room.apartment.name,
        });
        setRoomLoaded(true);
      });
    }
  }, [roomLoaded, match, form]);

  const onFormFinish = (values) => {
    console.log("onFormFinish(), values:", values);
    const id = match.params.id;
    const apartmentId = apartments.find((a) => a.name === values.apartment).id;
    const newRoom = {
      number: values.number,
      area: values.area,
      price: values.price,
      apartmentId,
    };
    console.log("newRoom", newRoom);

    if (id === undefined) {
      api.create("room", newRoom).then((response) => {
        if (response.status === 201) {
          message.success("Votre chambre à été enregistrée.");
          history.push("/rooms");
        }
      });
    } else {
      api
        .update("room", id, newRoom)
        .then((response) => {
          if (response.status === 201) {
            message.success("Votre chambre à été enregistrée.");
            history.push("/rooms");
          }
        })
        .catch((e) => {
          console.log("error put request", e);
          message.error("Une erreur est survenue.");
          message.error(JSON.stringify(e));
        });
    }
  };

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  console.log("initialValues", initialValues);

  const getFormItemLayout = () =>
    Object.keys(layout.form.wrapperCol).reduce((formItemLayout, breakpoint) => {
      formItemLayout[breakpoint] = {
        span: layout.form.wrapperCol[breakpoint].span,
        offset: layout.form.labelCol[breakpoint].span,
      };
      return formItemLayout;
    }, {});

  return (
    <div className="roomsFormContainer container">
      <div className="titleContainer">
        <h2>
          {match.params.id !== undefined ? "Edition" : "Création"} d'une chambre
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
                label="Numéro"
                name="number"
                rules={[
                  {
                    required: true,
                    message: "Choisissez un numéro",
                  },
                ]}
              >
                <Input placeholder="Numéro" type="text" />
              </Form.Item>
              {/* TODO: edit validators */}
              <Form.Item
                label="Emplacement"
                name="area"
                rules={[
                  {
                    required: true,
                    message: "Saisissez une surface",
                  },
                ]}
              >
                <Input placeholder="Emplacement" type="text" />
              </Form.Item>
              <Form.Item
                label="Prix"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Saisissez un prix",
                  },
                ]}
              >
                <Input placeholder="Prix" type="text" />
              </Form.Item>
              {/* TODO: replace by Select */}
              <Form.Item
                label="Appartement"
                name="apartment"
                rules={[
                  {
                    required: true,
                    message: "Choisissez un appartement",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Choisissez un appartement"
                  optionFilterProp="children"
                  onChange={(e) => onChange(e)}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {apartmentsLoaded &&
                    apartments.map((apart) => {
                      return (
                        <Option key={apart.id} value={apart.name}>
                          {apart.name}
                        </Option>
                      );
                    })}
                </Select>
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
                  onClick={() => history.push("/rooms")}
                />
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(RoomsForm);
