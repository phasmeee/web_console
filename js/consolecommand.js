document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('command-input');
    const consoleOutput = document.getElementById('console-output');
    const consoleContainer = document.getElementById('console-container');
    const promptElement = document.getElementById('prompt');
    const separator = document.getElementById('separator');

    // Afficher un message de bienvenue à l'arrivée
    printOutput('Welcome to the Web Console!\nType "help" to obtain the list of supported commands.\nType "help[command_name]" to obtain information about what the command does.');

    // Empêcher la sélection du texte et masquer le curseur
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
            inputField.value = '';  // Clear the input field
        }
    });

    function executeCommand(command) {
        if (command.trim() === '') {
            return;
        }

        const outputLine = document.createElement('div');
        outputLine.textContent = `user@web:~$ ${command}`;
        outputLine.classList.add('dynamic-text-color');
        consoleOutput.appendChild(outputLine);

        if (command.toLowerCase() === 'help') {
            printOutput('Available commands:\n- help\n- clear\n- color[txt/line][hex]/known_color');
        } else if (command.toLowerCase().startsWith('help[') && command.endsWith(']')) {
            const commandName = command.slice(5, -1).toLowerCase();
            showCommandHelp(commandName);
        } else if (command.toLowerCase() === 'clear') {
            consoleOutput.innerHTML = '';
        } else if (command.toLowerCase().startsWith('color')) {
            const parts = command.split(' ');
            if (parts.length < 2) {
                printOutput('Error: Command format should be color[mot] [hex|color].');
                return;
            }
            const type = parts[0].split('[')[1].split(']')[0];
            const colorValue = parts[1];
            if (['txt', 'line'].includes(type)) {
                if (isValidColor(colorValue)) {
                    changeColor(type, colorValue);
                    printOutput(`Console ${type} color changed to: ${colorValue}`);
                } else {
                    printOutput(`Invalid color value: ${colorValue}. Please use a valid hex code or known color.`);
                }
            } else {
                printOutput(`Unknown type: ${type}. Use 'txt' or 'line'.`);
            }
        } else {
            printOutput(`Command not found: ${command}`);
        }

        // Scroll to the bottom of the console
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
            'rouge': '#FF0000',
            'vert': '#00FF00',
            'bleu': '#0000FF',
            'violet': '#800080',
            'jaune': '#FFFF00',
            'orange': '#FFA500',
            'blanc': '#FFFFFF'
        };
        const newColor = colorMapping[color] || `#${color}`;
        if (type === 'txt') {
            consoleContainer.style.setProperty('--text-color', newColor);
            document.querySelectorAll('.dynamic-text-color').forEach(element => {
                element.style.color = newColor;
            });
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
            'help': 'help: Displays the command list.\nhelp[command_name]: Displays information about the specified command.',
            'clear': 'clear: Clears the console screen.',
            'color': 'color [txt|line] [hex|color]: Changes the console text or border color. [txt] affects text color, [line] affects borders. Use hex color code or known color names (rouge, vert, bleu, violet, jaune, orange, blanc).'
        };

        if (helpText[command]) {
            printOutput(helpText[command]);
        } else {
            printOutput(`No help available for the command: ${command}`);
        }
    }
});
