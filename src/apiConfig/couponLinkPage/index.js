const couponLinkPage = {
  dev: (prefix = 'box') => {
    return `https://${prefix}-m.black-unique.com/new/coupon/receiveCoupon/receiveCoupon.html`
  },
  test: (prefix = 'test') => {
    return `https://${prefix}-m.black-unique.com/new/coupon/receiveCoupon/receiveCoupon.html`
  },
  prod: () => {
    return 'https://m.black-unique.com/new/coupon/receiveCoupon/receiveCoupon.html'
  }
}

export default couponLinkPage
