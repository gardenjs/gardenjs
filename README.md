# Gardenjs

+++ TEST RELEASE, COMING SOON +++

Gardenjs is an open source JS/Svelte-based UI component library explorer.

## Getting Started

Please follow the documentation at [gardenjs.org](https://www.gardenjs.org). Happy Gardening :)

## What is Gardenjs?

Gardenjs provides a centralized platform for developers to create, test and present UI components and pages in isolation. Gardenjs promotes modular and reusable code, streamlines collaboration between team members and increases overall productivity. Gardenjs is designed for projects of any size.

## Why Gardenjs?

- Simple and efficient working.
- Significantly faster than comparable tools such as Storybook.
- Multiple frameworks running in a single instance.
- Integration of external libraries within a project.
- Many useful features without being complex and bloated.
- Simply looks good :)

## Supported Frameworks

HTML snippets are rendered by default. The support of JS frameworks is realized by renderer plugins. There are currently plugins for [Svelte](https://github.com/gardenjs/render-plugin-svelte), [Vue](https://github.com/gardenjs/render-plugin-vue) and [React](https://github.com/gardenjs/render-plugin-react). You can also easily create plugins for other frameworks. Contact us, we will be happy to link your renderer plugins here.

## Contributing

Gardenjs was developed and is contributed by [Rabbit Development](https://www.rabbitdevelopment.de). We look forward to your feedback, please report any bugs. We also welcome contributions and are happy about sponsoring.

## License

[MIT](https://github.com/gardenjs/gardenjs?tab=MIT-1-ov-file#readme)

Copyright (C) 2020-present, Robin Danzinger & Martin Farkas.

## Todo's up to v1.0

- [task] Add "no renderer" to install script and at least least one must be selected.
- [bug] On reload css defect (only problem in ubuntu). Maybe writing issue in gardenjs?
- [task] Decorator for vue & react plugin.
- [feature] Place decorator files in folders (like test-files with before/after).
- [feature] Support das file as JS, JSX, TS, TSX.
- [task] Type infos of das in editor.
- [task] Add renderer to docs.
- [task] Add decorator to docs.
- [task] Public Gardenjs docs & set Gardenjs repository public.
- [task] Public Gardenjs demo of Gardenjs docs & set repository of Gardenjs docs public.
- [task] Public Rabbit Dev website.
- [task] Create Linkedin profil for Rabbit Dev & Gardenjs.

## Roadmap

Gardenjs will continue to be maintained. Further features will also be integrated depending on how well Gardenjs is accepted.

### Next

- [refactor] Move logic to own file / use stores?. Handle user interaction.
- [feature] Evaluation of "Make Storybook stories compatible with Garden". If relatively easy possible then development. Otherwise prioritize other tasks/features depending on complexity.
- [task] Add tests.

### Later (no specific order)

- [feature] use das-files from other modules (e.g. show carrots in custom project).
- [task] Keep user state after refresh.
  - [task] Store selection in panel nav for refresh or if another component is selected.
  - [task] Store selection of stage for refresh or if another component is selected.
- [feature] Add testing library. E.g. [Testing Library](https://testing-library.com/).
- [feature] Collect events and show in panel.
- [feature] Bookmarks. (siehe ReactCosmos)
- [task] Add [line numbers plugin](https://github.com/wcoder/highlightjs-line-numbers.js) to highlightjs.
- [task] Sidebarnav is closed by default on narrow display devices.
- [task] Make setting of default mode possible via garden.config.js.
- [task] If full mode is active, switching to portrait mode is deactivated.
- [task] Make Gardenjs docs link optional via garden.config.js.
- [task] Move demo components from core to the renderer plugins.
- [task] Show custom favicon.svg configured in garden.config.js.
- [task] Color variables are made configurable for your own Gardenjs themes.
- [feature] Screenshot tests:
  - Docker image oder alternativ for screenshot test.
  - Automatic create test file & and folder (like init garden).
  - Settings.
- [feature] Set width and height of stage by size input.
- [feature] Add zoom button 100% and if zoomed show size in % with switch possibility.
- [feature] Vertical dragbar to drag stage horizontical to show rwd behaviour. Already integrated staticly, just needs to be commented out in topbar.svelte: Show 'px' width/height of stage next to rwd-navi.
- [task] Switch from md to mdx.
- [feature] Set stagesize values for "mobile, tablet, desktop" inside garden.config.js. Option: Set list of custom values like iPhone 13,14,15, iPad, Samsung Galaxy A/Sx or as pixel values in garden.config and show dropdown in Gardenjs instead of icons.
- [task] Integrate Svelte A11y features.
- [feature] Build kickstarter "carrots". Define components for carrots.
- [feature] Measure.
- [feature] Manually change properties via control panel.

<br><br><br><p align="center"><img src="src/client/assets/icons/logo.svg"></p>
