import { context, getOctokit } from '@actions/github'
import { GitHub } from '@actions/github/lib/utils'
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types'
import { getInputs } from './action-inputs'
import { JIRA } from './types'
import { IGithubData, PullRequestParams } from './types'

export class GithubConnector {
  githubData: IGithubData = {} as IGithubData
  octokit: InstanceType<typeof GitHub>

  constructor() {
    const { GITHUB_TOKEN } = getInputs()
    this.octokit = getOctokit(GITHUB_TOKEN)
    this.githubData = this.getGithubData()
  }

  public set jira_issue(jira_issue: JIRA.Issue) {
    this.jira_issue = jira_issue
  }

  public set jira_ticket_url(jira_ticket_url: string) {
    this.jira_ticket_url = jira_ticket_url
  }

  async updateDescription() {
    await this.callout()
  }

  async callout() {
    const { owner, repo, pull_number } = this.githubData
    const body = this.body

    const prData: RestEndpointMethodTypes['pulls']['update']['parameters'] = {
      owner,
      repo,
      pull_number,
      body
    }

    this.octokit.rest.pulls.update(prData)
  }

  get body() {
    return `# Description\n\n### ${this.jira_issue.fields.summary}\n\n ${this.jira_issue.fields.description}\n\n## Jira Ticket\n${this.jira_ticket_url}`
  }

  private getGithubData(): IGithubData {
    const {
      eventName,
      payload: { repository, pull_request: pullRequest }
    } = context

    let owner: IGithubData['owner'] | undefined

    if (context?.payload?.organization) {
      owner = context?.payload?.organization?.login
    } else {
      console.log('Could not find organization, using repository owner instead.')
      owner = context.payload.repository?.owner.login
    }

    if (!owner) {
      throw new Error('Could not find owner.')
    }

    return {
      eventName,
      repo: repository,
      owner,
      pullRequest: pullRequest as PullRequestParams,
      pull_number: pullRequest?.number || 0
    }
  }
}
