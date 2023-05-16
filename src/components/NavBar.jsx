import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FechaHoy from "./Fecha";
export default function NavBar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#087E8B", height: "12%" }}
    >
      <div className="container-fluid">
        <a
          className="nav-link active"
          aria-current="page"
          style={{
            color: "#F5F5F5",
            marginLeft: "2%",
            position: "relative",
            fontSize: "30px",
            fontStyle: "oblique",
          }}
        >
          PIRERAYEN
        </a>

        <div className="collapse navbar-collapse show" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="#"
                style={{
                  color: "#E1E3EC",
                  position: "relative",
                  textAlign: "left",
                }}
              >
                FORMULARIO DE TASACIÓN DE VEHÍCULO USADO
              </a>
            </li>
          </ul>
        </div>
        <FechaHoy />
      </div>
    </nav>
  );
}
