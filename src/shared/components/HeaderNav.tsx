import React, { useState } from "react";
import { Link } from "@reach/router";
import { useStoreState } from "easy-peasy";
import { HeroStateType } from "../../heroes/hero-types";
import { VillainStateType } from "../../villains/villain-types";

export default function HeaderNav() {
  const { totalHeroes } = useStoreState<HeroStateType>((state) => state);
  const { totalVillains } = useStoreState<VillainStateType>((state) => state);

  const [navIsCollapse, setNavIsCollapse] = useState(true);

  const toggleNavBar = () => {
    setNavIsCollapse(!navIsCollapse);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">
        <li className="fas fa-cube" />
        React Tour of Heroes
      </span>
      <button
        onClick={toggleNavBar}
        className="navbar-toggler"
        type="button"
        data-toggle=" collapse"
        data-target="#navbarSupportedContent"
        aria-controls=" navbarSupportedContent"
        aria-expanded="false"
        aria-label=" Toggle navigation"
      >
        <span className=" navbar-toggler-icon" />
      </button>

      <div
        className={
          navIsCollapse ? "collapse navbar-collapse" : "navbar-collapse"
        }
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Heroes
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/villains">
              Villains
            </Link>
          </li>
        </ul>
        <span className="mr-5" style={{ color: "purple", fontSize: "24px" }}>
          Total heroes: {totalHeroes}
        </span>
        <span className="mr-5" style={{ color: "purple", fontSize: "24px" }}>
          Total villains: {totalVillains}
        </span>
        <ul className="navbar-nav my-2 my-lg-0">
          <li className="nav-item">
            <a
              className="nav-link"
              rel="noopener noreferrer"
              target="_blank"
              href="https://twitter.com/DevlinDuldulao"
            >
              <i className="layout-icon fab fa-twitter" />
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/webmasterdevlin"
            >
              <i className="layout-icon fab fa-github" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
