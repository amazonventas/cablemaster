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
    document.getElementById("Contenedor_mm2").style.display = "none";
  }

  if (Calibre == "MCM") {
    document.getElementById("Contenedor_AWG").style.display = "none";
    document.getElementById("Contenedor_MCM").style.display = "block";
    document.getElementById("Contenedor_mm2").style.display = "none";
  }

  if (Calibre == "mm2") {
    document.getElementById("Contenedor_AWG").style.display = "none";
    document.getElementById("Contenedor_MCM").style.display = "none";
    document.getElementById("Contenedor_mm2").style.display = "block";
  }
}

function Conversion_mm2(Valor) {
  if (Valor == 2) {
    return "#14";
  }
  if (Valor == 3) {
    return "#12";
  }

  if (Valor == 5) {
    return "#10";
  }
  if (Valor == 8) {
    return "#8";
  }
  if (Valor == 13) {
    return "#6";
  }
  if (Valor == 21) {
    return "#4";
  }
  if (Valor == 27) {
    return "#3";
  }
  if (Valor == 34) {
    return "#2";
  }
  if (Valor == 42) {
    return "#1";
  }
  if (Valor == 54) {
    return "#1/0";
  }
  if (Valor == 67) {
    return "#2/0";
  }
  if (Valor == 85) {
    return "#3/0";
  }
  if (Valor == 107) {
    return "#4/0";
  }
  if (Valor == 127) {
    return 250;
  }
  if (Valor == 152) {
    return 300;
  }
  if (Valor == 177) {
    return 350;
  }
  if (Valor == 203) {
    return 400;
  }
  if (Valor == 253) {
    return 500;
  }
  if (Valor == 304) {
    return 600;
  }
  if (Valor == 355) {
    return 700;
  }
  if (Valor == 380) {
    return 750;
  }
  if (Valor == 405) {
    return 800;
  }
  if (Valor == 456) {
    return 900;
  }
  if (Valor == 507) {
    return 1000;
  }
}

function Reconversion_mm2(Valor) {
  if (Valor == "#14") {
    return 2;
  }
  if (Valor == "#12") {
    return 3;
  }
  if (Valor == "#10") {
    return 5;
  }
  if (Valor == "#8") {
    return 8;
  }
  if (Valor == "#6") {
    return 13;
  }
  if (Valor == "#4") {
    return 21;
  }
  if (Valor == "#3") {
    return 27;
  }
  if (Valor == "#2") {
    return 34;
  }
  if (Valor == "#1") {
    return 42;
  }
  if (Valor == "#1/0") {
    return 54;
  }
  if (Valor == "#2/0") {
    return 67;
  }
  if (Valor == "#3/0") {
    return 85;
  }
  if (Valor == "#4/0") {
    return 107;
  }
  if (Valor == 250) {
    return 127;
  }
  if (Valor == 300) {
    return 152;
  }
  if (Valor == 350) {
    return 177;
  }
  if (Valor == 400) {
    return 203;
  }
  if (Valor == 500) {
    return 253;
  }
  if (Valor == 600) {
    return 304;
  }
  if (Valor == 700) {
    return 355;
  }
  if (Valor == 750) {
    return 380;
  }
  if (Valor == 800) {
    return 405;
  }
  if (Valor == 900) {
    return 456;
  }
  if (Valor == 1000) {
    return 507;
  }
}

function Mostrar_conductores() {
  const Check = document.getElementById("Check_Conductores").checked;

  if (Check) {
    document.getElementById("Conductores_activos").style.display = "block";
  } else {
    document.getElementById("Conductores_activos").style.display = "none";
  }
}

function Mostrar_temperatura() {
  const Check = document.getElementById("Check_Temperatura").checked;

  if (Check) {
    document.getElementById("Temperatura").style.display = "block";
  } else {
    document.getElementById("Temperatura").style.display = "none";
  }
}

