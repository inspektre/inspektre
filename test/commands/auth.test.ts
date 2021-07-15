import {expect, test} from '@oclif/test'

describe('auth', () => {
  test
  .stdout()
  .command('auth login')
  .it('runs auth login', ctx => {
    expect(ctx.stdout).to.contain('? Open browser to continue with device activation? (Use arrow keys)')
  })
})
