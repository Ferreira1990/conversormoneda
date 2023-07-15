async function convertidor() {
    let clpValue = document.getElementById('clp-value').value;
    let currencySelect = document.getElementById('currency-select');
    let currency = currencySelect.value;
    let apiUrl = 'https://mindicador.cl/api';

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();

        let currencyRate;

        if (currency === 'usd') {
            currencyRate = data.dolar.valor;
        } else {
            currencyRate = data[currency].valor;
        }

        let convertedValue = clpValue / currencyRate;

        document.getElementById('converted-value').textContent = convertedValue.toFixed(2);
    } catch (error) {
        alert('Selecciona una moneda por favor.');
    }
}


// FUNCION CANVAS GRAFICO-------------------------------------

async function getMonedas() {
    const endpoint = "https://api.gael.cloud/general/public/monedas";
    const res = await fetch(endpoint);
    const monedas = await res.json();
    return monedas;
    }

    function prepararConfiguracionParaLaGrafica(monedas) {        
        const tipoDeGrafica = "line";
        const nombresDeLasMonedas = monedas.map((moneda) => moneda.Codigo);
        const titulo = "Monedas";
        const colorDeLinea = "red";
        const valores = monedas.map((moneda) => {
        const valor = moneda.Valor.replace(",", ".");
        return Number(valor);
        });       
        const config = {
        type: tipoDeGrafica,
        data: {
        labels: nombresDeLasMonedas,
        datasets: [
            {
                label: titulo,
                backgroundColor: colorDeLinea,
                data: valores
                }
                ]
                }
                };
                return config;
                }

                async function renderGrafica() {
                    const monedas = await getMonedas();
                    const config = prepararConfiguracionParaLaGrafica(monedas);
                    const chartDOM = document.getElementById("myChart");
                    new Chart(chartDOM, config);
                    }

                    renderGrafica();
                
        
    