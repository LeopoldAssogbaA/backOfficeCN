import React from "react";
import { withRouter } from "react-router-dom";
import { RollbackOutlined, SaveOutlined } from "@ant-design/icons";
import { Input, Form, Button } from "antd";

import "./Form.less";

const RoomsForm = ({ match }) => {
  const [form] = Form.useForm();
  const initialValues = {
    number: 5,
    area: 65,
    price: 300,
    apartmentId: "2 Avenue Jean Jaures",
  };

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

  return (
    <div className="roomsFormContainer container">
      <div className="titleContainer">
        <h2>
          {match.params.id !== undefined ? "Edition" : "Création"} d'une chambre
        </h2>
      </div>
      <div className="formContainer">
        <Form
          {...formLayout}
          initialValues={initialValues}
          form={form}
          onFinish={onFormFinish}
        >
          <Form.Item label="Numéro" name="number" value="number">
            <Input placeholder="Numéro" type="number" />
          </Form.Item>
          {/* TODO: edit validators */}
          <Form.Item
            label="Surface"
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
            <Input placeholder="Surface" type="number" />
          </Form.Item>
          <Form.Item
            label="Surface"
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
            <Input placeholder="Surface" type="number" />
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
            <Input placeholder="Prix" type="number" />
          </Form.Item>
          {/* TODO: replace by Select */}
          <Form.Item
            label="Appartement"
            name="appartementId"
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
              onClick={() => {}}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(RoomsForm);
