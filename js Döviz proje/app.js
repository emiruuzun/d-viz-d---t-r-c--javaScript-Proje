const change = document.getElementById("change");
const clear = document.getElementById("clear");
const base = document.getElementById("base");
const base2 = document.getElementById("base2");
const amountElement = document.getElementById("amount");
const moneyElement = document.getElementById("money");

let base1Arr;
let base2Arr;
let paraBirim;

addEventListeners();


function addEventListeners(){
    document.addEventListener("DOMContentLoaded", fillOptions);
    change.addEventListener("click", cevir);
    clear.addEventListener("click", clearInput);
    // select optiondan dönen değeri yakalama
    base.addEventListener("change", changeRun);
    base2.addEventListener("change",change2Run);
};

// ilk select option dan dönen değer yakalama
function changeRun(e){
    const selectOption = e.target.value;
    base1Arr =[selectOption];
};

// ikinci select option dan dönen değerleri yakalama
function change2Run(e){
    const selectOption = e.target.value;
    base2Arr = [selectOption];
};

// fetch ile gelen veriyi yakalayıp işeleme sokma
async function cevir(){

    if(!amountElement.value){

        // uyarı mesajı oluşturma
        let formGroup =document.querySelectorAll(".form-group")[0];
        let alert = document.createElement("div");
        alert.className = "alert alert-danger mt-3 text-center"
        alert.textContent = "Boş Alanları doldrunuz"
        formGroup.appendChild(alert);
        setTimeout(()=>{
            alert.remove();
        }, 2000);
    }
    const response = await fetch(`https://api.apilayer.com/exchangerates_data/latest?&base=${base1Arr}&apikey=30SYgF1PoRZFWWV199t4CN90t2YAZCsE`);
    const data = await response.json();
    const rate = data.rates[base2Arr];
    moneyElement.value = (amountElement.value * rate)+" "+base2Arr;
}

// input alanlarını temizleme
function clearInput(){
    amountElement.value = "";
    moneyElement.value = "";
    base.value = "";
    base2.value = "";

};

// select option'ları doldurma
async function fillOptions(){
    const response = await fetch(`https://api.apilayer.com/exchangerates_data/latest?&apikey=30SYgF1PoRZFWWV199t4CN90t2YAZCsE`);
    const data = await response.json();
    paraBirim = Object.keys(data.rates);
    paraBirim.forEach(e=>{
        const option = document.createElement('option');
        option.value = e;
        option.text = e;
        base.appendChild(option);
        base2.appendChild(option.cloneNode(true));
    });
}


