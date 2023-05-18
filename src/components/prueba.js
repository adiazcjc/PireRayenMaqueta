const generarPDF = () => {

    const formData = new FormData(document.getElementById("myForm"));
    const doc = new jsPDF("p", "mm", "a4");
  
    const title = "FORMULARIO DE TASACION DE VEHICULOS USADOS";
  
    const titleStyle = {
      background: "#087E8B",
      color: "#ffffff",
      fontSize: 12,
      fontFamily: "Helvetica",
      fontWeight: "bold",
      padding: 8,
      marginBottom: 8,
      marginTop: 4,
      border: {
        lineWidth: 1,
        lineColor: [0, 0, 0],
      },
    };
  
    const titleX = doc.internal.pageSize.getWidth() / 2;
    const titleY = 10;
    const marginX = 10; // Margen izquierdo y derecho
  
    const rectWidth = doc.getTextWidth(title) + 2 * titleStyle.padding + 2 * marginX;
    const rectHeight = 20; // Ajusta la altura del rectángulo aquí
  
    doc.setDrawColor(
      titleStyle.border.lineColor[0],
      titleStyle.border.lineColor[1],
      titleStyle.border.lineColor[2]
    );
    doc.setFillColor(titleStyle.background);
    doc.setLineWidth(titleStyle.border.lineWidth);
    doc.rect(
      titleX - rectWidth / 2,
      titleY,
      rectWidth,
      rectHeight,
      "F"
    );
    doc.setTextColor(titleStyle.color);
    doc.setFontSize(titleStyle.fontSize);
    doc.setFont(titleStyle.fontFamily, titleStyle.fontWeight);
    doc.text(
      title,
      titleX,
      titleY + rectHeight / 2,
      { align: "center" }
    );
    doc.setFillColor("#f2f2f2");
    doc.setTextColor("#000000");
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
  
    let y = titleY + rectHeight + 10;
  
    formData.forEach((value, key) => {
      doc.text(key + ": " + value, 10, y);
      y += 10;
  
      if (y > doc.internal.pageSize.height - 20) {
        doc.addPage();
        y = 20;
      }
    });
  
    const imageUrls = [frontalImageURL, izquierdoImageURL, derechoImageURL, detrasImageURL];
    const maxImagesPerColumn = 2; // Número máximo de imágenes por columna
    const columnWidth = doc.internal.pageSize.width / 2; // Ancho de cada columna
  
    let numImagesLoaded = 0;
    const checkIfAllImagesLoaded = () => {
      numImagesLoaded++;
      if (numImagesLoaded === imageUrls.length) {
        doc.save("formulario.pdf");
      }
    };
  
    let currentY = y; // Variable para mantener el seguimiento de la posición Y
  
    imageUrls.forEach((imageUrl, index) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function () {
        const imgWidth = this.width;
        const imgHeight = this.height;
        const aspectRatio = imgWidth / imgHeight;
        const maxWidth = columnWidth - 20; // Ancho máximo de la imagen en la columna
        const maxHeight = 100;
  
        let finalWidth = imgWidth;
        let finalHeight = imgHeight;
  
        if (imgWidth > maxWidth) {
          finalWidth = maxWidth;
          finalHeight = finalWidth / aspectRatio;
        }
  
        if (finalHeight > maxHeight) {
          finalHeight = maxHeight;
          finalWidth = finalHeight * aspectRatio;
        }
  
        const column = Math.floor(index / maxImagesPerColumn); // Columna actual
        const x = column * columnWidth + 10; // Coordenada X en la columna
        const y = currentY + (index % maxImagesPerColumn) * (finalHeight + 10); // Coordenada Y en la columna
  
        if (y > doc.internal.pageSize.height - 20) {
          doc.addPage();
          currentY = 20; // Reiniciar la posición Y en la nueva página
        }
  
        doc.addImage(this, "JPEG", x, y, finalWidth, finalHeight);
        checkIfAllImagesLoaded();
      };
  
      img.src = imageUrl;
    });
    };

    //FUNCIONA A HORAS 18:11

    // const generarPDF = () => {
    //     const formData = new FormData(document.getElementById("myForm"));
    //     const doc = new jsPDF("p", "mm", "a4");
    
    //     const title = "FORMULARIO DE TASACION DE VEHICULOS USADOS";
    
    //     const titleStyle = {
    //       background: "#087E8B",
    //       color: "#ffffff",
    //       fontSize: 12,
    //       fontFamily: "Helvetica",
    //       fontWeight: "bold",
    //       padding: 8,
    //       marginBottom: 8,
    //       marginTop: 4,
    //       border: {
    //         lineWidth: 1,
    //         lineColor: [0, 0, 0],
    //       },
    //     };
    
    //     const titleX = doc.internal.pageSize.getWidth() / 2;
    //     const titleY = 10;
    //     const marginX = 10; // Margen izquierdo y derecho
    
    //     const rectWidth =
    //       doc.getTextWidth(title) + 2 * titleStyle.padding + 2 * marginX;
    //     const rectHeight = 20; // Ajusta la altura del rectángulo aquí
    
    //     doc.setDrawColor(
    //       titleStyle.border.lineColor[0],
    //       titleStyle.border.lineColor[1],
    //       titleStyle.border.lineColor[2]
    //     );
    //     doc.setFillColor(titleStyle.background);
    //     doc.setLineWidth(titleStyle.border.lineWidth);
    //     doc.rect(titleX - rectWidth / 2, titleY, rectWidth, rectHeight, "F");
    //     doc.setTextColor(titleStyle.color);
    //     doc.setFontSize(titleStyle.fontSize);
    //     doc.setFont(titleStyle.fontFamily, titleStyle.fontWeight);
    //     doc.text(title, titleX, titleY + rectHeight / 2, { align: "center" });
    //     doc.setFillColor("#f2f2f2");
    //     doc.setTextColor("#000000");
    //     doc.setFontSize(12);
    //     doc.setFont("helvetica", "normal");
    
    //     let y = titleY + rectHeight + 10;
    
    //     formData.forEach((value, key) => {
    //       doc.text(key + ": " + value, 10, y);
    //       y += 10;
    
    //       if (y > doc.internal.pageSize.height - 20) {
    //         doc.addPage();
    //         y = 20;
    //       }
    //     });
    
    //     const imageUrls = [
    //       frontalImageURL,
    //       izquierdoImageURL,
    //       derechoImageURL,
    //       detrasImageURL,
    //     ];
    //     const maxImagesPerColumn = 2; // Número máximo de imágenes por columna
    //     const columnWidth = doc.internal.pageSize.width / 2; // Ancho de cada columna
    
    //     let numImagesLoaded = 0;
    //     const checkIfAllImagesLoaded = () => {
    //       numImagesLoaded++;
    //       if (numImagesLoaded === imageUrls.length) {
    //         doc.save("formulario.pdf");
    //       }
    //     };
    
    //     let currentY = y; // Variable para mantener el seguimiento de la posición Y
    
    //     imageUrls.forEach((imageUrl, index) => {
    //       const img = new Image();
    //       img.crossOrigin = "anonymous";
    //       img.onload = function () {
    //         const imgWidth = this.width;
    //         const imgHeight = this.height;
    //         const aspectRatio = imgWidth / imgHeight;
    //         const maxWidth = columnWidth - 20; // Ancho máximo de la imagen en la columna
    //         const maxHeight = 100;
    
    //         let finalWidth = imgWidth;
    //         let finalHeight = imgHeight;
    
    //         if (imgWidth > maxWidth) {
    //           finalWidth = maxWidth;
    //           finalHeight = finalWidth / aspectRatio;
    //         }
    
    //         if (finalHeight > maxHeight) {
    //           finalHeight = maxHeight;
    //           finalWidth = finalHeight * aspectRatio;
    //         }
    
    //         const column = Math.floor(index / maxImagesPerColumn); // Columna actual
    //         const x = column * columnWidth + 10; // Coordenada X en la columna
    //         const y = currentY + (index % maxImagesPerColumn) * (finalHeight + 10); // Coordenada Y en la columna
    
    //         if (y > doc.internal.pageSize.height - 20) {
    //           doc.addPage();
    //           currentY = 20; // Reiniciar la posición Y en la nueva página
    //         }
    
    //         doc.addImage(this, "JPEG", x, y, finalWidth, finalHeight);
    //         checkIfAllImagesLoaded();
    //       };
    
    //       img.src = imageUrl;
    //     });
    //   };


    <Document>
        <Page style={styles.page}>
        <Text style={styles.title}>FORMULARIO DE TASACIÓN DE VEHÍCULOS USADOS</Text>
        <Text>{formData}</Text>
      </Page>
      </Document>

