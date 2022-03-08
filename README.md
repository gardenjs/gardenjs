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

* actionbar as it´s own component (so we can move scss as css into file)
* sidebarnav: toggle nav items, add toggle icon
* actionbar: give btn a class if sidebar is toggled to set padding-right with same value as inside the topbar (set title with same distance to left then menu icon) maybe via a body class for sidebar is open/closed is needed
* after page refresh bg-color for the "active page" disappears.
* prevent horizontal drag bar from slipping out of view when moving
* manage dark-mode of frameworks like carrots:
* set "class dark" inside iframe
* set bg-color of stage via config file for dark mode & light (default)?

### Longterm ToDo´s

* vertical dragbar to move stage horizontical to show rwd behaviour. Show px width/height of stage in actionbar
