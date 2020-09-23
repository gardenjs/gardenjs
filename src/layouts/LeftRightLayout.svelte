<div class="wrapper">
  <slot name="left" />
  <slot name="right" />
</div>
<style>
.wrapper {
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

</style>
