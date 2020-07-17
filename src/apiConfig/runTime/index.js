const runTime = {
  dev: () => {
    // return `http://box-cps-mng.jumi100.com`
    return `http://localhost:8502`
  },
  test: () => {
    return `http://test-cps-mng.jumi100.com`
  },
  prod: () => {
    return ``
  }
}

export default runTime
