// MAPEAMENTO DOS ELEMENTOS HTML:

// 1º seleciona o botão de conversão
const convertButton = document.querySelector(".button-convert");

// 2º seleciona o valor de origem (converter de)
const currencySelectOrigin = document.querySelector(".currency-select-origin");

// 3º seleciona o valor de destino (converter para)
const currencySelectConverted = document.querySelector(
  ".currency-select-converted",
);

// 4º seleciona o campo de input do valor a ser convertido
const inputCurrency = document.querySelector(".input-currency");

// 5º seleciona o campo para conversão que será exibido no resultado
const currencyValueToConvert = document.querySelector(
  ".currency-value-to-convert",
);

// 6º seleciona o campo de resultado da conversão
const currencyValueConverted = document.querySelector(".currency-value");

// 7º seleciona o campo de texto do resultado da conversão
const currencyName = document.getElementById("currency-name");

// 8º seleciona a imagem da bandeira do resultado da conversão
const currencyImage = document.querySelector(".currency-img");

// 9º seleciona a imagem da banheiro de origem da conversão
const currencyImageOrigin = document.querySelector(".currency-img-origin");

//10º
const currencyNameOrigin = document.getElementById("currency-name-origin");

// OBJETO COM AS TAXAS EM RELAÇÃO AO REAL:

const taxas = {
  real: 1,
  dolar: 5.23,
  euro: 6.19,
  libra: 7.25,
  bitcoin: 348409.23,
};

// OBJETO COM AS FORMATAÇÕES

const formatos = {
  real: {
    locale: "pt-BR",
    currency: "BRL",
    name: "Real Brasileiro",
    image: "./Assets/Logo-Real.png",
  },
  dolar: {
    locale: "en-US",
    currency: "USD",
    name: "Dólar Americano",
    image: "./Assets/Logo-Dólar.png",
  },
  euro: {
    locale: "de-DE",
    currency: "EUR",
    name: "Euro",
    image: "./Assets/Logo-Euro.png",
  },
  libra: {
    locale: "en-GB",
    currency: "GBP",
    name: "Libra Esterlina",
    image: "./Assets/Logo-Libra.png",
  },
  bitcoin: {
    locale: "en-US",
    currency: "BTC",
    name: "Bitcoin",
    image: "./Assets/Logo-Bitcoin.png",
  },
};

// FUNÇÃO PARA FORMATAR A MOEDA:

function formatCurrency(value, currency) {
  return new Intl.NumberFormat(formatos[currency].locale, {
    style: "currency",
    currency: formatos[currency].currency,
  }).format(value);
}

// FUNÇÃO PARA REALIZAR A CONVERSÃO:

function convertValues() {
  const inputValue = parseFloat(inputCurrency.value); // converter o valor do input para número decimal

  if (isNaN(inputValue)) {
    alert("Por favor, insira um valor numérico para converter.");
    return;
  }
  // PEGAR O VALOR SELECIONADO NOS SELECTS DE MOEDA DE ORIGEM E DESTINO:
  const moedaOrigin = currencySelectOrigin.value;
  const moedaDestino = currencySelectConverted.value;

  // CALCULAR O VALOR CONVERTIDO:

  // converter moeda origem para real
  const valorEmReal = inputValue * taxas[moedaOrigin];

  // converter real para moeda destino
  const valorConvertido = valorEmReal / taxas[moedaDestino];

  // ATUALIZAR O RESULTADO DA CONVERSÃO NA TELA:
  currencyValueToConvert.innerHTML = formatCurrency(inputValue, moedaOrigin);
  currencyValueConverted.innerHTML = formatCurrency(
    valorConvertido,
    moedaDestino,
  );
}
// FUNÇÃO PARA TROCAR O NOME DA MOEDA DE DESTINO SELECIONADA:

function changeCurrency() {
  // valores selecionado nos selects
  const moedaDestino = currencySelectConverted.value;
  const moedaOrigem = currencySelectOrigin.value;

  // atualizar o nome da moeda de origem
  currencyNameOrigin.innerHTML = formatos[moedaOrigem].name;
  currencyImageOrigin.src = formatos[moedaOrigem].image;

  // atualizar o nome da moeda de destino
  currencyName.innerHTML = formatos[moedaDestino].name;
  currencyImage.src = formatos[moedaDestino].image;

  // atualizar o resultado da conversão
  convertValues();
}

// EVENTOS DE CLIQUE E DE TROCA DE MOEDA:

// executar evento de clique ao botão de conversão
currencySelectConverted.addEventListener("change", changeCurrency);
// executar evento de clique ao select de moeda de origem
currencySelectOrigin.addEventListener("change", changeCurrency);
// executar evento de clique ao botão de conversão
convertButton.addEventListener("click", convertValues);
