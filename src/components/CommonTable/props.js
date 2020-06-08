export const tableProps = {
  /* 请求api的接口 */
  fetch: {
    type: Function
  },

  /* 表格数据字段 */
  listField: {
    type: String,
    default: 'data.list'
  },

  /* 数据总行数字段 */
  totalField: {
    type: String,
    default: 'data.total'
  },

  /* fetch数据带的参数 */
  params: {
    type: Object,
    default: () => {
      return {}
    }
  },

  /* 是否一开始就加载数据 */
  autoLoad: {
    type: Boolean,
    default: true
  },

  /* 表格类型 - 请求数据remote / 写死数据local */
  type: {
    type: String,
    default: 'remote',
    validator(value) {
      const types = ['remote', 'local']
      const validType = types.indexOf(value) !== -1
      if (!validType) {
        throw new Error(`prop属性：'${value}'请选择 'remote'或者'local'.`)
      }
      return validType
    }
  },

  /* el-table的prop 行数据key标识 */
  rowKey: {
    type: String,
    default: 'id'
  },

  /* 树形表格懒加载数据 */
  treeTableLazy: {
    type: Boolean,
    default: true
  },

  /* 请求二级表格的请求api */
  loadChildData: {
    type: Function
  },

  /* 写死数据的表格数据 */
  data: {
    type: Array
  },

  /* 请求获得的数据拦截处理器 */
  dataHandler: {
    type: Function
  },

  /* 每一列的prop和信息 */
  columns: {
    type: Array,
    required: true,
    label: {
      type: String,
      required: true
    },
    prop: {
      type: String,
      required: true
    },

    /* 列宽度 */
    minWidth: Number,

    /* 是否固定在左/右边 */
    fixed: [Boolean, String],

    /* 是否可排序 */
    sortable: [Boolean, String],

    /* 该单元格的数据处理器 */
    formatter: Function,

    /* 该单元格的布局 */
    align: {
      type: String,
      default: 'left'
    },

    /* 该列表头的布局 */
    headerAlign: String,

    /* 自定义插槽名 */
    slotName: {
      type: String
    }
  },

  /* 是否展示分页器 */
  showPagination: {
    type: Boolean,
    default: true
  },

  /* 分页器中每页大小的下拉选项 */
  pageSizes: {
    type: Array,
    default: () => {
      return [5, 10, 20]
    }
  },

  /* 分页器的排列顺序 total:数据总行数/ prev:前一页/ pager: 页数/ next: 下一页/ jumper: 跳转页数/ sizes: 下拉选每页大小 */
  paginationLayout: {
    type: String,
    default: 'total, prev, pager, next, jumper, sizes'
  },

  /* 接口“当前页”的字段 */
  pageIndexKey: {
    type: String,
    default: 'currentPage'
  },

  /* 接口“每页大小”的字段 */
  pageSizeKey: {
    type: String,
    default: 'pageSize'
  }
}
