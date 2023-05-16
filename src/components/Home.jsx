import React, { useState, useEffect } from "react";
import styles from "./Home.css";
import NavBar from "./NavBar";
import TodoList from "./List";
import { useDispatch, useSelector } from "react-redux";
import { getCars, filterModel, filterVersion, getClean } from "../actions";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCars());
    dispatch(getClean());
  }, [dispatch]);
  //probar
  const allCars = useSelector((state) => state.cars);
  const allModels = useSelector((state) => state.models);
  const allVersions = useSelector((state) => state.versions);

  const [input, setInput] = useState({
    anio: 2000,
  });

  const [mostrarOtroSelect, setMostrarOtroSelect] = useState(false);

  const [disableSelects, setDisableSelects] = useState(false);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [desactivarInput, setDesactivarInput] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  if (allModels) {
    for (var i = 0; i < allModels.length; i++) {
      var arrayModels = allModels[i].modelo;
    }
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.anio]: e.target.value,
    });
  }

  function handleFilterModel(e) {
    e.preventDefault();
    dispatch(filterModel(e.target.value));

    const { value } = e.target;
    if (value === "otra") {
      setMostrarOtroSelect(true);
      setDisableSelects(true);
      setMarcaSeleccionada("");
    } else {
      setMostrarOtroSelect(false);
      setDisableSelects(false);
    }
  }

  const handleRadioChange = (e) => {
    if (e.target.id === "5-box") {
      setDesactivarInput(true);
    } else {
      setDesactivarInput(false);
    }
  };

  const handleStarChange = (e) => {
    setSelectedOption(e.target.id);
  };

  function handleFilterVersion(e) {
    e.preventDefault();
    dispatch(filterVersion(e.target.value));
  }

  return (
    <div className="containerHome">
      <NavBar />
      <hr size="25px" color="black" />
      <div className="container-fluid text-center">
        <div className="row" style={{ padding: "1%" }}>
          {/* INFORMACION DEL CLIENTE */}
          <div className="col-md">
            Información del cliente
            <div class="form">
              <div class="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder=" "
                  id="name"
                  autocomplete="off"
                  required
                />
                <label for="name" class="label-name">
                  <span class="content-name">Nombre del cliente</span>
                </label>
              </div>
            </div>
            {/* <input
              type="text"
              // className="form-control mt-3"
              className="box-input"
              aria-label="client"
            />
            <label for="text" className="input-label">
              Cliente
            </label> */}
            <div className="row">
              <div className="col">
                <div class="form">
                  <div class="form-group">
                    <input
                      type="text"
                      name="tel"
                      placeholder=" "
                      id="tel"
                      autocomplete="off"
                      required
                    />
                    <label for="tel" class="label-name">
                      <span class="content-name">Teléfono</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col">
                <div class="form">
                  <div class="form-group">
                    <input
                      type="text"
                      name="email"
                      placeholder=" "
                      id="email"
                      autocomplete="off"
                      required
                    />
                    <label for="email" class="label-name">
                      <span class="content-name">Email</span>
                    </label>
                  </div>
                </div>
                {/* <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control mt-1"
                /> */}
              </div>
            </div>
          </div>

          <hr className="mt-3" />
          {/* INFORMACION DEL VEHICULO */}

          <div className="col-md">
            Información del vehículo
            <select
              id="1"
              className="form-select mt-3"
              aria-label="Default select example"
              onChange={(e) => handleFilterModel(e)}
            >
              <option value="" hidden name="cars">
                Marca
              </option>
              {allCars?.map((el) => {
                return (
                  <option value={el.marca} key={el.id}>
                    {el.marca}
                  </option>
                );
              })}
              <option value="otra">Otra</option>
            </select>
            {mostrarOtroSelect && (
              <div>
                <div class="form">
                  <div class="form-group">
                    <input
                      type="text"
                      name="otro"
                      placeholder=" "
                      id="otro"
                      autocomplete="off"
                      required
                    />
                    <label for="otro" class="label-name">
                      <span class="content-name">
                        Ingrese otra marca / modelo
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}
            {
              <select
                id="2"
                className="form-select mt-1"
                aria-label="Default select example"
                onChange={(e) => handleFilterVersion(e)}
                disabled={disableSelects}
              >
                <option value="" hidden name="cars">
                  Modelo
                </option>
                {arrayModels?.map((el) => {
                  return (
                    <option value={el.name} key={el.id}>
                      {el.name}
                    </option>
                  );
                })}
              </select>
            }
            {
              <select
                id="3"
                className="form-select mt-1"
                aria-label="Default select example"
                disabled={disableSelects}
              >
                <option value="" hidden name="cars">
                  Versión
                </option>
                {allVersions?.map((el) => {
                  return (
                    <option value={el} key={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
            }
            <div className="row">
              <div className="col">
                <select
                  className="form-select mt-1"
                  aria-label="Default select example"
                  defaultValue="Color"
                >
                  <option value="1">Negro</option>
                  <option value="2">Blanco</option>
                  <option value="3">Blanco Perlado</option>
                  <option value="4">Beige</option>
                  <option value="5">Gris Plata</option>
                  <option value="6">Gris Oscuro</option>
                  <option value="7">Champagne</option>
                  <option value="8">Amarillo</option>
                  <option value="9">Azul</option>
                  <option value="10">Rojo</option>
                  <option value="11">Bordó</option>
                  <option value="12">Otro</option>
                </select>
              </div>
              <div className="col">
                <select
                  className="form-select mt-1"
                  aria-label="Default select example"
                  defaultValue="Año / Modelo"
                >
                  <option value="9">2000</option>
                  <option value="6">2001</option>
                  <option value="6">2002</option>
                  <option value="6">2003</option>
                  <option value="6">2004</option>
                  <option value="6">2005</option>
                  <option value="6">2006</option>
                  <option value="6">2007</option>
                  <option value="6">2008</option>
                  <option value="6">2009</option>
                  <option value="6">2010</option>
                  <option value="6">2011</option>
                  <option value="6">2012</option>
                  <option value="6">2013</option>
                  <option value="6">2014</option>
                  <option value="6">2015</option>
                  <option value="6">2016</option>
                  <option value="6">2017</option>
                  <option value="6">2018</option>
                  <option value="6">2019</option>
                  <option value="6">2020</option>
                  <option value="6">2021</option>
                  <option value="6">2022</option>
                  <option value="6">2023</option>
                </select>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">Puertas</div>
              <div className="col">Cambios</div>
            </div>
            <div className="row">
              <div className="col">
                <div className="tof" dir="rtl">
                  <div className="radio-group">
                    <input
                      type="radio"
                      name="grupo-caja1"
                      id="1-caja"
                      className="input-tof"
                    />
                    <label for="1-caja" className="labeltof">
                      3P
                    </label>
                    <input
                      type="radio"
                      name="grupo-caja1"
                      id="2-caja"
                      className="input-tof"
                    />
                    <label for="2-caja" className="labeltof">
                      4P
                    </label>
                    <input
                      type="radio"
                      name="grupo-caja1"
                      id="3-caja"
                      className="input-tof"
                    />
                    <label for="3-caja" className="labeltof">
                      5P
                    </label>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="tof" dir="rtl">
                  <div className="radio-group">
                    <input
                      type="radio"
                      name="grupo-caja2"
                      id="4-caja"
                      className="input-tof"
                    />
                    <label for="4-caja" className="labeltof">
                      A
                    </label>
                    <input
                      type="radio"
                      name="grupo-caja2"
                      id="5-caja"
                      className="input-tof"
                    />
                    <label for="5-caja" className="labeltof">
                      M
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <select
                  className="form-select custom-select my-custom-select"
                  aria-label="Default select example"
                  defaultValue="Combustible"
                  style={{background: "transparent"}}
                >
                  <option value="1">Nafta</option>
                  <option value="2">Diesel</option>
                  <option value="3">GNC</option>
                  <option value="4">Eléctrico</option>
                  <option value="5">Híbrido</option>
                </select>
              </div>
              <div className="col">
                <div class="form">
                  <div class="form-group">
                    <input
                      type="text"
                      name="patente"
                      placeholder=" "
                      id="patente"
                      autocomplete="off"
                      required
                    />
                    <label for="patente" class="label-name">
                      <span class="content-name">Dominio</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col">
                <div class="form">
                  <div class="form-group">
                    <input
                      type="text"
                      name="km"
                      placeholder=" "
                      id="km"
                      autocomplete="off"
                      required
                    />
                    <label for="km" class="label-name">
                      <span class="content-name">Kilometraje</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="form">
              <div class="form-group">
                <input
                  type="text"
                  name="chasis"
                  placeholder=" "
                  id="chasis"
                  autocomplete="off"
                  required
                />
                <label for="chasis" class="label-name">
                  <span class="content-name">N° Chasis</span>
                </label>
              </div>
            </div>
            <div class="form">
              <div class="form-group">
                <input
                  type="text"
                  name="motor"
                  placeholder=" "
                  id="motor"
                  autocomplete="off"
                  required
                />
                <label for="patente" class="label-name">
                  <span class="content-name">N° Motor</span>
                </label>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col mt-1">
                Está alineado?
                <div className="col">
                  <div className="tof" dir="rtl">
                    <div className="radio-group">
                      <input
                        type="radio"
                        name="grupo-box1"
                        id="1-box"
                        className="input-tof"
                      />
                      <label for="1-box" className="labeltof">
                        NO
                      </label>
                      <input
                        type="radio"
                        name="grupo-box1"
                        id="2-box"
                        className="input-tof"
                      />
                      <label for="2-box" className="labeltof">
                        SI
                      </label>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col mt-1">
                      <p className="text-end">No</p>
                    </div>
                    <div className="col mt-1">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="alineado"
                          checked
                          style={{ backgroundColor: "#087E8B" }}
                        />
                      </div>
                    </div>
                    <div className="col mt-1">
                      <p className="text-start">Si</p>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col mt-1">
                Tiene las revisiones?
                <div className="col">
                  <div className="tof" dir="rtl">
                    <div className="radio-group">
                      <input
                        type="radio"
                        name="grupo-box2"
                        id="3-box"
                        className="input-tof"
                      />
                      <label for="3-box" className="labeltof">
                        NO
                      </label>
                      <input
                        type="radio"
                        name="grupo-box2"
                        id="4-box"
                        className="input-tof"
                      />
                      <label for="4-box" className="labeltof">
                        SI
                      </label>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col mt-1">
                      <p className="text-end">No</p>
                    </div>
                    <div className="col mt-1">
                      <div className="form-check-inline form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="alineado"
                          checked
                          style={{ backgroundColor: "#087E8B" }}
                        />
                      </div>
                    </div>
                    <div className="col mt-1">
                      <p className="text-start">Si</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col mt-1">
                Está en garantía?
                <div className="col">
                  <div className="tof" dir="rtl">
                    <div className="radio-group">
                      <input
                        type="radio"
                        name="grupo-box3"
                        id="5-box"
                        className="input-tof"
                        onChange={handleRadioChange}
                      />
                      <label for="5-box" className="labeltof">
                        NO
                      </label>
                      <input
                        type="radio"
                        name="grupo-box3"
                        id="6-box"
                        className="input-tof"
                        onChange={handleRadioChange}
                      />
                      <label for="6-box" className="labeltof">
                        SI
                      </label>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col mt-1">
                      <p className="text-end">No</p>
                    </div>
                    <div className="col mt-1">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="alineado"
                          checked
                          style={{ backgroundColor: "#087E8B" }}
                        />
                      </div>
                    </div>
                    <div className="col mt-1">
                      <p className="text-start">Si</p>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col mt-1">
                Tiene los manuales?
                <div className="col">
                  <div className="tof" dir="rtl">
                    <div className="radio-group">
                      <input
                        type="radio"
                        name="grupo-box4"
                        id="7-box"
                        className="input-tof"
                      />
                      <label for="7-box" className="labeltof">
                        NO
                      </label>
                      <input
                        type="radio"
                        name="grupo-box4"
                        id="8-box"
                        className="input-tof"
                      />
                      <label for="8-box" className="labeltof">
                        SI
                      </label>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col mt-1">
                      <p className="text-end">No</p>
                    </div>
                    <div className="col mt-1">
                      <div className="form-check-inline form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="alineado"
                          checked
                          style={{ backgroundColor: "#087E8B" }}
                        />
                      </div>
                    </div>
                    <div className="col mt-1">
                      <p className="text-start">Si</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col mt-1">
                Tiene otra llave?
                <div className="col">
                  <div className="tof" dir="rtl">
                    <div className="radio-group">
                      <input
                        type="radio"
                        name="grupo-box5"
                        id="9-box"
                        className="input-tof"
                      />
                      <label for="9-box" className="labeltof">
                        NO
                      </label>
                      <input
                        type="radio"
                        name="grupo-box5"
                        id="10-box"
                        className="input-tof"
                      />
                      <label for="10-box" className="labeltof">
                        SI
                      </label>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col mt-1">
                      <p className="text-end">No</p>
                    </div>
                    <div className="col mt-1">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="alineado"
                          checked
                          style={{ backgroundColor: "#087E8B" }}
                        />
                      </div>
                    </div>
                    <div className="col mt-1">
                      <p className="text-start">Si</p>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col mt-1">
                Único dueño?
                <div className="col">
                  <div className="tof" dir="rtl">
                    <div className="radio-group">
                      <input
                        type="radio"
                        name="grupo-box6"
                        id="11-box"
                        className="input-tof"
                      />
                      <label for="11-box" className="labeltof">
                        NO
                      </label>
                      <input
                        type="radio"
                        name="grupo-box6"
                        id="12-box"
                        className="input-tof"
                      />
                      <label for="12-box" className="labeltof">
                        SI
                      </label>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col mt-1">
                      <p className="text-end">No</p>
                    </div>
                    <div className="col mt-1">
                      <div className="form-check-inline form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="alineado"
                          checked
                          style={{ backgroundColor: "#087E8B" }}
                        />
                      </div>
                    </div>
                    <div className="col mt-1">
                      <p className="text-start">Si</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col mt-0">
                <p>Vencimiento de garantía:</p>
              </div>
              <div className="col">
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  disabled={desactivarInput}
                />
              </div>
            </div>
            <div className="col mt-2">
              <textarea
                className="form-control"
                placeholder="Observaciones"
                id="floatingTextarea2"
                style={{ height: "100px" }}
              ></textarea>
            </div>
          </div>

          <hr className="mt-3" />

          <div className="col-md" style={{ margin: "auto" }}>
            Características y equipamientos
            <div className="row mt-2">
              <div className="col">
                <div className="form-check m-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    style={{ backgroundColor: "#087E8B" }}
                  />
                  <label className="form-check-label" for="defaultCheck1">
                    ABS
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Airbag
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Alarma en la llave
                    </label>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      AC Convenc.
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="form-check m-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    style={{ backgroundColor: "#087E8B" }}
                  />
                  <label className="form-check-label" for="defaultCheck1">
                    Alarma en llavero
                  </label>
                </div>
              </div>

              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Climatizador
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="form-check m-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    style={{ backgroundColor: "#087E8B" }}
                  />
                  <label className="form-check-label" for="defaultCheck1">
                    Dirección
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Blindado
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="form-check m-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    style={{ backgroundColor: "#087E8B" }}
                  />
                  <label className="form-check-label" for="defaultCheck1">
                    CD Player
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Multimedia
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Butacas de cuero
                    </label>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Comp. de abordo
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="form-check m-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    style={{ backgroundColor: "#087E8B" }}
                  />
                  <label className="form-check-label" for="defaultCheck1">
                    Limpiador trasero
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Desemp. trasero
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="form-check m-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    style={{ backgroundColor: "#087E8B" }}
                  />
                  <label className="form-check-label" for="defaultCheck1">
                    Aire caliente
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Techo solar
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Ruedas de aleación
                    </label>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Trabas eléctricas
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="form-check m-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    style={{ backgroundColor: "#087E8B" }}
                  />
                  <label className="form-check-label" for="defaultCheck1">
                    Vidrios eléctricos 2P
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Vidrios eléctricos 4P
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="form-check m-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    style={{ backgroundColor: "#087E8B" }}
                  />
                  <label className="form-check-label" for="defaultCheck1">
                    Ctrl de tracción
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Tracción 4x4
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Ctrl de estabilidad
                    </label>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Triángulo
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="form-check m-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    style={{ backgroundColor: "#087E8B" }}
                  />
                  <label className="form-check-label" for="defaultCheck1">
                    Cricket
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Llave de rueda
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="form-check m-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    style={{ backgroundColor: "#087E8B" }}
                  />
                  <label className="form-check-label" for="defaultCheck1">
                    Cámara de estac.
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Espejos eléctricos
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Sensor de estac.
                    </label>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Capota marítima
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="form-check m-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    style={{ backgroundColor: "#087E8B" }}
                  />
                  <label className="form-check-label" for="defaultCheck1">
                    Barras antivuelco
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Faroles auxiliares
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="form-check m-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    style={{ backgroundColor: "#087E8B" }}
                  />
                  <label className="form-check-label" for="defaultCheck1">
                    Sensor de lluvia
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Sensor de faroles
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Cruise control
                    </label>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="col">
                  <div className="form-check m-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ backgroundColor: "#087E8B" }}
                    />
                    <label className="form-check-label" for="defaultCheck1">
                      Butacas con reg elec
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="form-check m-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    style={{ backgroundColor: "#087E8B" }}
                  />
                  <label className="form-check-label" for="defaultCheck1">
                    Entrada USB/SD CARD/AUX/BT
                  </label>
                </div>
              </div>
              <div className="col"></div>
            </div>
            <hr className="mt-3" />
            <div className="col-md">
              Estado de conservación y desgaste
              <div className="row mt-2">
                <div className="col mt-3">
                  <p>Neumático D.I.</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-3" id="1-stars" />
                      <label for="1-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-3" id="2-stars" />
                      <label for="2-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-3" id="3-stars" />
                      <label for="3-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Neumático D.D.</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-4" id="4-stars" />
                      <label for="4-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-4" id="5-stars" />
                      <label for="5-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-4" id="6-stars" />
                      <label for="6-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Neumático T.I.</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-5" id="7-stars" />
                      <label for="7-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-5" id="8-stars" />
                      <label for="8-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-5" id="9-stars" />
                      <label for="9-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Neumático T.D.</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-6" id="10-stars" />
                      <label for="10-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-6" id="11-stars" />
                      <label for="11-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-6" id="12-stars" />
                      <label for="12-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Neumático Repuesto</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-7" id="13-stars" />
                      <label for="13-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-7" id="14-stars" />
                      <label for="14-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-7" id="15-stars" />
                      <label for="15-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Limp. Parabrisa</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-8" id="16-stars" />
                      <label for="16-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-8" id="17-stars" />
                      <label for="17-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-8" id="18-stars" />
                      <label for="18-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Rociador Limpiaparabrisa</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-9" id="19-stars" />
                      <label for="19-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-9" id="20-stars" />
                      <label for="20-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-9" id="21-stars" />
                      <label for="21-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Aire Acondicionado</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-10" id="22-stars" />
                      <label for="22-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-10" id="23-stars" />
                      <label for="23-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-10" id="24-stars" />
                      <label for="24-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Intermitentes</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-11" id="25-stars" />
                      <label for="25-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-11" id="26-stars" />
                      <label for="26-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-11" id="27-stars" />
                      <label for="27-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Luces/Farol/Interno</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-12" id="28-stars" />
                      <label for="28-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-12" id="29-stars" />
                      <label for="29-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-12" id="30-stars" />
                      <label for="30-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Motor general</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-13" id="31-stars" />
                      <label for="31-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-13" id="32-stars" />
                      <label for="32-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-13" id="33-stars" />
                      <label for="33-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Acción Embrague</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-14" id="34-stars" />
                      <label for="34-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-14" id="35-stars" />
                      <label for="35-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-14" id="36-stars" />
                      <label for="36-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Pastillas de freno</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-15" id="37-stars" />
                      <label for="37-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-15" id="38-stars" />
                      <label for="38-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-15" id="39-stars" />
                      <label for="39-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Discos de freno</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-16" id="40-stars" />
                      <label for="40-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-16" id="41-stars" />
                      <label for="41-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-16" id="42-stars" />
                      <label for="42-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Fuga de frenos</p>
                </div>
                <div className="col">
                  <div className="tof" dir="rtl">
                    <div className="radio-group">
                      <input
                        type="radio"
                        name="grupo-17"
                        id="43-stars"
                        className="input-tof"
                      />
                      <label for="43-stars" className="labeltof">
                        NO
                      </label>
                      {/* <input type="radio" name="grupo-17" id="101-stars" />
                      <label for="101-stars" className="star">
                        &#9733;
                      </label> */}
                      <input
                        type="radio"
                        name="grupo-17"
                        id="45-stars"
                        className="input-tof"
                      />
                      <label for="45-stars" className="labeltof">
                        SI
                      </label>
                    </div>
                  </div>
                  {/* <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-17" id="43-stars" />
                      <label for="43-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-17" id="44-stars" />
                      <label for="44-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-17" id="45-stars" />
                      <label for="45-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Amortiguadores</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-18" id="46-stars" />
                      <label for="46-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-18" id="47-stars" />
                      <label for="47-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-18" id="48-stars" />
                      <label for="48-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Suspensión juntas</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-19" id="49-stars" />
                      <label for="49-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-19" id="50-stars" />
                      <label for="50-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-19" id="51-stars" />
                      <label for="51-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Ruidos en la suspensión</p>
                </div>
                <div className="col">
                  <div className="tof" dir="rtl">
                    <div className="radio-group">
                      <input
                        type="radio"
                        name="grupo-20"
                        id="52-stars"
                        className="input-tof"
                      />
                      <label for="52-stars" className="labeltof">
                        NO
                      </label>
                      {/* <input type="radio" name="grupo-17" id="101-stars" />
                      <label for="101-stars" className="star">
                        &#9733;
                      </label> */}
                      <input
                        type="radio"
                        name="grupo-20"
                        id="54-stars"
                        className="input-tof"
                      />
                      <label for="54-stars" className="labeltof">
                        SI
                      </label>
                    </div>
                  </div>
                  {/* <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-20" id="52-stars" />
                      <label for="52-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-20" id="53-stars" />
                      <label for="53-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-20" id="54-stars" />
                      <label for="54-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Correa dentada</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-21" id="55-stars" />
                      <label for="55-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-21" id="56-stars" />
                      <label for="56-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-21" id="57-stars" />
                      <label for="57-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Regulación de butacas</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-22" id="58-stars" />
                      <label for="58-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-22" id="59-stars" />
                      <label for="59-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-22" id="60-stars" />
                      <label for="60-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Acción vidrios eléctricos</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-23" id="61-stars" />
                      <label for="61-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-23" id="62-stars" />
                      <label for="62-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-23" id="63-stars" />
                      <label for="63-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Acción vidrios manuales</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-24" id="64-stars" />
                      <label for="64-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-24" id="65-stars" />
                      <label for="65-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-24" id="66-stars" />
                      <label for="66-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Estado de butacas</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-25" id="67-stars" />
                      <label for="7-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-25" id="68-stars" />
                      <label for="68-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-25" id="69-stars" />
                      <label for="69-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Acción freno de estac.</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-26" id="70-stars" />
                      <label for="70-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-26" id="71-stars" />
                      <label for="71-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-26" id="72-stars" />
                      <label for="72-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Acción trabas eléctricas</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-27" id="73-stars" />
                      <label for="73-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-27" id="74-stars" />
                      <label for="74-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-27" id="75-stars" />
                      <label for="75-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Acción Espejos</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-28" id="76-stars" />
                      <label for="76-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-28" id="77-stars" />
                      <label for="77-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-28" id="78-stars" />
                      <label for="78-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Cinturones de seguridad</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-29" id="79-stars" />
                      <label for="79-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-29" id="80-stars" />
                      <label for="80-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-29" id="81-stars" />
                      <label for="81-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Caja de dirección</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-30" id="82-stars" />
                      <label for="82-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-30" id="83-stars" />
                      <label for="83-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-30" id="84-stars" />
                      <label for="84-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Cojin de motor y cambios</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-31" id="85-stars" />
                      <label for="85-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-31" id="86-stars" />
                      <label for="86-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-31" id="87-stars" />
                      <label for="87-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Ruido de motor / cambios</p>
                </div>
                <div className="col">
                  <div className="tof" dir="rtl">
                    <div className="radio-group">
                      <input
                        type="radio"
                        name="grupo-32"
                        id="88-stars"
                        className="input-tof"
                      />
                      <label for="88-stars" className="labeltof">
                        NO
                      </label>
                      {/* <input type="radio" name="grupo-32" id="89-stars" />
                      <label for="89-stars" className="star">
                        &#9733;
                      </label> */}
                      <input
                        type="radio"
                        name="grupo-32"
                        id="90-stars"
                        className="input-tof"
                      />
                      <label for="90-stars" className="labeltof">
                        SI
                      </label>
                    </div>
                  </div>
                  {/* <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-32" id="88-stars" />
                      <label for="88-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-32" id="89-stars" />
                      <label for="89-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-32" id="90-stars" />
                      <label for="90-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Fuga motor</p>
                </div>
                <div className="col">
                  <div className="tof" dir="rtl">
                    <div className="radio-group">
                      <input
                        type="radio"
                        name="grupo-33"
                        id="91-stars"
                        className="input-tof"
                      />
                      <label for="91-stars" className="labeltof">
                        NO
                      </label>
                      {/* <input type="radio" name="grupo-32" id="92-stars" />
                      <label for="93-stars" className="star">
                        &#9733;
                      </label> */}
                      <input
                        type="radio"
                        name="grupo-33"
                        id="93-stars"
                        className="input-tof"
                      />
                      <label for="93-stars" className="labeltof">
                        SI
                      </label>
                    </div>
                  </div>
                  {/* <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-33" id="91-stars" />
                      <label for="91-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-33" id="92-stars" />
                      <label for="92-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-33" id="93-stars" />
                      <label for="93-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Fuga de cambios</p>
                </div>
                <div className="col">
                  <div className="tof" dir="rtl">
                    <div className="radio-group">
                      <input
                        type="radio"
                        name="grupo-34"
                        id="94-stars"
                        className="input-tof"
                      />
                      <label for="94-stars" className="labeltof">
                        NO
                      </label>
                      {/* <input type="radio" name="grupo-34" id="95-stars" />
                      <label for="95-stars" className="star">
                        &#9733;
                      </label> */}
                      <input
                        type="radio"
                        name="grupo-34"
                        id="96-stars"
                        className="input-tof"
                      />
                      <label for="96-stars" className="labeltof">
                        SI
                      </label>
                    </div>
                  </div>
                  {/* <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-34" id="94-stars" />
                      <label for="94-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-34" id="95-stars" />
                      <label for="95-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-34" id="96-stars" />
                      <label for="96-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Escape</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-35" id="97-stars" />
                      <label for="97-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-35" id="98-stars" />
                      <label for="98-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-35" id="99-stars" />
                      <label for="99-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Humo anormal</p>
                </div>
                <div className="col">
                  <div className="tof" dir="rtl">
                    <div className="radio-group">
                      <input
                        type="radio"
                        name="grupo-36"
                        id="100-stars"
                        className="input-tof"
                      />
                      <label for="100-stars" className="labeltof">
                        NO
                      </label>
                      {/* <input type="radio" name="grupo-36" id="101-stars" />
                      <label for="101-stars" className="star">
                        &#9733;
                      </label> */}
                      <input
                        type="radio"
                        name="grupo-36"
                        id="102-stars"
                        className="input-tof"
                      />
                      <label for="102-stars" className="labeltof">
                        SI
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Estado del panel</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-37" id="103-stars" />
                      <label for="103-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-37" id="104-stars" />
                      <label for="104-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-37" id="105-stars" />
                      <label for="105-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>Acción. Cambio</p>
                </div>
                <div className="col">
                  <div className="star-rating" dir="rtl">
                    <div className="radio-group">
                      <input type="radio" name="grupo-38" id="106-stars" />
                      <label for="106-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-38" id="107-stars" />
                      <label for="107-stars" className="star">
                        &#9733;
                      </label>
                      <input type="radio" name="grupo-38" id="108-stars" />
                      <label for="108-stars" className="star">
                        &#9733;
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-3" />
        <div className="col-md">
          Fotos del vehículo
          <div className="mb-3 mt-3">
            <label for="formFile" className="form-label">
              Frontal
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>
          <div className="mb-3">
            <label for="formFile" className="form-label">
              Perfil derecho
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>
          <div className="mb-3">
            <label for="formFile" className="form-label">
              Perfil izquierdo
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>
          <div className="mb-3">
            <label for="formFile" className="form-label">
              Detras
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>
        </div>
        <hr className="mt-1" />
        <div className="col-md">
          <TodoList />
        </div>

        <hr className="mt-3" />
        <div className="col-md">
          Calificación general del vehículo
          <div className="star-rating" dir="rtl" style={{ margin: "auto" }}>
            <div className="radio-group">
              <input type="radio" name="grupo-top" id="i-stars" />
              <label
                for="i-stars"
                className="star"
                checked={selectedOption === "i-stars"}
                onChange={handleStarChange}
              >
                &#9733;
              </label>
              <input type="radio" name="grupo-top" id="ii-stars" />
              <label
                for="ii-stars"
                className="star"
                checked={selectedOption === "ii-stars"}
                onChange={handleStarChange}
              >
                &#9733;
              </label>
              <input type="radio" name="grupo-top" id="iii-stars" />
              <label
                for="iii-stars"
                className="star"
                checked={selectedOption === "iii-stars"}
                onChange={handleStarChange}
              >
                &#9733;
              </label>
              <input type="radio" name="grupo-top" id="iv-stars" />
              <label
                for="iv-stars"
                className="star"
                checked={selectedOption === "iv-stars"}
                onChange={handleStarChange}
              >
                &#9733;
              </label>
              <input type="radio" name="grupo-top" id="v-stars" />
              <label
                for="v-stars"
                className="star"
                checked={selectedOption === "v-stars"}
                onChange={handleStarChange}
              >
                &#9733;
              </label>
            </div>
            {selectedOption && (
              <label htmlFor={selectedOption} className="selected-label">
                Opción seleccionada: {selectedOption}
              </label>
            )}
          </div>
        </div>
        <hr className="mt-3" />
      </div>

      <button>Finalizar</button>
      <hr className="mt-3" />
    </div>
  );
}
