# Astro Component Template 🧑‍🚀

This is [an unofficial template](#how-is-this-different-from-the-official-component-template) meant to ease the development of components for [Astro](https://astro.build/) that are intended for distribution. It does so by providing you with:

- A clear default directory structure
- Proper TypeScript settings for working with Astro
- Default settings for ESLint, Prettier and EditorConfig inspired by the formatting used in the Astro project itself (also, [the config files are typed 👀](https://princesseuh.netlify.app/article/youshouldtypeyourconfigfiles/))
- Ready-to-use testing tools powered by the libraries also used by the Astro project (Mocha and Chai), also contains [astro-component-tester](https://github.com/Princesseuh/astro-component-tester) to help you test the output of your component(s)
- Preconfigured VS Code workspace settings file with settings meant to make development cozy and nice
- Use a example folder to help previewing the Component without npm link

Hopefully, all of this together will provide you with a fun and comfortable development environnement for working on your Astro component! 🚀 Also, never forget that this is only a template to get you started, if you don't agree with any of the choices made, feel free to change it to fit your project better!

**⚠️ Don't forget:** You should edit `package.json` with the info relevant to your project, such as a proper `name`, a license, a link to the repository for the npm website and other settings. You should also adjust the Astro `peerDependency` to the lowest version of Astro you support.

## Folder Structure

```plaintext
├── .vscode/                    # VS Code settings folder
│   ├── settings.json           # Workspace settings
│   └── extensions.json         # Recommended extensions to install
├── example/                    # Preview Your component here
├── src/                        # Your component source code
│   ├── Component.astro         # Example component file
│   └── main.ts                 # Example source code file
├── test/                       # Your component tests
│   └── example.test.js         # Example tests
└── index.ts                    # Should contain all the exports your component provide to users
```

ESLint, Prettier and EditorConfig settings are respectively located in the following files: `.eslintrc.js`, `.prettierrc.js` and `.editorconfig` at the root of this template project.

## Commands

The following npm scripts are provided to lint and format your project:

| Command          | Action                                                        |
| :--------------- | :------------------------------------------------------------ |
| `npm run test`   | Run tests using Mocha                                         |
| `npm run format` | Format your project using Prettier, this edits files in-place |
| `npm run lint`   | Lint your project using ESLint                                |
| `npm run dev`    | Run dev inside example project                                |

In VS Code, you can access those commands in the Explorer in the `NPM Scripts` section.

## Frequently asked questions

### How is this different from [the official component template](https://github.com/withastro/astro/tree/main/examples/component)?

At the end of the day, they both have the same goal: Giving you a template to start from to build a component for Astro. However, they have slightly different philosophies.

Notably, the official template uses a mono-repo structure, whereas this template uses a normal, straightforward repo. Additionally, this template is a bit more opinionated than the official one, giving you preconfigured support for ESLint, Prettier, VS Code and EditorConfig, as well as testing support.

It's up to you to choose which one you prefer, they're both good options!

### How do I try my component in development?

> `npm` is used here for brevity, the same concept applies to other package managers!

This template is a normal npm package, which mean that you can install it as a local folder or using [npm link](https://docs.npmjs.com/cli/v8/commands/npm-link).

For example, with the following folder structure:

```plaintext
├── component/   # Your component using this template
└── project/     # A standard Astro project
```

You can go into `project` and type the following command: `npm link ../component`. Changes to your component will be automatically reflected in your Astro project!

### Which package manager should I use?

The one you prefer! This template makes no assumption.

The only package-manager-related thing in this repo is that the prettier plugin has the proper configuration needed to work with pnpm (but it works with the other too, pnpm just needs [additional settings](https://github.com/withastro/prettier-plugin-astro#pnpm-support)).
