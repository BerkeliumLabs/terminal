const execSync = require('child_process').exec;
const vm = require('vm');

const BkTerminal = {
    execute: async (command) => {
        //const output = execSync('node -v', { encoding: 'utf-8' });
        /* await execSync("node -v", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return error.message;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return stderr;
            }
            console.log(`stdout: ${stdout}`, typeof stdout);
            return stdout;
        }); */
        return JSON.parse(new vm.Script('alert("Welcome!")'));
    }
}

module.exports = BkTerminal;
