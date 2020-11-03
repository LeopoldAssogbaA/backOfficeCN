import { useHistory, withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Input,
  Form,
  Button,
  Row,
  Col,
  message,
  DatePicker,
  Select,
} from "antd";
import { RollbackOutlined, SaveOutlined } from "@ant-design/icons";

import "./Form.less";
import api from "../../services/api";
import layout from "../../constants/layout";
import { Option } from "antd/lib/mentions";

import moment from "moment";

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
        // console.log(
        //   "response fetch customer",
        //   moment(response.data.client.birthDate, "YYYY-MM-DD")
        // );
        setCustomer(response.data.client);
        setCustomerLoaded(true);
        form.setFieldsValue({
          firstName: response.data.client.firstName,
          lastName: response.data.client.lastName,
          email: response.data.client.email,
          birthDate: moment(response.data.client.birthDate, "YYYY-MM-DD"),
          phone: response.data.client.phone,
        });
      });
    }
  }, [customerLoaded, form, match]);

  const onFormFinish = (values) => {
    const id = match.params.id;
    const newCustomer = {
      lastName: values.lastName,
      firstName: values.firstName,
      email: values.email,
      phone: values.prefix + values.phone,
      birthDate: moment(values.birthDate).format("YYYY-MM-DD"),
    };
    // console.log("onFormFinish(), newCustomer:", newCustomer);

    if (id === undefined) {
      api
        .create("client", newCustomer)
        .then((res) => {
          if (res.status === 201) {
            message.success("Le nouvel utilisateur a été enregistré.");
            // console.log("res", res);
            history.push("/customers");
          }
        })
        .catch((e) => {
          // console.log("error post request", e);
          message.error("Une erreur est survenue.");
          message.error(JSON.stringify(e));
        });
    } else {
      api
        .update("client", id, newCustomer)
        .then((res) => {
          if (res.status === 201) {
            message.success("L'utilisateur a été modifé.");
            // console.log("res", res);
            history.push("/customers");
          }
        })
        .catch((e) => {
          // console.log("error put request", e);
          message.error("Une erreur est survenue.");
          message.error(JSON.stringify(e));
        });
    }
  };

  const getFormItemLayout = () =>
    Object.keys(layout.form.wrapperCol).reduce((formItemLayout, breakpoint) => {
      formItemLayout[breakpoint] = {
        span: layout.form.wrapperCol[breakpoint].span,
        offset: layout.form.labelCol[breakpoint].span,
      };
      return formItemLayout;
    }, {});

  function onChange(date, dateString) {
    // console.log(date, dateString);
    form.setFieldsValue("birthDate", dateString);
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="33">+33</Option>
      </Select>
    </Form.Item>
  );

  const dateFormatList = "YYYY-MM-DD";

  return (
    <div className="customersFormContainer container">
      <div className="titleContainer">
        <h2>
          {match.params.id !== undefined ? "Edition" : "Création"} d'un client
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
                    type: "email",
                    message: "Saisissez une adresse e-mail valide",
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
                    min: 9,
                    message: "Votre numéro de téléphone est au mauvais format",
                  },
                  {
                    max: 9,
                    message: "Votre numéro de téléphone est au mauvais format",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{ width: "100%" }}
                  placeholder="Numéro de téléphone"
                />
              </Form.Item>
              <Form.Item
                label="Date de naissance"
                name="birthDate"
                rules={[
                  {
                    required: true,
                    message: "Saisissez une date de naissance",
                  },
                ]}
              >
                <DatePicker onChange={onChange} format={dateFormatList} />
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
