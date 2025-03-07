// Cotação de moedas do dia.
const USD = 5.77;
const EUR = 6.22;
const GBP = 7.47;

const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

// Captando o evento de submit (enviar) do form.
form.onsubmit = (event) => {
  event.preventDefault();

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
};

// Função para coverter a moeda.
function convertCurrency(amount, price, symbol) {
  try {
    // Exibindo a cotação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    // Caucula o total.
    let total = amount * price;
    // Verifica se o resultado não é um número.
    if (isNaN(total)) {
      return alert("Por favor, digite o valor corretamente para convrter.");
    }
    // Formatar o valor total.
    total = formatCurrencyBRL(total).replace("R$", "");
    // Exibe o resultado total.
    result.textContent = `${total} Reais`;

    // Add a class que exibe o resultado na tela.
    footer.classList.add("show-result");
  } catch (error) {
    console.log(error);
    // Remove a class que exibe o resultado na tela
    footer.classList.remove("show-result");
    alert("Não foi possível converter. Tente novamente mais tarde.");
  }
}

// Formatar a moeda em ral brasileiro.
function formatCurrencyBRL(value) {
  // Converter para número para utilizar o toLocaleString para formatar no padrão BRL.
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
