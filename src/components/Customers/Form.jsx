import { withRouter } from "react-router-dom";
import React from "react";
import { Input, Form, Button } from "antd";

import "./Form.less";
import { RollbackOutlined, SaveOutlined } from "@ant-design/icons";

const CustomersForm = ({ match }) => {
  const [form] = Form.useForm();
  const initialValues = {
    firstName: "Jean",
    lastName: "Bon",
    email: "jeanBon@email.com",
    phone: "06 62 62 62 62",
    birthDate: "1 janvier 2020",
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
    <div className="customersFormContainer container">
      <div className="titleContainer">
        <h2>
          {match.params.id !== undefined ? "Edition" : "Création"} d'un client
        </h2>
      </div>
      <div className="formContainer">
        <Form
          {...formLayout}
          initialValues={initialValues}
          form={form}
          onFinish={onFormFinish}
        >
          <Form.Item
            label="Nom"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Saisissez un nom",
              },
              {
                min: 2,
                message: "Votre nom est trop court",
              },
            ]}
          >
            <Input placeholder="Nom" />
          </Form.Item>
          <Form.Item
            label="Prénom"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Saisissez un prénom",
              },
              {
                min: 2,
                message: "Votre prénom est trop court",
              },
            ]}
          >
            <Input placeholder="Prénom" />
          </Form.Item>
          {/* TODO: email validator */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Saisissez un email",
              },
              {
                min: 2,
                message: "Votre email est trop court",
              },
            ]}
          >
            <Input placeholder="Adresse email" />
          </Form.Item>
          <Form.Item
            label="Téléphone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Saisissez un numéro de téléphone",
              },
              {
                min: 2,
                message: "Votre numéro de téléphone est trop court",
              },
            ]}
          >
            <Input placeholder="Numéro de téléphone" />
          </Form.Item>
          {/* Upgrade with date picker */}
          <Form.Item
            label="Date de naissance"
            name="birthDate"
            rules={[
              {
                required: true,
                message: "Saisissez une date de naissance",
              },
              {
                min: 2,
                message: "Votre une date de naissance est trop courte",
              },
            ]}
          >
            <Input placeholder="Date de naissance" />
          </Form.Item>

          <Form.Item>
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

export default withRouter(CustomersForm);
