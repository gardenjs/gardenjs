<script>
  import {marked} from 'marked'
  import hljs from 'highlight.js'

  export let das
  $: {
    if (das) {
      console.log('DEBUG', 'highlight js' )
      setTimeout(() => {
      hljs.highlightAll();
      }, 800)
    }
  }
</script>
<div class="markdown-body">
  {@html marked(das.descriptionfile || das.description)}
</div>

<style>
.markdown-body {
  --color-prettylights-syntax-comment: #6e7781;
  --color-prettylights-syntax-constant: #0550ae;
  --color-prettylights-syntax-entity: #8250df;
  --color-prettylights-syntax-storage-modifier-import: #24292f;
  --color-prettylights-syntax-entity-tag: #116329;
  --color-prettylights-syntax-keyword: #cf222e;
  --color-prettylights-syntax-string: #0a3069;
  --color-prettylights-syntax-variable: #953800;
  --color-prettylights-syntax-brackethighlighter-unmatched: #82071e;
  --color-prettylights-syntax-invalid-illegal-text: #f6f8fa;
  --color-prettylights-syntax-invalid-illegal-bg: #82071e;
  --color-prettylights-syntax-carriage-return-text: #f6f8fa;
  --color-prettylights-syntax-carriage-return-bg: #cf222e;
  --color-prettylights-syntax-string-regexp: #116329;
  --color-prettylights-syntax-markup-list: #3b2300;
  --color-prettylights-syntax-markup-heading: #0550ae;
  --color-prettylights-syntax-markup-italic: #24292f;
  --color-prettylights-syntax-markup-bold: #24292f;
  --color-prettylights-syntax-markup-deleted-text: #82071e;
  --color-prettylights-syntax-markup-deleted-bg: #ffebe9;
  --color-prettylights-syntax-markup-inserted-text: #116329;
  --color-prettylights-syntax-markup-inserted-bg: #dafbe1;
  --color-prettylights-syntax-markup-changed-text: #953800;
  --color-prettylights-syntax-markup-changed-bg: #ffd8b5;
  --color-prettylights-syntax-markup-ignored-text: #eaeef2;
  --color-prettylights-syntax-markup-ignored-bg: #0550ae;
  --color-prettylights-syntax-meta-diff-range: #8250df;
  --color-prettylights-syntax-brackethighlighter-angle: #57606a;
  --color-prettylights-syntax-sublimelinter-gutter-mark: #8c959f;
  --color-prettylights-syntax-constant-other-reference-link: #0a3069;
  --color-fg-default: #24292f;
  --color-fg-muted: #57606a;
  --color-fg-subtle: #6e7781;
  --color-canvas-default: #ffffff;
  --color-canvas-subtle: #f6f8fa;
  --color-border-default: #d0d7de;
  --color-border-muted: hsla(210,18%,87%,1);
  --color-neutral-muted: rgba(175,184,193,0.2);
  --color-accent-fg: #0969da;
  --color-accent-emphasis: #0969da;
  --color-attention-subtle: #fff8c5;
  --color-danger-fg: #cf222e;
}

.dark .markdown-body {
  --color-prettylights-syntax-comment: #8b949e;
  --color-prettylights-syntax-constant: #79c0ff;
  --color-prettylights-syntax-entity: #d2a8ff;
  --color-prettylights-syntax-storage-modifier-import: #c9d1d9;
  --color-prettylights-syntax-entity-tag: #7ee787;
  --color-prettylights-syntax-keyword: #ff7b72;
  --color-prettylights-syntax-string: #a5d6ff;
  --color-prettylights-syntax-variable: #ffa657;
  --color-prettylights-syntax-brackethighlighter-unmatched: #f85149;
  --color-prettylights-syntax-invalid-illegal-text: #f0f6fc;
  --color-prettylights-syntax-invalid-illegal-bg: #8e1519;
  --color-prettylights-syntax-carriage-return-text: #f0f6fc;
  --color-prettylights-syntax-carriage-return-bg: #b62324;
  --color-prettylights-syntax-string-regexp: #7ee787;
  --color-prettylights-syntax-markup-list: #f2cc60;
  --color-prettylights-syntax-markup-heading: #1f6feb;
  --color-prettylights-syntax-markup-italic: #c9d1d9;
  --color-prettylights-syntax-markup-bold: #c9d1d9;
  --color-prettylights-syntax-markup-deleted-text: #ffdcd7;
  --color-prettylights-syntax-markup-deleted-bg: #67060c;
  --color-prettylights-syntax-markup-inserted-text: #aff5b4;
  --color-prettylights-syntax-markup-inserted-bg: #033a16;
  --color-prettylights-syntax-markup-changed-text: #ffdfb6;
  --color-prettylights-syntax-markup-changed-bg: #5a1e02;
  --color-prettylights-syntax-markup-ignored-text: #c9d1d9;
  --color-prettylights-syntax-markup-ignored-bg: #1158c7;
  --color-prettylights-syntax-meta-diff-range: #d2a8ff;
  --color-prettylights-syntax-brackethighlighter-angle: #8b949e;
  --color-prettylights-syntax-sublimelinter-gutter-mark: #484f58;
  --color-prettylights-syntax-constant-other-reference-link: #a5d6ff;
  --color-fg-default: #c9d1d9;
  --color-fg-muted: #8b949e;
  --color-fg-subtle: #6e7681;
  --color-canvas-default: #0d1117;
  --color-canvas-subtle: #161b22;
  --color-border-default: #30363d;
  --color-border-muted: #21262d;
  --color-neutral-muted: rgba(110,118,129,0.4);
  --color-accent-fg: #58a6ff;
  --color-accent-emphasis: #1f6feb;
  --color-attention-subtle: rgba(187,128,9,0.15);
  --color-danger-fg: #f85149;
}

