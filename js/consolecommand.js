document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('command-input');
    const consoleOutput = document.getElementById('console-output');
    const consoleContainer = document.getElementById('console-container');
    const promptElement = document.getElementById('prompt');
    const separator = document.getElementById('separator');

    // Welcome message on load
    printOutput('Welcome to the Web Console!\nType "help" to obtain the list of supported commands.\nType "help[command_name]" for detailed info.');

    // Disable selection and hide cursor for immersion
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'none';

    inputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = inputField.value;
            if (command.length > 70) {
                printOutput('Error: Command exceeds 70 characters.');
                return;
            }
            executeCommand(command);
            inputField.value = ''; 
        }
    });

    function executeCommand(command) {
        if (command.trim() === '') return;

        // Display the user input in the console
        const outputLine = document.createElement('div');
        outputLine.textContent = `user@web:~$ ${command}`;
        outputLine.classList.add('dynamic-text-color');
        consoleOutput.appendChild(outputLine);

        const lowerCmd = command.toLowerCase().trim();
        const args = lowerCmd.split(' ');

        // Command Logic
        if (lowerCmd === 'help') {
            printOutput('Available commands:\n- help\n- clear\n- date\n- echo [text]\n- whoami\n- color [txt/line] [hex/color_name]');
        } 
        else if (lowerCmd.startsWith('help[') && lowerCmd.endsWith(']')) {
            const commandName = lowerCmd.slice(5, -1);
            showCommandHelp(commandName);
        } 
        else if (lowerCmd === 'clear') {
            consoleOutput.innerHTML = '';
        } 
        else if (lowerCmd === 'date') {
            printOutput(new Date().toLocaleString());
        }
        else if (lowerCmd.startsWith('echo ')) {
            // substring(5) to get everything after "echo "
            printOutput(command.substring(5));
        }
        else if (lowerCmd === 'whoami') {
            printOutput('User: guest@web-console\nStatus: Learning JavaScript Master\nPermissions: Developer');
        }
        else if (args[0] === 'color') {
            if (args.length < 3) {
                printOutput('Error: Format should be "color [txt/line] [value]".');
                return;
            }
            const type = args[1];
            const colorValue = args[2];

            if (['txt', 'line'].includes(type)) {
                if (isValidColor(colorValue)) {
                    changeColor(type, colorValue);
                    printOutput(`Console ${type} color changed to: ${colorValue}`);
                } else {
                    printOutput(`Invalid color: ${colorValue}. Use hex (e.g., 00ff00) or known color names.`);
                }
            } else {
                printOutput(`Unknown type: ${type}. Use "txt" or "line".`);
            }
        } 
        else {
            printOutput(`Command not found: ${command}`);
        }

        // Auto-scroll to bottom
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    function printOutput(text) {
        const outputLine = document.createElement('div');
        outputLine.textContent = text;
        outputLine.classList.add('dynamic-text-color');
        consoleOutput.appendChild(outputLine);
    }

    function isValidColor(color) {
        const knownColors = ['rouge', 'vert', 'bleu', 'violet', 'jaune', 'orange', 'blanc'];
        const hexColorRegex = /^([0-9A-F]{3}|[0-9A-F]{6})$/i;
        return hexColorRegex.test(color) || knownColors.includes(color);
    }

    function changeColor(type, color) {
        const colorMapping = {
            'rouge': '#FF0000', 'vert': '#00FF00', 'bleu': '#0000FF',
            'violet': '#800080', 'jaune': '#FFFF00', 'orange': '#FFA500', 'blanc': '#FFFFFF'
        };
        const newColor = colorMapping[color] || `#${color}`;
        
        if (type === 'txt') {
            consoleContainer.style.setProperty('--text-color', newColor);
            document.querySelectorAll('.dynamic-text-color').forEach(el => el.style.color = newColor);
            promptElement.style.color = newColor;
            inputField.style.color = newColor;
        } else if (type === 'line') {
            separator.style.borderBottomColor = newColor;
            consoleOutput.style.borderBottomColor = newColor;
            consoleContainer.style.borderColor = newColor;
        }
    }

    function showCommandHelp(command) {
        const helpText = {
            'help': 'help: Displays the command list.',
            'clear': 'clear: Clears the console screen.',
            'date': 'date: Displays the current date and time.',
            'echo': 'echo [text]: Prints the specified text back to the console.',
            'whoami': 'whoami: Displays information about the current user.',
            'color': 'color [txt/line] [value]: Changes colors. Use "txt" for text or "line" for borders. Value can be a name (rouge, vert...) or a hex code.'
        };
        printOutput(helpText[command] || `No help available for: ${command}`);
    }
});