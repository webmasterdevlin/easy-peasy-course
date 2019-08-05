import React, { useState, useEffect } from "react";
import NewItemForm from "../../shared/components/NewItemForm";
import { Link } from "react-router-dom";
import HeroStore from "../hero-store";

export default function Heroes() {
  const [isShowNewItemForm, setIsShowNewItemForm] = useState(false); // component state
  const { heroes, hero, isLoading, error } = HeroStore.useStoreState(
    state => state
  ); // state of store
  const {
    getHeroes,
    postHero,
    deleteHero,
    setHero
  } = HeroStore.useStoreActions(actions => actions);

  useEffect(() => {
    getHeroes();
  }, []);

  const showNewItemForm = () => {
    setIsShowNewItemForm(!isShowNewItemForm);
  };
  const onChange = ({ currentTarget: input }) => {
    const newHero = { ...hero };
    const { name, value } = input;
    newHero[name] = value;
    setHero(newHero);
  };

  const onSubmit = async event => {
    event.preventDefault();
    try {
      await postHero(hero);
      setIsShowNewItemForm(!isShowNewItemForm);
    } catch {}
  };

  const removeItem = async (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (!isConfirmed) return;

    await deleteHero(id);
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
        heroes.map(item => (
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
                  to={`/edit-hero/${item.id}`}
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
