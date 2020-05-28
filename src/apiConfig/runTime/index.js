const runTime = {
  dev: () => {
    // return `//localhost:8502/distribution-agent-mng`
    // return `//localhost:9527/dev-api`
    return `//172.16.222.215:8502/distribution-agent-mng`
  },
  test: () => {
    return ``
  },
  prod: () => {
    return ``
  }
}

export default runTime
