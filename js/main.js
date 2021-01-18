"use strict";
(function () {
    const searchButton = document.querySelector("a.search-btn");

    searchButton.addEventListener("click", search);
})();

function search() {
    const inputSearch = document.querySelector("input.search-txt");
    const townInput = inputSearch.value;

    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = 'https://api.meteo.lt/v1/places/' + townInput + '/forecasts/long-term';
    const url = proxy + api;

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let arrSearchResult = JSON.parse(xhr.responseText);

                console.log(arrSearchResult);

                const forecastTimestamps = arrSearchResult['forecastTimestamps'];

                const table = document.createElement("table");
                table.classList.add("table");
                table.classList.add("text-white");
                table.classList.add("mt-4");

                const thead = document.createElement("thead");
                table.appendChild(thead);

                const tbody = document.createElement("tbody");
                table.appendChild(tbody);

                const tr = thead.insertRow(-1);
                const col = ["Data", "Temperatūra", "Debesuotumas", "Vėjo greitis"];

                for (let i = 0; i < col.length; i++) {
                    let th = document.createElement("th");
                    th.innerHTML = col[i];
                    tr.appendChild(th);
                };

                const indikatoriai = [
                    'forecastTimeUtc',
                    'airTemperature',
                    'cloudCover',
                    'windSpeed',
                ];

                for(let i = 0; i< forecastTimestamps.length; i++) {
                    const tr = tbody.insertRow(-1);

                    for(let j = 0; j< indikatoriai.length; j++) {
                        let td = document.createElement("td");
                        td.innerHTML = forecastTimestamps[i][indikatoriai[j]];
                        tr.appendChild(td);
                    }
                }

                const result = document.querySelector('.result');
                result.innerHTML = "";
                result.appendChild(table);
            } else {
                alert('Miestas nerastas');
            }
        }
    };
    xhr.open("GET", url);
    xhr.send();
}