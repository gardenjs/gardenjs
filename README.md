# GARDEN

Garden is a lightweight UI explorer for Svelte projects that helps you build, test and display UI components and pages.

## What is Garden?

### A Svelte component library

Garden is the showroom for what you grow. The explorer represents each component of your design system in isolation. The different states of the components are also shown. Garden is developed for Svelte projects of any size and runs outside of your app for an absolute independence. Code changes are reflected at the speed of light by the build tool Vite. Garden is an Open Source project under the MIT License.

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

### open in browser

```text
localhost:${serverport}/ 
````

Serverport is defined in rabbit.config.json, e.g. 3010

## License

[MIT](https://opensource.org/licenses/MIT)

## Todo´s

### v1.0
* [discussion] Rename "Garden" in "GardenLab", "GardenView" or something else? ("garden" is an automation platform for Kubernetes development and testing: https://github.com/garden-io/garden)
* [task] update node 18.
* [task] check the error messages on the svelte files in the vs code (e.g. stage.svelte, gardenapp.svelte ...).
* [refactor] Move logic to own file. handle user interaction.
* [task] rabbit.config -> javascript file and add config for css imports and theming. topbar: add class "active" to link in theme dropdown.
* [feature] Manage project themes via topbar dropdown. Set "class dark" inside iframe if project has dark mode. Needs a Configuration file? Which Concepts are possible to realize that? in case of configuration file set field for project name/app name and put above sidebar nav next to collapse icon.
* open(`http://localhost:${port}/garden`)
* [task] Write garden documentaion.
* [task] Build kickstarter for new projects with own github repository (like carrots but just as "hello world).
* [task] Sidebarnav: open/close all.
* [task] content garden website.
* [task] when opening garden info open page. -> kickstarter
* [task] Set repository public & make garden npm modul.

### v1.1
* [bug] Prevent horizontal drag bar from slipping out of view when moving down.
* [feature] Improve Garden for smaller displays:
  * Sidebarnav is closed by default on narrow display devices.
  * ...
* [feature] Vertical dragbar to drag stage horizontical to show rwd behaviour. Already integrated staticly, just needs to be commented out in topbar.svelte: Show 'px' width/height of stage next to rwd-navi.
* [task] Build kickstarter "carrots". Define components for carrots.

<br><br><br><p align="center"><img src="src/assets/icons/logo.svg"></p>