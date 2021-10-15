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

* manage dark-mode of frameworks like carrots:
  * set "class dark" inside iframe
  * set bg-color of stage via config file for dark mode & light (default)?
* sidebarnav: toggle nav items, add toggle icon
* actionbar - device buttons: add class "active" (on button-tag)