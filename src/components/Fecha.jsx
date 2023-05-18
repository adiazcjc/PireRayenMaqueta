import React from "react";

const FechaHoy = () => {
  const obtenerFechaHoy = () => {
    const fecha = new Date();
    const opcionesFecha = { year: "numeric", month: "long", day: "numeric" };
    return fecha.toLocaleDateString(undefined, opcionesFecha);
  };

  return (
    <div name="Fecha" value=""
      style={{
        color: "#E1E3EC",
        fontStyle: "oblique",
        fontSize: "12px",
        textAlign: "left",
      }}
    >
      {obtenerFechaHoy().toLocaleUpperCase()}
    </div>
  );
};

export default FechaHoy;
