const runTime = {
  dev: () => {
    return `http://box-cps-mng.jumi100.com`
  },
  test: () => {
    return `http://test-cps-mng.jumi100.com`
  },
  prod: () => {
    return ``
  }
}

export default runTime
