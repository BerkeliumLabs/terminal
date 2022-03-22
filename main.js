const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const os = require('os');
const express = require('express');
const expressApp = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const BkTerminal = require('./app/terminal');

expressApp.set('view engine', 'ejs');

expressApp.use(express.static('public'));

expressApp.use(cors());

expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());

expressApp.get('/', (req, res) => {
    res.render('pages/index');
});

expressApp.get('/api', async (req, res) => {
    let output = await BkTerminal.execute('ls').then(data => {
        return res.send(JSON.stringify(data));
    });
    console.log(output);
    //return res.send(JSON.stringify(output));
});

expressApp.listen(5656, () => {
    console.log('http://localhost:5656');
});


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    //win.loadURL(`${__dirname}/index.html`);
    win.loadURL('http://localhost:5656');
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});