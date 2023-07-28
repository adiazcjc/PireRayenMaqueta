import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Home.css";
import NavBar from "./NavBar";
import TodoList from "./List";
import { useDispatch, useSelector } from "react-redux";
import { getCars, filterModel, filterVersion, getClean } from "../actions";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  pdf,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logoImage from "../images/pirerayen_logo.jpg";
import "jspdf-autotable";
import html2pdf from "html2pdf.js";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Modal } from "bootstrap";
import lapiz from "../images/lapiz.png";
export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
    dispatch(getClean());

    setTimeout(() => {
      generarPDF();
    }, 0); 
  }, [dispatch]);


  const allCars = useSelector((state) => state.cars);
  const allModels = useSelector((state) => state.models);
  const allVersions = useSelector((state) => state.versions);

  const [input, setInput] = useState({
    name: "",
  });
  const [fecha, setFecha] = useState("");
  const [inputNameFecha, setInputNameFecha] = useState("");
  const [mostrarOtroSelect, setMostrarOtroSelect] = useState(false);

  const [disableSelects, setDisableSelects] = useState(false);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [desactivarInput, setDesactivarInput] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueColor, setSelectedValueColor] = useState("");
  const [selectedValueModelo, setSelectedValueModelo] = useState("");
  const [selectedValueSolicitado, setSelectedValueSolicitado] = useState("");
  const [selectedValuePeritomecanico, setSelectedValuePeritomecanico] =
    useState("");
  const [selectedValuePeritochapa, setSelectedValuePeritochapa] = useState("");
  const [frontalImageURL, setFrontalImageURL] = useState("");
  const [detrasImageURL, setDetrasImageURL] = useState("");
  const [izquierdoImageURL, setIzquierdoImageURL] = useState("");
  const [derechoImageURL, setDerechoImageURL] = useState("");
  const [inputValueDominio, setInputValueDominio] = useState("");
  const [inputTasado, setInputTasado] = useState("");
  const [formData, setFormData] = useState(null);


  const [frontalImage, setFrontalImage] = useState(null);
  const [detrasImage, setDetrasImage] = useState(null);
  const [izquierdoImage, setIzquierdoImage] = useState(null);
  const [derechoImage, setDerechoImage] = useState(null);

  if (allModels) {
    for (var i = 0; i < allModels.length; i++) {
      var arrayModels = allModels[i].modelo;
    }
  }

  function handleChange(e) {
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
}

