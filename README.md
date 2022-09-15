# GARDEN

Garden is a lightweight component library for Svelte projects that helps you build, test and display UI components and pages.

## What is Garden?

### A Svelte component library

Garden is the showroom for what you grow. The library represents each component of your design system in isolation. The different states of the components are also shown. Garden is developed for Svelte projects of any size and runs outside of your app for an absolute independence. Code changes are reflected at the speed of light by the build tool Vite. Garden is an Open Source project.

## Getting Started

not yet:

```bash
npm install --save-dev garden
```

instead:
checkout garden
in garden base folder: 'npm link' or 'sudo npm link'

Go to project base folder:

```text
create rabbit.config.json file
```

example:

```json
{
  "garden": {
    "serverport": 3010,
    "wssocketport": 3011,
    "destination": "garden/",
    "structure": {
      "custom": {
        "components": "/src/components/"
      }
    },
    "watch": {
      "directories": [
        "./src"
      ],
      "include": [
        ".svelte", ".das.json", ".scss", ".css", ".js"
      ]
    }
  }
}
```

```bash
run initGarden
```

## Run Garden

go to project base folder and run `serveGarden`

or add it to your package.json and run via `npm run garden`

```json
  "scripts": {
    "garden": "serveGarden",
  },
```

### open in browser:

```text
localhost:${serverport}/ 
````

Serverport is defined in rabbit.config.json, e.g. 3010

## License

Released under [MIT](https://opensource.org/licenses/MIT) or [GPL v3.0](https://www.gnu.org/licenses/gpl-3.0.html) or ...? Copyright © 2020-2022 by Robin Danzinger, Martin Farkas

## Todo´s

* [task] update node 18.
* [task] add license: [MIT](https://opensource.org/licenses/MIT) or [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html) or something else? I prefer [GPL-3.0](https://www.gnu.org/licenses/ rms-why-gplv3#top) because it puts us in a better position for future scenarios.
* [task] check the error messages on the svelte files in the vs code (e.g. stage.svelte, gardenapp.svelte ...).
* [refactor] Move logic to own file. handle user interaction.
* [task] rabbit.config -> javascript file and add config for css imports and theming. topbar: add class "active" to link in theme dropdown.
* [feature] Manage project themes via topbar dropdown. Set "class dark" inside iframe if project has dark mode. Needs a Configuration file? Which Concepts are possible to realize that? in case of configuration file set field for project name/app name and put above sidebar nav next to collapse icon.
* [bug] Prevent horizontal drag bar from slipping out of view when moving down.
  open(`http://localhost:${port}/garden`)
* [task] Write garden documentaion.
* [task] Build kickstarter for new projects with own github repository (like carrots but just as "hello world).
* [task] Sidebarnav: open/close all.
* [task] content garden website.
* [task] when opening garden info open page.
* [task] github stars badget in garden topbar.
* [task] Set repository public & make garden npm modul.

--
* [feature] Improve Garden for smaller displays:
  * Sidebarnav is closed by default on narrow display devices.
  * ...
* [feature] Vertical dragbar to drag stage horizontical to show rwd behaviour. Already integrated staticly, just needs to be commented out in topbar.svelte: Show 'px' width/height of stage next to rwd-navi.

<br><br><br><p align="center"><img src="src/assets/icons/logo.svg"></p>