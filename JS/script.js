// IMC DATA
const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];

// Seleção de elementos
const imcTable = document.querySelector("#imc-table");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");
const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");
const backBtn = document.querySelector("#back-btn");
const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

// Funções
// Criar tabela
function createTable(data) {
    data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("table-data");

        const classification = document.createElement("p");
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        imcTable.appendChild(div);
    });
}

// Limpar os inputs
function cleanInputs() {
    heightInput.value = "";
    weightInput.value = "";
    imcNumber.classList = "";
    imcInfo.classList = "";
}

// Filtrar o que o usuário pode escrever nos inputs
function validDigits(text) {
    return text.replace(/[^0-9,]/g, "");
}

// Calcular imc
function calcImc(weight, height) {
  // vendo se os inputs tem números válidos
  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    showError("Peso e altura devem ser números válidos e maiores que zero.");
    return null; 
  }

  const imc = (weight / (height * height)).toFixed(1);
  return imc;
}

// Mostrar erro
function showError(message) {
  const errorMessage = document.querySelector("#error-message");
  errorMessage.innerText = message;
  errorMessage.classList.remove("hide");
}

// Ocultar erro
function hideError() {
  const errorMessage = document.querySelector("#error-message");
  errorMessage.classList.add("hide");
}


function showOrHideResults() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}

// Inicialização
createTable(data);

// Eventos
// O usuário não pode colocar simbolos ou letras
[heightInput, weightInput].forEach((el) => {
    el.addEventListener("input", (e) => {
        const updatedValue = validDigits(e.target.value);

        e.target.value = updatedValue;
    });
});

// Converter a virgula em ponto

calcBtn.addEventListener("click", (e) => {
  e.preventDefault();

  hideError(); // esconder mensagem de erro

  const height = +heightInput.value.replace(",", ".");
  const weight = +weightInput.value.replace(",", ".");

  // vendo se os inputs estão vazios ou inválidos
  if (!weight || !height || isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    showError("Por favor, forneça valores válidos para peso e altura.");
    return;
  }

  const imc = calcImc(weight, height);

  if (imc === null) {
    // se um erro ocorre durante o calculo
    return;
  }


  let info;

  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });

  if (!info) return;

  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low"); 
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("good"); 
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("low"); 
      imcInfo.classList.add("low");
      break;
    case "Obesidade":
      imcNumber.classList.add("medium"); 
      imcInfo.classList.add("medium");
      break;
    case "Obesidade grave":
      imcNumber.classList.add("high"); 
      imcInfo.classList.add("high");
      break;
  }

  showOrHideResults();
});

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();

    cleanInputs();
});

// Função de voltar ao inicio
backBtn.addEventListener("click", () => {
  cleanInputs();
  showOrHideResults();
});
