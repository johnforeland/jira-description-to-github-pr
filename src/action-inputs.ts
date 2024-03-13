import * as core from '@actions/core'
import { ESource, IActionInputs } from './types'

export const getInputs = (): IActionInputs => {
  const JIRA_TOKEN: string = core.getInput('jira-token', { required: true })
  const JIRA_BASE_URL: string = core.getInput('jira-base-url', { required: true })
  const GITHUB_TOKEN: string = core.getInput('github-token', { required: true })
  const JIRA_TICKET_ID = core.getInput('jira-ticket-id', { required: true })
  return {
    JIRA_TOKEN,
    GITHUB_TOKEN,
    JIRA_TICKET_ID,
    JIRA_BASE_URL: JIRA_BASE_URL.endsWith('/') ? JIRA_BASE_URL.replace(/\/$/, '') : JIRA_BASE_URL
  }
}
