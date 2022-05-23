<script>
const defaultClasses = {
  container: '',
  inner: 'rounded-xl text-gray-100 shadow-lg max-w-[320px] p-6 bg-gray-900'
}
export let classes = defaultClasses
</script>

<div class={'game-message fixed z-10 inset-0 flex flex-col items-center content-center ' + (classes.container || defaultClasses.container)}>
  <div class="wrapper m-auto min-w-[200px] ">
    <slot name="before" />
    <div class={'inner m-auto ' + (classes.inner || defaultClasses.inner) }>
      <slot />
    </div>
    <slot name="after" />
  </div>
</div>