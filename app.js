import words from "./constants.js";

const textbox = document.getElementById("textbox");
let result = [];
const table = document.getElementById("table");
document.querySelector("#submmit").addEventListener("click", analize);

function resetAll() {
  result = [];
  table.innerHTML = `<thead class="animate__animated animate__fadeInUp">
                        <tr>
                        <th>Token</th>
                        <th>Lexema</th>
                        <th>#</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                    </tbody>`;
}

function analize() {
  const text = textbox.value;
  if (!text) return;
  resetAll();

  // Removemos todos los saltos de linea y dividimos el texto en palabras
  const formattedText = text
    .replace(/(\r\n|\n|\r)/gm, " ") /* Removemos saltos de linea */
    .split(" ") /* Dividemos el texto en palabras */
    .filter((word) => word !== "");

  console.log(formattedText);
  // Recorremos el texto
  for (let i = 0; i < formattedText.length; i++) {
    const text = formattedText[i];

    // Comprobamos si es una palabra reservada
    if (words.reservedWords.includes(text)) {
      result.push({
        text: text,
        type: "Reservada",
      });
    }
    // Comprobamos si es un operador
    else if (words.operators.includes(text)) {
      result.push({
        text: text,
        type: "Operador",
      });
    }

    // Comprobamos si es una comparacion
    else if (words.comparations.includes(text)) {
      result.push({
        text: text,
        type: "Comparación/igualación",
      });
    }

    // Comprobamos si es una declaracion
    else if (words.declarations.includes(text)) {
      result.push({
        text: text,
        type: "Declaración",
      });

      // comprobamos si es un numero
    } else if (words.numbers.test(text)) {
      result.push({
        text: text,
        type: "Número",
      });
    } else {
      result.push({
        text: text,
        type: "Identificador",
      });
    }
  }

  result.forEach((word, i) => {
    const row = document.createElement("tr");
    const token = document.createElement("td");
    const lexema = document.createElement("td");
    const number = document.createElement("td");

    token.classList.add("animate__animated");
    token.classList.add("animate__fadeInUp");
    lexema.classList.add("animate__animated");
    lexema.classList.add("animate__fadeInUp");
    number.classList.add("animate__animated");
    number.classList.add("animate__fadeInUp");

    token.innerText = word.type;
    lexema.innerText = word.text;
    number.innerText = i + 1;
    row.appendChild(token);
    row.appendChild(lexema);
    row.appendChild(number);
    table.appendChild(row);
  });
}
