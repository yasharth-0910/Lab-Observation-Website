
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var formData = new FormData(form);

        fetch('https://formspree.io/f/myyrgnpa', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response data as needed
            console.log('Formspree response:', data);
            alert('Form submitted successfully!');
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again later.');
        });
    });
});
