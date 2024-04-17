// exp3.js
document.addEventListener("DOMContentLoaded", function() {
    // Function to calculate numerical aperture
    function calculateNumericalAperture(diameter, length) {
        const D = diameter;
        const d = length;
        const numericalAperture = Math.sin(Math.atan(D / (2 * d)));
        return numericalAperture;
    }

    const diameters = [4, 8, 12, 16, 20];
    let count = 0;
    let totalNumericalAperture = 0;

    
    function isValidFloat(value) {
        return /^-?\d*\.?\d+$/.test(value);
    }

   
    const form = document.getElementById("input-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const diameterInput = document.getElementById("diameter");
        const lengthInput = document.getElementById("length");
        const diameter = parseFloat(diameterInput.value);
        const length = parseFloat(lengthInput.value);

        if (!isValidFloat(diameterInput.value) || !isValidFloat(lengthInput.value)) {
            alert("Please enter valid floating-point values for diameter and length.");
            return;
        }

        if (diameters.includes(diameter)) {
            const numericalAperture = calculateNumericalAperture(diameter, length);
            const resultsBody = document.getElementById("results-body");
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${diameter}</td>
                <td>${numericalAperture.toFixed(4)}</td>
            `;
            resultsBody.appendChild(newRow);

            
            totalNumericalAperture += numericalAperture;
            count++;

           
            if (count === 5) {
                const averageNumericalAperture = totalNumericalAperture / 5;
                const averageRow = document.createElement("tr");
                averageRow.innerHTML = `
                    <td>Average</td>
                    <td>${averageNumericalAperture.toFixed(4)}</td>
                `;
                resultsBody.appendChild(averageRow);
            }
        } else {
            alert("Invalid diameter. Please select a diameter from the predefined list.");
        }
    });

    
   
});
