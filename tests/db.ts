import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { Group } from '@japa/runner/core'

export { test } from '@japa/runner'

export const group = (groupTitle: string, callback: (group: Group) => void) => {
  return test.group(groupTitle, (g) => {
    g.each.setup(() => testUtils.db().truncate())
    return callback(g)
  })
}
