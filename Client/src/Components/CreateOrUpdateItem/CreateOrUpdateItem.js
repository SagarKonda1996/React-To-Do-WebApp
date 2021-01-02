import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import Select from "react-select/creatable";
import { toast } from "react-toastify";
import axios from "../../Axios/Axios";
import { Urls } from "../../Urls";
const CreateOrUpdateItem = ({
  mode = "Add",
  inputData = {},
  labels = [],
  onSucess = () => {},
  selectedLabel = "",
}) => {
  const [data, setData] = useState({
    id: "",
    title: "",
    description: "",
    status: "0",
    label: { label: selectedLabel, value: selectedLabel },
  });
  useEffect(() => {
    if (mode == "Update") {
      setData({
        id: inputData.id,
        title: inputData.title,
        description: inputData.description,
        status: inputData.status,
        label: { label: inputData.label, value: inputData.label },
      });
    }
  }, [mode]);
  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });
  };
  const isValidItem = () => {
    if (!data.title) {
      toast.error("Enter Title");
      return false;
    }
    if (!data.description) {
      toast.error("Enter Description");
      return false;
    }
    return true;
  };
  const submit = () => {
    if (isValidItem()) {
      if (mode == "Add") {
        axios
          .post(Urls.todo, {
            title: data.title,
            description: data.description,
            label: data.label.value?data.label.value:"ALL",
          })
          .then((res) => {
            toast.success("Task Created");
            onSucess();
          })
          .catch((err) => {});
      } else {
        axios
          .put(`${Urls.todo}/${data.id}`, {
            title: data.title,
            description: data.description,
            status: data.status == "1",
            label: data.label.value?data.label.value:"ALL",
          })
          .then((res) => {
            toast.success("Task Updated");
            onSucess();
          })
          .catch((err) => {});
      }
    }
  };
  return (
    <Form>
      <Form.Group as={Row} controlId="Title">
        <Form.Label column sm="3">
          Title
        </Form.Label>
        <Col sm="9">
          <Form.Control
            type="text"
            placeholder="Enter Title"
            defaultValue={data.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="Description">
        <Form.Label column sm="3">
          Description
        </Form.Label>
        <Col sm="9">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Description"
            defaultValue={data.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Col>
      </Form.Group>
      {mode == "Update" ? (
        <Form.Group as={Row} controlId="Status">
          <Form.Label column sm="3">
            Status{" "}
          </Form.Label>
          <Col sm="9">
            <Form.Control
              as="select"
              value={data.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="1">Completed</option>
              <option value="0">Pending</option>
            </Form.Control>
          </Col>
        </Form.Group>
      ) : null}
      <Form.Group as={Row} controlId="Status">
        <Form.Label column sm="3">
          {" "}
          Label
        </Form.Label>
        <Col sm="9">
          <Select
            options={[
              ...labels.map((item, i) => {
                return { label: item, value: item };
              }),
            ]}
            value={data.label}
            onChange={(option) => handleChange("label", option)}
            menuPlacement="top"
            formatCreateLabel={(userInput) => `Create Label : ${userInput}`}
          />
        </Col>
      </Form.Group>

      <Form.Text style={{ fontSize: "85%", color: "green" }}>
        To create new label type in the label and select create new option
      </Form.Text>
      <Row className="justify-content-end mr-2">
        <Button variant="primary" type="button" onClick={submit}>
          {mode == "Add" ? "Create" : "Update"}
        </Button>
      </Row>
    </Form>
  );
};

export default CreateOrUpdateItem;
