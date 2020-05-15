const refundApplyInfoPage = {
  dev: () => {
    return `http://fin-branx-develop.devx.zuzuche.net/refund/apply_info_new.php?apply_id=`
  },
  test: () => {
    return `http://fin-branx-develop.devx.zuzuche.net/refund/apply_info_new.php?apply_id=`
  },
  prod: () => {
    return 'http://fin.zuzuche.com/refund/apply_info_new.php?apply_id='
  }
}

export default refundApplyInfoPage
