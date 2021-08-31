<template>
  <b-button v-bind="$attrs" v-on="$listeners">
    <LoaderSvg v-if="loading" class="icon" />
    <span v-else>
      <slot></slot>
    </span>
  </b-button>
</template>

<script>
import LoaderSvg from '~/assets/svg/loader.svg?inline'

export default {
  components: {
    LoaderSvg,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
