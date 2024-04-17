window.onload = function() {
    loadSavedValues();
};


function loadSavedValues() {
    for (let i = 1; i <= 10; i++) {
        const distanceInput = document.getElementById("distance" + i);
        const currentInput = document.getElementById("current" + i);
        const savedDistance = localStorage.getItem("distance" + i);
        const savedCurrent = localStorage.getItem("current" + i);
        if (savedDistance !== null) {
            distanceInput.value = savedDistance;
        }
        if (savedCurrent !== null) {
            currentInput.value = savedCurrent;
        }
    }
}


function saveValues() {
    for (let i = 1; i <= 10; i++) {
        const distanceInput = document.getElementById("distance" + i);
        const currentInput = document.getElementById("current" + i);
        localStorage.setItem("distance" + i, distanceInput.value);
        localStorage.setItem("current" + i, currentInput.value);
    }
}

function plotGraph() {
    const distances = [];
    const currents = [];

    
    for (let i = 1; i <= 10; i++) {
        const distance = parseFloat(document.getElementById("distance" + i).value);
        const current = parseFloat(document.getElementById("current" + i).value);
        distances.push(distance);
        currents.push(current);
    }

   
    const inverseSquaredDistances = distances.map(distance => 1 / Math.pow(distance, 2));

   
    const ctx = document.getElementById('graph').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Current vs 1/d^2',
                data: inverseSquaredDistances.map((val, index) => ({ x: val, y: currents[index] })),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                        display: true,
                        labelString: '1/d^2'
                    }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    scaleLabel: {
                        display: true,
                        labelString: 'Current (μA)'
                    }
                }
            }
        }
    });


    const firstPoint = { x: inverseSquaredDistances[0], y: currents[0] };
    const lastPoint = { x: inverseSquaredDistances[9], y: currents[9] };
    ctx.beginPath();
    ctx.moveTo(myChart.scales.x.getPixelForValue(firstPoint.x), myChart.scales.y.getPixelForValue(firstPoint.y));
    ctx.lineTo(myChart.scales.x.getPixelForValue(lastPoint.x), myChart.scales.y.getPixelForValue(lastPoint.y));
    ctx.strokeStyle = 'rgb(255, 99, 132)';
    ctx.lineWidth = 2; 
    ctx.stroke();

    
    const slope = (lastPoint.y - firstPoint.y) / (lastPoint.x - firstPoint.x);
    const modifiedSlope = slope * 100000;
    document.getElementById('slopeDisplay').innerText = `Slope: ${modifiedSlope.toFixed(2)}`;
    saveValues(); 
}

function printGraph() {
    const canvas = document.getElementById('graph');
    const dataUrl = canvas.toDataURL();

    const windowContent = '<!DOCTYPE html>';
    const newWindow = window.open('', '_blank');
    newWindow.document.open();
    newWindow.document.write(windowContent);
    newWindow.document.write('<html><head><title>Print Graph</title></head><body style="margin: 0; padding: 0;">');
    newWindow.document.write('<img src="' + dataUrl + '" style="display:block; margin:auto; max-width: 100%; height: auto;">');
    newWindow.document.write('</body></html>');
    newWindow.document.close();

    newWindow.onload = function () {
        newWindow.print();
    };
}
