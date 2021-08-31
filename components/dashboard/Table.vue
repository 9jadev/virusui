<template>
  <div class="table-wrapper">
    <table class="table-w" :class="`${className} table-wrapper`">
      <slot></slot>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    className: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.table-w {
  background-color: $white;
  width: 100%;
  min-width: 600px;
  th,
  td {
    padding: 8px 15px;
    font-size: 12px;
    border-bottom: 1px solid #f0f2f3;
    min-width: 40px;
  }

  th {
    &.yellow {
      background-color: $light-yellow;
    }
  }

  td {
    color: $black;
    font-weight: 500;
    &.primary {
      color: $primary;
      font-weight: 500;
    }
    &.right {
      text-align: right;
    }
    &.yellow {
      background-color: $light-yellow;
    }
  }

  tr {
    &.footer {
      background-color: rgba(247, 189, 1, 0.2);
      color: $primary;
      font-weight: bold;
    }
  }
}
</style>

<style lang="scss">
.table-w {
  &.stripe {
    tr {
      &:hover {
        background-color: rgba(242, 242, 242, 1) !important;
        td {
          background-color: rgba(242, 242, 242, 1) !important;
        }
      }
    }
  }
}
</style>
