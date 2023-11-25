<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div 
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RounterLink
          :to="nav.href"
          active-class="active"
          :class="{ active : isMatch(nav.path)}"
          class="nav-link">
          {{ nav.name }}
        </RounterLink>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo'
export default {
    components: {
        Logo
    },
    data() {
        return {
            navigations : [
                {
                name : 'Search',
                href : '/'
            }, 
            {
                name : 'Movie',
                href: '/movie/:id',
                path: /^\/movie/ // '/movie' 시작
            }, 
            {
                name: 'About',
                href: '/about'
            }
            ]
        }
    },
    methods: {
      isMatch(path) {
        if (!path) return false
        console.log(this.$route)
        return path.test(this.$forceUpdate.fullpath)
      }
    }
}
</script>

<style lang="scss" scoped>
header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    .logo {
        margin-right: 40px;
        
    }
}
</style>