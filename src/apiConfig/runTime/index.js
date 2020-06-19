const runTime = {
  dev: () => {
    return `http://box-cps-mng.bestchuangfu.com`
  },
  test: () => {
    return `http://test-cps-mng.bestchuangfu.com`
  },
  prod: () => {
    return ``
  }
}

export default runTime
