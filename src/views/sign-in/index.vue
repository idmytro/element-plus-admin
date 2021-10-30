<template>
  <div class="sign-in-container">
    <div class="sign-in-form">
      <el-form
        ref="form"
        :model="formValues"
        :rules="formRules"
      >
        <h1 class="sitn-in-title">
          {{ $title }}
        </h1>
        <el-form-item prop="email">
          <el-input
            v-model.trim="formValues.email"
            placeholder="email"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.trim="formValues.password"
            placeholder="пароль"
            show-password
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
        Войти
      </el-button>
    </div>
  </div>
</template>

<script>
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

async function logIn (name, pass) {
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

const validateEmail0 = (value = '') => {
  return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))
}

const validateEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Введите email'))
  } else if (!validateEmail0(value)) {
    callback(new Error('Введите валидный email'))
  } else {
    callback()
  }
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
      email: '',
      password: '',
    })
    const formRules = {
      email: [{ validator: validateEmail, trigger: ['blur', 'change'] }],
      password: { required: true, message: 'Введите пароль', trigger: ['blur', 'change'] },
    }

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
    title () {
      return process.env.VUE_APP_TITLE || ''
    },
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

  created () {
    console.log('/', this.userName)
  },

  methods: {
    ...mapMutations(['setUserName']),
    async handleSignIn () {
      const { email, password } = this.formValues
      console.log('handleSignIn 2', email, password)
      const res = await logIn(email, password)
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
    // letter-spacing: 10px;
    font-size: 20px;
  }
}
</style>