function FTemp(Check, Temperatura, Aislamiento, Material) {
  if (Check) {
    if (Material == "Cobre") {
      if (Aislamiento == "TW") {
        if (Temperatura == "21-25") {
          return 1.08;
        }
        if (Temperatura == "26-30") {
          return 1.0;
        }
        if (Temperatura == "31-35") {
          return 0.91;
        }
        if (Temperatura == "36-40") {
          return 0.82;
        }
        if (Temperatura == "41-45") {
          return 0.71;
        }
        if (Temperatura == "46-50") {
          return 0.58;
        }
        if (Temperatura == "51-55") {
          return 0.41;
        }
        if (Temperatura == "56-60") {
          return 0;
        }
        if (Temperatura == "61-70") {
          return 0;
        }
        if (Temperatura == "71-80") {
          return 0;
        }
      }

      if (Aislamiento == "THW") {
        if (Temperatura == "21-25") {
          return 1.05;
        }
        if (Temperatura == "26-30") {
          return 1.0;
        }
        if (Temperatura == "31-35") {
          return 0.94;
        }
        if (Temperatura == "36-40") {
          return 0.88;
        }
        if (Temperatura == "41-45") {
          return 0.82;
        }
        if (Temperatura == "46-50") {
          return 0.75;
        }
        if (Temperatura == "51-55") {
          return 0.67;
        }
        if (Temperatura == "56-60") {
          return 0.58;
        }
        if (Temperatura == "61-65") {
          return 0.33;
        }
        if (Temperatura == "66-70") {
          return 0;
        }
      }

      if (Aislamiento == "THHW") {
        if (Temperatura == "21-25") {
          return 1.04;
        }
        if (Temperatura == "26-30") {
          return 1.0;
        }
        if (Temperatura == "31-35") {
          return 0.96;
        }
        if (Temperatura == "36-40") {
          return 0.91;
        }
        if (Temperatura == "41-45") {
          return 0.87;
        }
        if (Temperatura == "46-50") {
          return 0.82;
        }
        if (Temperatura == "51-55") {
          return 0.76;
        }
        if (Temperatura == "56-60") {
          return 0.71;
        }
        if (Temperatura == "61-65") {
          return 0.56;
        }
        if (Temperatura == "66-70") {
          return 0.41;
        }
      }
    }

    if (Material == "Aluminio") {
      if (Aislamiento == "TW") {
        if (Temperatura == "21-25") {
          return 1.08;
        }
        if (Temperatura == "26-30") {
          return 1.0;
        }
        if (Temperatura == "31-35") {
          return 0.91;
        }
        if (Temperatura == "36-40") {
          return 0.82;
        }
        if (Temperatura == "41-45") {
          return 0.71;
        }
        if (Temperatura == "46-50") {
          return 0.58;
        }
        if (Temperatura == "51-55") {
          return 0.41;
        }
        if (Temperatura == "56-60") {
          return 0;
        }
        if (Temperatura == "61-70") {
          return 0;
        }
        if (Temperatura == "71-80") {
          return 0;
        }
      }

      if (Aislamiento == "THW") {
        if (Temperatura == "21-25") {
          return 1.05;
        }
        if (Temperatura == "26-30") {
          return 1.0;
        }
        if (Temperatura == "31-35") {
          return 0.94;
        }
        if (Temperatura == "36-40") {
          return 0.88;
        }
        if (Temperatura == "41-45") {
          return 0.82;
        }
        if (Temperatura == "46-50") {
          return 0.75;
        }
        if (Temperatura == "51-55") {
          return 0.67;
        }
        if (Temperatura == "56-60") {
          return 0.58;
        }
        if (Temperatura == "61-65") {
          return 0.33;
        }
        if (Temperatura == "66-70") {
          return 0;
        }
      }

      if (Aislamiento == "THHW") {
        if (Temperatura == "21-25") {
          return 1.04;
        }
        if (Temperatura == "26-30") {
          return 1.0;
        }
        if (Temperatura == "31-35") {
          return 0.98;
        }
        if (Temperatura == "36-40") {
          return 0.91;
        }
        if (Temperatura == "41-45") {
          return 0.87;
        }
        if (Temperatura == "46-50") {
          return 0.82;
        }
        if (Temperatura == "51-55") {
          return 0.78;
        }
        if (Temperatura == "56-60") {
          return 0.71;
        }
        if (Temperatura == "61-65") {
          return 0.58;
        }
        if (Temperatura == "66-70") {
          return 0.41;
        }
      }
    }
  } else return 1;
}

function FAgrup(Check, Conductores) {
  if (Check) {
    if (Conductores == "1-3") {
      return 1;
    }
    if (Conductores == "4-6") {
      return 0.8;
    }
    if (Conductores == "7-9") {
      return 0.7;
    }
    if (Conductores == "10-20") {
      return 0.5;
    }
    if (Conductores == "21-30") {
      return 0.45;
    }
    if (Conductores == "31-40") {
      return 0.4;
    }
    if (Conductores == "41-mas") {
      return 0.35;
    }
  } else return 1;
}

