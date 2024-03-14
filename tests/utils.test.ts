import { describe } from 'jest-circus'
import { isRunningTest, jiraToMarkdown } from '../src/utils'

describe('isRunningTest() method', () => {
  it('runs isRunningTest()', async () => {
    let res = isRunningTest()
    expect(res).toEqual(true)
  })
})

describe('jiraToMarkdown() method', () => {
  it('tests h1 headers', async () => {
    let res = jiraToMarkdown('h1. hey')
    expect(res).toEqual('# hey')
  })

  it('tests italics', async () => {
    let res = jiraToMarkdown('_Some italic stuff_')
    expect(res).toEqual('*Some italic stuff*')
  })

  it('tests bold', async () => {
    let res = jiraToMarkdown('*Some bold things*')
    expect(res).toEqual('**Some bold things**')
  })

  it('tests undefined', async () => {
    let res = jiraToMarkdown(undefined)
    expect(res).toEqual('')
  })
})
