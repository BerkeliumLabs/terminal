const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const os = require('os');
const pty = require('node-pty');

const shellApp = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

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

    win.loadURL(`${__dirname}/index.html`);

    const ptyProcess = pty.spawn(shellApp, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
    });

    ptyProcess.onData((data) => {
        process.stdout.write(data);
    });

    ptyProcess.write('ls\r');
    ptyProcess.resize(100, 40);
    ptyProcess.write('ls\r');
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});