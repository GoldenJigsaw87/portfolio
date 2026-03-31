// Initialize Xterm.js terminal
const term = new Terminal({
  cols: 80,
  rows: 10,
  cursorBlink: true,
  theme: {
    background: '#000000',
    foreground: '#b59968'
  }
});

// Attach terminal to container
term.open(document.getElementById('terminal'));

// Load linkifier addon (makes URLs clickable)
const webLinksAddon = new WebLinksAddon.WebLinksAddon();
term.loadAddon(webLinksAddon);

// Toggle terminal button
const terminalButton = document.getElementById('terminalButton');
const terminalContainer = document.getElementById('terminalContainer');
const closeButton = document.getElementById('closeTerminal');

terminalButton.addEventListener('click', () => {
  terminalContainer.style.display = 'flex'; // show terminal
});

closeButton.addEventListener('click', () => {
  terminalContainer.style.display = 'none'; // hide terminal
});

// Terminal commands
const commands = {
  help: () => {
    term.writeln("Commands:");
    term.writeln("main      - Go to homepage");
    term.writeln("resume    - Open resume");
    term.writeln("contact   - Open contact page");
    term.writeln("color     - Change terminal & page text color");
    term.writeln("clear     - Clear terminal text");
    prompt();
  },
  main: () => {
    term.writeln("Returning to homepage...");
    window.location.href = "index.html"; // navigate
  },
  resume: () => {
    term.writeln("Opening resume...");
    // Open PDF in a new tab
    window.open("JensenResume.pdf", "_blank");
},
  contact: () => {
    term.writeln("Opening contact page...");
    window.location.href = "contact.html"; // contact page
  },
  color: (args) => {
    // args example: "color red"
    const color = args[1] || "#00FF00"; // default green
    term.setOption("theme", { background: '#000000', foreground: color });
    document.documentElement.style.setProperty('--text-color', color); // update CSS variable
    document.body.style.color = color; // also update body text color
    term.writeln(`Text color changed to ${color}`);
    prompt();
  },
  clear: () => {
    term.clear();
    prompt();
  }
};

// Simple input handling
function prompt() {
  term.write("\n> "); // prompt
  let userInput = '';

  // onKey listener (backspace, enter, regular keys)
  const keyHandler = (e) => {
    const key = e.key;

    if (key === '\r') { // Enter pressed
      term.writeln("");
      handleCommand(userInput.trim());
      userInput = '';
    } else if (key === '\u007F') { // Backspace
      if (userInput.length > 0) {
        userInput = userInput.slice(0, -1);
        term.write("\b \b");
      }
    } else {
      userInput += key;
      term.write(key);
    }
  };

  term.onKey(keyHandler);
}

// Parse and execute commands
function handleCommand(input) {
  if (!input) {
    prompt();
    return;
  }

  const parts = input.split(' '); // split command + args
  const cmd = parts[0].toLowerCase();

  if (commands[cmd]) {
    commands[cmd](parts); // pass args to function
  } else {
    term.writeln(`Unknown command: ${input}`);
    prompt();
  }
}

// Initial welcome + prompt
term.writeln("Welcome to Portfolio Terminal!");
term.writeln("Type 'help' for commands.");
prompt();