# Gardenjs

+++ TEST RELEASE, COMING SOON +++

The quick and easy alternative. Watch the <a href="https://www.gardenjs.org/demo/">demo</a>.

<div>
  <a href="https://github.com/gardenjs/gardenjs/blob/main/LICENSE.md">
    <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" data-canonical-src="https://img.shields.io/github/license/gardenjs/gardenjs.svg" style="max-width: 100%;">
  </a>
  <a href="https://www.npmjs.com/package/gardenjs" target="_blank">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/gardenjs?color=blue">
  </a>
  <a href="https://github.com/gardenjs/gardenjs/actions">
    <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/gardenjs/gardenjs/workflow">
  </a>
</div>

## What is Gardenjs?

Gardenjs is an open source JS/Svelte-based UI component library explorer for JS frameworks and provides a centralized platform for developers to create, test and present UI components and pages in isolation. Gardenjs promotes modular and reusable code, streamlines collaboration between team members and increases overall productivity. Gardenjs is designed for projects of any size.

## Why Gardenjs?

- Significantly faster than comparable tools such as Storybook.
- Simple and efficient working.
- Many useful features without being complex and bloated.
- Integration of external libraries within a project.
- Multiple frameworks running in a single instance.
- More flexible and extensive work with decorators and hooks.
- Simply looks good :)

## Getting Started

Please follow the documentation at <a href="https://www.gardenjs.org/docs" target="_blank">gardenjs.org</a>. Happy Gardening!

## Supported Frameworks

HTML snippets are rendered by default. The support of JS frameworks is realized by renderer plugins. There are currently plugins for <a href="https://github.com/gardenjs/render-plugin-svelte" target="_blank">Svelte</a>, <a href="https://github.com/gardenjs/render-plugin-vue" target="_blank">Vue</a> and <a href="https://github.com/gardenjs/render-plugin-react" target="_blank">React</a>. You can also easily create plugins for other frameworks. Contact us, for example we will be happy to create a repository for your renderer plugin.

## Contributing

Gardenjs was developed and is contributed by <a href="https://www.rabbitdevelopment.com" target="_blank">Rabbit Development</a>. We look forward to your feedback, please report any bugs. We also welcome contributions and are happy about sponsoring.

## License

[MIT](https://github.com/gardenjs/gardenjs?tab=MIT-1-ov-file#readme)

Copyright (C) 2020-present, Robin Danzinger & Martin Farkas.

## Todo's up to v1.0

- [task] Alternatively, add logo instead of project-title to the sidebar. Almost done (pull request)...
- [task] Type infos of das in editor.
- [bug] On reload css defect (only problem in ubuntu). Maybe writing issue in gardenjs?
- [docs] Explain garden.vite.config.js.
- [docs] Add renderer to docs.
- [docs] Add decorator to docs.
- [docs] Add hooks to docs.
- [docs] Slot handling workaround.
- [task] Public Gardenjs docs & set Gardenjs repository public.
- [task] Readme: Check links & build badge.
- [task] Public Gardenjs demo of Gardenjs docs & set repository of Gardenjs docs public.
- [task] Public Rabbit Dev website.
- [task] Create Linkedin profil for Rabbit Dev & Gardenjs.

## Roadmap

Gardenjs will continue to be maintained. Further features will also be integrated depending on how well Gardenjs is accepted.

### Next

- [task] Handle component out in svelte/vue/react.
- [feature] Slot handling.
- [feature] Evaluation of "Make Storybook stories compatible with Garden". If relatively easy possible then development. Otherwise prioritize other tasks/features depending on complexity.
- [task] Add tests.
- [task] In das files import component instead of use relative filename as string

### Later (no specific order)

- [feature] Use das-files from other modules (e.g. show carrots in custom project).
- [task] Control the sidenav via arrow keys instead of tabs.
- [task] Alternatively, add logo instead of project-title to the sidebar.
- [task] Hide the Component code tab in the panel by setting an option in garden.config.js.
- [feature] Add testing library. E.g. [Testing Library](https://testing-library.com/).
- [feature] Collect events and show in panel.
- [feature] Bookmarks. (siehe ReactCosmos)
- [task] Add [line numbers plugin](https://github.com/wcoder/highlightjs-line-numbers.js) to highlightjs.
- [task] Sidebarnav is closed by default on narrow display devices.
- [task] Make setting of default mode possible via garden.config.js.
- [task] If full mode is active, switching to portrait mode is deactivated.
- [task] Move demo components from core to the renderer plugins.
- [task] Show custom favicon.svg configured in garden.config.js.
- [task] Color variables are made configurable for Gardenjs themes.
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
- [feature] On the fly generate examples for whole project / instant project viewer.

<br><br><br><p align="center"><img src="src/client/assets/icons/logo.svg"></p>
