<template>
  <!-- App container -->
  <div class="container">
    <md-sidenav class="main-sidebar md-left md-fixed" ref="sidenav">
      <md-toolbar class="md-account-header">
        <md-list class="md-transparent">
          <md-list-item class="md-avatar-list">
            <md-avatar class="md-large">
              <img src="https://placeimg.com/64/64/people/8" alt="People">
            </md-avatar>
            <span style="flex: 1"></span>
            <md-avatar>
              <img src="https://placeimg.com/40/40/people/3" alt="People">
            </md-avatar>
            <md-avatar>
              <img src="https://placeimg.com/40/40/people/4" alt="People">
            </md-avatar>
          </md-list-item>
          <md-list-item>
            <div class="md-list-text-container">
              <span>BS-TOOLS</span>
              <span>BS-TOOLS@bs.co.jp</span>
            </div>
            <md-button class="md-icon-button md-list-action">
              <md-icon>arrow_drop_down</md-icon>
            </md-button>
          </md-list-item>
        </md-list>
      </md-toolbar>

      <!-- toogle list -->
      <div class="main-sidebar-links">
        <md-list class="">
          <md-list-item>
            <!-- <md-icon>home</md-icon> -->
            <router-link exact to="/">HOME</router-link>
          </md-list-item>

          <md-list-item>
            <md-icon>whatshot</md-icon>
            <span>とく放題</span>
            <md-list-expand>
              <md-list>
                <md-list-item class="md-inset">
                  <router-link exact to="/FeatureZipsView">TOP特集</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link exact to="/FeatureZipsView">TOP特集</router-link>
                </md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
          <!-- <md-list-item>
            <md-icon>people</md-icon> 
            <router-link exact to="/">NEKO HOME</router-link>
          </md-list-item> -->
          <md-list-item>
            <md-icon>access_time</md-icon>
            <span>INU POST</span>
          </md-list-item>
          <md-list-item>
            <md-icon>delete</md-icon>
            <span>空２</span>
          </md-list-item>
        </md-list>
      </div>
    </md-sidenav>
    <!-- TOP main bar -->
    <md-whiteframe md-elevation="1" class="main-toolbar">
      <md-toolbar class="md-transparent">
        <div class="md-toolbar-container">
          <md-button class="md-icon-button" @click="toggleSidenav()">
            <md-icon>menu</md-icon>
          </md-button>
          <span style="flex: 1"></span>
          <md-button class="md-icon-button">
            <md-icon>search</md-icon>
          </md-button>
          <md-button class="md-icon-button">
            <md-icon>view_module</md-icon>
          </md-button>
        </div>
      </md-toolbar>
    </md-whiteframe>
    <!-- MAIN CONTENT -->
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
export default {
  data () {
    return {
      toolbar: true,
      theme: 'default',
      pageTitle: ''
    }
  },
  methods: {
    toggleSidenav () {
      this.$refs['sidenav'].toggle()
    },
    closeSidenav () {
      this.$refs['sidenav'].close()
    }
  }
}
</script>
<style lang="scss">
/* VueMaterial core scss import */

@import '../node_modules/vue-material/dist/vue-material.css';
@import '../node_modules/vue-material/src/core/stylesheets/core.scss';
// 1281pxの場合は、サイドバー表示
$sizebar-size: 280px;

[v-cloak] {
  display: none;
}

html,
body {
  height: 100%;
  overflow: hidden;
}

body {
  display: flex;
}

.container {
  min-height: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  transition: $swift-ease-out;

  @media (min-width: 1281px) {
    padding-left: $sizebar-size;
  }
}

.main-sidebar.md-sidenav {
  .md-sidenav-content {
    width: $sizebar-size;
    display: flex;
    flex-flow: column;
    overflow: hidden;

    @media (min-width: 1281px) {
      top: 0;
      pointer-events: auto;
      transform: translate3d(0, 0, 0) !important;
      box-shadow: $material-shadow-2dp;
    }
  }

  .md-backdrop {
    @media (min-width: 1281px) {
      opacity: 0;
      pointer-events: none;
    }
  }

  .md-toolbar {
    min-height: 172px;
    border-bottom: 1px solid rgba(#000, .12);
  }

  .vue-material-logo {
    font-size: 24px;

    a {
      width: 100%;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      color: inherit;
      text-decoration: none;

      &:hover {
        color: inherit;
        text-decoration: none;
      }
    }

    img {
      width: 160px;
      margin-bottom: 16px;
    }
  }

  .main-sidebar-links {
    overflow: auto;
    flex: 1;

    .md-inset .md-list-item-container {
      padding-left: 72px;
    }

    .md-list-item-container {
      font-size: 14px;
      font-weight: 500;
    }
  }

  .release-version {
    padding: 8px 8px 8px 16px;
    border-top: 1px solid rgba(#000, .12);
    display: none;

    @media (max-width: 480px) {
      display: block;
    }

    >div {
      justify-content: center;
    }

    .md-select:after {
      color: rgba(#000, .87);
    }
  }
}

.main-content {
  padding: 16px;
  flex: 1;
  overflow: auto;
  background-color: #fff;
  transform: translate3D(0, 0, 0);
  transition: $swift-ease-out;
  transition-delay: .2s;
}

.md-router-enter,
.md-router-leave {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;

  @media (min-width: 1281px) {
    left: $sizebar-size;
  }

  .main-content {
    opacity: 0;
    overflow: hidden;
  }
}

.md-router-leave {
  z-index: 1;
  transition: $swift-ease-in;
  transition-duration: .25s;
}

.md-router-enter {
  z-index: 2;
  transition: $swift-ease-out;

  .main-content {
    transform: translate3D(0, 10%, 0);
  }
}

code {
  &:not(.hljs) {
    margin-left: 1px;
    margin-right: 1px;
    padding: 0 4px;
    display: inline-block;
    border-radius: 2px;
    font-family: "Operator Mono", "Fira Code", Menlo, Hack, "Roboto Mono", "Liberation Mono", Monaco, monospace;

    pre {
      margin: 8px 0;
    }
  }
}

.phone-viewport {
  width: 360px;
  height: 540px;
  margin-right: 16px;
  display: inline-block;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid rgba(#000, .12);
}

.api-table tr>td:first-child {
  white-space: nowrap;
}
</style>
