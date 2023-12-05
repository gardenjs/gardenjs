# Component library explorer

Garden is a lightweight UI component explorer for JavaScript front-end libraries that makes it easier to develop, test and document UI components and pages. Svelte, Vue and React are currently supported out of the box. Other libraries can also be easily connected to Garden.

## Why Garden?

- Garden is significantly faster than comparable tools such as Storybook.
- Garden is multi-framework compatible.
- Garden has many useful features without being complex and bloated.
- Garden simply looks good :)

## Getting Started

Please follow the documentation at [gardenjs.org](https://www.gardenjs.org)

Happy Gardening :)

## Sponsors

Garden is an open source project and is licensed under the MIT license. Become a sponsor to give us more scope for further development. We are grateful for this and will publish your logo and website URL in our README on Github and on our website/documentation.

## Contributing

GardenJS was developed and is contributed by [Rabbit Development](https://www.rabbitdevelopment.de). We look forward to your feedback, please report any bugs. We also welcome contributions and are happy about sponsoring.

## License

[MIT](https://opensource.org/license/mit/)

Copyright (C) 2020 - present by Robin Danzinger & Martin Farkas from [Rabbit Development](https://www.rabbitdevelopment.de).

## Todo´s

### v1.0

- [task] Install script / commandline skeleton project (example component). Test script with Svelte, Vue & React.
- [task] Make Garden compatible with React.
- [task] Add renderer plugins for svelte, vue and react. npm modules (@gardenjs/plugin-xyz).
- [task] Gardenjs npm modul. (yarn?)
- [task] Add hooks before, after.
- [refactor] Move logic to own file / use stores?. Handle user interaction.
- [task] Add tests (or v1.1 ?).
- [task] Set Gardenjs repository public.
- [task] Public Garden docs.
- [task] Public Garden demo of Garden docs. Set repository of Garden docs public.
- [task] Public Rabbit dev website.

### v1.1

- [feature] Evaluation of "Make Storybook stories compatible with Garden". If relatively easy possible then development. Otherwise prioritize other tasks/features depending on complexity.

### v1.x

- [task] Add [line numbers plugin](https://github.com/wcoder/highlightjs-line-numbers.js) to highlightjs.
- [task] Sidebarnav is closed by default on narrow display devices.
- [task] Make setting of default mode possible via garden.config.js.
- [task] If full mode is active, switching to portrait mode is deactivated.
- [task] Store selection in panel nav for refresh or if another component is selected.
- [task] Store selection of stage for refresh or if another component is selected.
- [task] Make garden docs link optional via garden.config.js.
- [task] Show custom favicon.svg configured in garden.config.js.
- [feature] Screenshot tests:
  - Docker image oder alternativ for screenshot test.
  - Automatic create test file & and folder (like init garden).
  - Settings.
- [feature] Set width and height of stage by size input.
- [feature] Add zoom button 100% and if zoomed show size in % with switch possibility.
- [feature] Vertical dragbar to drag stage horizontical to show rwd behaviour. Already integrated staticly, just needs to be commented out in topbar.svelte: Show 'px' width/height of stage next to rwd-navi.
- [task] Switch from md to mdx.
- [feature] Set stagesize values for "mobile, tablet, desktop" inside garden.config.js. Option: Set list of custom values like iPhone 15, iPad, Samsung etc. in garden.config and show dropdown in garden instead of icons.
- [task] Integrate Svelte A11y features.
- [feature] Build kickstarter "carrots". Define components for carrots.
- [feature] Bookmarks.
- [feature] Measure.

<br><br><br><p align="center"><img src="src/client/assets/icons/logo.svg"></p>
