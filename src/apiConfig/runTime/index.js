const runTime = {
  dev: () => {
    // return `//localhost:8502/distribution-agent-mng`
    // return `//localhost:9527/dev-api`
    return `//172.16.200.132:8502`
  },
  test: () => {
    return ``
  },
  prod: () => {
    return ``
  }
}

export default runTime
