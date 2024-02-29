const mostrar = async () => {
    const limInf = document.getElementById('limiteInferior').value;
    const limSup = document.getElementById('limiteSuperior').value;
    const mostrarUna = document.getElementById('mostrarUna').checked;
    const container = document.getElementById('data');

    const cond = validate(limInf, limSup);
    if (cond) {
        container.innerHTML = '';

        if (mostrarUna) {
            fetch(`https://jsonplaceholder.typicode.com/photos/${limInf}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    alert('Network response was not ok.');
                })
                .then(data => {
                    let html = `
                        <img src="${data.url}" alt="ALGO" width="100px" height="100px" style="padding: 5px;">
                    `;

                    container.innerHTML = html;
                });
        } else {
            const array = [];
            for (let i = 1; i <= limSup; i++) {
                array.push(`https://jsonplaceholder.typicode.com/photos/${i}`);
            }

            await Promise.all(array.map(link => {
                fetch(link)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        console.log(`El siguiente enlace tuvo un error: ${link}`);
                    })
                    .then(data => {
                        let html = `
                            <img src="${data.url}" alt="ALGO" width="100px" height="100px" style="padding: 5px;">
                        `;

                        container.innerHTML += html;
                    });
            }));
        }
    }
}

const validate = (limInf, limSup) => {
    if (limInf > 0 && limInf <= 100 && limSup > 0 && limSup <= 100) {
        if (Number(limInf) < Number(limSup)) {
            return true;
        } else {
            alert('El limite inferior debe ser menor que el limite superior');
        }
    } else {
        alert('Usar numeros entre el 1 y el 100');
    }

    return false;
}