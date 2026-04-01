const term = new Terminal({
  cols: 80,
  rows: 10,
  cursorBlink: true,
  theme: {
    background: '#000000',
    foreground: '#b59968'
  }
});

term.open(document.getElementById('terminal'));

const webLinksAddon = new WebLinksAddon.WebLinksAddon();
term.loadAddon(webLinksAddon);

const terminalButton = document.getElementById('terminalButton');
const terminalContainer = document.getElementById('terminalContainer');
const closeButton = document.getElementById('closeTerminal');

terminalButton.addEventListener('click', () => {
  terminalContainer.style.display = 'flex';
});

closeButton.addEventListener('click', () => {
  terminalContainer.style.display = 'none';
});

/* COMMANDS */
const commands = {
  help: () => {
    term.writeln("Commands:");
    term.writeln("main      - Go to homepage");
    term.writeln("resume    - Open resume");
    term.writeln("explain   - Explain sections");
    term.writeln("clear     - Clear terminal");
    prompt();
  },

  explain: () => {
    term.writeln("Type one of the following:");
    term.writeln("about");
    term.writeln("projects");
    term.writeln("client_projects");
    term.writeln("jensen_entertainment");
    prompt();
  },

  about: () => {
    term.writeln("The about page was built as a learn-about-me without distracting from the main project. It is simple, clean, and focused on readability so visitors can quickly understand my background and interests.");
    prompt();
  },

  projects: () => {
    term.writeln("This page is inspired by the maintenance panel from Five Nights at Freddy's 3. It showcases fun projects in a unique, themed way while still being functional.");
    prompt();
  },

  client_projects: () => {
    term.writeln("Due to confidentiality, these projects are summarized. Work includes an admissions scheduling system, Topside Tipoff support, and Goodland Touring—a visitor information website.");
    prompt();
  },

  jensen_entertainment: () => {
    term.writeln("Jensen Entertainment is a business project built around my passion for robotics and animatronics, with plans for future expansion and development.");
    prompt();
  },

  main: () => {
    term.writeln("Returning to homepage...");
    window.location.href = "index.html";
  },

  resume: () => {
    term.writeln("Opening resume...");
    window.open("JensenResume.pdf", "_blank");
    prompt();
  },

  clear: () => {
    term.clear();
    prompt();
  }
};

/* INPUT SYSTEM */
function prompt() {
  term.write("\n> ");
  let userInput = '';

  const keyHandler = (e) => {
    const key = e.key;

    if (key === '\r') {
      term.writeln("");
      handleCommand(userInput.trim());
      userInput = '';
    } else if (key === '\u007F') {
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

/* COMMAND HANDLER */
function handleCommand(input) {
  if (!input) {
    prompt();
    return;
  }

  const cmd = input.toLowerCase();

  if (commands[cmd]) {
    commands[cmd]();
  } else {
    term.writeln(`Unknown command: ${input}`);
    prompt();
  }
}

/* START */
term.writeln("Welcome to Portfolio Terminal!");
term.writeln("Type 'help' for commands.");
prompt();