const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

function saveLoanToFile(fileName, fileContent, res) {
    fs.writeFile(fileName, fileContent, (err) => {
        if (err) {
            return res.status(500).send('Error interno del servidor');
        }

        res.download(fileName, (err) => {
            if (err) {
                return res.status(500).send('Error al descargar el archivo');
            }
        });
    });
}

app.post('/loan', (req, res) => {
    const {
        id,
        name,
        lastName,
        title,
        author,
        editorial,
        year,
    } = req.body;

    if (!(id && name && lastName && title && author && editorial && year)) {
        return res.redirect('/error.html');
    }

    const fileName = `data/id_${id}.txt`;
    const fileContent = `
    id: ${id},
    person name: ${name},
    person last name: ${lastName},
    book title: ${title},
    book author: ${author},
    editorial: ${editorial},
    year: ${year}
    `;

    saveLoanToFile(fileName, fileContent, res)
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
    console.log("Servidor creado por Jesus Garcia")
});
