document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "es";
  changeLanguage(savedLang);

  if (savedLang == "es") {
    document.getElementById("potencia").placeholder = "Indique potencia";
    document.getElementById("Voltaje").placeholder = "Voltios";
    document.getElementById("distancia").placeholder = "Indique distancia";
    document.getElementById("Conductores_fase").placeholder = "# Conductores";
  }
  if (savedLang == "en") {
    document.getElementById("potencia").placeholder = "Indicate power";
    document.getElementById("Voltaje").placeholder = "Volts";
    document.getElementById("distancia").placeholder = "Indicate distance";
    document.getElementById("Conductores_fase").placeholder = "# Conductors";
  }
});

function changeLanguage(Valor) {
  const idioma = document.getElementById("Idioma").value;
  let lang = "";

  if (Valor) {
    lang = Valor;
  } else {
    if (idioma == "es") {
      lang = "es";
      document.getElementById("potencia").placeholder = "Indique potencia";
      document.getElementById("Voltaje").placeholder = "Voltios";
      document.getElementById("distancia").placeholder = "Indique distancia";
      document.getElementById("Conductores_fase").placeholder = "# Conductores";
    }
    if (idioma == "en") {
      lang = "en";
      document.getElementById("potencia").placeholder = "Indicate power";
      document.getElementById("Voltaje").placeholder = "Volts";
      document.getElementById("distancia").placeholder = "Indicate distance";
      document.getElementById("Conductores_fase").placeholder = "# Conductors";
    }
  }
  fetch(`idiomas/${lang}.json`)
    .then((response) => response.json())
    .then((translations) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });
      // Guarda el idioma en localStorage
      localStorage.setItem("lang", lang);
    });
}

function Enviar() {
  const Unidades_calibre = document.getElementById("Unidades_calibre").value;
  const AWG = document.getElementById("AWG").value;
  const MCM = document.getElementById("MCM").value;
  const Material = document.getElementById("Material").value;
  const Tuberia = document.getElementById("Material_canalizacion").value;
  let Calibre;

  if (Unidades_calibre == "AWG") {
    Calibre = AWG;
  }

  if (Unidades_calibre == "MCM") {
    Calibre = MCM;
  }

  fetch("https://electricidad-facil.com/impedancias", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      calibre: Calibre,
      material: Material,
      canalizacion: Tuberia,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const R = data.Resistencia;
      const X = data.Reactancia;
      const Calibre_rec = data.Calibre;
      const Material_rec = data.Material;
      const Tuberia_rec = data.Canalizacion;

      Calcular(R, X, Calibre_rec, Material_rec, Tuberia_rec);
    })
    .catch((error) => console.error("Error en solicitud al servidor.", error));
}

function Calcular(R, X, Calibre, Material, Canalizacion) {
  const tipoVoltaje = document.getElementById("Suministro-electrico").value;
  const Potencia = document.getElementById("potencia").value;
  const Unidad_Potencia = document.getElementById("Unidad_potencia").value;
  const fp = document.getElementById("fp").value;
  const V = document.getElementById("Voltaje").value;
  const L = document.getElementById("distancia").value;
  const Unidad_distancia = document.getElementById("Unidad_distancia").value;
  const N = document.getElementById("Conductores_fase").value;
  const savedLang = localStorage.getItem("lang") || "es";

  if (Validar(Potencia, V, fp, N)) {
    document.getElementById("Resultado_Calibre").innerHTML = Calibre;
    document.getElementById("Resultado_Material").innerHTML = Material;
    document.getElementById("Resultado_Canalizacion").innerHTML = Canalizacion;

    const cos = fp;
    const sen = Math.sqrt(1 - Math.pow(fp, 2));
    const Zc = R * cos + X * sen;

    const Icalc = Calculo_corriente(
      tipoVoltaje,
      Unidad_Potencia,
      Potencia,
      V,
      fp
    );

    if (savedLang == "es") {
      document.getElementById("Resultado_Material").innerHTML = Material;
    } else {
      if (Material == "Cobre") {
        document.getElementById("Resultado_Material").innerHTML = "Copper";
      } else {
        document.getElementById("Resultado_Material").innerHTML = "Aluminum";
      }

      if (Canalizacion == "Acero") {
        document.getElementById("Resultado_Canalizacion").innerHTML = "Steel";
      }

      if (Canalizacion == "Aluminio") {
        document.getElementById("Resultado_Canalizacion").innerHTML =
          "Aluminum";
      }
    }

    if (tipoVoltaje == "Monofasico") {
      const Resultado =
        (100 * Icalc * L * Multp_L(Unidad_distancia) * 2 * Zc) / (N * V);
      document.getElementById("Resultado_corriente").innerHTML =
        formatearNumero(Icalc) + " Amp";
      document.getElementById("Resultado_caida").innerHTML =
        "∆V = " + formatearNumero(Resultado) + " %";
    }
    if (tipoVoltaje == "Trifasico") {
      const Resultado =
        (100 * Icalc * L * Multp_L(Unidad_distancia) * Math.sqrt(3) * Zc) /
        (N * V);
      document.getElementById("Resultado_corriente").innerHTML =
        formatearNumero(Icalc) + " Amp";
      document.getElementById("Resultado_caida").innerHTML =
        "∆V = " + formatearNumero(Resultado) + " %";
    }
    document.getElementById("Resultado_buscar").style.display = "block";
    document.getElementById("Mostrar_resultados").style.display = "block";
    document.getElementById("Mostrar_advertencia").style.display = "none";
  } else {
    document.getElementById("Resultado_buscar").style.display = "block";
    document.getElementById("Mostrar_resultados").style.display = "none";
    document.getElementById("Mostrar_advertencia").style.display = "block";
  }
}

