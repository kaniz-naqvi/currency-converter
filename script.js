const input = document.getElementById("amount");
const currencyPara = document.getElementById("rate");
const toCurrency = document.getElementById("to-currency");
countriesCurrencies.forEach((code) => {
  let child = document.createElement("option");
  child.value = code.currency;
  child.textContent = code.country;
  code.country == "PK" && (child.selected = true);
  toCurrency.appendChild(child);
});
const fromCurrency = document.getElementById("from-currency");
countriesCurrencies.forEach((code) => {
  let child = document.createElement("option");
  child.value = code.currency;
  child.textContent = code.country;
  code.country == "US" && (child.selected = true);
  fromCurrency.appendChild(child);
});
let fromImg = document.querySelector(".label1 img");
fromCurrency.addEventListener("change", (e) => {
  let value = e.target.value;
  let name = e.target.options[e.target.selectedIndex].textContent;
  fromImg.src = `https://flagsapi.com/${name}/flat/64.png`;
  convertCurrency();
});
let toImg = document.querySelector(".label2 img");
toCurrency.addEventListener("change", (e) => {
  let value = e.target.value;
  let name = e.target.options[e.target.selectedIndex].textContent;
  toImg.src = `https://flagsapi.com/${name}/flat/64.png`;
  convertCurrency();
});
async function convertCurrency() {
  let currencyName = fromCurrency.value;
  let requiredCurrencyName = toCurrency.value;
  const URL = `https://v6.exchangerate-api.com/v6/92b934d0119f8abaf3f99409/latest/${currencyName}`;
  async function fetchData() {
    let response = await fetch(URL);
    let data = await response.json();

    let exchangeRate = data.conversion_rates[requiredCurrencyName];
    let amount = input.value;
    let roundedAmount = (amount * exchangeRate).toFixed(2);
    return roundedAmount;
  }
  currencyPara.innerText = `${await fetchData()} ${toCurrency.value.toLowerCase()}`;
}
convertCurrency();
