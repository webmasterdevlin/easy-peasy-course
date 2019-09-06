import React, { useEffect } from "react";
import useReactRouter from "use-react-router";
import HeroStore from "../hero-store";

export default function EditHero() {
  /*can be manually created using useContext and RootRouter Context*/
  const { match, history } = useReactRouter();

  /*part of the Easy-Peasy pattern*/
  const { hero, isLoading, error } = HeroStore.useStoreState(state => state);
  const { getHeroById, setHero, putHero } = HeroStore.useStoreActions(
    actions => actions
  );

  /*plain React.js*/
  useEffect(() => {
    getHeroById(match.params.id);
  }, []);

  const handleInputChange = ({ currentTarget: input }) => {
    const updatedHero = { ...hero };
    const { name, value } = input;
    updatedHero[name] = value;
    setHero(updatedHero);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await putHero(hero);
  };

  const handleBackButton = () => {
    history.goBack();
  };

  return (
    <>
      <h2>Edit Hero</h2>
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
        <div className="card my-3" style={{ width: "auto" }}>
          <form className="card-header" onSubmit={handleSubmit}>
            <section className="d-flex flex-row">
              <div className="mt-3 mr-3 input-width">
                <label htmlFor="firstName">First Name</label>
                <input
                  name="firstName"
                  value={hero.firstName}
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
                  value={hero.lastName}
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
              value={hero.house}
              onChange={handleInputChange}
              type="text"
              id="house"
              className="form-control"
            />
            <label className="mt-3">Known as</label>
            <input
              name="knownAs"
              value={hero.knownAs}
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
