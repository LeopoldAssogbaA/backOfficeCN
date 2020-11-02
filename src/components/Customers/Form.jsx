import { useHistory, withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Input, Form, Button, Row, Col, message } from "antd";

import "./Form.less";
import { RollbackOutlined, SaveOutlined } from "@ant-design/icons";
import api from "../../services/api";
import layout from "../../constants/layout";

const CustomersForm = ({ match }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const initialValues = { name: "", multiple: false };
  const [customer, setCustomer] = useState(null);
  const [customerLoaded, setCustomerLoaded] = useState(false);

  useEffect(() => {
    const id = match.params.id;
    if (!customerLoaded && id !== undefined) {
      api.fetch("client", id).then((response) => {
        console.log("response fetch customer", response.data);
        setCustomerLoaded(true);
        form.setFieldsValue({
          firstName: response.data.client.firstName,
          lastName: response.data.client.lastName,
          email: response.data.client.email,
          birthDate: response.data.client.birthDate,
          phone: response.data.client.phone,
        });
      });
    }
  }, [customerLoaded, form, match]);

  const onFormFinish = (values) => {
    console.log("onFormFinish(), values:", values);
    // check that appartment has one room at least
    api.create("client", values).then((res) => {
      if (res.status === 201) {
        message.success("Le nouvel utilisateur a été enregistré.");
        console.log("res", res);
        history.push("/customers");
      }
    });
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

  const getFormItemLayout = () =>
    Object.keys(formLayout.wrapperCol).reduce((formItemLayout, breakpoint) => {
      formItemLayout[breakpoint] = {
        span: formLayout.wrapperCol[breakpoint].span,
        offset: formLayout.labelCol[breakpoint].span,
      };
      return formItemLayout;
    }, {});

  return (
    <div className="customersFormContainer container">
      <div className="titleContainer">
        <h2>
          {match.params.id !== undefined ? "Edition" : "Création"} d'un client
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
                <Input placeholder="Numéro de téléphone" type="phone" />
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
                  onClick={() => history.push("/customers")}
                />
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(CustomersForm);
