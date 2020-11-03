import {
  Button,
  Input,
  Popconfirm,
  Space,
  Table,
  Form,
  Empty,
  Row,
  Col,
  message,
} from "antd";
import React, { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  RollbackOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { v4 as uuidv4 } from "uuid";

import "./Form.less";
import { Link, useHistory, withRouter } from "react-router-dom";
import api from "../../services/api";
import layout from "../../constants/layout";

const ApartmentsForm = ({ match }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const initialValues = { name: "", multiple: false };
  const [roomsToDelete, setroomsToDelete] = useState([]);
  // const [apartment, setApartment] = useState(null);
  // const [apartmentLoaded, setApartmentLoaded] = useState(false);
  // handle rooms delete
  // const [roomsBeforeUpdate, setroomsBeforeUpdate] = useState([]);

  // useEffect(() => {
  //   const id = match.params.id;
  //   if (!apartmentLoaded && id !== undefined) {
  //     api.fetch("apartment", id).then((response) => {
  //       console.log("response fetch apartment", response);
  //       setApartmentLoaded(true);
  //     });
  //   }
  // }, [apartmentLoaded, match]);

  const onFormFinish = (values) => {
    const newApartment = {
      ...values,
      rooms: rooms.map((r) => ({
        number: r.number,
        area: r.area,
        price: r.price,
      })),
    };

    if (newApartment.rooms.length < 1) {
      console.log("newApartment chambre insuffisantes", newApartment);
      return message.error("Ajoutez au moins une chambre.");
    }

    api.create("apartment", newApartment).then((response) => {
      console.log("response", response);
      if (response.status === 201) {
        message.success("Votre appartement à été enregistré");
        history.push("/apartments");
      }
    });

    console.log("newApartment", newApartment);
    // TODO: check that appartment has one room at least
  };

  // ------- rooms management -------
  const [rooms, setRooms] = useState([
    { number: "1", area: "Nord", price: "500", key: uuidv4() },
    { number: "2", area: "Est", price: "300", key: uuidv4() },
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
    const inputNode = <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              ...(dataIndex === "label"
                ? [
                    {
                      required: true,
                      message: "Renseignez le champ",
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
      console.log("row", row);

      if (row.number === undefined || row.number === "") {
        return message.warning("saisissez un numéro");
      }
      if (row.area === undefined || row.area === "") {
        return message.warning("saisissez un emplacement");
      }
      if (row.price === undefined || row.price === "") {
        return message.warning("saisissez une prix");
      }

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
      title: "Emplacement",
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
              title={`Êtes-vous sûr de vouloir supprimer la chambre « ${record.area} » ?`}
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

  const getFormItemLayout = () =>
    Object.keys(layout.form.wrapperCol).reduce((formItemLayout, breakpoint) => {
      formItemLayout[breakpoint] = {
        span: layout.form.wrapperCol[breakpoint].span,
        offset: layout.form.labelCol[breakpoint].span,
      };
      return formItemLayout;
    }, {});

  console.log("match.params.id", match.params.id);
  return (
    <div className="roomsFormContainer container">
      <div className="titleContainer">
        <h2>
          {match.params.id !== undefined ? "Edition" : "Création"} d'un
          appartement
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
                value="number"
                rules={[
                  {
                    required: true,
                    message: "Saisissez un numéro",
                  },
                ]}
              >
                <Input placeholder="Numéro" value={2} />
              </Form.Item>

              <Form.Item
                label="Nom"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Saisissez un nom",
                  },
                  {
                    min: 5,
                    message: "Votre nom est trop court",
                  },
                ]}
              >
                <Input placeholder="Nom de l'appartement" />
              </Form.Item>
            </Form>
            <Form form={roomsForm} {...layout.form}>
              <Form.Item label="Chambres" required>
                <Table
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
                  style={{ marginTop: "1em" }}
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
            <Form.Item wrapperCol={getFormItemLayout()}>
              <Button
                style={{ marginRight: "1em" }}
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
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(ApartmentsForm);