//FUNCIONA PERFECTO A LAS 20:30
// const generarPDF = () => {
//     const MyPDF = ({ formData }) => (
     
//       <Document>
//       <Page style={styles.page}>
//         <Text style={styles.title}>FORMULARIO DE TASACIÓN DE VEHÍCULOS USADOS</Text>
//         <View style={styles.formContainer}>
//           <View style={styles.column}>
//             <Text style={styles.columnTitle}>Columna 1</Text>
//             {formData.column1}
//           </View>
//           <View style={styles.column}>
//             <Text style={styles.columnTitle}>Columna 2</Text>
//             {formData.column2}
//           </View>
//         </View>
//       </Page>
//     </Document>
//     );

//     const getFormData = () => {
//       const form = $("#myForm"); // Obtener el formulario por su ID
//       const formData = new FormData(form[0]); // Crear un objeto FormData con el formulario

//       const serializedData = [];
//       formData.forEach((value, key) => {
//         serializedData.push(`${key}: ${value}`); // Serializar los datos del formulario
//       });

//       return serializedData.join("\n"); // Unir los datos serializados en un solo string
//     };

//     const formData = getFormData(); // Obtener los datos del formulario

//     return <MyPDF formData={formData} />;
//   };

//   const handleGenerarPDF = () => {
//     const pdf = generarPDF();
//     PDFDownloadLink.createPDF(pdf).download("formulario.pdf");
//   };