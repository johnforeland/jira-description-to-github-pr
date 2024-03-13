import { GithubConnector } from './github-connector'
import { JiraConnector } from './jira-connector'

export async function run() {
  const jiraConnector = new JiraConnector()
  await jiraConnector.getTicketData()

  const githubConnector = new GithubConnector()
  githubConnector.jira_issue = jiraConnector.jira_issue
  githubConnector.jira_ticket_url = jiraConnector.ticket_url
  githubConnector.jira_ticket_id = jiraConnector.ticket_id
  await githubConnector.updateDescription()
}
