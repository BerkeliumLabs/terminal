let termPath = window.location.pathname;
const bkTerminal = new Terminal({
    cursorBlink: 'block'
});
// const webServe = new WebSocket('ws://localhost:2022', 'echo-protocol');

let nowLine = '';
let cmdEntries = [];

bkTerminal.open(document.getElementById('bk-terminal'));
bkTerminal.write(`${termPath}/$: `);

bkTerminal.onKey((key) => {
    console.log(key);
    if (key.domEvent.keyCode === 13) {
        bkTerminal.write('\r\n');
        console.log(nowLine);
        if (nowLine === 'cd') {
            bkTerminal.write('Namo Buddhaya!');
        }
    } else if (key.domEvent.keyCode === 8) {
        if (nowLine) {
            nowLine = nowLine.slice(0, nowLine.length - 1);
            bkTerminal.write('\b \b');
        }
    } else if (key.key === '\x16') {
        navigator.clipboard.readText().then(data => {
            console.log(data);
            nowLine += data;
            bkTerminal.write(data);
        });
    } else {
        nowLine += key.key;
        bkTerminal.write(key.key);
    }
});

/* bkTerminal.onData(e => {
    //bkTerminal.write(e);
    console.log(e);
}); */