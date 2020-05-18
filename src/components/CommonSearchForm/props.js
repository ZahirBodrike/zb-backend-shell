export const formProps = {
  size: {
    type: String,
    default: 'medium',
    validator: sizeValidator
  },
  fuzzy: {
    type: Boolean,
    default: false
  },
  showResetBtn: {
    type: Boolean,
    default: false
  },
  inline: {
    type: Boolean,
    default: false
  },
  labelWidth: Number,
  itemWidth: Number,
  submitHandler: Function,
  submitLoading: {
    type: Boolean,
    default: false
  },
  submitBtnText: {
    type: String,
    default: '查询'
  },
  resetBtnText: {
    type: String,
    default: '重置'
  },
  resetBtnCallback: Function,
  formItemList: {
    type: Array,
    require: true,
    label: String,
    prop: {
      type: [String, Array],
      required: true
    },
    itemType: {
      type: String,
      default: 'input',
      validator: itemTypeValidator
    },
    size: {
      type: String,
      default: '',
      validator: sizeValidator
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    editable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    fuzzy: {
      type: Boolean,
      default: false
    },
    options: Array,
    selectFetch: Function,
    selectResultField: String,
    selectResultHandler: Function,
    valueKey: String,
    labelKey: String,
    format: Function,
    rules: Array,
    pickerOptions: Object
  }
}

function sizeValidator(value) {
  const methodTypes = ['large', 'medium', 'small', 'mini']
  const valid = methodTypes.indexOf(value.toLowerCase()) !== -1 || value === ''
  if (!valid) {
    throw new Error(`size 需要选择对值在其中之一：['large', 'medium', 'small', 'mini']`)
  }
  return valid
}

function itemTypeValidator(value) {
  const methodTypes = ['input', 'select', 'date', 'daterange']
  const valid = methodTypes.indexOf(value.toLowerCase()) !== -1
  if (!valid) {
    throw new Error(`ItemType must be one of ['input', 'select', 'date', 'daterange']`)
  }
  return valid
}

