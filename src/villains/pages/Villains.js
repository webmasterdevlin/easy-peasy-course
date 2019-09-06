import React, { useState, useEffect } from "react";
import NewItemForm from "../../shared/components/NewItemForm";
import { Link } from "@reach/router";
import VillainStore from "../villain-store";

export default function Villains() {
  /*part of the Easy-Peasy pattern*/
  const { villains, villain, isLoading, error } = VillainStore.useStoreState(
    state => state
  );
  const {
    getVillains,
    postVillain,
    deleteVillain,
    setVillain
  } = VillainStore.useStoreActions(actions => actions);

  /*plain React.js*/
  const [isShowNewItemForm, setIsShowNewItemForm] = useState(false);

  useEffect(() => {
    getVillains();
  }, []);

  const showNewItemForm = () => {
    setIsShowNewItemForm(!isShowNewItemForm);
  };
  const onChange = ({ currentTarget: input }) => {
    const newVillain = { ...villain };
    const { name, value } = input;
    newVillain[name] = value;
    setVillain(newVillain);
  };

  const onSubmit = async event => {
    event.preventDefault();
    try {
     await postVillain(villain);
      setIsShowNewItemForm(!isShowNewItemForm);
    } catch  {}
  };

  const removeItem = async (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (!isConfirmed) return;

    await deleteVillain(id);
  };
  return (
    <>
      <NewItemForm
        isShowNewItemForm={isShowNewItemForm}
        handleOnChange={onChange}
        handleOnSubmit={onSubmit}
        handleShowNewItemForm={showNewItemForm}
      />
      {isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <div
            className="spinner-border"
            style={{
              width: "9rem",
              height: "9rem",
              color: "purple"
            }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        villains.map(item => (
          <div key={item.id} className="card mt-3" style={{ width: "auto" }}>
            <div className="card-header">
              <h3 className="card-title">
                {item.firstName} {item.lastName}
              </h3>
              <h5 className="card-subtitle mb-2 text-muted">{item.house}</h5>
              <p className="card-text">{item.knownAs}</p>
            </div>
            <section className="card-body">
              <div className="row">
                <Link
                  to={`/edit-villain/${item.id}`}
                  className="btn btn-primary card-link col text-center"
                >
                  <span className="fas fa-edit  mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => removeItem(item.id, item.firstName)}
                  className="btn btn-outline-danger card-link col text-center"
                >
                  <span className="fas fa-eraser  mr-2" />
                  Delete
                </button>
              </div>
            </section>
          </div>
        ))
      )}
    </>
  );
}