const handleChangeData = (e) => {
  const selectedDate = new Date(e.target.value);
  const formattedDate = selectedDate.toLocaleDateString("es-ES");
  setFecha(formattedDate);
  setInputNameFecha(e.target.name);
};

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

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSelectChangeColor = (event) => {
    setSelectedValueColor(event.target.value);
  };
  const handleSelectChangeModelo = (event) => {
    setSelectedValueModelo(event.target.value);
  };

  const handleInputChangeDominio = (event) => {
    const newValue = event.target.value.toUpperCase();
    setInputValueDominio(newValue);
  };
  const handleSelectChangeSolicitado = (event) => {
    setSelectedValueSolicitado(event.target.value);
  };
  const handleSelectChangePeritomecanico = (event) => {
    setSelectedValuePeritomecanico(event.target.value);
  };
  const handleSelectChangePeritochapa = (event) => {
    setSelectedValuePeritochapa(event.target.value);
  };

  const handleInputTasado = (event) => {
    const value = event.target.value.replace(/^\$/, ""); // Eliminar el signo "$" al inicio, si existe
    setInputTasado(value);
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    const isNumericInput = /^\d$/.test(key);
    const isMaxLengthReached = event.target.value.length >= 35;

    if (isNumericInput || isMaxLengthReached) {
      event.preventDefault();
    }
  };

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

    const isNumericInput = /^\d$/.test(keyValue);

    if (!isNumericInput) {
      event.preventDefault();
    }
  };

  const handleFrontalImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setFrontalImageURL(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDetrasImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setDetrasImageURL(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDerechoImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setDerechoImageURL(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleIzquierdoImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setIzquierdoImageURL(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const currentDate = new Date().toLocaleDateString();
  const styles = StyleSheet.create({
    page: {
      padding: 40, // Margen interno de la página

      marginLeft: 20, // Margen izquierdo
      marginRight: 20, // Margen derecho
      marginTop: 10, // Margen superior
      marginBottom: 30, // Margen inferior
    },
    title: {
      fontSize: 14,
      marginBottom: 20,
      textAlign: "center", // Alineación centrada del título
      fontWeight: "bold", // Fuente en negrita
      backgroundColor: "#012967",
      color: "#F5F5F5",
    },
    formData: {
      fontSize: 12,
      marginBottom: 10, // Margen inferior entre líneas
      lineHeight: 1.5,
      fontWeight: "bold",
    },
    logoContainer: {
      width: "100%",
      backgroundColor: "#012967",
      padding: 10,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    logo: {
      width: 100,
      height: 100,
    },
    imagesContainer: {
      flexDirection: "row",
      marginTop: 20,
    },
    formContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    column: {
      flex: 1,
      marginRight: 10,
    },
    columnTitle: {
      fontWeight: "bold",
      marginBottom: 5,
    },
    image: {
      marginBottom: 10,
      marginRight: 10,
      maxWidth: "100%",
      maxHeight: 200,
    },
    subTittle: {
      fontSize: 13,
      textAlign: "center", // Alineación centrada del título
      fontWeight: "bold", // Fuente en negrita
    },
    date: {
      fontSize: 12,
      textAlign: "right", // Alineación centrada del título
      fontWeight: "bold", // Fuente en negrita
    },
    separator: {
      borderBottomColor: "#012967",
      borderBottomWidth: 1,
      marginVertical: 10,
    },
    separatorOne: {
      borderBottomColor: "#012967",
      borderBottomWidth: 1,
      marginVertical: 20,
      marginTop: 5,
    },
    footer: {
      position: "fixed",
      bottom: 30, // Ajusta la posición vertical según tus necesidades
      left: 0,
      right: 0,
      textAlign: "center",
    },
  });

  const generarPDF = () => {
    const MyPDF = ({
      formData1,
      formData2,
      formData3,
      formData4,
      formData5,
      formData6,
      formData7,
      formData8,
      formData9,
    }) => (
      <Document>
        <Page style={styles.page}>
          <View style={styles.logoContainer}>
            <Image src={logoImage} style={styles.logo} />
          </View>
          <Text style={styles.title}>
            FORMULARIO DE TASACIÓN DE VEHÍCULOS USADOS
          </Text>
          <Text style={styles.date}>Fecha: {currentDate}</Text>
          <Text style={styles.subTittle}>Información del cliente</Text>
          <View style={styles.separator} />
          <Text style={styles.formData}>{formData1}</Text>
          <Text style={styles.subTittle}>Información del vehículo</Text>
          <View style={styles.separator} />

          <View style={styles.formContainer}>
            <View style={styles.column}>
              <Text style={styles.formData}>{formData2}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.formData}>{formData3}</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.column}>
              <Text style={styles.subTittle}>
                Estado de conservación y desgaste
              </Text>
              <View style={styles.separator} />
              <Text style={styles.formData}>{formData5}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.subTittle}>
                Características y equipamientos
              </Text>
              <View style={styles.separator} />
              <Text style={styles.formData}>{formData4}</Text>
            </View>
          </View>
          <Text style={styles.subTittle}>Fotos del vehículo</Text>
          <View style={styles.separator} />
          <View style={styles.imagesContainer}>
            <View style={styles.column}>
              {frontalImage && (
                <Image src={frontalImage} style={styles.image} />
              )}
              {izquierdoImage && (
                <Image src={izquierdoImage} style={styles.image} />
              )}
            </View>
            <View style={styles.column}>
              {detrasImage && <Image src={detrasImage} style={styles.image} />}
              {derechoImage && (
                <Image src={derechoImage} style={styles.image} />
              )}
            </View>
          </View>
          <Text style={styles.formData}>{formData6}</Text>
          <View style={styles.separatorOne} />
          <Text style={styles.formData}>{formData7}</Text>
          <View style={styles.separatorOne} />
          <Text style={styles.formData}>{formData8}</Text>
          <View style={styles.separatorOne} />
          <Text style={styles.formData}>{formData9}</Text>
          <View style={styles.separatorOne} />
        </Page>
      </Document>
    
    );

    const getFormData1 = () => {
      const form = $("#myForm1");
      const formData = new FormData(form[0]);

      const serializedData = [];
      formData.forEach((value, key) => {
        serializedData.push(`${key}: ${value}`);
      });

      return serializedData.join("\n");
    };

    const getFormData2 = () => {
      const form = $("#myForm2");
      const formData = new FormData(form[0]);

      const serializedData = [];
      formData.forEach((value, key) => {
        serializedData.push(`${key}: ${value}`);
      });

      return serializedData.join("\n");
    };

    const getFormData3 = () => {
      const form = $("#myForm3");
      const formData = new FormData(form[0]);

      const serializedData = [];
      formData.forEach((value, key) => {
        serializedData.push(`${key}: ${value}`);
      });

      return serializedData.join("\n");
    };

    const getFormData4 = () => {
      const form = $("#myForm4");
      const formData = new FormData(form[0]);

      const serializedData = [];
      formData.forEach((value, key) => {
        serializedData.push(`${key}: ${value}`);
      });

      return serializedData.join("\n");
    };

    const getFormData5 = () => {
      const form = $("#myForm5");
      const formData = new FormData(form[0]);

      const serializedData = [];
      formData.forEach((value, key) => {
        serializedData.push(`${key}: ${value}`);
      });

      return serializedData.join("\n");
    };

    const getFormData6 = () => {
      const form = $("#myForm6");
      const formData = new FormData(form[0]);

      const serializedData = [];
      formData.forEach((value, key) => {
        serializedData.push(`${key}: ${value}`);
      });

      return serializedData.join("\n");
    };

    const getFormData7 = () => {
      const form = $("#myForm7");
      const formData = new FormData(form[0]);

      const serializedData = [];
      formData.forEach((value, key) => {
        serializedData.push(`${key}: ${value}`);
      });

      return serializedData.join("\n");
    };

    const getFormData8 = () => {
      const form = $("#myForm8");
      const formData = new FormData(form[0]);

      const serializedData = [];
      formData.forEach((value, key) => {
        serializedData.push(`${key}: ${value}`);
      });

      return serializedData.join("\n");
    };

    const getFormData9 = () => {
      const form = $("#myForm9");
      const formData = new FormData(form[0]);

      const serializedData = [];
      formData.forEach((value, key) => {
        serializedData.push(`${key}: ${value}`);
      });

      return serializedData.join("\n");
    };

    const formData1 = getFormData1(); // Obtener los datos del formulario 1
    const formData2 = getFormData2(); // Obtener los datos del formulario 2
    const formData3 = getFormData3(); // Obtener los datos del formulario 3
    const formData4 = getFormData4(); // Obtener los datos del formulario 4
    const formData5 = getFormData5(); // Obtener los datos del formulario 5
    const formData6 = getFormData6(); // Obtener los datos del formulario 6
    const formData7 = getFormData7(); // Obtener los datos del formulario 7
    const formData8 = getFormData8(); // Obtener los datos del formulario 8
    const formData9 = getFormData9(); // Obtener los datos del formulario 9

    return (
      <MyPDF
        formData1={formData1}
        formData2={formData2}
        formData3={formData3}
        formData4={formData4}
        formData5={formData5}
        formData6={formData6}
        formData7={formData7}
        formData8={formData8}
        formData9={formData9}
      />
      
   
    );
    
  };

  return (
    <div className="containerHome">
      {/* <form id="myForm"> */}
      <NavBar />
      <hr size="25px" color="black" />
      <div className="container-fluid text-center">
        <div className="row" style={{ padding: "1%" }}>
          <form id="myForm1">
            <div className="col-md divClient" id="divClient">
              Información del cliente
              <div className="mb-3">
                <div className="form">
                  <div className="form-group">
                    <input
                      type="text"
                      name="Nombre del cliente"
                      placeholder=" "
                      pattern="[A-Za-z\s]+"
                      maxLength={35}
                      id="Nombre del cliente"
                      autoComplete="off"
                      required
                      onKeyDown={handleKeyDown}
                      onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="name" className="label-name">
                      <span className="content-name">Nombre del cliente</span>
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form">
                      <div className="form-group">
                        <input
                          type="text"
                          name="Teléfono"
                          placeholder=" "
                          id="tel"
                          autoComplete="off"
                          pattern="[0-9]*"
                          maxLength={25}
                          required
                          onKeyPress={handleKeyPress}
                          onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor="tel" className="label-name">
                          <span className="content-name">Teléfono</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form">
                      <div className="form-group">
                        <input
                          type="text"
                          name="Email"
                          placeholder=" "
                          id="email"
                          autoComplete="off"
                          onChange={(e) => handleChange(e)}
                          required
                        />
                        <label htmlFor="email" className="label-name">
                          <span className="content-name">Email</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <hr className="mt-3" />
          <div className="col-md">
            <div>
              <form id="myForm2">
                <div className="mb-3">
                  Información del vehículo
                  <select
                    id="myCustomSelect"
                    name="Marca"
                    className="form-control custom-select mt-3"
                    aria-label="Default select example"
                    onChange={(e) => handleFilterModel(e)}
                    style={{
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid #ccc",
                      backgroundImage:
                        "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' width='18px' height='18px'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E')",
                      backgroundPosition: "right center",
                      backgroundRepeat: "no-repeat",
                      appearance: "none",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      paddingRight: "20px",
                    }}
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
                      <div className="form">
                        <div className="form-group">
                          <input
                            type="text"
                            name="Otra marca"
                            placeholder=" "
                            id="otro"
                            autoComplete="off"
                            required
                          />
                          <label htmlFor="otro" className="label-name">
                            <span className="content-name">
                              Ingrese otra marca / modelo
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  {
                    <select
                      id="myCustomSelect"
                      name="Modelo"
                      className="form-control custom-select mt-1"
                      aria-label="Default select example"
                      onChange={(e) => handleFilterVersion(e)}
                      disabled={disableSelects}
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid #ccc",
                        backgroundImage:
                          "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' width='18px' height='18px'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E')",
                        backgroundPosition: "right center",
                        backgroundRepeat: "no-repeat",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        paddingRight: "20px",
                      }}
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
                      id="myCustomSelect"
                      className="form-control custom-select mt-1"
                      name="Versión"
                      aria-label="Default select example"
                      disabled={disableSelects}
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid #ccc",
                        backgroundImage:
                          "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' width='18px' height='18px'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E')",
                        backgroundPosition: "right center",
                        backgroundRepeat: "no-repeat",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        paddingRight: "20px",
                      }}
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
                    <div className="col mt-1">
                      {
                        <div>
                          {selectedValueColor === "" ? (
                            <label
                              htmlFor="myCustomSelect"
                              className="label-select"
                              style={{ color: "#f5f5f5" }}
                            >
                              vacio
                            </label>
                          ) : (
                            <label
                              htmlFor="myCustomSelect"
                              className="label-select"
                            >
                              Color
                            </label>
                          )}
                          <select
                            id="myCustomSelect"
                            className="form-control custom-select mt-1"
                            name="Color"
                            aria-label="Default select example"
                            value={selectedValueColor}
                            onChange={handleSelectChangeColor}
                            style={{
                              background: "transparent",
                              border: "none",
                              borderBottom: "1px solid #ccc",
                              backgroundImage:
                                "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' width='18px' height='18px'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E')",
                              backgroundPosition: "right center",
                              backgroundRepeat: "no-repeat",
                              appearance: "none",
                              WebkitAppearance: "none",
                              MozAppearance: "none",
                              paddingRight: "20px",
                            }}
                          >
                            <option value="" hidden name="cars">
                              Color
                            </option>
                            <option className="option-select" value="Negro">
                              Negro
                            </option>
                            <option className="option-select" value="Blanco">
                              Blanco
                            </option>
                            <option
                              className="option-select"
                              value="Blanco Perlado"
                            >
                              Blanco Perlado
                            </option>
                            <option className="option-select" value="Beige">
                              Beige
                            </option>
                            <option
                              className="option-select"
                              value="Gris Plata"
                            >
                              Gris Plata
                            </option>
                            <option
                              className="option-select"
                              value="Gris Oscuro"
                            >
                              Gris Oscuro
                            </option>
                            <option className="option-select" value="Champagne">
                              Champagne
                            </option>
                            <option className="option-select" value="Amarillo">
                              Amarillo
                            </option>
                            <option className="option-select" value="Azul">
                              Azul
                            </option>
                            <option className="option-select" value="Rojo">
                              Rojo
                            </option>
                            <option className="option-select" value="Bordó">
                              Bordó
                            </option>
                            <option className="option-select" value="Otro">
                              Otro
                            </option>
                          </select>
                        </div>
                      }
                    </div>
                    <div className="col mt-1">
                      {
                        <div>
                          {selectedValueModelo === "" ? (
                            <label
                              htmlFor="myCustomSelect"
                              className="label-select"
                              style={{ color: "#f5f5f5" }}
                            >
                              vacio
                            </label>
                          ) : (
                            <label
                              htmlFor="myCustomSelect"
                              className="label-select"
                            >
                              Año / Modelo
                            </label>
                          )}
                          <select
                            id="myCustomSelect"
                            className="form-control custom-select mt-1"
                            aria-label="Default select example"
                            name="Año de Modelo"
                            onChange={handleSelectChangeModelo}
                            style={{
                              background: "transparent",
                              border: "none",
                              borderBottom: "1px solid #ccc",
                              backgroundImage:
                                "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' width='18px' height='18px'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E')",
                              backgroundPosition: "right center",
                              backgroundRepeat: "no-repeat",
                              appearance: "none",
                              WebkitAppearance: "none",
                              MozAppearance: "none",
                              paddingRight: "20px",
                            }}
                          >
                            <option value="" hidden name="cars">
                              Modelo
                            </option>
                            <option className="option-select" value="2000">
                              2000
                            </option>
                            <option className="option-select" value="2001">
                              2001
                            </option>
                            <option className="option-select" value="2002">
                              2002
                            </option>
                            <option className="option-select" value="2003">
                              2003
                            </option>
                            <option className="option-select" value="2004">
                              2004
                            </option>
                            <option className="option-select" value="2005">
                              2005
                            </option>
                            <option className="option-select" value="2006">
                              2006
                            </option>
                            <option className="option-select" value="2007">
                              2007
                            </option>
                            <option className="option-select" value="2008">
                              2008
                            </option>
                            <option className="option-select" value="2009">
                              2009
                            </option>
                            <option className="option-select" value="2010">
                              2010
                            </option>
                            <option className="option-select" value="2011">
                              2011
                            </option>
                            <option className="option-select" value="2012">
                              2012
                            </option>
                            <option className="option-select" value="2013">
                              2013
                            </option>
                            <option className="option-select" value="2014">
                              2014
                            </option>
                            <option className="option-select" value="2015">
                              2015
                            </option>
                            <option className="option-select" value="2016">
                              2016
                            </option>
                            <option className="option-select" value="2017">
                              2017
                            </option>
                            <option className="option-select" value="2018">
                              2018
                            </option>
                            <option className="option-select" value="2019">
                              2019
                            </option>
                            <option className="option-select" value="2020">
                              2020
                            </option>
                            <option className="option-select" value="2021">
                              2021
                            </option>
                            <option className="option-select" value="2022">
                              2022
                            </option>
                            <option className="option-select" value="2023">
                              2023
                            </option>
                          </select>
                        </div>
                      }
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col">Puertas</div>
                    <div className="col">Transmisión</div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="tof-one" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Puertas"
                            id="1-caja"
                            className="input-tof"
                            value="3P"
                          />
                          <label htmlFor="1-caja" className="labeltof">
                            3P
                          </label>
                          <input
                            type="radio"
                            name="Puertas"
                            id="2-caja"
                            className="input-tof"
                            value="4P"
                          />
                          <label htmlFor="2-caja" className="labeltof">
                            4P
                          </label>
                          <input
                            type="radio"
                            name="Puertas"
                            id="3-caja"
                            className="input-tof"
                            value="5P"
                          />
                          <label htmlFor="3-caja" className="labeltof">
                            5P
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="tof-one" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Transmisión"
                            id="4-caja"
                            className="input-tof"
                            value="Automática"
                          />
                          <label htmlFor="4-caja" className="labeltof">
                            A
                          </label>
                          <input
                            type="radio"
                            name="Transmisión"
                            id="5-caja"
                            className="input-tof"
                            value="Manual"
                          />
                          <label htmlFor="5-caja" className="labeltof">
                            M
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      {
                        <div>
                          {selectedValue === "" ? (
                            <label
                              htmlFor="myCustomSelect"
                              className="label-select"
                              style={{ color: "#f5f5f5" }}
                            >
                              vacio
                            </label>
                          ) : (
                            <label
                              htmlFor="myCustomSelect"
                              className="label-select"
                            >
                              Combustible
                            </label>
                          )}
                          <select
                            id="myCustomSelect"
                            className="form-control custom-select"
                            aria-label="Default select example"
                            name="Combustible"
                            value={selectedValue}
                            onChange={handleSelectChange}
                            style={{
                              background: "transparent",
                              border: "none",
                              borderBottom: "1px solid #ccc",
                              backgroundImage:
                                "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' width='18px' height='18px'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E')",
                              backgroundPosition: "right center",
                              backgroundRepeat: "no-repeat",
                              appearance: "none",
                              WebkitAppearance: "none",
                              MozAppearance: "none",
                              paddingRight: "20px",
                            }}
                          >
                            <option value="" hidden name="cars">
                              Combustible
                            </option>
                            <option className="option-select" value="Nafta">
                              Nafta
                            </option>
                            <option className="option-select" value="Diesel">
                              Diesel
                            </option>
                            <option className="option-select" value="GNC">
                              GNC
                            </option>
                            <option
                              className="option-select"
                              value="Nafta y GNC"
                            >
                              Nafta y GNC
                            </option>
                            <option className="option-select" value="Eléctrico">
                              Eléctrico
                            </option>
                            <option className="option-select" value="Híbrido">
                              Híbrido
                            </option>
                          </select>
                        </div>
                      }
                    </div>
                    <div className="col">
                      <div className="form">
                        <div className="form-group">
                          <input
                            type="text"
                            name="Dominio"
                            placeholder=" "
                            maxLength={7}
                            id="patente"
                            autoComplete="off"
                            value={inputValueDominio}
                            onChange={handleInputChangeDominio}
                            required
                          />
                          <label htmlFor="patente" className="label-name">
                            <span className="content-name">Dominio</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col ">
                      <div className="form">
                        <div className="form-group">
                          <input
                            type="text"
                            name="Kilometraje"
                            placeholder=" "
                            id="km"
                            autoComplete="off"
                            pattern="[0-9]*"
                            maxLength={7}
                            required
                            onKeyPress={handleKeyPress}
                            onChange={(e) => handleChange(e)}
                          />
                          <label htmlFor="km" className="label-name">
                            <span className="content-name">Kilometraje</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <form id="myForm3">
                <div>
                 
                  <div className="row mt-3">
                   
                    <div className="col mt-1">
                      Está en garantía?
                      <div className="col">
                        <div className="tof-one" dir="rtl">
                          <div className="radio-group">
                            <input
                              type="radio"
                              name="Está en garantía?"
                              id="5-box"
                              className="input-tof"
                              value="No"
                              onChange={handleRadioChange}
                            />
                            <label htmlFor="5-box" className="labeltof">
                              NO
                            </label>
                            <input
                              type="radio"
                              name="Está en garantía?"
                              id="6-box"
                              className="input-tof"
                              value="Si"
                              onChange={handleRadioChange}
                            />
                            <label htmlFor="6-box" className="labeltof">
                              SI
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-1">
                      Tiene las revisiones?
                      <div className="col">
                        <div className="tof-one" dir="rtl">
                          <div className="radio-group">
                            <input
                              type="radio"
                              name="Tiene las revisiones?"
                              id="3-box"
                              className="input-tof"
                              value="No"
                            />
                            <label htmlFor="3-box" className="labeltof">
                              NO
                            </label>
                            <input
                              type="radio"
                              name="Tiene las revisiones?"
                              id="4-box"
                              className="input-tof"
                              value="Si"
                            />
                            <label htmlFor="4-box" className="labeltof">
                              SI
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col mt-1">
                      Tiene los manuales?
                      <div className="col">
                        <div className="tof-one" dir="rtl">
                          <div className="radio-group">
                            <input
                              type="radio"
                              name="Tiene los manuales?"
                              id="7-box"
                              value="No"
                              className="input-tof"
                            />
                            <label htmlFor="7-box" className="labeltof">
                              NO
                            </label>
                            <input
                              type="radio"
                              name="Tiene los manuales?"
                              id="8-box"
                              value="Si"
                              className="input-tof"
                            />
                            <label htmlFor="8-box" className="labeltof">
                              SI
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-1">
                      Tiene otra llave?
                      <div className="col">
                        <div className="tof-one" dir="rtl">
                          <div className="radio-group">
                            <input
                              type="radio"
                              name="Tiene otra llave?"
                              id="9-box"
                              value="No"
                              className="input-tof"
                            />
                            <label htmlFor="9-box" className="labeltof">
                              NO
                            </label>
                            <input
                              type="radio"
                              name="Tiene otra llave?"
                              id="10-box"
                              value="Si"
                              className="input-tof"
                            />
                            <label htmlFor="10-box" className="labeltof">
                              SI
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col mt-1">
                      Único dueño?
                      <div className="col">
                        <div className="tof-one" dir="rtl">
                          <div className="radio-group">
                            <input
                              type="radio"
                              name="Único dueño?"
                              id="11-box"
                              value="No"
                              className="input-tof"
                            />
                            <label htmlFor="11-box" className="labeltof">
                              NO
                            </label>
                            <input
                              type="radio"
                              name="Único dueño?"
                              id="12-box"
                              value="Si"
                              className="input-tof"
                            />
                            <label htmlFor="12-box" className="labeltof">
                              SI
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-1">
                      <div className="col"></div>
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
                        name="Vencimiento de garantía"
                        className="form-control"
                        onChange={(e) => handleChangeData(e)}
                        disabled={desactivarInput}
                      />
                    </div>
                  </div>
                  <div className="col mt-2">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        name="Observaciones"
                        placeholder="Observaciones"
                        id="floatingTextarea2"
                        style={{
                          height: "100px",
                          backgroundColor: "transparent",
                        }}
                        onChange={(e) => handleChange(e)}
                      ></textarea>
                      <label htmlFor="floatingTextarea2">Observaciones</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <hr className="mt-3" />

          <div className="col-md" style={{ margin: "auto" }}>
            <form id="myForm4">
              <div>
                Características y equipamientos
                <div className="row mt-2">
                  <div className="col">
                    <div className="form-check m-1">
                      <input
                        className="form-check-input"
                        name="ABS"
                        type="checkbox"
                        value="Si contiene"
                        id="defaultCheck1"
                        style={{ backgroundColor: "#087E8B" }}
                      />
                      <label className="form-check-label" htmlFor="defaultCheck1">
                        ABS
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="col">
                      <div className="form-check m-1">
                        <input
                          className="form-check-input"
                          name="Airbag"
                          type="checkbox"
                          value="Si contiene"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                          name="Alarma en llave"
                          value="Si contiene"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                          name="AC Convencional"
                          type="checkbox"
                          value="Si contiene"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                        name="Alarma en llavero"
                        type="checkbox"
                        value="Si contiene"
                        id="defaultCheck1"
                        style={{ backgroundColor: "#087E8B" }}
                      />
                      <label className="form-check-label" htmlFor="defaultCheck1">
                        Alarma en llavero
                      </label>
                    </div>
                  </div>

                  <div className="col">
                    <div className="col">
                      <div className="form-check m-1">
                        <input
                          className="form-check-input"
                          name="Climatizador"
                          type="checkbox"
                          value="Si contiene"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                        name="Dirección"
                        value="Si contiene"
                        id="defaultCheck1"
                        style={{ backgroundColor: "#087E8B" }}
                      />
                      <label className="form-check-label" htmlFor="defaultCheck1">
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
                          name="Blindado"
                          value="Si contiene"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                        value="Si contiene"
                        name="Techo solar"
                        id="defaultCheck1"
                        style={{ backgroundColor: "#087E8B" }}
                      />
                      <label className="form-check-label" htmlFor="defaultCheck1">
                        Techo solar
                      </label>
                    </div>
                  </div>
                 
                  <div className="col">
                    <div className="col">
                      <div className="form-check m-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Si contiene"
                          name="Multimedia"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                          value="Si contiene"
                          name="Butacas de cuero"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                          value="Si contiene"
                          name="Comp. de abordo"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                        value="Si contiene"
                        name="Limpiador trasero"
                        id="defaultCheck1"
                        style={{ backgroundColor: "#087E8B" }}
                      />
                      <label className="form-check-label" htmlFor="defaultCheck1">
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
                          value="Si contiene"
                          name="Desemp. trasero"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
                          Desemp. trasero
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
                          value="Si contiene"
                          name="Ruedas de aleación"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                          value="Si contiene"
                          name="Trabas eléctricas"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                        value="Si contiene"
                        name="Vidrios eléctricos 2P"
                        id="defaultCheck1"
                        style={{ backgroundColor: "#087E8B" }}
                      />
                      <label className="form-check-label" htmlFor="defaultCheck1">
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
                          value="Si contiene"
                          name="Vidrios eléctricos 4P"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                        value="Si contiene"
                        name="Control de tracción"
                        id="defaultCheck1"
                        style={{ backgroundColor: "#087E8B" }}
                      />
                      <label className="form-check-label" htmlFor="defaultCheck1">
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
                          value="Si contiene"
                          name="Tracción 4x4"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                          name="Ctrl de estabilidad"
                          value="Si contiene"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                          value="Si contiene"
                          name="Triángulo"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                        value="Si contiene"
                        name="Cricket"
                        id="defaultCheck1"
                        style={{ backgroundColor: "#087E8B" }}
                      />
                      <label className="form-check-label" htmlFor="defaultCheck1">
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
                          value="Si contiene"
                          name="Llave de rueda"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                        name="Cámara de estacionamiento"
                        value="Si contiene"
                        id="defaultCheck1"
                        style={{ backgroundColor: "#087E8B" }}
                      />
                      <label className="form-check-label" htmlFor="defaultCheck1">
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
                          value="Si contiene"
                          name="Espejos eléctricos"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                          value="Si contiene"
                          name="Sensor de estacionamiento"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                          value="Si contiene"
                          name="Capota marítima"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                        value="Si contiene"
                        name="Barras antivuelco"
                        id="defaultCheck1"
                        style={{ backgroundColor: "#087E8B" }}
                      />
                      <label className="form-check-label" htmlFor="defaultCheck1">
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
                          value="Si contiene"
                          name="Faroles auxiliares"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                        value="Si contiene"
                        name="Sensor de lluvia"
                        id="defaultCheck1"
                        style={{ backgroundColor: "#087E8B" }}
                      />
                      <label className="form-check-label" htmlFor="defaultCheck1">
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
                          value="Si contiene"
                          name="Sensor de faroles"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                          value="Si contiene"
                          name="Cruise control"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                          value="Si contiene"
                          name="Butacas con regulacion eléctrica"
                          id="defaultCheck1"
                          style={{ backgroundColor: "#087E8B" }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
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
                        value="Si contiene"
                        name="Entrada USB/SD CARD/AUX/BT"
                        id="defaultCheck1"
                        style={{ backgroundColor: "#087E8B" }}
                      />
                      <label className="form-check-label" htmlFor="defaultCheck1">
                        Entrada USB/SD CARD/AUX/BT
                      </label>
                    </div>
                  </div>
                  <div className="col"></div>
                </div>
              </div>
            </form>
            <hr className="mt-3" />
            <div>
              <form id="myForm5">
                <div className="col-md">
                  Estado de conservación y desgaste
                  <div className="row mt-3">
                    <div className="col">
                      <p style={{ color: "#087E8B" }}></p>
                    </div>
                    <div className="col">
                      <div className="star-rating">
                        <div className="radio-group">
                          <p style={{ fontSize: "16px", color: "#087E8B" }}>
                            (M) (R) (B)
                          </p>
                        </div>
                        <hr />
                      </div>
                    </div>
                    <div className="col">
                      <p style={{ color: "#087E8B" }}></p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Neumático D.I.</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Neumático D.I."
                            id="1-stars"
                            value="Bueno"
                          />
                          <label htmlFor="1-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Neumático D.I."
                            id="2-stars"
                            value="Regular"
                          />
                          <label htmlFor="2-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Neumático D.I."
                            id="3-stars"
                            value="Malo"
                          />
                          <label htmlFor="3-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal-di"
                        data-bs-whatever="@mdo"
                        style={{
                          backgroundColor: "#087E8B",
                          borderColor: "#087E8B",
                          borderRadius: "25px",
                          width: "40px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={lapiz}
                          alt=""
                          style={{
                            height: "18px",
                            width: "18px",
                            margin: "auto",
                            display: "flex",
                            marginLeft: "-50%",
                          }}
                        />
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal-di"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Observaciones
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="mb-3">
                                <textarea
                                  className="form-control"
                                  id="message-text"
                                  name="Observaciones Neumático D.I."
                                ></textarea>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                style={{ backgroundColor: "#087E8B" }}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                ✔
                              </button>
                            </div>
                          </div>
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
                          <input
                            type="radio"
                            name="Neumático D.D."
                            id="4-stars"
                            value="Bueno"
                          />
                          <label htmlFor="4-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Neumático D.D."
                            id="5-stars"
                            value="Regular"
                          />
                          <label htmlFor="5-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Neumático D.D."
                            id="6-stars"
                            value="Malo"
                          />
                          <label htmlFor="6-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal-dd"
                        data-bs-whatever="@mdo"
                        style={{
                          backgroundColor: "#087E8B",
                          borderColor: "#087E8B",
                          borderRadius: "25px",
                          width: "40px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={lapiz}
                          alt=""
                          style={{
                            height: "18px",
                            width: "18px",
                            margin: "auto",
                            display: "flex",
                            marginLeft: "-50%",
                          }}
                        />
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal-dd"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Observaciones
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="mb-3">
                                <textarea
                                  className="form-control"
                                  id="message-text"
                                  name="Observaciones Neumático D.D."
                                ></textarea>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                style={{ backgroundColor: "#087E8B" }}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                ✔
                              </button>
                            </div>
                          </div>
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
                          <input
                            type="radio"
                            name="Neumático T.I."
                            id="7-stars"
                            value="Bueno"
                          />
                          <label htmlFor="7-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Neumático T.I."
                            id="8-stars"
                            value="Regular"
                          />
                          <label htmlFor="8-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Neumático T.I."
                            id="9-stars"
                            value="Malo"
                          />
                          <label htmlFor="9-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal-ti"
                        data-bs-whatever="@mdo"
                        style={{
                          backgroundColor: "#087E8B",
                          borderColor: "#087E8B",
                          borderRadius: "25px",
                          width: "40px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={lapiz}
                          alt=""
                          style={{
                            height: "18px",
                            width: "18px",
                            margin: "auto",
                            display: "flex",
                            marginLeft: "-50%",
                          }}
                        />
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal-ti"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Observaciones
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="mb-3">
                                <textarea
                                  className="form-control"
                                  id="message-text"
                                  name="Observaciones Neumático T.I."
                                ></textarea>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                style={{ backgroundColor: "#087E8B" }}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                ✔
                              </button>
                            </div>
                          </div>
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
                          <input
                            type="radio"
                            name="Neumático T.D."
                            id="10-stars"
                            value="Bueno"
                          />
                          <label htmlFor="10-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Neumático T.D."
                            id="11-stars"
                            value="Regular"
                          />
                          <label htmlFor="11-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Neumático T.D."
                            id="12-stars"
                            value="Malo"
                          />
                          <label htmlFor="12-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal-td"
                        data-bs-whatever="@mdo"
                        style={{
                          backgroundColor: "#087E8B",
                          borderColor: "#087E8B",
                          borderRadius: "25px",
                          width: "40px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={lapiz}
                          alt=""
                          style={{
                            height: "18px",
                            width: "18px",
                            margin: "auto",
                            display: "flex",
                            marginLeft: "-50%",
                          }}
                        />
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal-td"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Observaciones
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="mb-3">
                                <textarea
                                  className="form-control"
                                  id="message-text"
                                  name="Observaciones Neumático T.D."
                                ></textarea>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                style={{ backgroundColor: "#087E8B" }}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                ✔
                              </button>
                            </div>
                          </div>
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
                          <input
                            type="radio"
                            name="Neumático Repuesto"
                            id="13-stars"
                            value="Bueno"
                          />
                          <label htmlFor="13-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Neumático Repuesto"
                            id="14-stars"
                            value="Regular"
                          />
                          <label htmlFor="14-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Neumático Repuesto"
                            id="15-stars"
                            value="Malo"
                          />
                          <label htmlFor="15-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal-nr"
                        data-bs-whatever="@mdo"
                        style={{
                          backgroundColor: "#087E8B",
                          borderColor: "#087E8B",
                          borderRadius: "25px",
                          width: "40px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={lapiz}
                          alt=""
                          style={{
                            height: "18px",
                            width: "18px",
                            margin: "auto",
                            display: "flex",
                            marginLeft: "-50%",
                          }}
                        />
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal-nr"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Observaciones
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="mb-3">
                                <textarea
                                  className="form-control"
                                  id="message-text"
                                  name="Observaciones Neumático Repuesto"
                                ></textarea>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                style={{ backgroundColor: "#087E8B" }}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                ✔
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>A / C</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Aire Acondicionado"
                            id="22-stars"
                            value="Bueno"
                          />
                          <label htmlFor="22-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Aire Acondicionado"
                            id="23-stars"
                            value="Regular"
                          />
                          <label htmlFor="23-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Aire Acondicionado"
                            id="24-stars"
                            value="Malo"
                          />
                          <label htmlFor="24-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Intermit.</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Intermitentes"
                            id="25-stars"
                            value="Bueno"
                          />
                          <label htmlFor="25-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Intermitentes"
                            id="26-stars"
                            value="Regular"
                          />
                          <label htmlFor="26-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Intermitentes"
                            id="27-stars"
                            value="Malo"
                          />
                          <label htmlFor="27-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col"></div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Luces Faro/Int.</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Luces/Farol/Interno"
                            id="28-stars"
                            value="Bueno"
                          />
                          <label htmlFor="28-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Luces/Farol/Interno"
                            id="29-stars"
                            value="Regular"
                          />
                          <label htmlFor="29-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Luces/Farol/Interno"
                            id="30-stars"
                            value="Malo"
                          />
                          <label htmlFor="30-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Motor general</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Motor general"
                            id="31-stars"
                            value="Bueno"
                          />
                          <label htmlFor="31-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Motor general"
                            id="32-stars"
                            value="Regular"
                          />
                          <label htmlFor="32-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Motor general"
                            id="33-stars"
                            value="Malo"
                          />
                          <label htmlFor="33-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal-mg"
                        data-bs-whatever="@mdo"
                        style={{
                          backgroundColor: "#087E8B",
                          borderColor: "#087E8B",
                          borderRadius: "25px",
                          width: "40px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={lapiz}
                          alt=""
                          style={{
                            height: "18px",
                            width: "18px",
                            margin: "auto",
                            display: "flex",
                            marginLeft: "-50%",
                          }}
                        />
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal-mg"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Observaciones
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="mb-3">
                                <textarea
                                  className="form-control"
                                  id="message-text"
                                  name="Observaciones Motor Gral"
                                ></textarea>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                style={{ backgroundColor: "#087E8B" }}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                ✔
                              </button>
                            </div>
                          </div>
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
                          <input
                            type="radio"
                            name="Acción Embrague"
                            id="34-stars"
                            value="Bueno"
                          />
                          <label htmlFor="34-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Acción Embrague"
                            id="35-stars"
                            value="Regular"
                          />
                          <label htmlFor="35-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Acción Embrague"
                            id="36-stars"
                            value="Malo"
                          />
                          <label htmlFor="36-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal-ae"
                        data-bs-whatever="@mdo"
                        style={{
                          backgroundColor: "#087E8B",
                          borderColor: "#087E8B",
                          borderRadius: "25px",
                          width: "40px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={lapiz}
                          alt=""
                          style={{
                            height: "18px",
                            width: "18px",
                            margin: "auto",
                            display: "flex",
                            marginLeft: "-50%",
                          }}
                        />
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal-ae"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Observaciones
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="mb-3">
                                <textarea
                                  className="form-control"
                                  id="message-text"
                                  name="Observaciones Acción Embrague"
                                ></textarea>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                style={{ backgroundColor: "#087E8B" }}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                ✔
                              </button>
                            </div>
                          </div>
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
                          <input
                            type="radio"
                            name="Pastillas de freno"
                            id="37-stars"
                            value="Bueno"
                          />
                          <label htmlFor="37-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Pastillas de freno"
                            id="38-stars"
                            value="Regular"
                          />
                          <label htmlFor="38-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Pastillas de freno"
                            id="39-stars"
                            value="Malo"
                          />
                          <label htmlFor="39-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Discos de freno</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Discos de freno"
                            id="40-stars"
                            value="Bueno"
                          />
                          <label htmlFor="40-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Discos de freno"
                            id="41-stars"
                            value="Regular"
                          />
                          <label htmlFor="41-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Discos de freno"
                            id="42-stars"
                            value="Malo"
                          />
                          <label htmlFor="42-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
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
                            name="Fuga de frenos"
                            id="43-stars"
                            className="input-tof"
                            value="No"
                          />
                          <label htmlFor="43-stars" className="labeltof">
                            NO
                          </label>

                          <input
                            type="radio"
                            name="Fuga de frenos"
                            id="45-stars"
                            className="input-tof"
                            value="Si"
                          />
                          <label htmlFor="45-stars" className="labeltof">
                            SI
                          </label>
                        </div>
                      </div>
                     
                    </div>
                    <div className="col mt-2"></div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Amorti - guadores</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Amortiguadores"
                            id="46-stars"
                            value="Bueno"
                          />
                          <label htmlFor="46-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Amortiguadores"
                            id="47-stars"
                            value="Regular"
                          />
                          <label htmlFor="47-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Amortiguadores"
                            id="48-stars"
                            value="Malo"
                          />
                          <label htmlFor="48-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal-amort"
                        data-bs-whatever="@mdo"
                        style={{
                          backgroundColor: "#087E8B",
                          borderColor: "#087E8B",
                          borderRadius: "25px",
                          width: "40px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={lapiz}
                          alt=""
                          style={{
                            height: "18px",
                            width: "18px",
                            margin: "auto",
                            display: "flex",
                            marginLeft: "-50%",
                          }}
                        />
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal-amort"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Observaciones
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="mb-3">
                                <textarea
                                  className="form-control"
                                  id="message-text"
                                  name="Observaciones Amortiguadores"
                                ></textarea>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                style={{ backgroundColor: "#087E8B" }}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                ✔
                              </button>
                            </div>
                          </div>
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
                          <input
                            type="radio"
                            name="Suspensión juntas"
                            id="49-stars"
                            value="Bueno"
                          />
                          <label htmlFor="49-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Suspensión juntas"
                            id="50-stars"
                            value="Regular"
                          />
                          <label htmlFor="50-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Suspensión juntas"
                            id="51-stars"
                            value="Malo"
                          />
                          <label htmlFor="51-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Ruidos en suspensión</p>
                    </div>
                    <div className="col">
                      <div className="tof" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Ruidos en la suspensión"
                            id="52-stars"
                            className="input-tof"
                            value="No"
                          />
                          <label htmlFor="52-stars" className="labeltof">
                            NO
                          </label>

                          <input
                            type="radio"
                            name="Ruidos en la suspensión"
                            id="54-stars"
                            className="input-tof"
                            value="Si"
                          />
                          <label htmlFor="54-stars" className="labeltof">
                            SI
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Correa dentada</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Correa dentada"
                            id="55-stars"
                            value="Bueno"
                          />
                          <label htmlFor="55-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Correa dentada"
                            id="56-stars"
                            value="Regular"
                          />
                          <label htmlFor="56-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Correa dentada"
                            id="57-stars"
                            value="Malo"
                          />
                          <label htmlFor="57-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal-cd"
                        data-bs-whatever="@mdo"
                        style={{
                          backgroundColor: "#087E8B",
                          borderColor: "#087E8B",
                          borderRadius: "25px",
                          width: "40px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={lapiz}
                          alt=""
                          style={{
                            height: "18px",
                            width: "18px",
                            margin: "auto",
                            display: "flex",
                            marginLeft: "-50%",
                          }}
                        />
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal-cd"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Observaciones
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="mb-3">
                                <textarea
                                  className="form-control"
                                  id="message-text"
                                  name="Observaciones Correa dentada"
                                ></textarea>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                style={{ backgroundColor: "#087E8B" }}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                ✔
                              </button>
                            </div>
                          </div>
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
                          <input
                            type="radio"
                            name="Regulación de butacas"
                            id="58-stars"
                            value="Bueno"
                          />
                          <label htmlFor="58-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Regulación de butacas"
                            id="59-stars"
                            value="Regular"
                          />
                          <label htmlFor="59-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Regulación de butacas"
                            id="60-stars"
                            value="Malo"
                          />
                          <label htmlFor="60-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Acción vidrios eléctricos</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Acción vidrios eléctricos"
                            id="61-stars"
                            value="Bueno"
                          />
                          <label htmlFor="61-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Acción vidrios eléctricos"
                            id="62-stars"
                            value="Regular"
                          />
                          <label htmlFor="62-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Acción vidrios eléctricos"
                            id="63-stars"
                            value="Malo"
                          />
                          <label htmlFor="63-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal-ave"
                        data-bs-whatever="@mdo"
                        style={{
                          backgroundColor: "#087E8B",
                          borderColor: "#087E8B",
                          borderRadius: "25px",
                          width: "40px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={lapiz}
                          alt=""
                          style={{
                            height: "18px",
                            width: "18px",
                            margin: "auto",
                            display: "flex",
                            marginLeft: "-50%",
                          }}
                        />
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal-ave"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Observaciones
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="mb-3">
                                <textarea
                                  className="form-control"
                                  id="message-text"
                                  name="Observaciones Acción vidrios eléctricos"
                                ></textarea>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                style={{ backgroundColor: "#087E8B" }}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                ✔
                              </button>
                            </div>
                          </div>
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
                          <input
                            type="radio"
                            name="Acción vidrios manuales"
                            id="64-stars"
                            value="Bueno"
                          />
                          <label htmlFor="64-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Acción vidrios manuales"
                            id="65-stars"
                            value="Bueno"
                          />
                          <label htmlFor="65-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Acción vidrios manuales"
                            id="66-stars"
                            value="Malo"
                          />
                          <label htmlFor="66-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Estado de butacas</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Estado de butacas"
                            id="67-stars"
                            value="Bueno"
                          />
                          <label htmlFor="67-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Estado de butacas"
                            id="68-stars"
                            value="Regular"
                          />
                          <label htmlFor="68-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Estado de butacas"
                            id="69-stars"
                            value="Malo"
                          />
                          <label htmlFor="69-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal-eb"
                        data-bs-whatever="@mdo"
                        style={{
                          backgroundColor: "#087E8B",
                          borderColor: "#087E8B",
                          borderRadius: "25px",
                          width: "40px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={lapiz}
                          alt=""
                          style={{
                            height: "18px",
                            width: "18px",
                            margin: "auto",
                            display: "flex",
                            marginLeft: "-50%",
                          }}
                        />
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal-eb"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Observaciones
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="mb-3">
                                <textarea
                                  className="form-control"
                                  id="message-text"
                                  name="Observaciones Estado de butacas"
                                ></textarea>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                style={{ backgroundColor: "#087E8B" }}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                ✔
                              </button>
                            </div>
                          </div>
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
                          <input
                            type="radio"
                            name="Acción freno de estac."
                            id="70-stars"
                            value="Bueno"
                          />
                          <label htmlFor="70-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Acción freno de estac."
                            id="71-stars"
                            value="Regular"
                          />
                          <label htmlFor="71-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Acción freno de estac."
                            id="72-stars"
                            value="Malo"
                          />
                          <label htmlFor="72-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Acción trabas eléctricas</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Acción trabas eléctricas"
                            id="73-stars"
                            value="Bueno"
                          />
                          <label htmlFor="73-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Acción trabas eléctricas"
                            id="74-stars"
                            value="Regular"
                          />
                          <label htmlFor="74-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Acción trabas eléctricas"
                            id="75-stars"
                            value="Malo"
                          />
                          <label htmlFor="75-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Acción Espejos</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Acción Espejos"
                            id="76-stars"
                            value="Bueno"
                          />
                          <label htmlFor="76-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Acción Espejos"
                            id="77-stars"
                            value="Regular"
                          />
                          <label htmlFor="77-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Acción Espejos"
                            id="78-stars"
                            value="Malo"
                          />
                          <label htmlFor="78-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Cinturones de seguridad</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="inturones de seguridad"
                            id="79-stars"
                            value="Bueno"
                          />
                          <label htmlFor="79-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="inturones de seguridad"
                            id="80-stars"
                            value="Regular"
                          />
                          <label htmlFor="80-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="inturones de seguridad"
                            id="81-stars"
                            value="Malo"
                          />
                          <label htmlFor="81-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Caja de dirección</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Caja de dirección"
                            id="82-stars"
                            value="Bueno"
                          />
                          <label htmlFor="82-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Caja de dirección"
                            id="83-stars"
                            value="Regular"
                          />
                          <label htmlFor="83-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Caja de dirección"
                            id="84-stars"
                            value="Malo"
                          />
                          <label htmlFor="84-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Cojin de motor y cambios</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Cojin de motor y cambios"
                            id="85-stars"
                            value="Bueno"
                          />
                          <label htmlFor="85-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Cojin de motor y cambios"
                            id="86-stars"
                            value="Regular"
                          />
                          <label htmlFor="86-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Cojin de motor y cambios"
                            id="87-stars"
                            value="Malo"
                          />
                          <label htmlFor="87-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
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
                            name="Ruido de motor / cambios"
                            id="88-stars"
                            value="No"
                            className="input-tof"
                          />
                          <label htmlFor="88-stars" className="labeltof">
                            NO
                          </label>

                          <input
                            type="radio"
                            name="Ruido de motor / cambios"
                            id="90-stars"
                            value="Si"
                            className="input-tof"
                          />
                          <label htmlFor="90-stars" className="labeltof">
                            SI
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
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
                            name="Fuga motor"
                            id="91-stars"
                            value="No"
                            className="input-tof"
                          />
                          <label htmlFor="91-stars" className="labeltof">
                            NO
                          </label>

                          <input
                            type="radio"
                            name="Fuga motor"
                            id="93-stars"
                            value="Si"
                            className="input-tof"
                          />
                          <label htmlFor="93-stars" className="labeltof">
                            SI
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
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
                            name="Fuga de cambios"
                            id="94-stars"
                            value="No"
                            className="input-tof"
                          />
                          <label htmlFor="94-stars" className="labeltof">
                            NO
                          </label>

                          <input
                            type="radio"
                            name="Fuga de cambios"
                            id="96-stars"
                            value="Si"
                            className="input-tof"
                          />
                          <label htmlFor="96-stars" className="labeltof">
                            SI
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Escape</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Escape"
                            id="97-stars"
                            value="Bueno"
                          />
                          <label htmlFor="97-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Escape"
                            id="98-stars"
                            value="Regular"
                          />
                          <label htmlFor="98-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Escape"
                            id="99-stars"
                            value="Malo"
                          />
                          <label htmlFor="99-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
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
                            name="Humo anormal"
                            id="100-stars"
                            value="No"
                            className="input-tof"
                          />
                          <label htmlFor="100-stars" className="labeltof">
                            NO
                          </label>

                          <input
                            type="radio"
                            name="Humo anormal"
                            id="102-stars"
                            value="Si"
                            className="input-tof"
                          />
                          <label htmlFor="102-stars" className="labeltof">
                            SI
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2"></div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <p>Estado del panel</p>
                    </div>
                    <div className="col">
                      <div className="star-rating" dir="rtl">
                        <div className="radio-group">
                          <input
                            type="radio"
                            name="Estado del panel"
                            id="103-stars"
                            value="Bueno"
                          />
                          <label htmlFor="103-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Estado del panel"
                            id="104-stars"
                            value="Regular"
                          />
                          <label htmlFor="104-stars" className="star">
                            &#9733;
                          </label>
                          <input
                            type="radio"
                            name="Estado del panel"
                            id="105-stars"
                            value="Malo"
                          />
                          <label htmlFor="105-stars" className="star">
                            &#9733;
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col mt-2">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal-ep"
                        data-bs-whatever="@mdo"
                        style={{
                          backgroundColor: "#087E8B",
                          borderColor: "#087E8B",
                          borderRadius: "25px",
                          width: "40px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={lapiz}
                          alt=""
                          style={{
                            height: "18px",
                            width: "18px",
                            margin: "auto",
                            display: "flex",
                            marginLeft: "-50%",
                          }}
                        />
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal-ep"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Observaciones
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="mb-3">
                                <textarea
                                  className="form-control"
                                  id="message-text"
                                  name="Observaciones Estado del panel"
                                ></textarea>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                style={{ backgroundColor: "#087E8B" }}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                ✔
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr className="mt-3" />
        Fotos del vehículo
        <div className="row mt-2">
          <div className="col-md">
            <div className="mb-3">
              <label htmlFor="frontalImageFile" className="form-label">
                Frontal
              </label>
              <input
                className="form-control"
                type="file"
                id="frontalImageFile"
                
                onChange={(event) =>
                  setFrontalImage(URL.createObjectURL(event.target.files[0]))
                }
              />
            </div>
           
            {frontalImage && (
              <div>
                <h6>Imagen frontal seleccionada:</h6>
                <img
                
                  src={frontalImage}
                  alt="Imagen frontal seleccionada"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                  value=""
                />
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="detrasImageFile" className="form-label">
                Detras
              </label>
              <input
                className="form-control"
                type="file"
                id="detrasImageFile"
               
                onChange={(event) =>
                  setDetrasImage(URL.createObjectURL(event.target.files[0]))
                }
              />
            </div>
    
            {detrasImage && (
              <div>
                <h6>Imagen de detrás seleccionada:</h6>
                <img
              
                  src={detrasImage}
                  alt="Imagen de detrás seleccionada"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
              </div>
            )}
          </div>
          <div className="col-md">
            <div className="mb-3">
              <label htmlFor="izquierdoImageFile" className="form-label">
                Perfil Izquierdo
              </label>
              <input
                className="form-control"
                type="file"
                id="izquierdoImageFile"
              
                onChange={(event) =>
                  setIzquierdoImage(URL.createObjectURL(event.target.files[0]))
                }
              />
            </div>
          
            {izquierdoImage && (
              <div>
                <h6>Imagen frontal seleccionada:</h6>
                <img
             
                  src={izquierdoImage}
                  alt="Imagen frontal seleccionada"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="derechoImageFile" className="form-label">
                Perfil Derecho
              </label>
              <input
                className="form-control"
                type="file"
                id="derechoImageFile"
                
                onChange={(event) =>
                  setDerechoImage(URL.createObjectURL(event.target.files[0]))
                }
              />
            </div>
            {/* {derechoImageURL && ( */}
            {derechoImage && (
              <div>
                <h6>Imagen de detrás seleccionada:</h6>
                <img
                  //src={derechoImageURL}
                  src={derechoImage}
                  alt="Imagen de detrás seleccionada"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
              </div>
            )}
            
          </div>
        </div>
        <hr className="mt-1" />
        <div>
          <form id="myForm6">
            <div className="row">
              <div className="col">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    name="Observaciones (rayaduras o aboyaduras)"
                    placeholder="Observaciones (rayaduras o aboyaduras)"
                    id="floatingTextarea3"
                    style={{
                      height: "100px",
                      backgroundColor: "transparent",
                    }}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                  <label htmlFor="floatingTextarea3">
                    Observaciones (rayaduras o aboyaduras)
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md" id="todoList">
             
            </div>
          </form>
          <hr className="mt-3" />
          <form id="myForm7">
            <div className="row">
              <div className="col">
                Calificación general del vehículo
                <select
                  id="myCustomSelect"
                  className="form-control custom-select mt-1"
                  aria-label="Default select example"
                  name="Calificación General del Vehículo"
                  style={{
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid #ccc",
                    backgroundImage:
                      "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' width='18px' height='18px'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E')",
                    backgroundPosition: "right center",
                    backgroundRepeat: "no-repeat",
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    paddingRight: "20px",
                  }}
                >
                  <option value="" hidden name="calificacion">
                    Seleccionar
                  </option>
                  <option className="option-select" value="Malo">
                    Malo
                  </option>
                  <option className="option-select" value="Regular">
                    Regular
                  </option>
                  <option className="option-select" value="Bueno">
                    Bueno
                  </option>
                  <option className="option-select" value="Muy bueno">
                    Muy bueno
                  </option>
                  <option className="option-select" value="Excelente">
                    Excelente
                  </option>
                </select>
              </div>
            </div>
          </form>
          <hr className="mt-3" />
          <form id="myForm8">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <input
                    type="text"
                    name="Correo del destinatario"
                    placeholder=" "
                    id="correo"
                    autoComplete="off"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <label htmlFor="email" className="label-name">
                    <span className="content-name">
                      Correo del destinatario
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <hr className="mt-3" />
            <div className="row">
              <div className="col">
                
                <div className="col mt-1">
                  {
                    <div>
                      {selectedValueSolicitado === "" ? (
                        <label
                          htmlFor="myCustomSelect"
                          className="label-select"
                          style={{ color: "#f5f5f5" }}
                        >
                          vacio
                        </label>
                      ) : (
                        <label
                          htmlFor="myCustomSelect"
                          className="label-select"
                        >
                          Solicitado por
                        </label>
                      )}
                      <select
                        id="myCustomSelect"
                        className="form-control custom-select mt-1"
                        name="Solicitado por"
                        aria-label="Default select example"
                        value={selectedValueSolicitado}
                        onChange={handleSelectChangeSolicitado}
                        style={{
                          background: "transparent",
                          border: "none",
                          borderBottom: "1px solid #ccc",
                          backgroundImage:
                            "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' width='18px' height='18px'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E')",
                          backgroundPosition: "right center",
                          backgroundRepeat: "no-repeat",
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          paddingRight: "20px",
                        }}
                      >
                        <option value="" hidden name="solicitado">
                          Solicitado por
                        </option>
                        <option className="option-select" value="Convencional">
                          Convencional
                        </option>
                        <option
                          className="option-select"
                          value="Planes de ahorro"
                        >
                          Planes de ahorro
                        </option>
                        <option className="option-select" value="Usados">
                          Usados
                        </option>
                      </select>
                    </div>
                  }
                </div>
              </div>
              <div className="col">
                {
                  <div>
                    {selectedValuePeritomecanico === "" ? (
                      <label
                        htmlFor="myCustomSelect"
                        className="label-select"
                        style={{ color: "#f5f5f5" }}
                      >
                        vacio
                      </label>
                    ) : (
                      <label htmlFor="myCustomSelect" className="label-select">
                        Perito mecánico
                      </label>
                    )}
                    <select
                      id="myCustomSelect"
                      className="form-control custom-select mt-1"
                      name="Peritaje mecánico"
                      aria-label="Default select example"
                      value={selectedValuePeritomecanico}
                      onChange={handleSelectChangePeritomecanico}
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid #ccc",
                        backgroundImage:
                          "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' width='18px' height='18px'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E')",
                        backgroundPosition: "right center",
                        backgroundRepeat: "no-repeat",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        paddingRight: "20px",
                      }}
                    >
                      <option value="" hidden name="mecanico">
                        Peritaje mecánico
                      </option>
                      <option className="option-select" value="Diego Palomares">
                        Diego Palomares
                      </option>
                      <option className="option-select" value="Claudio Bender">
                        Claudio Bender
                      </option>
                      <option className="option-select" value="Jesús Beroiza">
                        Jesús Beroiza
                      </option>
                      <option className="option-select" value="Miguel Aba">
                        Miguel Aba
                      </option>
                    </select>
                  </div>
                }
              </div>
            </div>
            <hr className="mt-3" />
            <div className="row">
              <div className="col">
                {
                  <div>
                    {selectedValuePeritochapa === "" ? (
                      <label
                        htmlFor="myCustomSelect"
                        className="label-select"
                        style={{ color: "#f5f5f5" }}
                      >
                        vacio
                      </label>
                    ) : (
                      <label htmlFor="myCustomSelect" className="label-select">
                        Peritaje chapa y pintura
                      </label>
                    )}
                    <select
                      id="myCustomSelect"
                      className="form-control custom-select mt-1"
                      name="Peritaje de chapa y pintura"
                      aria-label="Default select example"
                      value={selectedValuePeritochapa}
                      onChange={handleSelectChangePeritochapa}
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid #ccc",
                        backgroundImage:
                          "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' width='18px' height='18px'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E')",
                        backgroundPosition: "right center",
                        backgroundRepeat: "no-repeat",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        paddingRight: "20px",
                      }}
                    >
                      <option value="" hidden name="chapa">
                        Peritaje chapa y pintura
                      </option>
                      <option className="option-select" value="Johan Leal">
                        Johan Leal
                      </option>
                      <option className="option-select" value="Gabriel Avecina">
                        Gabriel Avecina
                      </option>
                      
                    </select>
                  </div>
                }
              </div>
            </div>
            <hr className="mt-3" />
          </form>
          <form id="myForm9">
            <div className="row">
            <div className="col"></div>
              <div className="col">
                <div className="form-group mt-2">
                  <input
                    type="text"
                    name="Valor Tasado"
                    placeholder=" "
                    id="valor"
                    autoComplete="off"
                    pattern="[0-9]*"
                    maxLength={9}
                    required
                    onKeyPress={handleKeyPress}
                    value={"$" + inputTasado} // Agrega el signo "$" al valor ingresado
                    onInput={handleInputTasado} // Actualiza el valor ingresado en el estado
                  />
                  <label htmlFor="valor" className="label-name">
                    <span
                      className="content-name"
                      style={{ marginTop: "-5px" }}
                    >
                      Valor Tasado
                    </span>
                  </label>
                </div>
              </div>
              <div className="col"></div>
            </div>
          </form>
        </div>
      </div>
     
      <PDFDownloadLink document={generarPDF()} fileName="PireRayenTasacion.pdf">
        {({ blob, url, loading, error }) => (
          <button
            onClick={(event) => {
              event.preventDefault();
              Swal.fire({
                title: "¿Deseas finalizar y descargar el PDF?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "No",
                customClass: {
                  confirmButton: "swal2-confirm-color",
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  window.open(url, "_blank");
                 window.location.reload()
                }
              });
            }}
            style={{marginTop:"2%"}}
          >
            {loading ? "Generando PDF..." : "Finalizar"}
          </button>
        )}
      </PDFDownloadLink>

      <hr className="mt-3" />
    </div>
  );
}
