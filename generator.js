const ejs = require('ejs')
const path = require ('path')
const fs = require('fs')
const requireJSON5 = require('require-json5')

const templateDir = path.join(__dirname, 'templates')

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

const textContrast = (hexcolor) => {
	const r = parseInt(hexcolor.substr(1,2), 16)
	const g = parseInt(hexcolor.substr(3,2), 16)
	const b = parseInt(hexcolor.substr(5,2), 16)
	const yiq = ((r*299) + (g*587) + (b*114)) / 1000
	return yiq >= 128 ? 'dark' : 'light'
}

const helpers = {
  capitalize,
  textContrast
}

const generate = (target, name, dictionary) => {
  const templatePath = `${templateDir}/${target}/${name}.ejs`
  const template = fs.readFileSync(templatePath).toString()

  let outfile = '';
  switch(target) {
    case 'tailwind': outfile = 'tailwind.js'; break;
    case 'styleguide': outfile = 'colors.html'; break;
  }

  fs.writeFileSync(outfile, ejs.render(template, Object.assign(dictionary, helpers)))
}

const dictionary = requireJSON5(process.argv[process.argv.length-1])

generate('tailwind', 'config', dictionary)
generate('styleguide', 'colors', dictionary)
