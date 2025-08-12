// Cargar idioma guardado al iniciar
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "es";
  changeLanguage(savedLang);
});

function changeLanguage(Valor) {
  const idioma = document.getElementById("Idioma").value;
  let lang = "";

  if (Valor) {
    lang = Valor;
  } else {
    if (idioma == "es") {
      lang = "es";
    }
    if (idioma == "en") {
      lang = "en";
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

function Mostrar_menu() {
  const btnMenu = document.getElementById("btnMenu");
  const menu = document.getElementById("menuLateral");
  if (menu.style.right === "0px") {
    menu.style.right = "-200px"; // ocultar
  } else {
    menu.style.right = "0px"; // mostrar
  }
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

function Buscar() {
  const Unidades_calibre = document.getElementById("Unidades_calibre").value;
  const AWG = document.getElementById("AWG").value;
  const MCM = document.getElementById("MCM").value;
  let Calibre;

  if (Unidades_calibre == "AWG") {
    Calibre = AWG;
  }

  if (Unidades_calibre == "MCM") {
    Calibre = MCM;
  }

  const Conductor_tierra = buscarCalibre(Calibre, Unidades_calibre);

  document.getElementById("Resultado_Calibre").innerText = Conductor_tierra;
  document.getElementById("Resultado_buscar").style.display = "block";
}

function buscarCalibre(calibre_select, Unidad_Calibre) {
  let calibreTierra = "";

  if (Unidad_Calibre == "AWG") {
    if (
      calibre_select == "#14" ||
      calibre_select == "#12" ||
      calibre_select == "#10"
    ) {
      calibreTierra = "#14 AWG";
    }

    if (calibre_select == "#8" || calibre_select == "#6") {
      calibreTierra = "#10 AWG";
    }
    if (
      calibre_select == "#4" ||
      calibre_select == "#3" ||
      calibre_select == "#2"
    ) {
      calibreTierra = "#8 AWG";
    }
    if (calibre_select == "#1" || calibre_select == "#1/0") {
      calibreTierra = "#6 AWG";
    }

    if (calibre_select == "#2/0") {
      calibreTierra = "#4 AWG";
    }
    if (calibre_select == "#3/0") {
      calibreTierra = "#3 AWG";
    }
    if (calibre_select == "#4/0") {
      calibreTierra = "#2 AWG";
    }
  } else {
    if (calibre_select == "250") {
      calibreTierra = "#1 AWG";
    }

    if (calibre_select == "300 - 500") {
      calibreTierra = "#1/0 AWG";
    }
    if (calibre_select == "600 - 900") {
      calibreTierra = "#2/0 AWG";
    }
    if (calibre_select == "1000 - 1100") {
      calibreTierra = "#3/0 AWG";
    }
    if (calibre_select == "1250 - 1500") {
      calibreTierra = "#4/0 AWG";
    }
    if (calibre_select == "1750 - 2000") {
      calibreTierra = "250 MCM";
    }
  }

  return calibreTierra;
}

function cerrarModal() {
  document.getElementById("Resultado_buscar").style.display = "none";
}
