<div class="top-bottom">
  <slot name="top" />
  <slot name="bottom" />
</div>

<style>
.top-bottom {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
</style>