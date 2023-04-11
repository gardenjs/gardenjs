<script>
  import hljs from 'highlight.js'

  export let das

  $: {
    if (das) {
      setTimeout(() => {
        hljs.highlightAll();
      }, 400)
    }
  }
</script>

<style>
/*!
  Theme: GitHub
  Description: Light theme as seen on github.com
  Author: github.com
  Maintainer: @Hirse
  Updated: 2021-05-15

  Outdated base version: https://github.com/primer/github-syntax-light
  Current colors taken from GitHub's CSS
*/

:global(.hljs) {
  color: #24292e;
  background: #ffffff;
}

:global(.hljs-doctag),
:global(.hljs-keyword),
:global(.hljs-meta .hljs-keyword),
:global(.hljs-template-tag),
:global(.hljs-template-variable),
:global(.hljs-type),
:global(.hljs-variable.language_) {
  /* prettylights-syntax-keyword */
  color: #d73a49;
}

:global(.hljs-title),
:global(.hljs-title.class_),
:global(.hljs-title.class_.inherited__),
:global(.hljs-title.function_) {
  /* prettylights-syntax-entity */
  color: #6f42c1;
}

:global(.hljs-attr),
:global(.hljs-attribute),
:global(.hljs-literal),
:global(.hljs-meta),
:global(.hljs-number),
:global(.hljs-operator),
:global(.hljs-variable),
:global(.hljs-selector-attr),
:global(.hljs-selector-class),
:global(.hljs-selector-id) {
  /* prettylights-syntax-constant */
  color: #005cc5;
}

:global(.hljs-regexp),
:global(.hljs-string),
:global(.hljs-meta .hljs-string) {
  /* prettylights-syntax-string */
  color: #032f62;
}

:global(.hljs-built_in),
:global(.hljs-symbol) {
  /* prettylights-syntax-variable */
  color: #e36209;
}

:global(.hljs-comment),
:global(.hljs-code),
:global(.hljs-formula) {
  /* prettylights-syntax-comment */
  color: #6a737d;
}

:global(.hljs-name),
:global(.hljs-quote),
:global(.hljs-selector-tag),
:global(.hljs-selector-pseudo) {
  /* prettylights-syntax-entity-tag */
  color: #22863a;
}

:global(.hljs-subst) {
  /* prettylights-syntax-storage-modifier-import */
  color: #24292e;
}

:global(.hljs-section) {
  /* prettylights-syntax-markup-heading */
  color: #005cc5;
  font-weight: bold;
}

:global(.hljs-bullet) {
  /* prettylights-syntax-markup-list */
  color: #735c0f;
}

:global(.hljs-emphasis) {
  /* prettylights-syntax-markup-italic */
  color: #24292e;
  font-style: italic;
}

:global(.hljs-strong) {
  /* prettylights-syntax-markup-bold */
  color: #24292e;
  font-weight: bold;
}

:global(.hljs-addition) {
  /* prettylights-syntax-markup-inserted */
  color: #22863a;
  background-color: #f0fff4;
}

:global(.hljs-deletion) {
  /* prettylights-syntax-markup-deleted */
  color: #b31d28;
  background-color: #ffeef0;
}

:global(.hljs-char.escape_),
:global(.hljs-link),
:global(.hljs-params),
:global(.hljs-property),
:global(.hljs-punctuation),
:global(.hljs-tag) {
  /* purposely ignored */
}

/*!
  Theme: GitHub Dark
  Description: Dark theme as seen on github.com
  Author: github.com
  Maintainer: @Hirse
  Updated: 2021-05-15

  Outdated base version: https://github.com/primer/github-syntax-dark
  Current colors taken from GitHub's CSS
*/

:global(.dark .hljs) {
  color: #c9d1d9;
  background: #0d1117;
}

:global(.dark .hljs-doctag),
:global(.dark .hljs-keyword),
:global(.dark .hljs-meta .hljs-keyword),
:global(.dark .hljs-template-tag),
:global(.dark .hljs-template-variable),
:global(.dark .hljs-type),
:global(.dark .hljs-variable.language_) {
  /* prettylights-syntax-keyword */
  color: #ff7b72;
}

:global(.dark .hljs-title),
:global(.dark .hljs-title.class_),
:global(.dark .hljs-title.class_.inherited__),
:global(.dark .hljs-title.function_) {
  /* prettylights-syntax-entity */
  color: #d2a8ff;
}

:global(.dark .hljs-attr),
:global(.dark .hljs-attribute),
:global(.dark .hljs-literal),
:global(.dark .hljs-meta),
:global(.dark .hljs-number),
:global(.dark .hljs-operator),
:global(.dark .hljs-variable),
:global(.dark .hljs-selector-attr),
:global(.dark .hljs-selector-class),
:global(.dark .hljs-selector-id) {
  /* prettylights-syntax-constant */
  color: #79c0ff;
}

:global(.dark .hljs-regexp),
:global(.dark .hljs-string),
:global(.dark .hljs-meta .hljs-string) {
  /* prettylights-syntax-string */
  color: #a5d6ff;
}

:global(.dark .hljs-built_in),
:global(.dark .hljs-symbol) {
  /* prettylights-syntax-variable */
  color: #ffa657;
}

:global(.dark .hljs-comment),
:global(.dark .hljs-code),
:global(.dark .hljs-formula) {
  /* prettylights-syntax-comment */
  color: #8b949e;
}

:global(.dark .hljs-name),
:global(.dark .hljs-quote),
:global(.dark .hljs-selector-tag),
:global(.dark .hljs-selector-pseudo) {
  /* prettylights-syntax-entity-tag */
  color: #7ee787;
}

:global(.dark .hljs-subst){
  /* prettylights-syntax-storage-modifier-import */
  color: #c9d1d9;
}

:global(.dark .hljs-section) {
  /* prettylights-syntax-markup-heading */
  color: #1f6feb;
  font-weight: bold;
}

:global(.dark .hljs-bullet) {
  /* prettylights-syntax-markup-list */
  color: #f2cc60;
}

:global(.dark .hljs-emphasis) {
  /* prettylights-syntax-markup-italic */
  color: #c9d1d9;
  font-style: italic;
}

:global(.dark .hljs-strong) {
  /* prettylights-syntax-markup-bold */
  color: #c9d1d9;
  font-weight: bold;
}

:global(.dark .hljs-addition) {
  /* prettylights-syntax-markup-inserted */
  color: #aff5b4;
  background-color: #033a16;
}

:global(.dark .hljs-deletion) {
  /* prettylights-syntax-markup-deleted */
  color: #ffdcd7;
  background-color: #67060c;
}

:global(.dark .hljs-char.escape_),
:global(.dark .hljs-link),
:global(.dark .hljs-params),
:global(.dark .hljs-property),
:global(.dark .hljs-punctuation),
:global(.dark .hljs-tag) {
  /* purposely ignored */
}
</style>
