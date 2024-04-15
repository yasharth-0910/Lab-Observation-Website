// exp3.js
document.addEventListener("DOMContentLoaded", function() {
    // Function to calculate numerical aperture
    function calculateNumericalAperture(diameter, length) {
        const D = diameter;
        const d = length;
        const numericalAperture = Math.sin(Math.atan(D / (2 * d)));
        return numericalAperture;
    }

    // Define diameters
    const diameters = [4, 8, 12, 16, 20];
    let count = 0;
    let totalNumericalAperture = 0;

    // Function to validate floating-point numbers
    function isValidFloat(value) {
        return /^-?\d*\.?\d+$/.test(value);
    }

    // Function to handle form submission
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

            // Update total numerical aperture and count
            totalNumericalAperture += numericalAperture;
            count++;

            // If 5 values have been entered, calculate and display the average numerical aperture
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

    // Optical Fiber Animation
   
});
