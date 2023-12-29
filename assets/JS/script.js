let inputFood = document.getElementById('ipfood')
let inputBtn = document.getElementById('ipbtn')

let foodContainer = document.getElementById('food-container')
const noListEl = document.getElementById('no-list')
let staticEl = document.getElementById('food-list-static')

const localStorageKey = "foodItems";

document.addEventListener('DOMContentLoaded', () => {
  const fetchedFoodItem = [...JSON.parse(localStorage.getItem(localStorageKey))];

  fetchedFoodItem.forEach(item => {
    const newFoodEL = document.createElement('li')

    const divItem = document.createElement('div')

    const divRemoveBtn = document.createElement('div')

    newFoodEL.append(divItem, divRemoveBtn)

    divRemoveBtn.parentElement.setAttribute('onclick', 'removeItem(event)')

    divRemoveBtn.innerHTML = '<i class="fa fa-xmark"></i>'

    divItem.textContent = item.foodItem;

    newFoodEL.className = 'food-item'

    foodContainer.append(newFoodEL)
    newFoodEL.append(divItem)
    newFoodEL.append(divRemoveBtn)
  });
  refreshUI();
});

const handleInputFood = () => {
  const newFoodEL = document.createElement('li')

  const divItem = document.createElement('div')

  const divRemoveBtn = document.createElement('div')

  newFoodEL.append(divItem, divRemoveBtn)

  divRemoveBtn.parentElement.setAttribute('onclick', 'removeItem(event)')

  divRemoveBtn.innerHTML = '<i class="fa fa-xmark"></i>'

  divItem.textContent = inputFood.value

  newFoodEL.className = 'food-item'

  foodContainer.append(newFoodEL)
  newFoodEL.append(divItem)
  newFoodEL.append(divRemoveBtn)

  localStorage.setItem(
    localStorageKey,
    JSON.stringify([
      ...JSON.parse(localStorage.getItem(localStorageKey) || '[]'),
      { foodItem: inputFood.value },
    ]),
  );
  inputFood.value = ''
  refreshUI();
};

inputBtn.addEventListener('click', handleInputFood);

inputFood.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    handleInputFood()
  } else if (event.key === 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    inputFood.value = ''
  }
})

function removeItem (event) {
  let existingList = event.target.parentNode.parentNode

  existingList.remove();

  const fetchedFoodItem = [...JSON.parse(localStorage.getItem(localStorageKey))];

  fetchedFoodItem.forEach(item=>{
    if(item.foodItem===existingList.innerText){
      fetchedFoodItem.splice(fetchedFoodItem.indexOf(item),1);
    };
  });

  localStorage.setItem(localStorageKey,JSON.stringify(fetchedFoodItem));

  refreshUI();
};

function refreshUI () {
  staticEl.innerText = `You have ${foodContainer.children.length} lists`

  foodContainer.children.length > 0
    ? ((noListEl.hidden = true), (staticEl.hidden = false))
    : ((noListEl.hidden = false), (staticEl.hidden = true))
}
