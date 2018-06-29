const populateCurrency = () => {
    const url = 'https://free.currencyconverterapi.com/api/v5/currencies';
    fetch(url).then((response) => {
        return response.json();
    })
        .then((body) => {
           for (let data in body.results) {
                console.log(data);
                let fromCurrency = document.getElementById("fromCurrency");
                let toCurrency = document.getElementById("toCurrency");
                var toOption = document.createElement("OPTION");
                var fromOption = document.createElement("OPTION");
                //Set  Name in Text part.
                toOption.innerHTML = `${body.results[data].currencyName} (${data})`;
                fromOption.innerHTML = `${body.results[data].currencyName} (${data})`;
                //Set id in Value part.
                toOption.value = data;
                fromOption.value = data;
                //Add the fromOption and toOption element to DropDownList.
                fromCurrency.add(fromOption);
                toCurrency.add(toOption);
             }
            console.log(body);
        })

}
populateCurrency();



const getData = () => {
    let amount = parseInt(document.getElementById('amount').value);
    let fromCurrency = document.getElementById('fromCurrency').value;;
    let toCurrency = document.getElementById('toCurrency').value;
    let result = document.getElementById('process');

    //alert(amount,fromCurrency,toCurrency);
    convertCurrency(amount, fromCurrency, toCurrency, (err, amt) => {
        result.value = amt;
        console.log("Result is " + amount);
    });

};


const convertCurrency = (amount, fromCurrency, toCurrency, cb) => {
    let validate;
    validate = document.getElementById('amount').value;
    if (isNaN(validate) || validate === "") {
        document.getElementById("amount").style.border = "1px solid red";

    }
    else {
        let convert = "converting..."
        document.getElementById('process').value = convert;
        fromCurrency = encodeURIComponent(fromCurrency);
        toCurrency = encodeURIComponent(toCurrency);
        const query = fromCurrency + '_' + toCurrency;
        const url = 'https://free.currencyconverterapi.com/api/v5/convert?q='
            + query + '&compact=ultra';
        fetch(url).then((response) => {
            return response.json();
        })
            .then((body) => {
                try {
                    let jsonObj = body;

                    let val = jsonObj[query];
                    if (val) {
                        var total = val * amount;
                        cb(null, Math.round(total * 100) / 100);
                    } else {
                        var err = new Error("Value not found for " + query);
                        console.log(err);
                        cb(err);
                    }
                } catch (e) {
                    console.log("Parse error: ", e);
                    cb(e);
                }
                console.log(body)
            })

    }
}