const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const multer = require('multer');

// Object maken voor de opslag en naam van de bestanden
const storage = multer.diskStorage({
  // cb = callback
  destination: (req, file, cb) => {
    // Voor opslag van de bestanden op de server, zet je ze NIET in de public map
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// De opties voor de upload toevoegen aan de multer functie
const upload = multer({ storage: storage });

// De map public toevoegen aan de express server via middleware
app.use(express.static(path.join(__dirname, 'public')));

// de route voor de upload pagina
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// De middleware functie voor de upload waar je de naam van het input veld moet meegeven
const middlewareUpload = upload.single('image');

// De route voor de upload en geef de middleware functie mee
app.post('/upload', middlewareUpload, (req, res) => {
  console.log(req.file);
  res.status(200).json({ message: 'File uploaded!', file: req.file });
});

// De server starten
app.listen(port, () => console.log(`Server running on port ${port}`));
