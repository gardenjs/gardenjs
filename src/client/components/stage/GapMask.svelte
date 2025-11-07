<script>
  let { top, left, width, height, childElements } = $props()
</script>

<div
  class="mask"
  style:top="{top}px"
  style:left="{left}px"
  style:width="{width}px"
  style:height="{height}px"
>
  <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
      <mask id="mask">
        <rect y="0" x="0" width="100%" height="100%" fill="white" />
        <!-- Transparente Rechtecke: Schwarz in der Maske = unsichtbar -->
        {#each childElements as child, index (index)}
          <rect
            x="{child.x}px"
            y="{child.y}px"
            width="{child.width}px"
            height="{child.height}px"
            fill="black"
          />
        {/each}
      </mask>
    </defs>
    <rect
      y="0"
      x="0"
      width="100%"
      height="100%"
      fill="hsla(256, 55%, 45%, 0.45)"
      mask="url(#mask)"
    />
    {#each childElements as child, index (index)}
      <rect
        x="{child.x}px"
        y="{child.y}px"
        width="{child.width}px"
        height="{child.height}px"
        fill="hsla(210, 75%, 50%, 0.45)"
      />
    {/each}
  </svg>
</div>

<style>
  .mask {
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  svg {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