function Calculo_corriente(tipoVoltaje, Unidad_Potencia, Potencia, V, fp) {
  let S;
  if (Unidad_Potencia == "KVA") {
    S = 1000 * Potencia;
  }
  if (Unidad_Potencia == "VA") {
    S = Potencia;
  }
  if (Unidad_Potencia == "KW") {
    S = (1000 * Potencia) / fp;
  }
  if (Unidad_Potencia == "W") {
    S = Potencia / fp;
  }
  if (Unidad_Potencia == "HP") {
    S = (745.7 * Potencia) / fp;
  }

  if (tipoVoltaje == "Monofasico") {
    return S / V;
  }
  if (tipoVoltaje == "Trifasico") {
    return S / (Math.sqrt(3) * V);
  }
}

function Multp_L(tipoDistancia) {
  if (tipoDistancia == "metros") {
    return 0.001;
  }
  if (tipoDistancia == "pies") {
    return 0.0003048;
  }
}

function Mostrar_menu() {
  const btnMenu = document.getElementById("btnMenu");
  const menu = document.getElementById("menuLateral");
  if (menu.style.right === "0px") {
    menu.style.right = "-200px"; // ocultar
  } else {
    menu.style.right = "0px"; // mostrar
  }
}

function eliminarCeros(str) {
  if (typeof str !== "string") return str;

  // Reemplaza coma por punto si se usa coma decimal
  let normalizado = str.replace(",", ".");

  // Convierte a número y de vuelta a string para quitar ceros innecesarios
  let numero = parseFloat(normalizado);

  // Si no es un número válido, retorna el original
  if (isNaN(numero)) return str;

  return numero.toString();
}

function Page_Acerca_de() {
  window.location.href = "Acerca_de.html";
}

function Unidades_cable() {
  const Calibre = document.getElementById("Unidades_calibre").value;

  if (Calibre == "AWG") {
    document.getElementById("Contenedor_AWG").style.display = "block";
    document.getElementById("Contenedor_MCM").style.display = "none";
  }

  if (Calibre == "MCM") {
    document.getElementById("Contenedor_AWG").style.display = "none";
    document.getElementById("Contenedor_MCM").style.display = "block";
  }
}

function cerrarModal() {
  document.getElementById("Resultado_buscar").style.display = "none";
  document.getElementById("Mostrar_advertencia").style.display = "none";
}

function Validar(P, V, fp, N) {
  const Lang = localStorage.getItem("lang") || "es";

  if (P == 0 || V == 0 || fp == 0 || N == 0) {
    if (Lang == "es") {
      document.getElementById("mensaje").textContent =
        "Debe llenar todos los campos!";
    } else {
      document.getElementById("mensaje").textContent =
        "You must fill in all fields!";
    }
    return false;
  }
  if (P == "" || V == "" || fp == "" || N == "") {
    if (Lang == "es") {
      document.getElementById("mensaje").textContent =
        "Debe llenar todos los campos!";
    } else {
      document.getElementById("mensaje").textContent =
        "You must fill in all fields!";
    }
    return false;
  }

  if (fp <= 0 || fp > 1) {
    if (Lang == "es") {
      document.getElementById("mensaje").textContent =
        "Debe introducir valor del fp en rango correcto!";
    } else {
      document.getElementById("mensaje").textContent =
        "You must enter fp value in correct range!";
    }
    return false;
  }

  return true;
}

function formatearNumero(num) {
  return parseFloat(num.toFixed(2)).toString();
}
