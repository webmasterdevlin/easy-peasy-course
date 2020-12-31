import React, { useEffect, useState } from "react";
import {
  Hero,
  useHeroStoreActions,
  useHeroStoreState,
} from "../features/heroes/heroTypes";
import FormSubmission from "../components/FormSubmission";

const HeroesPage = () => {
  const { heroes, loading } = useHeroStoreState((state) => state);
  const {
    getHeroesThunk,
    removeHeroThunk,
    addHeroThunk,
    updateHeroThunk,
    setHeroAction,
  } = useHeroStoreActions((actions) => actions);

  const [editingTracker, setEditingTracker] = useState("0");
  const [heroValues, setHeroValues] = useState<Hero>({
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  });

  useEffect(() => {
    getHeroesThunk();
  }, []);

  const handleRemoveItem = async (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (!isConfirmed) return;

    await removeHeroThunk(id);
  };

  return (
    <div className="mb-5">
      <div className="container-fluid mb-4">
        <h4>Heroes Page</h4>
        {editingTracker === "0" && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <FormSubmission
              text={"Create"}
              obj={heroValues}
              handleSubmit={addHeroThunk}
            />
          </div>
        )}
      </div>
      <div>
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
              style={{ width: " 6rem", height: "6rem", color: "purple" }}
              role="status"
            />
          </div>
        ) : (
          <div style={{ width: "auto" }}>
            {heroes.map((h) => (
              <div key={h.id} className="card mt-3">
                {editingTracker === h.id ? (
                  <div
                    className="card-header"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <FormSubmission
                      text={"Update"}
                      obj={h}
                      handleSubmit={updateHeroThunk}
                    />
                  </div>
                ) : (
                  <div className="card-header">
                    <h3 className="card-title">
                      {h.firstName} {h.lastName}
                    </h3>
                    <h5 className="card-subtitle mb-2 text-muted">{h.house}</h5>
                    <p className="card-text">{h.knownAs}</p>
                  </div>
                )}
                <section className="card-body">
                  <div>
                    {editingTracker === h.id ? (
                      <button
                        className="btn btn-info card-link col text-center"
                        onClick={() => {
                          setEditingTracker("0");
                        }}
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary card-link col text-center"
                        onClick={() => {
                          setHeroAction(h);
                          setEditingTracker(h.id);
                        }}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="btn btn-outline-danger card-link col text-center"
                      onClick={() => handleRemoveItem(h.id, h.firstName)}
                    >
                      Delete
                    </button>
                  </div>
                </section>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroesPage;
