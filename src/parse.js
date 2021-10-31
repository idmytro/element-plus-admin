import Parse from 'parse'

const {
  VUE_APP_PARSE_APP_ID = '',
  VUE_APP_PARSE_JS_KEY,
  VUE_APP_PARSE_SERVER_URL = '',
} = process.env

Parse.initialize(VUE_APP_PARSE_APP_ID, VUE_APP_PARSE_JS_KEY)
Parse.serverURL = VUE_APP_PARSE_SERVER_URL
