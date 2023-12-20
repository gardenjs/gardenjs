# Component library explorer

Gardenjs is a lightweight UI component explorer for JavaScript front-end libraries that makes it easier to develop, test and document UI components and pages. Svelte, Vue and React are currently supported out of the box. Other libraries can also be easily connected to Garden.

## Why Garden?

- Gardenjs is significantly faster than comparable tools such as Storybook.
- Gardenjs is multi-framework compatible.
- Gardenjs has many useful features without being complex and bloated.
- Gardenjs simply looks good :)

## Getting Started

Please follow the documentation at [gardenjs.org](https://www.gardenjs.org)

Happy Gardening :)

## Sponsors

Gardenjs is an open source project and is licensed under the MIT license. Become a sponsor to give us more scope for further development. We are grateful for this and will publish your logo and website URL in our README on Github and on our website/documentation.

## Contributing

GardenJS was developed and is contributed by [Rabbit Development](https://www.rabbitdevelopment.de). We look forward to your feedback, please report any bugs. We also welcome contributions and are happy about sponsoring.

## License

[MIT](https://opensource.org/license/mit/)

Copyright (C) 2020 - present by Robin Danzinger & Martin Farkas from [Rabbit Development](https://www.rabbitdevelopment.de).

## Todo´s

### v1.0

- [task] Install script / commandline skeleton project (example component). Test script with Svelte, Vue & React.
- [task] Gardenjs npm modul. (yarn?)
- [task] Add renderer plugins for svelte, vue and react. npm modules (@gardenjs/plugin-xyz).
- [task] Add hooks before, after.
- [task] Make Gardenjs compatible with React.
- [task] Public Gardenjs docs.
- [task] Public Gardenjs demo of Gardenjs docs.
- [refactor] Move logic to own file / use stores?. Handle user interaction.
- [task] Set Gardenjs repository public.
- [task] Set repository of Gardenjs docs public.
- [task] Public Rabbit dev website.

### v1.1

- [feature] Evaluation of "Make Storybook stories compatible with Garden". If relatively easy possible then development. Otherwise prioritize other tasks/features depending on complexity.
- [task] Add tests (or v1.1 ?).

### v1.x

- [task] Add [line numbers plugin](https://github.com/wcoder/highlightjs-line-numbers.js) to highlightjs.
- [task] Sidebarnav is closed by default on narrow display devices.
- [task] Make setting of default mode possible via garden.config.js.
- [task] If full mode is active, switching to portrait mode is deactivated.
- [task] Store selection in panel nav for refresh or if another component is selected.
- [task] Store selection of stage for refresh or if another component is selected.
- [task] Make Gardenjs docs link optional via garden.config.js.
- [task] Show custom favicon.svg configured in garden.config.js.
- [feature] Screenshot tests:
  - Docker image oder alternativ for screenshot test.
  - Automatic create test file & and folder (like init garden).
  - Settings.
- [feature] Set width and height of stage by size input.
- [feature] Add zoom button 100% and if zoomed show size in % with switch possibility.
- [feature] Vertical dragbar to drag stage horizontical to show rwd behaviour. Already integrated staticly, just needs to be commented out in topbar.svelte: Show 'px' width/height of stage next to rwd-navi.
- [task] Switch from md to mdx.
- [feature] Set stagesize values for "mobile, tablet, desktop" inside garden.config.js. Option: Set list of custom values like iPhone 15, iPad, Samsung etc. in garden.config and show dropdown in Gardenjs instead of icons.
- [task] Integrate Svelte A11y features.
- [feature] Build kickstarter "carrots". Define components for carrots.
- [feature] Bookmarks. (siehe ReactCosmos)
- [feature] Measure.

<br><br><br><p align="center"><img src="src/client/assets/icons/logo.svg"></p>
