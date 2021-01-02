import React, { useEffect, useState } from "react";
import axios from "../../Axios/Axios";
import { Urls } from "../../Urls";
import classes from "./Home.module.css";
import ToDoList from "../ToDoList";
import { Button,Form } from "react-bootstrap";
import ModalDialogue from "../Shared/ModalDialogue";
import CreateOrUpdateItem from "../CreateOrUpdateItem";

const Home = (props) => {
  const [label, setLabel] = useState(["ALL"]);
  const [todolist, setTodolist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const loadData = (isUpdate = true) => {
    setShowModal(false);
    axios
      .get(Urls.todo)
      .then((res) => {
        if (res.data && res.data.labels) {
          setTodolist(res.data.todolist);
          setLabel([...new Set(["ALL", ...res.data.labels])]);
          if (!isUpdate) {
            setSelectedItem("ALL");
          } else if (
            ![...new Set(["ALL", ...res.data.labels])].includes(selectedItem)
          ) {
            setSelectedItem([...new Set(["ALL", ...res.data.labels])][0]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setLabel(["ALL"]);
      });
  };
  useEffect(() => {
    loadData(false);
  }, []);
  return (
    <div className={`row ${classes["todolist-container"]}`}>
      <div className={`d-none d-md-block col-md-2   ${classes["sidebar"]}`} style={{height:"100%"}}>
        {label.map((item, index) => (
          <button
            key={index}
            onClick={(e) => setSelectedItem(item)}
            className={`${classes["button-class"]} ${
              selectedItem == item ? classes["selected-item"] : ""
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className={`d-block col-sm-10 d-md-none m-2  ${classes["sidebar"]}`}>
          <Form.Control as="select" value={selectedItem} onChange={e=>setSelectedItem(e.target.value)}>
          {label.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option> ))
          }
          </Form.Control>
        
       
      </div>
      <div className="col-sm-12 col-md-10" style={{height:"100%"}}>
        <div className="row justify-content-center my-2">
          <Button variant="primary" onClick={(e) => setShowModal(true)}>
            <i className="fa fa-plus" /> Add new To Do
          </Button>
        </div>
        <ModalDialogue
          show={showModal}
          closeDialogue={() => setShowModal(false)}
          title={"Create New To Do Item"}
          showCancelButton={false}
          showSuccessButton={false}
          successButtonText={"Create"}
          successCallback={() => {}}
          size="lg"
        >
          <CreateOrUpdateItem
            mode="Add"
            labels={label.filter((item) => item != "ALL")}
            onSucess={loadData}
            selectedLabel={selectedItem == "ALL" ? "" : selectedItem}
          />
        </ModalDialogue>
        <ToDoList
          todolist={
            selectedItem == "ALL"
              ? todolist
              : todolist.filter((item) => item.label == selectedItem)
          }
          labels={label.filter((item) => item != "ALL")}
          loadData={loadData}
        />
      </div>
    </div>
  );
};

export default Home;