.markdown-body {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  width: 100%;
  max-width: 830px;
  color: var(--color-fg-default);
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}

.markdown-body :global(details),
.markdown-body :global(figcaption),
.markdown-body :global(figure ){
  display: block;
}

.markdown-body :global(summary ){
  display: list-item;
}

.markdown-body :global([hidden] ){
  display: none !important;
}

.markdown-body :global(a ){
  background-color: transparent;
  color: var(--color-accent-fg);
  text-decoration: none;
}

.markdown-body :global(abbr[title] ){
  border-bottom: none;
  text-decoration: underline dotted;
}

.markdown-body :global(b),
.markdown-body :global(strong ){
  font-weight: var(--base-text-weight-semibold, 600);
}

.markdown-body :global(dfn ){
  font-style: italic;
}

.markdown-body :global(h1 ){
  margin: .67em 0;
  font-weight: var(--base-text-weight-semibold, 600);
  padding-bottom: .3em;
  font-size: 2em;
  border-bottom: 1px solid var(--color-border-muted);
}

.markdown-body :global(mark ){
  background-color: var(--color-attention-subtle);
  color: var(--color-fg-default);
}

.markdown-body :global(small ){
  font-size: 90%;
}

.markdown-body :global(sub),
.markdown-body :global(sup ){
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

.markdown-body :global(sub ){
  bottom: -0.25em;
}

.markdown-body :global(sup ){
  top: -0.5em;
}

.markdown-body :global(img ){
  border-style: none;
  max-width: 100%;
  box-sizing: content-box;
  background-color: var(--color-canvas-default);
}

.markdown-body :global(code),
.markdown-body :global(kbd),
.markdown-body :global(pre),
.markdown-body :global(samp ){
  font-family: monospace;
  font-size: 1em;
}

.markdown-body :global(figure ){
  margin: 1em 40px;
}

.markdown-body :global(hr ){
  box-sizing: content-box;
  overflow: hidden;
  background: transparent;
  border-bottom: 1px solid var(--color-border-muted);
  height: .25em;
  padding: 0;
  margin: 24px 0;
  background-color: var(--color-border-default);
  border: 0;
}

.markdown-body :global(input ){
  font: inherit;
  margin: 0;
  overflow: visible;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

.markdown-body :global([type=button]),
.markdown-body :global([type=reset]),
.markdown-body :global([type=submit] ){
  -webkit-appearance: button;
}

.markdown-body :global([type=checkbox]),
.markdown-body :global([type=radio] ){
  box-sizing: border-box;
  padding: 0;
}

.markdown-body :global([type=number]::-webkit-inner-spin-button),
.markdown-body :global([type=number]::-webkit-outer-spin-button ){
  height: auto;
}

.markdown-body :global([type=search]::-webkit-search-cancel-button),
.markdown-body :global([type=search]::-webkit-search-decoration ){
  -webkit-appearance: none;
}

.markdown-body :global(::-webkit-input-placeholder ){
  color: inherit;
  opacity: .54;
}

.markdown-body :global(::-webkit-file-upload-button ){
  -webkit-appearance: button;
  font: inherit;
}

.markdown-body :global(a:hover ){
  text-decoration: underline;
}

.markdown-body :global(::placeholder ){
  color: var(--color-fg-subtle);
  opacity: 1;
}

.markdown-body :global(hr::before ){
  display: table;
  content: "";
}

.markdown-body :global(hr::after ){
  display: table;
  clear: both;
  content: "";
}

.markdown-body :global(table ){
  border-spacing: 0;
  border-collapse: collapse;
  display: block;
  width: max-content;
  max-width: 100%;
  overflow: auto;
}

.markdown-body :global(td),
.markdown-body :global(th ){
  padding: 0;
}

.markdown-body :global(details summary ){
  cursor: pointer;
}

.markdown-body :global(details:not([open])>*:not(summary) ){
  display: none !important;
}

.markdown-body :global(a:focus),
.markdown-body :global([role=button]:focus),
.markdown-body :global(input[type=radio]:focus),
.markdown-body :global(input[type=checkbox]:focus ){
  outline: 2px solid var(--color-accent-fg);
  outline-offset: -2px;
  box-shadow: none;
}

.markdown-body :global(a:focus:not(:focus-visible)),
.markdown-body :global([role=button]:focus:not(:focus-visible)),
.markdown-body :global(input[type=radio]:focus:not(:focus-visible)),
.markdown-body :global(input[type=checkbox]:focus:not(:focus-visible) ){
  outline: solid 1px transparent;
}

.markdown-body :global(a:focus-visible),
.markdown-body :global([role=button]:focus-visible),
.markdown-body :global(input[type=radio]:focus-visible),
.markdown-body :global(input[type=checkbox]:focus-visible ){
  outline: 2px solid var(--color-accent-fg);
  outline-offset: -2px;
  box-shadow: none;
}

.markdown-body :global(a:not([class]):focus),
.markdown-body :global(a:not([class]):focus-visible),
.markdown-body :global(input[type=radio]:focus),
.markdown-body :global(input[type=radio]:focus-visible),
.markdown-body :global(input[type=checkbox]:focus),
.markdown-body :global(input[type=checkbox]:focus-visible ){
  outline-offset: 0;
}

.markdown-body :global(kbd ){
  display: inline-block;
  padding: 3px 5px;
  font: 11px ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
  line-height: 10px;
  color: var(--color-fg-default);
  vertical-align: middle;
  background-color: var(--color-canvas-subtle);
  border: solid 1px var(--color-neutral-muted);
  border-bottom-color: var(--color-neutral-muted);
  border-radius: 6px;
  box-shadow: inset 0 -1px 0 var(--color-neutral-muted);
}

.markdown-body :global(h1),
.markdown-body :global(h2),
.markdown-body :global(h3),
.markdown-body :global(h4),
.markdown-body :global(h5),
.markdown-body :global(h6 ){
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: var(--base-text-weight-semibold, 600);
  line-height: 1.25;
}

.markdown-body :global(h2 ){
  font-weight: var(--base-text-weight-semibold, 600);
  padding-bottom: .3em;
  font-size: 1.5em;
  border-bottom: 1px solid var(--color-border-muted);
}

.markdown-body :global(h3 ){
  font-weight: var(--base-text-weight-semibold, 600);
  font-size: 1.25em;
}

.markdown-body :global(h4 ){
  font-weight: var(--base-text-weight-semibold, 600);
  font-size: 1em;
}

.markdown-body :global(h5 ){
  font-weight: var(--base-text-weight-semibold, 600);
  font-size: .875em;
}

.markdown-body :global(h6 ){
  font-weight: var(--base-text-weight-semibold, 600);
  font-size: .85em;
  color: var(--color-fg-muted);
}

.markdown-body :global(p ){
  margin-top: 0;
  margin-bottom: 10px;
}

.markdown-body :global(blockquote ){
  margin: 0;
  padding: 0 1em;
  color: var(--color-fg-muted);
  border-left: .25em solid var(--color-border-default);
}

.markdown-body :global(ul),
.markdown-body :global(ol ){
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 2em;
}

.markdown-body :global(ol ol),
.markdown-body :global(ul ol ){
  list-style-type: lower-roman;
}

.markdown-body :global(ul ul ol),
.markdown-body :global(ul ol ol),
.markdown-body :global(ol ul ol),
.markdown-body :global(ol ol ol ){
  list-style-type: lower-alpha;
}

.markdown-body :global(dd ){
  margin-left: 0;
}

.markdown-body tt,
.markdown-body :global(code),
.markdown-body :global(samp ){
  font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
  font-size: 12px;
}

.markdown-body :global(pre ){
  margin-top: 0;
  margin-bottom: 0;
  font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
  font-size: 12px;
  word-wrap: normal;
}

.markdown-body :global(input::-webkit-outer-spin-button),
.markdown-body :global(input::-webkit-inner-spin-button ){
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
}

.markdown-body::before :global(){
  display: table;
  content: "";
}

.markdown-body::after :global(){
  display: table;
  clear: both;
  content: "";
}

.markdown-body>*:first-child :global(){
  margin-top: 0 !important;
}

.markdown-body>*:last-child :global(){
  margin-bottom: 0 !important;
}

.markdown-body :global(a:not([href]) ){
  color: inherit;
  text-decoration: none;
}

.markdown-body :global(p),
.markdown-body :global(blockquote),
.markdown-body :global(ul),
.markdown-body :global(ol),
.markdown-body :global(dl),
.markdown-body :global(table),
.markdown-body :global(pre),
.markdown-body :global(details ){
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-body :global(blockquote>:first-child ){
  margin-top: 0;
}

.markdown-body :global(blockquote>:last-child ){
  margin-bottom: 0;
}

.markdown-body :global(h1 tt),
.markdown-body :global(h1 code),
.markdown-body :global(h2 tt),
.markdown-body :global(h2 code),
.markdown-body :global(h3 tt),
.markdown-body :global(h3 code),
.markdown-body :global(h4 tt),
.markdown-body :global(h4 code),
.markdown-body :global(h5 tt),
.markdown-body :global(h5 code),
.markdown-body :global(h6 tt),
.markdown-body :global(h6 code ){
  padding: 0 .2em;
  font-size: inherit;
}

.markdown-body :global(summary h1),
.markdown-body :global(summary h2),
.markdown-body :global(summary h3),
.markdown-body :global(summary h4),
.markdown-body :global(summary h5),
.markdown-body :global(summary h6 ){
  display: inline-block;
}

.markdown-body :global(summary h1),
.markdown-body :global(summary h2 ){
  padding-bottom: 0;
  border-bottom: 0;
}

.markdown-body :global(ul.no-list),
.markdown-body :global(ol.no-list ){
  padding: 0;
  list-style-type: none;
}

.markdown-body :global(ol[type=a] ){
  list-style-type: lower-alpha;
}

.markdown-body :global(ol[type=A] ){
  list-style-type: upper-alpha;
}

.markdown-body :global(ol[type=i] ){
  list-style-type: lower-roman;
}

.markdown-body :global(ol[type=I] ){
  list-style-type: upper-roman;
}

.markdown-body :global(ol[type="1"] ){
  list-style-type: decimal;
}

.markdown-body :global(div>ol:not([type]) ){
  list-style-type: decimal;
}

.markdown-body :global(ul ul),
.markdown-body :global(ul ol),
.markdown-body :global(ol ol),
.markdown-body :global(ol ul ){
  margin-top: 0;
  margin-bottom: 0;
}

.markdown-body :global(li>p ){
  margin-top: 16px;
}

.markdown-body :global(li+li ){
  margin-top: .25em;
}

.markdown-body :global(dl ){
  padding: 0;
}

.markdown-body :global(dl dt ){
  padding: 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: var(--base-text-weight-semibold, 600);
}

.markdown-body :global(dl dd ){
  padding: 0 16px;
  margin-bottom: 16px;
}

.markdown-body :global(table th ){
  font-weight: var(--base-text-weight-semibold, 600);
}

.markdown-body :global(table th),
.markdown-body :global(table td ){
  padding: 6px 13px;
  border: 1px solid var(--color-border-default);
}

.markdown-body :global(table tr ){
  background-color: var(--color-canvas-default);
  border-top: 1px solid var(--color-border-muted);
}

.markdown-body :global(table tr:nth-child(2n) ){
  background-color: var(--color-canvas-subtle);
}

.markdown-body :global(table img ){
  background-color: transparent;
}

.markdown-body :global(img[align=right] ){
  padding-left: 20px;
}

.markdown-body :global(img[align=left] ){
  padding-right: 20px;
}

.markdown-body :global(code),
.markdown-body :global(tt ){
  padding: .2em .4em;
  margin: 0;
  font-size: 85%;
  white-space: break-spaces;
  background-color: var(--color-neutral-muted);
  border-radius: 6px;
}

.markdown-body :global(code br),
.markdown-body :global(tt br ){
  display: none;
}

.markdown-body :global(del code ){
  text-decoration: inherit;
}

.markdown-body :global(samp ){
  font-size: 85%;
}

.markdown-body :global(pre code ){
  font-size: 100%;
}

.markdown-body :global(pre>code ){
  padding: 0;
  margin: 0;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}

.markdown-body :global(pre ){
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: var(--color-canvas-subtle);
  border-radius: 6px;
}

.markdown-body :global(pre code),
.markdown-body :global(pre tt ){
  display: inline;
  max-width: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}

.markdown-body :global(::-webkit-calendar-picker-indicator ){
  filter: invert(50%);
}
</style>
