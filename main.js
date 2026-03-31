// console.clear()
// import {readFileSync, writeFileSync} from "fs"
// import say from "say"


// const hello  = readFileSync("./Hello.txt", "utf-8")
// console.log (hello);

// function speak(paragraph) {
//     return new Promise((resolve, reject) => {
// say.speak(paragraph, "Cellos", 0.8, (err)=> {
// resolve()

//     })
// })
// }

// speakStory()

const term = new Terminal({
      cols: 80, // width in characters
      rows: 24, // height in characters
      cursorBlink: true, // blinking cursor
      theme: {
        background: '#000000', // terminal background
        foreground: '#00FF00'  // green text like old monitors
      }
    });
    term.open(document.getElementById('terminal'));
    // Initialize linkifier addon
    // const webLinksAddon = new WebLinksAddon.WebLinksAddon();
    // term.loadAddon(webLinksAddon);

     term.writeIn("Jensen Portfolio Terminal");
     term.writeIn("Type 'help' for a list of commands.\n");
    const commands = {
     help: () => {
        term.writeIn("Available commands:");
        term.writeIn("About - Learn more about me");
        term.writeIn("Projects - See my projects");
     },

     about: () => {
        term.writeIn("Hi, I'm Mark Jensen, a passionate software developer with a love for creating innovative solutions. With experience in various programming languages and frameworks, I enjoy tackling complex problems and building user-friendly applications. In my free time, I explore new technologies and contribute to open-source projects.");
     },
     
     projects: () => { 
        term.writeIn("Here are some of my projects:");
        term.writeIn('screentime.html - A web application that helps users track and manage their screen time effectively.');  
     },
    }
     function prompt() {
      term.write("\n> "); // show prompt
      let userInput = '';
      term.onKey(e => {
        const key = e.key;
        if (key === '\r') { // Enter pressed
          term.writeln(""); // move to new line
          handleCommand(userInput.trim());
          userInput = '';
        } else if (key === '\u007F') { // Backspace
          if (userInput.length > 0) {
            userInput = userInput.slice(0, -1);
            term.write("\b \b"); // erase character
          }
        } else {
          userInput += key;
          term.write(key);
        }
      });
    }
    function handleCommand(input) {
      if (input === "") {
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
     prompt();
    