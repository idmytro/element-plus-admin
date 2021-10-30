<template>
  <div class="sign-in-container">
    <div class="sign-in-form">
      <el-form
        ref="form"
        :model="formValues"
        :rules="formRules"
      >
        <h1 class="sitn-in-title">
          ElementPlus Admin
        </h1>
        <el-form-item prop="username">
          <el-input
            v-model.trim="formValues.username"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.trim="formValues.password"
            type="new-password"
            placeholder="请输入密码"
            @keyup.enter="handleSignIn"
          />
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        :loading="isLoading"
        class="sign-in-btn"
        @click.stop="handleSignIn"
      >
        {{ i18n.t(`action.signIn`) }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  unref,
  computed,
  reactive,
  defineComponent,
} from 'vue'
import { createNamespacedHelpers } from 'vuex'
import Parse from 'parse'
import { useEnhancer } from '@/enhancers'

const { mapState, mapMutations } = createNamespacedHelpers('user')

async function logIn (name: string, pass: string) {
  // Create a new instance of the user class
  const user = await Parse.User
    .logIn(name, pass)
    .then(function (user) {
      console.log('User logged in successful with name: ' + user.get('username') + ' and email: ' + user.get('email'))
      return user.get('username')
    })
    .catch(function (error) {
      console.log('Error: ' + error.code + ' ' + error.message)
    })

  return user
}

export default defineComponent({
  name: 'SignIn',

  setup () {
    const {
      i18n,
      route,
      router,
    } = useEnhancer()

    const form = ref(null)
    const isLoading = ref(false)

    const formValues = reactive({
      username: '',
      password: '',
    })
    const formRules = reactive({
      username: { required: true, message: '请填写用户名', trigger: ['blur', 'change'] },
      password: { required: true, message: '请填写密码', trigger: ['blur', 'change'] },
    })

    const redirect = computed(() => route.query && route.query.redirect)

    // const handleSignIn = () => {
    //   console.log('handleSignIn')
    //   const formValidator = unref(form)

    //   // @ts-expect-error TODO
    //   formValidator.validate((valid: boolean) => {
    //     if (!valid) return false
    //     isLoading.value = true
    //     router.push(redirect.value || '/')
    //     isLoading.value = false
    //   })
    // }

    return {
      i18n,
      form, // Must return
      isLoading,
      formValues,
      formRules,
      // handleSignIn,
    }
  },

  computed: {
    ...mapState(['userName']),
  },

  watch: {
    userName: {
      immediate: true,
      handler (v) {
        console.log('user W', v)
        if (v) this.$router.push('/')
      },
    },
  },

  methods: {
    ...mapMutations(['setUserName']),
    async handleSignIn () {
      const { username, password } = this.formValues
      console.log('handleSignIn 2', username, password)
      const res = await logIn(username, password)
      console.log('res', res)
      if (res) {
        this.setUserName(res)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.sign-in-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .sign-in-form {
    position: relative;
    padding: 15px;
    width: 100%;
    max-width: 460px;
  }

  .sitn-in-title {
    position: relative;
    margin-bottom: 30px;
    text-align: center;
    font-size: 32px;
  }

  .sign-in-btn {
    position: relative;
    width: 100%;
    margin-top: 10px;
    letter-spacing: 10px;
    font-size: 20px;
  }
}
</style>
