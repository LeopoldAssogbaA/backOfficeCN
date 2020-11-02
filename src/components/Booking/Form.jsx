import { useHistory, withRouter } from "react-router-dom";
import React from "react";
import { Input, Form, Button } from "antd";

import "./Form.less";
import { RollbackOutlined, SaveOutlined } from "@ant-design/icons";

const BookingForm = ({ match }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const initialValues = {
    clientId: "Jean Bon",
    roomId: "Chambre n°2 Avenue Victor Hugo",
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
    <div className="bookingFormContainer container">
      <div className="titleContainer">
        <h2>
          {match.params.id !== undefined ? "Edition" : "Création"} d'une
          réservation
        </h2>
      </div>
      <div className="formContainer">
        <Form
          {...formLayout}
          initialValues={initialValues}
          form={form}
          onFinish={onFormFinish}
        >
          <Form.Item label="Client" name="clientId" value="clientId">
            <Input placeholder="Client" />
          </Form.Item>

          <Form.Item
            label="Chambre"
            name="roomID"
            rules={[
              {
                required: true,
                message: "Saisissez un titre",
              },
              {
                min: 5,
                message: "Votre titre est trop court",
              },
            ]}
          >
            <Input placeholder="Chambre" />
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
    </div>
  );
};

export default withRouter(BookingForm);
