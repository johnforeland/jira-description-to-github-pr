import { getOctokit } from '@actions/github'
import { GithubConnector } from '../src/github-connector'
import { describe } from 'jest-circus'
import { getInputs } from '../src/action-inputs'
import { MOCK_GITHUB_ACTION_INPUT, MOCK_JIRA_ISSUE } from './mocks'

jest.mock('@actions/github', () => {
  const MOCK_CONTEXT = {
    eventName: 'eventName',
    payload: {
      repository: 'repository',
      organization: { login: { owner: 'owner' } },
      pull_request: { title: 'prTitle', number: 1, head: { ref: 'branchName' } }
    }
  }
  return {
    getOctokit: jest.fn(),
    context: MOCK_CONTEXT
  }
})

jest.mock('../src/action-inputs')

describe('GithubConnector()', () => {
  let connector: GithubConnector

  it('initializes GithubConnector() class', () => {
    ;(getInputs as any).mockImplementation(() => MOCK_GITHUB_ACTION_INPUT)
    connector = new GithubConnector()
    expect(getOctokit).toHaveBeenCalledWith(MOCK_GITHUB_ACTION_INPUT.GITHUB_TOKEN)
  })

  it('runs updateDescription()', () => {
    ;(getInputs as any).mockImplementation(() => MOCK_GITHUB_ACTION_INPUT)

    connector.jira_issue = MOCK_JIRA_ISSUE
    connector.jira_ticket_url = 'https://testcompany.atlassian.net/browse/TKP-123'
    connector.updateDescription()
  })
})
