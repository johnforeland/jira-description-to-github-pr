import { GithubConnector } from './github-connector'

import * as core from '@actions/core'
import { JiraConnector } from './jira-connector'

const jiraConnector = new JiraConnector()
jiraConnector.getTicketData()

const githubConnector = new GithubConnector()
githubConnector.jira_issue = jiraConnector.jira_issue
githubConnector.jira_ticket_url = jiraConnector.ticket_url
githubConnector.updateDescription()