function Corriente_Calibre(Calibre_select, Material, Aislamiento) {
  const Corriente = Array.of(24);
  const Calibre = Array.of(24);

  Calibre[0] = "#14";
  Calibre[1] = "#12";
  Calibre[2] = "#10";
  Calibre[3] = "#8";
  Calibre[4] = "#6";
  Calibre[5] = "#4";
  Calibre[6] = "#3";
  Calibre[7] = "#2";
  Calibre[8] = "#1";
  Calibre[9] = "#1/0";
  Calibre[10] = "#2/0";
  Calibre[11] = "#3/0";
  Calibre[12] = "#4/0";
  Calibre[13] = "250";
  Calibre[14] = "300";
  Calibre[15] = "350";
  Calibre[16] = "400";
  Calibre[17] = "500";
  Calibre[18] = "600";
  Calibre[19] = "700";
  Calibre[20] = "750";
  Calibre[21] = "800";
  Calibre[22] = "900";
  Calibre[23] = "1000";

  let Indice;

  for (let i = 0; i < Calibre.length; i++) {
    if (Calibre[i] == Calibre_select) {
      Indice = i;
    }
  }

  if (Material == "Cobre") {
    if (Aislamiento == "TW") {
      Corriente[0] = 15;
      Corriente[1] = 20;
      Corriente[2] = 30;
      Corriente[3] = 40;
      Corriente[4] = 55;
      Corriente[5] = 70;
      Corriente[6] = 85;
      Corriente[7] = 95;
      Corriente[8] = 110;
      Corriente[9] = 125;
      Corriente[10] = 145;
      Corriente[11] = 165;
      Corriente[12] = 195;
      Corriente[13] = 215;
      Corriente[14] = 240;
      Corriente[15] = 260;
      Corriente[16] = 280;
      Corriente[17] = 320;
      Corriente[18] = 350;
      Corriente[19] = 385;
      Corriente[20] = 400;
      Corriente[21] = 410;
      Corriente[22] = 435;
      Corriente[23] = 455;

      return Corriente[Indice];
    }

    if (Aislamiento == "THW") {
      Corriente[0] = 20;
      Corriente[1] = 25;
      Corriente[2] = 35;
      Corriente[3] = 50;
      Corriente[4] = 65;
      Corriente[5] = 85;
      Corriente[6] = 100;
      Corriente[7] = 115;
      Corriente[8] = 130;
      Corriente[9] = 150;
      Corriente[10] = 175;
      Corriente[11] = 200;
      Corriente[12] = 230;
      Corriente[13] = 255;
      Corriente[14] = 285;
      Corriente[15] = 310;
      Corriente[16] = 335;
      Corriente[17] = 380;
      Corriente[18] = 420;
      Corriente[19] = 460;
      Corriente[20] = 475;
      Corriente[21] = 490;
      Corriente[22] = 520;
      Corriente[23] = 545;

      return Corriente[Indice];
    }

    if (Aislamiento == "THHW") {
      Corriente[0] = 25;
      Corriente[1] = 30;
      Corriente[2] = 40;
      Corriente[3] = 55;
      Corriente[4] = 75;
      Corriente[5] = 95;
      Corriente[6] = 115;
      Corriente[7] = 130;
      Corriente[8] = 145;
      Corriente[9] = 170;
      Corriente[10] = 195;
      Corriente[11] = 225;
      Corriente[12] = 260;
      Corriente[13] = 290;
      Corriente[14] = 320;
      Corriente[15] = 350;
      Corriente[16] = 380;
      Corriente[17] = 430;
      Corriente[18] = 475;
      Corriente[19] = 520;
      Corriente[20] = 535;
      Corriente[21] = 555;
      Corriente[22] = 585;
      Corriente[23] = 615;

      return Corriente[Indice];
    }
  }

  if (Material == "Aluminio") {
    if (Aislamiento == "TW") {
      Corriente[0] = 0;
      Corriente[1] = 15;
      Corriente[2] = 25;
      Corriente[3] = 35;
      Corriente[4] = 40;
      Corriente[5] = 55;
      Corriente[6] = 65;
      Corriente[7] = 75;
      Corriente[8] = 85;
      Corriente[9] = 100;
      Corriente[10] = 115;
      Corriente[11] = 130;
      Corriente[12] = 150;
      Corriente[13] = 170;
      Corriente[14] = 195;
      Corriente[15] = 210;
      Corriente[16] = 225;
      Corriente[17] = 260;
      Corriente[18] = 285;
      Corriente[19] = 315;
      Corriente[20] = 320;
      Corriente[21] = 330;
      Corriente[22] = 355;
      Corriente[23] = 375;

      return Corriente[Indice];
    }

    if (Aislamiento == "THW") {
      Corriente[0] = 0;
      Corriente[1] = 20;
      Corriente[2] = 30;
      Corriente[3] = 40;
      Corriente[4] = 50;
      Corriente[5] = 65;
      Corriente[6] = 75;
      Corriente[7] = 90;
      Corriente[8] = 100;
      Corriente[9] = 120;
      Corriente[10] = 135;
      Corriente[11] = 155;
      Corriente[12] = 180;
      Corriente[13] = 205;
      Corriente[14] = 230;
      Corriente[15] = 250;
      Corriente[16] = 270;
      Corriente[17] = 310;
      Corriente[18] = 340;
      Corriente[19] = 375;
      Corriente[20] = 385;
      Corriente[21] = 395;
      Corriente[22] = 425;
      Corriente[23] = 445;

      return Corriente[Indice];
    }

    if (Aislamiento == "THHW") {
      Corriente[0] = 0;
      Corriente[1] = 25;
      Corriente[2] = 35;
      Corriente[3] = 45;
      Corriente[4] = 55;
      Corriente[5] = 75;
      Corriente[6] = 85;
      Corriente[7] = 100;
      Corriente[8] = 115;
      Corriente[9] = 135;
      Corriente[10] = 150;
      Corriente[11] = 175;
      Corriente[12] = 205;
      Corriente[13] = 230;
      Corriente[14] = 260;
      Corriente[15] = 280;
      Corriente[16] = 305;
      Corriente[17] = 350;
      Corriente[18] = 385;
      Corriente[19] = 425;
      Corriente[20] = 435;
      Corriente[21] = 445;
      Corriente[22] = 480;
      Corriente[23] = 500;

      return Corriente[Indice];
    }
  }
}

