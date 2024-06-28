<p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="src/client/assets/icons/logo_neg.svg">
    <img src="src/client/assets/icons/logo.svg">
  </picture
</p>

+++ TEST RELEASE. COMING SOON... +++

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

## The quick and easy alternative

Gardenjs is an open source UI component library explorer for JS frameworks and provides a centralized platform for developers to create, test and present UI components and pages in isolation. Gardenjs promotes modular and reusable code, streamlines collaboration between team members and increases overall productivity. Gardenjs is designed for projects of any size.

Watch the <a href="https://www.gardenjs.org/demo/">demo</a>.

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

HTML snippets are rendered by default. The support of JS frameworks is realized by renderer plugins. There are currently plugins for <a href="https://github.com/gardenjs/render-plugin-svelte" target="_blank">Svelte</a>, <a href="https://github.com/gardenjs/render-plugin-vue" target="_blank">Vue</a> and <a href="https://github.com/gardenjs/render-plugin-react" target="_blank">React</a>. You can also easily create plugins for other frameworks, see the documentation. Contact us, we will be happy to create a repository for your renderer plugin.

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

Gardenjs will continue to be maintained. The extent to which further functions will be integrated depends on the acceptance of Gardenjs.

### Next

- [task] Sidebarnav should be closed by default on devices with a narrow screen.
- [task] Hide the Component code tab in the panel by setting an option in garden.config.js.
- [task] Handle component out in svelte/vue/react.
- [feature] Slot handling.
- [feature] Evaluation of "Make Storybook stories compatible with Garden". (If very complex rather later)
- [task] In das files import component instead of use relative filename as string.
- [task] Check Gardenjs with Next.js and Nuxt.

### Later (no specific order)

- **General features/tasks:**
  - [feature] Use das-files from other modules (e.g. show carrots in custom project).
  - [feature] Collect events and show in panel.
  - [task] Move demo components from core to the renderer plugins.
  - [task] Switch from md to mdx.
  - [feature] Build kickstarter "carrots". Define components for carrots.
  - [feature] Manually change properties via control panel.
  - [feature] On the fly generate examples for whole project / instant project viewer.
- **Tests:**
  - [task] Add tests to code.
  - [feature] Add testing library. E.g. [Testing Library](https://testing-library.com/).
  - [feature] Screenshot tests:
    - Docker image oder alternativ for screenshot test.
    - Automatic create test file & and folder (like init garden).
    - Settings.
- **UX improvements:**
  - [feature] Set the width and height of the stage by entering the size directly.
  - [task] If full mode is active, switching to portrait mode is deactivated.
  - [feature] Vertical dragbar to drag stage horizontical to show rwd behaviour.
  - [task] Add [line numbers plugin](https://github.com/wcoder/highlightjs-line-numbers.js) to highlightjs.
  - [feature] Bookmarks for components. (like ReactCosmos)
  - [feature] Ruler, visualization of margin and padding, spacing etc.
  - [task] Integrate Svelte A11y features.
  - [feature] Add zoom.
  - [feature] Use shortcuts. Control the sidenav via arrow keys instead of tabs.
- **Customization:**
  - [task] Make setting of default mode possible via garden.config.js.
  - [task] Show custom favicon.svg configured in garden.config.js.
  - [feature] Set stagesize values for "mobile, tablet, desktop" inside garden.config.js or next:
  - [feature] Set custom values such as "iPhone 15", "iPad Air", "Galaxy A" or as pixel values in garden.config and display them in a dropdown instead of icons.
  - [task] Color variables are made configurable for own Gardenjs themes.

<br><br><br><p align="center"><img src="src/client/assets/icons/vegetables.svg"></p>
