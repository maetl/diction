const requireJSON5 = require('require-json5')
const fs = require('fs')
const program = require('commander')
const { prompt } = require('inquirer')

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Name of your design project?'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Short description of your design project?'
  },
  {
    type: 'list',
    name: 'color',
    message: 'Choose a starting color scheme',
    choices: requireJSON5('./archetypes/color.js')
  }
]

const loadArchetype = (archetype, name) => {
  return requireJSON5(`./archetypes/${archetype}/${name}.js`)
}

const writeJsonFile = (path, object) => {
  fs.writeFileSync(path, JSON.stringify(object, null, 2))
}

const processArchetype = (archetype, answers) => {
  if (answers[archetype]) {
    return loadArchetype(archetype, answers[archetype])
  } else {
    throw new Exception(`Missing key in answers: ${archetype}`)
  }
}

const mergeDictionary = (answers) => {
  return {
    name: answers.name,
    description: answers.description,
    color: processArchetype('color', answers)
  }
}

const getFilename = (path, name) => {
  const dir = (path) ? path : process.cwd()
  return `${dir}/${name}.style`
}

const initCommand = (path, cmd) => {
  if (cmd.interactive) {
    prompt(questions)
      .then(answers => {
        writeJsonFile(getFilename(path, answers.name), mergeDictionary(answers))
      })
      .catch(err => {
        console.error(err)
      })
  }
}

program.command('init [path]')
  .description("Create a new design token dictionary")
  .option('-i, --interactive', 'Run with interactive choices')
  .action(initCommand)

program.parse(process.argv)
