const j2m = require('jira2md')

export function isRunningTest() {
  return process.env.JEST_WORKER_ID !== undefined
}

export function jiraToMarkdown(jiraText: string | undefined) {
  return typeof jiraText == 'string' ? j2m.to_markdown(jiraText) : ''
}
