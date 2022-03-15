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

* [task] kill actionbar & title and move rwd-navi inside topbar. Then move styles from scss to topbar.svelte.
* [task] Sidebarnav: toggle nav items & add toggle icon.
* [task] Combine both sidebarnav files to one file (SidebarNavLink.svelte + SidebarNav.svelte). 
* [bug] after page refresh bg-color of sidebar link for the "active page" disappears.
* [bug] prevent horizontal drag bar from slipping out of view when moving.
* [feature] Vertical dragbar to drag stage horizontical to show rwd behaviour. If done: Show 'px' width/height of stage next to rwd-navi.
* [feature] Manage project themes via topbar dropdown. Set "class dark" inside iframe if project has dark mode. Needs a Configuration file? Which Concepts are possible to realize that?
