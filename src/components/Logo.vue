<template>
  <RouterLink
    to="/"
    class="logo">
    <span>OMDbAPI.com</span>
  </RouterLink>
</template>

<style lang="scss" scoped>
@import "~/scss/main";

.logo {
    font-family: "Oswald", sans-serif;
    font-size: 20px;
    color: $black;
    &:hover {
        color: $black;
    }
    span {
        color: $primary;
    }
}
</style>