/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Parse from 'parse'
import '@/parse.js'

export default async function (userName) {
  if (!userName) return false

  const userQuery = new Parse.Query(Parse.User)
  userQuery.equalTo('username', userName)
  const user = await userQuery.first()
  if (!user) return false

  const query = new Parse.Query(Parse.Role)
  query.equalTo('name', 'superUser')
  query.equalTo('users', user)
  const result = await query.first().then(res => !!res)

  return result
}
