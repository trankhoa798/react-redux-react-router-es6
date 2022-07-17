import React from "react";
import { NavLink } from "react-router-dom"; // An Anchor that React Router controls

const Header = () => {
  const activeStyle = {
    color: "#F1582A",
  };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {"\t|\t"}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
      {"\t|\t"}
      <NavLink to="/courses" activeStyle={activeStyle}>
        Courses
      </NavLink>
    </nav>
  );
};

export { Header };
