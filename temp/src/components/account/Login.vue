<template>
  <Page class="page" :actionBarHidden="true">
    <FlexboxLayout justifyContent="center" alignItems="center" width="100%" flexDirection="column">
      <StackLayout class="form login-form">
        <StackLayout class="input-field">
          <Label text="Tên đăng nhập" class="label font-weight-bold m-b-5" />
          <TextField
            ref="usernameInput"
            class="input"
            v-model="user.username"
            hint="Tên đăng nhập"
            returnKeyType="next"
            @returnPress="$refs.passwordInput.nativeView.focus()"
          />
          <StackLayout class="hr-light"></StackLayout>
        </StackLayout>
        <StackLayout class="input-field">
          <Label text="Mật khẩu" class="label font-weight-bold m-b-5" />
          <TextField
            ref="passwordInput"
            class="input"
            v-model="user.password"
            :secure="true"
            hint="Mật khẩu"
            returnKeyType="done"
            @returnPress="doLogin"
          />
          <StackLayout class="hr-light"></StackLayout>
        </StackLayout>
        <Button class="btn btn-primary" text="Đăng nhập" @tap="doLogin"></Button>
      </StackLayout>
    </FlexboxLayout>

  </Page>
</template>

<script>
import User from './model/account.js'
import { alert } from 'ui/dialogs'
import AccountService from './services/api-services'
// import * as Toast from 'nativescript-toast'

export default {
  data () {
    return {
      user: new User(),
      accountServices: new AccountService()
    }
  },
  methods: {
    doLogin () {
      this.accountServices.login(this.user).then(response => {
        // Toast.makeText('success').show()
        console.log('success', response)
      })
      .catch(error => {
        // Toast.makeText('error').show()
        console.log('errors', JSON.stringify(error))
      })
    }
  }
}
</script>

<style scoped>
  .hello-world {
    margin: 20;
  }

  Label {
    color: red;
  }
</style>