function Buscar() {
  const Unidades_calibre = document.getElementById("Unidades_calibre").value;
  const AWG = document.getElementById("AWG").value;
  const MCM = document.getElementById("MCM").value;
  const mm2 = document.getElementById("mm2").value;
  const Material = document.getElementById("Material").value;
  const Aislamiento = document.getElementById("Aislamiento").value;
  const Check_cond = document.getElementById("Check_Conductores").checked;
  const Ncond_act = document.getElementById("Conductores_activos").value;
  const Check_temp = document.getElementById("Check_Temperatura").checked;
  const temp = document.getElementById("Temperatura").value;
  let Calibre;

  if (Unidades_calibre == "AWG") {
    Calibre = AWG;
  }

  if (Unidades_calibre == "MCM") {
    Calibre = MCM;
  }

  if (Unidades_calibre == "mm2") {
    Calibre = Conversion_mm2(mm2);
  }

  const Corriente =
    FTemp(Check_temp, temp, Aislamiento, Material) *
    FAgrup(Check_cond, Ncond_act) *
    Corriente_Calibre(Calibre, Material, Aislamiento);

  document.getElementById("Resultado_Material").innerHTML =
    "Material: " + Material;

  if (Corriente == 0) {
    document.getElementById("Resultado").innerHTML = "Valor no definido.";
  } else {
    document.getElementById("Resultado").innerHTML = Corriente + " Amp";
  }
  if (Unidades_calibre == "mm2") {
    document.getElementById("Resultado_Calibre").innerHTML =
      "Calibre: " + Reconversion_mm2(Calibre) + " mm²";

    document.getElementById("Normativa").innerHTML = "Norma IEC 60228";
  } else {
    document.getElementById("Resultado_Calibre").innerHTML =
      "Calibre: " + Calibre;
    document.getElementById("Normativa").innerHTML = "Tabla 310-16 NEC";
  }

  document.getElementById("Resultado_buscar").style.display = "block";
}

function cerrarModal() {
  document.getElementById("Resultado_buscar").style.display = "none";
}
