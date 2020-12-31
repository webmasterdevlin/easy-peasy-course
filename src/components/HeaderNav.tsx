import React from "react";
import { Link } from "react-router-dom";
import { useHeroStoreState } from "../features/heroes/heroTypes";
import { useAntiHeroStoreState } from "../features/antiHeroes/antiHeroTypes";

const HeaderNav = () => {
  const { heroes, hero } = useHeroStoreState((state) => state);
  const { antiHeroes, antiHero } = useAntiHeroStoreState((state) => state);

  return (
    <nav className="sticky-top navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container-fluid">
        <span className="navbar-brand me-5">
          <Link className="nav-link" to="/">
            <li className="fas fa-database me-1" />
            Easy Peasy 4 Course
          </Link>
        </span>

        <ul className="navbar-nav me-5">
          <li className="nav-item">
            <Link className="nav-link" to="/heroes">
              Heroes
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/anti-heroes">
              AntiHeroes
            </Link>
          </li>
        </ul>

        <span className="me-5" style={{ color: "purple" }}>
          Total heroes: {heroes?.length}
        </span>
        <span className="me-5" style={{ color: "purple" }}>
          Total anti-heroes: {antiHeroes?.length}
        </span>
        <span className="me-5" style={{ color: "purple" }}>
          Last Edited Hero: {hero?.firstName}
        </span>
        <span className="me-5" style={{ color: "purple" }}>
          Last Edited AntiHero: {antiHero?.firstName}
        </span>
      </div>
    </nav>
  );
};

export default HeaderNav;
