import sharp from 'sharp'

console.log("hi")
sharp("ricardohat.gif", {
    animated: true,
}).resize(300, 300).toFile("out.gif")



