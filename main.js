class Patron {
    constructor(subscriber, premium, paid_total) {
        this.subscriber = subscriber;
        this.premium = premium;
        this.paid_total = paid_total;
    }
}

async function init() {
    const intake = await fetch("/patrons.json");
    const data = await intake.json();
    console.log(data);


    /** @type Patron[]*/
    const patrons = data.map((patron) => new Patron(patron.subscriber, patron.premium, patron.paid_total));
    console.log(patrons);

    for (let i = 0; i < patrons.length; i++) {
        const element = patrons[i];
        patronShow(element);

    }
}
init();

/** @param {Patron} patron */
function patronShow(patron) {
    const Atr = document.createElement("tr");
    const name = document.createElement("td");
    const aretheyprem = document.createElement("td");
    const money = document.createElement("td");
    const btnmessage = document.getElementById("szoveg");

    name.textContent = patron.subscriber;    
    money.textContent = patron.paid_total + " $";
    
    if (patron.premium == true) {
        aretheyprem.textContent = "✅";
    }
    else {
        aretheyprem.textContent = "❌";
    }

    if (patron.paid_total > 800) {
        Atr.style.backgroundColor = "goldenrod";
    }

    function Toggle() {
        if (patron.premium == true) {
            
            aretheyprem.textContent = "❌";
            patron.premium = false;
        }
        else {
            aretheyprem.textContent = "✅";
            patron.premium = true;
        }
        btnmessage.textContent = "Sikeresen módosítottad a prémium státuszt!";
        btnmessage.classList.add("bg-success");
        btnmessage.style.color = "white";
        setTimeout(() => {
            btnmessage.textContent = "";
        }, 5000)
    }
    Atr.appendChild(name);
    Atr.appendChild(aretheyprem);
    Atr.appendChild(money);
    document.getElementById("Main").appendChild(Atr);
    aretheyprem.onclick = Toggle;
}
