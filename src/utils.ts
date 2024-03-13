export function isRunningTest() {
  return process.env.JEST_WORKER_ID !== undefined
}
