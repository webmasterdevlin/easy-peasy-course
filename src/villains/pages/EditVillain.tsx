import React, { useEffect } from "react";
import VillainStore from "../villain-store";
import { VillainStateType } from "../villain-types";

export default function EditVillain(params) {
  /*part of the Easy-Peasy pattern*/
  const { villain, loading } = VillainStore.useStoreState((state) => state);
  const {
    getVillainById,
    setVillain,
    putVillain,
  } = VillainStore.useStoreActions((actions) => actions);

  /*plain React.js*/
  useEffect(() => {
    getVillainById(params.id);
  }, []);

  const handleInputChange = ({ currentTarget: input }) => {
    const updatedVillain = { ...villain };
    const { name, value } = input;
    updatedVillain[name] = value;
    setVillain(updatedVillain);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await putVillain(villain);
  };

  const handleBackButton = () => {
    window.history.back();
  };

  return (
    <>
      <h2>Edit Villain</h2>
      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div
            className="spinner-border"
            style={{
              width: "9rem",
              height: "9rem",
              color: "purple",
            }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card my-3" style={{ width: "auto" }}>
          <form className="card-header" onSubmit={handleSubmit}>
            <section className="d-flex flex-row">
              <div className="mt-3 mr-3 input-width">
                <label htmlFor="firstName">First Name</label>
                <input
                  name="firstName"
                  value={villain.firstName}
                  onChange={handleInputChange}
                  type="text"
                  id="firstName"
                  className="form-control"
                />
              </div>
              <div className="mt-3 ml-3 input-width">
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={villain.lastName}
                  onChange={handleInputChange}
                  type="text"
                  id="lastName"
                  className="form-control"
                />
              </div>
            </section>
            <label className="mt-3">House</label>
            <input
              name="house"
              value={villain.house}
              onChange={handleInputChange}
              type="text"
              id="house"
              className="form-control"
            />
            <label className="mt-3">Known as</label>
            <input
              name="knownAs"
              value={villain.knownAs}
              onChange={handleInputChange}
              type="text"
              id="knownAs"
              className="form-control"
            />
            <button type="submit" className="btn btn-info mt-3">
              Update
            </button>
            <button
              onClick={handleBackButton}
              type="button"
              className="btn btn-outline-secondary mt-3 ml-3"
            >
              Back
            </button>
          </form>
        </div>
      )}
    </>
  );
}
