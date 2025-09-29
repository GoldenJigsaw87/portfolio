console.clear()
import {readFileSync, writeFileSync} from "fs"
import say from "say"


const hello  = readFileSync("./Hello.txt", "utf-8")
console.log (hello);

function speak(paragraph) {
    return new Promise((resolve, reject) => {
say.speak(paragraph, "Cellos", 0.8, (err)=> {
resolve()

    })
})
}

speakStory()