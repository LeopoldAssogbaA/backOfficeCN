import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { RollbackOutlined, SaveOutlined } from "@ant-design/icons";
import { Input, Form, Button, Row, Col } from "antd";

import "./Form.less";
import api from "../../services/api";
import layout from "../../constants/layout";

const RoomsForm = ({ match }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const initialValues = {};
  const [room, setRoom] = useState(null);
  const [roomLoaded, setRoomLoaded] = useState(false);
  // handle rooms delete
  // const [roomsBeforeUpdate, setroomsBeforeUpdate] = useState([]);

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

  console.log("initialValues", initialValues);

  return (
    <div className="roomsFormContainer container">
      <div className="titleContainer">
        <h2>
          {match.params.id !== undefined ? "Edition" : "Création"} d'une chambre
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
              <Form.Item label="Numéro" name="number">
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
                  {
                    min: 5,
                    message: "Votre une surface est trop petite",
                  },
                ]}
              >
                <Input placeholder="Emplacement" type="text" />
              </Form.Item>
              <Form.Item
                label="Emplacement"
                name="area"
                rules={[
                  {
                    required: true,
                    message: "Saisissez une surface",
                  },
                  {
                    min: 5,
                    message: "Votre une surface est trop petite",
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
                  {
                    min: 5,
                    message: "Votre prix est trop bas",
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
                <Input placeholder="Appartement" type="text" />
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
