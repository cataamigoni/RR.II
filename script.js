const materias = {
  "1": [
    { id: "politica1", nombre: "Introducción a la Ciencia Política", correlativas: [] },
    { id: "filosofia1", nombre: "Pensamiento Filosófico Premoderno", correlativas: [] }
  ],
  "2": [
    { id: "historiaRI", nombre: "Historia de las Relaciones Internacionales", correlativas: ["politica1"] },
    { id: "metodologia", nombre: "Metodología Cuantitativa", correlativas: ["politica1","filosofia1"] }
  ],
  "3": [
    { id: "ri2", nombre: "Relaciones Internacionales II", correlativas: ["historiaRI"] },
    { id: "teoria", nombre: "Teoría Política Moderna", correlativas: ["filosofia1"] }
  ],
  "4": [
    { id: "seminario", nombre: "Seminario Final de Carrera", correlativas: ["ri2", "teoria"] }
  ]
};

const estado = JSON.parse(localStorage.getItem("estadoMaterias")) || {};

function guardarEstado() {
  localStorage.setItem("estadoMaterias", JSON.stringify(estado));
}

function puedeAprobar(materia) {
  return materia.correlativas.every(id => estado[id]);
}

function render() {
  const cont = document.getElementById("malla");
  cont.innerHTML = "";
  Object.keys(materias).forEach(year => {
    const sec = document.createElement("div");
    sec.className = "year-section";
    sec.innerHTML = `<h2>Año ${year}</h2>`;
    materias[year].forEach(m => {
      const d = document.createElement("div");
      d.textContent = m.nombre;
      d.className = "materia";
      if (estado[m.id]) {
        d.classList.add("approved");
      } else if (!puedeAprobar(m)) {
        d.classList.add("locked");
      }
      d.onclick = () => {
        if (estado[m.id]) { delete estado[m.id]; }
        else if (puedeAprobar(m)) { estado[m.id] = true; }
        guardarEstado();
        render();
      };
      sec.appendChild(d);
    });
    cont.appendChild(sec);
  });
}

render();