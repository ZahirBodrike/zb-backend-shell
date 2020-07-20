export const formProps = {
  /* 请求表单数据api */
  fetch: Function,

  /* 请求表单数据参数 */
  fetchParams: Object,

  /* 是否请求自动填充表单 */
  autoFetch: {
    type: [Boolean, String, Number],
    default: false
  },

  /* 表单中各个组件的尺寸 */
  size: {
    type: String,
    default: 'medium',
    validator: sizeValidator
  },

  /* 是否整个表单开启模糊搜索（本地） */
  fuzzy: {
    type: Boolean,
    default: false
  },

  /* 是否显示重置按钮 */
  showResetBtn: {
    type: Boolean,
    default: false
  },

  /* 是否开启label和formItem内敛模式 */
  inline: {
    type: Boolean,
    default: false
  },

  /* 每个表单组件label的宽度 */
  labelWidth: Number,

  /* 每个表单组件formItem的宽度 */
  itemWidth: Number,

  /* 表单提交自定义事件 */
  submitHandler: Function,

  /* 是否开启提交按钮的loading */
  submitLoading: {
    type: Boolean,
    default: false
  },

  /* 提交按钮的文案 */
  submitBtnText: {
    type: String,
    default: '查询'
  },

  /* 重置按钮的文案 */
  resetBtnText: {
    type: String,
    default: '重置'
  },

  /* 重置按钮的额外自定义事件 */
  resetBtnCallback: Function,

  /* 按钮的位置：left, mid, right */
  submitBtnPosition: {
    type: String,
    default: 'right',
    validator: btnPostionValidator
  },

  /* 表单各个组件的配置 */
  formItemList: {
    type: Array,
    require: true,
    label: String,
    prop: {
      type: [String, Array],
      required: true
    },

    /* 该表单组件的类型 */
    itemType: {
      type: String,
      default: 'input',
      validator: itemTypeValidator
    },

    /* 该表单组件的大小 */
    size: {
      type: String,
      default: '',
      validator: sizeValidator
    },

    /* 空值占位文案 */
    placeholder: {
      type: String,
      default: '请输入'
    },

    /* 是否禁用 */
    disabled: {
      type: Boolean,
      default: false
    },

    /* 该表单组件是否开启模糊搜索（本地） */
    fuzzy: {
      type: Boolean,
      default: false
    },

    /* 提交的表单数据处理器 */
    format: Function,

    /* 该表单组件的校验规则 */
    rules: Array,

    /* select组件remote模式 value的字段 */
    valueKey: String,

    /* select组件remote模式 label的字段 */
    labelKey: String,

    /* 日期组件 额外配置 */
    pickerOptions: Object,

    /* 日期组件 是否可编辑的 */
    editable: {
      type: Boolean,
      default: true
    },

    /* 日期组件 是否只读 */
    readonly: {
      type: Boolean,
      default: false
    },

    // switch
    checkLabel: String,
    trueLabel: [Number, String, Boolean],
    falseLabel: [Number, String, Boolean],

    // radio/select
    options: Array,

    // select
    selectFetch: Function,
    selectResultField: String,
    selectResultHandler: Function,

    // date
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    }
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

function btnPostionValidator(value) {
  const postionType = ['left', 'mid', 'right']
  const valid = postionType.indexOf(value.toLowerCase()) !== -1
  if (!valid) {
    throw new Error(`postionType must be one of ['left', 'mid', 'right']`)
  }
  return valid
}
