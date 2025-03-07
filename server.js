const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Configurar el middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar la base de datos SQLite
const db = new sqlite3.Database(':memory:'); // Cambia esto si usas una base de datos persistente
db.serialize(() => {
    db.run("CREATE TABLE contacts (name TEXT, email TEXT, message TEXT)");
});

// Ruta para manejar la solicitud POST del formulario
app.post('/contacto', (req, res) => {
    const { name, email, message } = req.body;
    const stmt = db.prepare("INSERT INTO contacts VALUES (?, ?, ?)");
    stmt.run(name, email, message, function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error al guardar los datos.");
        } else {
            res.send("Datos guardados correctamente.");
        }
    });
    stmt.finalize();
});

// Ruta para servir la página de inicio
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
