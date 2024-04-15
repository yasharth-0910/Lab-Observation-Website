function calculateBandGap() {
    const currentValues = [];
    const logIsValues = [];

    for (let i = 348; i >= 303; i -= 5) {
        const currentValue = parseFloat(document.getElementById("current" + i).value);
        const logIsValue = parseFloat(Math.log10(currentValue).toFixed(2));

        currentValues.push(currentValue);
        logIsValues.push(logIsValue);
    }

    const slope = Math.abs((logIsValues[1] - logIsValues[0]) / 0.04);
    const bandGap = slope / 5.036;

    document.getElementById("bandGapResult").innerText = `Band Gap: ${bandGap.toFixed(2)} eV`;
    const theoreticalBandGap = 0.7;
    const percentError = Math.abs(((theoreticalBandGap - bandGap) / theoreticalBandGap) * 100);
    document.getElementById("percentError").innerText = `Percent Error: ${percentError.toFixed(2)} %`;

    createGraph(logIsValues);
}

function printGraph() {
    const canvas = document.getElementById('graph');
    const dataUrl = canvas.toDataURL();

    const windowContent = '<!DOCTYPE html>';
    const newWindow = window.open('', '_blank');
    newWindow.document.open();
    newWindow.document.write(windowContent);
    newWindow.document.write('<html><head><title>Print Graph</title></head><body>');
    newWindow.document.write('<img src="' + dataUrl + '" style="display:block; margin:auto;">');
    newWindow.document.write('</body></html>');
    newWindow.document.close();

    newWindow.onload = function () {
        newWindow.print();
    };
}

function createGraph(logIsValues) {
    const ctx = document.getElementById('graph').getContext('2d');

    const data = {
        labels: ['348', '343', '338', '333', '328', '323', '318', '313', '308', '303'],
        datasets: [{
            label: 'Log10(Is) vs 1000/T',
            data: [
                { x: 1000 / 348, y: logIsValues[0] },
                { x: 1000 / 343, y: logIsValues[1] },
                { x: 1000 / 338, y: logIsValues[2] },
                { x: 1000 / 333, y: logIsValues[3] },
                { x: 1000 / 328, y: logIsValues[4] },
                { x: 1000 / 323, y: logIsValues[5] },
                { x: 1000 / 318, y: logIsValues[6] },
                { x: 1000 / 313, y: logIsValues[7] },
                { x: 1000 / 308, y: logIsValues[8] },
                { x: 1000 / 303, y: logIsValues[9] }
            ],
            fill: false,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            lineTension: 0 
        }]
    };

    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                scaleLabel: {
                    display: true,
                    labelString: '1000/T'
                }
            },
            y: {
                type: 'linear',
                position: 'left',
                scaleLabel: {
                    display: true,
                    labelString: 'Log10(Is)'
                }
            }
        }
    };

    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}
