# garden

## install 
(not yet) npm install --save-dev garden

instead:
checkout garden
in garden base folder: 'npm link' or 'sudo npm link'

Go to project base folder:

create rabbit.config.json file

example:
```
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

run initGarden


## Run Garden

go to project base folder and run `serveGarden`

or add it to your package.json and run via `npm run garden`
```
  ...
  "scripts": {
    ...
    "garden": "serveGarden".
    ...
  },
  ...
```

open in browser: localhost:${serverport}/ 

serverport is defined in rabbit.config.json, e.g. 3010


## Todo´s

* [task] update node 18.
* [task] check the error messages on the svelte files in the vs code (e.g. stage.svelte).
* [refactor] Move logic from Topbar.svelte to darkmode.js.
* [task] Sidebarnav: toggle nav items & add toggle icon.
* [bug] Prevent horizontal drag bar from slipping out of view when moving down.
* [task] Write garden documentaion.
* [task] Build kickstarter for new projects with own github repository (like carrots but just as "hello world).
* [task] content garden website.
* [task] Set repository public & make garden npm modul.
* [feature] Manage project themes via topbar dropdown. Set "class dark" inside iframe if project has dark mode. Needs a Configuration file? Which Concepts are possible to realize that?
* [feature] Vertical dragbar to drag stage horizontical to show rwd behaviour. If done: Show 'px' width/height of stage next to rwd-navi.