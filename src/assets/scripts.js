const btnMobile = document.querySelector("#btn-mobile");

function toggleMenu(event) {
  if (event.type === "touchstart") event.preventDefault();
  const nav = document.querySelector("nav");
  nav.classList.toggle("active");
  const active = nav.classList.contains("active");
  event.currentTarget.setAttribute("aria-expanded", active);
  if (active) {
    event.currentTarget.setAttribute("aria-label", "Fechar Menu")
  } else {
    event.currentTarget.setAttribute("aria-label", "Abrir Menu")
  }
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);

// Array finança
const finances = [
  {
    name: "Salário",
    value: -1000
  },
  {
    name: "Gasolina",
    value: 1900
  }
]

// Recebimento de valor



const form = document.querySelector("form");
const list = document.querySelector("[data-history]");

form.addEventListener('submit', e => {
  e.preventDefault();
  const financeInput = document.querySelector("#finance");
  const valueInput = document.querySelector("#value");

  const finance = {
    name: financeInput.value,
    value: Number(valueInput.value)
  }
  finances.push(finance);
  financeInput.value = ""
  valueInput.value = ""
  financeInput.focus();

  updateList();

})

const updateList = _ => {
  list.innerHTML = "";
  finances.forEach(finance => {
    list.appendChild(createLi(finance));
  })
  updateBalance();
};

function createLi(finance) {
  const li = document.createElement("li");
  li.textContent = `${finance.name} - R$ ${finance.value.toFixed(2).replace(".", ",")}`;
  return li;
};

function updateBalance() {
  const recipe = document.querySelector(".total-recipe");
  const debt = document.querySelector(".total-debt");
  const total = document.querySelector(".total-value");

  const values = finances.map(finance => {
    return finance.value
  })

  const recipeTotal = values.filter(value => value > 0 ?? value).reduce((ac, value) => ac + value, 0)

  const debtAmount = values.filter(value => {
    if (value < 0) {
      return value;
    }
  }).reduce((ac, value) => {
    return ac + value;
  }, 0);

  const totalAmount = values.reduce((ac, value) => {
    return ac + value;
  }, 0);

  recipe.textContent = `R$ ${recipeTotal.toFixed(2).replace(".", ",")}`;

  debt.textContent = `R$ ${debtAmount.toFixed(2).replace(".", ",")}`;
  total.textContent = `R$ ${totalAmount.toFixed(2).replace(".", ",")}`;

};

updateList();
