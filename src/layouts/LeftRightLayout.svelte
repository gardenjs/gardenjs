<div class="left-right">
  <slot name="left" />
  <slot name="right" />
</div>

<style>
.left-right {
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
</style>