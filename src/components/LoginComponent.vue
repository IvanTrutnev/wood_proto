<template>
    <div class="container">
        <form @submit.prevent>
            <div>
                <label class="type__label">Login</label>
                <input class="form-control" v-model="credentials.username"
                       placeholder="Enter login">
            </div>
            <div>
                <label class="type__label">Password</label>
                <input class="form-control" type="password" v-model="credentials.password"
                       placeholder="Enter password">
            </div>
            <button @click="login" class="login-btn">
                Login
            </button>
        </form>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          credentials: {
            username: '',
            password: ''
          },
          loggingIn: false,
          error: ''
        }
      },
      methods: {
        login() {
          this.loggingIn = true;
          const credentials = {
            username: this.credentials.username,
            password: this.credentials.password
          };
          console.log(credentials);
          this.$auth.login(credentials, 'orders').then((response) => {
            this.loggingIn = false;
            this.error = utils.getError(response)
          })
        }
      }
    }
</script>

<style scoped>
    .login-btn {
        margin-top: 20px;
    }
</style>