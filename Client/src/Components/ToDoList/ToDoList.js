import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import { Button, Card, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import classes from "./ToDoList.module.css";
import ModalDialogue from "../Shared/ModalDialogue";
import CreateOrUpdateItem from "../CreateOrUpdateItem";
import axios from "../../Axios/Axios";
import { Urls } from "../../Urls";

const ToDoItem = ({ todo, labels, loadData }) => {
  const [showModal, setShowModal] = useState(false);
  const onSucess = () => {
    loadData();
    setShowModal(false);
  };
  const handleDelete = (id) => {
    let confirm = window.confirm("Do you want to Delete this Task ?");
    if (confirm) {
      axios
        .delete(`${Urls.todo}/${id}`)
        .then((res) => {
          loadData();
        })
        .catch((err) => {});
    }
  };
  return (
    <>
      <Card
        className={`${classes["contact-card"]} col-sm-12 col-md-3 col-lg-3`}
      >
        <i
          className={` fa fa-times-circle ${classes["close-icon"]}`}
          onClick={(e) => handleDelete(todo.id)}
        />
        <Card.Body className={classes["card-content"]}>
          <Card.Title as="p" className={classes["card-title"]}>
            {todo && todo.title ? todo.title : ""}{" "}
            <i
              onClick={(e) => setShowModal(true)}
              className="fa fa-pencil"
              style={{ cursor: "pointer" }}
            />
          </Card.Title>
          <hr style={{ width: "100%" }} />
          <Card.Text as="p" style={{height:"75px",overflowY:"auto"}}>
            <p>{todo && todo.description ? todo.description : ""}</p>
          </Card.Text>
          <Card.Text>
            {todo && todo.status ? (
              <p>
                <i class="fa fa-check" aria-hidden="true"></i> Completed
              </p>
            ) : (
              <p>
                <i class="fa fa-clock-o" aria-hidden="true" /> Pending
              </p>
            )}
          </Card.Text>
          
        </Card.Body>
        <Card.Footer style={{background:"white"}}>
            <Badge variant="primary">{todo && todo.label}</Badge>
          </Card.Footer>
      </Card>
      <ModalDialogue
        show={showModal}
        closeDialogue={() => setShowModal(false)}
        title={"Update To Do Item"}
        showCancelButton={false}
        showSuccessButton={false}
        successButtonText={"Create"}
        successCallback={() => {}}
        size="lg"
      >
        <CreateOrUpdateItem
          mode="Update"
          labels={labels}
          onSucess={onSucess}
          inputData={todo}
        />
      </ModalDialogue>
    </>
  );
};

const ToDoList = ({
  todolist = [],
  selectedItem = "My To Do List",
  labels,
  loadData,
}) => {
  return (
    <div className={classes["edit-mode-cards-container"]}>
      {todolist.map((todo, i) => (
        <ToDoItem
          key={i}
          todo={todo}
          index={i}
          labels={labels}
          loadData={loadData}
        />
      ))}
    </div>
  );
};

export default ToDoList;
