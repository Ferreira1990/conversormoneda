const btn = document.getElementById("btn")

async function getApiInfo(moneda){
    try{
    const data = await fetch (`https://mindicador.cl/api/${moneda}`)
    const json = await data.json();
    return json;
} catch(error){
    console.log("Error en el API: ", error)
    const aux = document.getElementById("Error");
    aux.innerHTML = "<h1>Error consultando la API</h1>"
}
}

btn.addEventListener("click", async () => {
    const inputCLP = Number(document.getElementById("inputCLP").value);
    const moneda = document.getElementById("moneda").value;
    const total = document.getElementById("total");
    const grafico = document.getElementById("myChart")

    const infoApi = await getApiInfo(moneda);
    const calculo = inputCLP / infoApi.serie[0].valor;

    total.innerHTML = calculo.toFixed(2);

    const arregloFechas = infoApi.serie.map(elem => elem.fecha.slice(0, 10)).reverse();
    const arrrayvalores = infoApi.serie.map((elem) => elem.valor).reverse();

    const infoGrafico = {

        type: "line",
        data: {
        labels: arregloFechas,
        datasets: [
            {
        label: moneda,        
        backgroundColor: "yellow",
        data: arrrayvalores,
        }]
        }
        }

        new Chart(grafico, infoGrafico);
    });

  


