<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-light">
        <div class="container">
            <router-link to="/">
              <img 
                alt="Bitbuddy" 
                src="../assets/logo-orange.png"
                class="navbar-brand"
              >
            </router-link>
            <button 
                class="navbar-toggler" 
                type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarNavAltMarkup" 
                aria-controls="navbarNavAltMarkup" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link class="nav-link" to="/">Home</router-link>
                    <router-link class="nav-link" to="/about">About</router-link></div>
                </div>
            </div>
    </nav>
</template>

<style lang="scss">
nav {
  padding: 30px;
    
  a {
    color: #2c3e50;
    &.router-link-exact-active {
      color: #efefef;;
    }
  }
  img {
    max-height: 60px;
  }
}
</style>