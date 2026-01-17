<script lang="ts">
  let {
    value,
    onChange,
  }: { value: boolean; onChange: (value: boolean) => void } = $props()
</script>

<input
  type="checkbox"
  checked={value === true}
  onchange={(e) => {
    onChange((e.currentTarget as HTMLInputElement).checked)
  }}
/>

<style lang="scss">
  input {
    border: 1px solid var(--c-basic-150);
    background: var(--c-basic-0);
    color: var(--c-basic-800);
  }
  @supports (appearance: none) {
    input[type='checkbox'] {
      appearance: none;
      position: relative;
      display: inline-block;
      margin: 0;
      padding: 0;
      height: 1.25rem;
      vertical-align: top;
      outline: none;
      border: 1px solid var(--c-primary);
      border-radius: 1.125rem;
      transition:
        background 0.3s,
        border-color 0.3s,
        box-shadow 0.2s;
      cursor: pointer;
      &:after {
        position: absolute;
        display: block;
        content: '';
        left: 0;
        top: 0;
      }
      &:checked {
        background-color: var(--c-primary);
        border: 1px solid var(--c-primary);
      }
      &:disabled {
        background-color: var(--c-text);
        cursor: not-allowed;
        opacity: 0.4;
        &:checked {
          background-color: var(--c-text);
          border-color: var(--c-text);
        }
        & + label {
          cursor: not-allowed;
        }
      }
      &:hover {
        &:not(:checked) {
          &:not(:disabled) {
            border-color: var(--c-primary);
          }
        }
      }
      // &:focus {
      //   box-shadow: 0 0 0 .031rem var(--c-primary);
      // }
      & + label {
        line-height: 1.25rem;
        display: inline-block;
        vertical-align: top;
        padding-left: 0.25rem;
      }
      width: 1.25rem;
      &:after {
        opacity: var(--o, 0);
      }
      &:checked {
        --o: 1;
      }
    }
    input[type='checkbox'] {
      border-radius: 0;
      &:after {
        width: 0.313rem;
        height: 0.563rem;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        left: 0.35rem;
        top: 0.2rem;
        transform: rotate(43deg);
        opacity: var(--o, 0);
      }
      &:checked {
        --o: 1;
      }
    }
  }
</style>
