import { execSync } from 'child_process'
import { readFileSync } from 'fs'

const type = process.argv[2]           // patch | minor | major
const app  = process.argv[3] || 'web'

if (!['patch', 'minor', 'major'].includes(type)) {
  console.error('Usage: npm run release -- patch|minor|major')
  process.exit(1)
}

const run = (cmd) => execSync(cmd, { stdio: 'inherit' })

// 1. Lint before anything
run(`npm run lint -w ${app}`)

// 2. Bump version — NO git involvement yet
run(`npm version -w ${app} ${type} --no-git-tag-version`)

// 3. Sync root lock file
run('npm install')

// 4. Read the new version
const pkg     = JSON.parse(readFileSync(`${app}/package.json`, 'utf8'))
const tag     = `${app}/v${pkg.version}`

// 5. Git — one clean commit, one tag, one push
run('git add -A')
run(`git commit -m "${tag}"`)
run(`git tag ${tag}`)
run('git push --follow-tags')

console.log(`\n✓ Released ${tag}`)