function renderChart(i) {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Hit Points', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
            datasets: [{
                label: 'Base Stats',
                data: pokemonJSON.stats[i - 1],
                borderWidth: 1,
                backgroundColor: 'hsl(0, 91%, 71%)',
                hoverBackgroundColor: 'rgb(239, 67, 67)',
            }]
        },
        options: {
            animation: false,
            indexAxis: 'y',
            scales: {
                x: {
                    max: 160
                },
                y: {
                    beginAtZero: true
                }
            },
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    color: 'var(--zinc-767)', // Farbe der Datenbeschriftung
                    font: {
                        weight: 'bold' // Fettschrift der Datenbeschriftung
                    },
                    formatter: (value, context) => {
                        return value; // Zeigt den numerischen Wert neben jedem Balken
                    }
                }
            }
        }
    });
}