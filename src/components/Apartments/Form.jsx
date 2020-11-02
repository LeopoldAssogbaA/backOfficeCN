import {
  Button,
  Checkbox,
  Input,
  Popconfirm,
  Space,
  Table,
  Form,
  Empty,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  RollbackOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { v4 as uuidv4 } from "uuid";

import "./Form.less";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";

const ApartmentsForm = ({ match }) => {
  const [form] = Form.useForm();
  const initialValues = { name: "", multiple: false };
  const [apartment, setApartment] = useState(null);
  const [apartmentLoaded, setApartmentLoaded] = useState(false);
  // handle rooms delete
  const [roomsToDelete, setroomsToDelete] = useState([]);
  // const [roomsBeforeUpdate, setroomsBeforeUpdate] = useState([]);

  useEffect(() => {
    const id = match.params.id;
    if (!apartmentLoaded && id !== undefined) {
      api.fetch("apartment", id).then((response) => {
        console.log("response fetch apartment", response);
        setApartmentLoaded(true);
      });
    }
  }, [apartmentLoaded, match]);

  const onFormFinish = (values) => {
    console.log("onFormFinish(), values:", values);
    console.log("onFormFinish(), rooms:", rooms);
    // check that appartment has one room at least
  };

  // ------- rooms management -------
  const [rooms, setRooms] = useState([
    { number: "1", area: "65m2", price: "300e", key: uuidv4() },
    { number: "2", area: "65m2", price: "300e", key: uuidv4() },
  ]);
  const [roomsForm] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [roomsError, setroomsError] = useState(null);

  const isEditingroom = (record) => record.key === editingKey;

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = dataIndex === "valid" ? <Checkbox /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            {...(dataIndex === "valid" ? { valuePropName: "checked" } : {})}
            style={{
              margin: 0,
            }}
            rules={[
              ...(dataIndex === "label"
                ? [
                    {
                      required: true,
                      message: "Saisissez un nom",
                    },
                  ]
                : []),
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const roomAdd = () => {
    const existingNewroom = rooms.find((room) => room.key === "new");
    if (existingNewroom) {
      return;
    }
    setRooms((rooms) => [
      ...rooms,
      { key: "new", number: "", area: "0", price: "0" },
    ]);
    roomsForm.setFieldsValue({
      label: "",
      valid: false,
    });
    setEditingKey("new");
    setroomsError(null);
  };

  const roomEdit = (record) => {
    roomsForm.setFieldsValue({
      label: "",
      valid: false,
      ...record,
    });
    setEditingKey(record.key);
  };

  const roomEditCancel = (key) => {
    console.log("roomEditCancel, key:", key);
    if (key === "new") {
      const roomsUpdated = rooms.filter((room) => room.key !== key);
      setRooms((rooms) => [...roomsUpdated]);
    }
    setEditingKey("");
  };

  const roomDelete = (record) => {
    setroomsToDelete([...roomsToDelete, record]);
    const roomsUpdated = rooms.filter((room) => room.key !== record.key);
    setRooms((rooms) => [...roomsUpdated]);
  };

  const roomEditSave = async (key) => {
    console.log(`roomEditSave() key=${key}`);

    try {
      const row = await roomsForm.getFieldsValue();
      const newData = [...rooms];
      const index = rooms.findIndex((item) => key === item.key);

      if (key === "new") {
        row.key = uuidv4();
      }

      console.log("roomEditSave() row:", row);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setRooms(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setRooms(newData);
        setEditingKey();
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Numéro",
      dataIndex: "number",
      editable: true,
    },
    {
      title: "Surface",
      dataIndex: "area",
      editable: true,
    },
    {
      title: "Prix",
      dataIndex: "price",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "120px",
      render: (_, record) => {
        const editable = isEditingroom(record);
        return editable ? (
          <Space size="middle">
            <Popconfirm
              title={`Annuler la ${
                record.key === "new" ? "création" : "modification"
              } de la chambre ?`}
              onConfirm={() => roomEditCancel(record.key)}
            >
              <Button icon={<RollbackOutlined />} />
            </Popconfirm>
            <Button
              icon={<SaveOutlined />}
              onClick={() => roomEditSave(record.key)}
            />
          </Space>
        ) : (
          <Space size="middle">
            <Button icon={<EditOutlined />} onClick={() => roomEdit(record)} />
            <Popconfirm
              title={`Êtes-vous sûr de vouloir supprimer la chambre « ${record.label} » ?`}
              onConfirm={() => roomDelete(record)}
            >
              <Button icon={<DeleteOutlined />} type="danger" />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditingroom(record),
      }),
    };
  });

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

  console.log("match.params.id", match.params.id);
  return (
    <div className="roomsFormContainer container">
      <div className="titleContainer">
        <h2>
          {match.params.id !== undefined ? "Edition" : "Création"} d'un
          appartement
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
            <Input placeholder="Numéro" value={2} />
          </Form.Item>

          <Form.Item
            label="Nom"
            name="name"
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
            <Input placeholder="Nom de l'appartement" />
          </Form.Item>
        </Form>
        <Form form={roomsForm} {...formLayout}>
          <Form.Item label="Chambres">
            <Table
              loading={match.params.id === undefined ? false : !apartmentLoaded}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              size="small"
              bordered
              dataSource={rooms}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                style: { visibility: "hidden" },
                hideOnSinglePage: true,
              }}
              locale={{
                emptyText: (
                  <Empty
                    description={<span>Aucune chambre</span>}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  ></Empty>
                ),
              }}
            />
            <Button
              type="default"
              icon={<PlusOutlined />}
              onClick={() => roomAdd()}
            >
              Ajouter une chambre
            </Button>
            {roomsError && (
              <p className="ant-typography ant-typography-danger">
                {roomsError}
              </p>
            )}
          </Form.Item>
        </Form>
        <Form.Item wrapperCol={formLayout}>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => form.submit()}
          >
            {match.params.id !== undefined ? "Enregister" : "Créer"}
          </Button>
          <Link to="/apartments">
            <Button
              type="default"
              icon={<RollbackOutlined />}
              onClick={() => {}}
            />
          </Link>
        </Form.Item>
      </div>
    </div>
  );
};

export default withRouter(ApartmentsForm);
