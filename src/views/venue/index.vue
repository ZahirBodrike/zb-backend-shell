
<template>
  <div class="app-container">
    <div class="section-box">
      <el-form ref="listQuery" :inline="true" label-width="100px">
        <el-form-item label="会场标题:">
          <el-input v-model="listQuery.title" placeholder="请输入会场标题" clearable />
        </el-form-item>

        <el-form-item label="平台:">
          <el-select v-model="listQuery.source" clearable>
            <el-option
              v-for="item in sourceArr"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getPage">
            查询
          </el-button>
          <el-button type="primary" style="margin-left: 25px;" @click="openEditWin('create')">
            创建
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-loading="tableLoading" class="section-box">
      <el-table :data="tableData.records" stripe>
        <el-table-column label="会场ID" prop="id" />
        <el-table-column label="页面功能" prop="pageType" :formatter="pageTypeFormat" />
        <el-table-column label="会场标题名称" prop="title" />
        <el-table-column label="会场文案" prop="linkText" />
        <el-table-column label="平台" prop="couponType">
          <template slot-scope="scope">
            <span>{{ getSourceName(scope.row.source) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作人" prop="createUser" />
        <el-table-column label="最新操作时间" prop="updateTime" />

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openEditWin('edit',scope.row)">
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="copyLink(scope.row.id, scope.row.pageType)"
            >
              复制链接
            </el-button>
            <el-button type="text" size="small" @click="deleteConfig(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page="listQuery.currentPage"
        :page-sizes="[20, 50, 100, 500]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Number(tableData.total)"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog :visible.sync="detailDialog" :title="detailDialogTitle" width="800px">
      <el-form
        ref="saveForm"
        label-width="200px"
        :rules="rules"
        :model="detailsData"
      >
        <el-form-item label="会场标题" :rules="rules.required" prop="title">
          <el-input v-model="detailsData.title" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="页面功能" :rules="rules.required" prop="pageType">
          <el-radio-group v-model="detailsData.pageType" @change="radioSwitch">
            <el-radio :label="1">
              背景化中转页（用户点击触发跳转）
            </el-radio>
            <el-radio :label="2">
              直跳中转页
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="detailsData.pageType === 1" id="radio_div">
          <el-form-item label="支持功能" :rules="rules.required" prop="type">
            <el-radio v-model="detailsData.type" :label="0">
              全部
            </el-radio>
            <el-radio v-model="detailsData.type" :label="1">
              跳转会场
            </el-radio>
            <!-- <el-radio v-model="detailsData.type" :label="2">分享海报/口令</el-radio> -->
          </el-form-item>

          <el-form-item label="会场背景图" :rules="rules.required" prop="imgBackground">
            <uploadImg :list.sync="detailsData.imgBackground" />
          </el-form-item>

          <el-form-item label="【跳转会场】按钮" :rules="rules.required" prop="imgButtonJump">
            <uploadImg :list.sync="detailsData.imgButtonJump" />
          </el-form-item>

          <el-form-item label="分享海报" :rules="rules.required" prop="imgPosterShare">
            <uploadImg :list.sync="detailsData.imgPosterShare" />
          </el-form-item>

          <el-form-item
            v-if="detailsData.type===0"
            label="【复制口令】按钮"
            :rules="rules.required"
            prop="imgButtonCopy"
          >
            <uploadImg :list.sync="detailsData.imgButtonCopy" />
          </el-form-item>

          <el-form-item v-if="detailsData.type===1" label="【复制口令】按钮" prop="imgButtonCopy">
            <uploadImg :list.sync="detailsData.imgButtonCopy" />
          </el-form-item>

          <el-form-item label="推广口令文案" prop="pwdText">
            <el-input
              v-model="detailsData.pwdText"
              type="textarea"
              placeholder="请输入"
              clearable
            />
          </el-form-item>

          <el-form-item label="链接指引文案" :rules="rules.required" prop="linkText">
            <el-input
              v-model="detailsData.linkText"
              type="textarea"
              placeholder="请输入"
              clearable
            />
          </el-form-item>

          <el-form-item label="背景是否需要底色" :rules="rules.required" prop="backgroundColorOption">
            <el-radio v-model="detailsData.backgroundColorOption" :label="1">
              是
            </el-radio>
            <el-radio v-model="detailsData.backgroundColorOption" :label="0">
              否
            </el-radio>
            <el-input v-model.trim="detailsData.backgroundColor" placeholder="背景色" clearable />注：填写色值，如#FFFFFFF
          </el-form-item>
        </div>
        <el-form-item label="所属平台" :rules="rules.required" prop="source">
          <el-radio
            v-for="item in sourceArr"
            :key="item.value"
            v-model="detailsData.source"
            :label="item.value"
          >
            {{ item.name }}
          </el-radio>
        </el-form-item>

        <div v-if="detailsData.source===10">
          <el-form-item label="淘宝会场id" :rules="rules.required" prop="sourceConfig.venueId">
            <el-input v-model.trim="detailsData.sourceConfig.venueId" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="淘宝推广位id" prop="sourceConfig.pid">
            <el-input v-model.trim="detailsData.sourceConfig.pid" placeholder="请输入" clearable />注：当前默认推广位是mm_376450199_439450211_109407150200  自定义推广位格式为：mm_xxxxx_xxxxx_xxxxx   三段式
          </el-form-item>
        </div>

        <div v-if="detailsData.source===20">
          <el-form-item label="京东会场链接" :rules="rules.required" prop="sourceConfig.venueLink">
            <el-input v-model.trim="detailsData.sourceConfig.venueLink" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="京东推广位id" prop="sourceConfig.pid">
            <el-input v-model.trim="detailsData.sourceConfig.pid" placeholder="请输入" clearable />注：当前默认推广位是3001581703 自定义推广位格式为：xxxxxxxxxx
          </el-form-item>
        </div>

        <div v-if="detailsData.source===30">
          <el-form-item label="类型" :rules="rules.required" prop="sourceConfig.type">
            <el-radio v-model="detailsData.sourceConfig.type" :label="0">
              频道来源
            </el-radio>
            <el-radio v-model="detailsData.sourceConfig.type" :label="1">
              会场转链（39998-转链)
            </el-radio>
            <el-radio v-model="detailsData.sourceConfig.type" :label="2">
              主题ID
            </el-radio>
          </el-form-item>

          <el-form-item label="链接模式" :rules="rules.required" prop="sourceConfig.linkType">
            <el-radio v-model="detailsData.sourceConfig.linkType" :label="0">
              唤起APP
            </el-radio>
            <el-radio v-model="detailsData.sourceConfig.linkType" :label="1">
              不唤起APP
            </el-radio>
          </el-form-item>

          <el-form-item
            v-if="detailsData.sourceConfig.type === 0"
            label="参数"
            :rules="rules.required"
            prop="sourceConfig.venueLink"
          >
            <el-input v-model.trim="detailsData.sourceConfig.venueLink" placeholder="请输入" clearable /> 注：请输入整数
          </el-form-item>

          <el-form-item
            v-if="detailsData.sourceConfig.type === 1"
            label="会场链接"
            :rules="rules.required"
            prop="sourceConfig.venueLink"
          >
            <el-input v-model.trim="detailsData.sourceConfig.venueLink" placeholder="请输入" clearable /> 注：请输入会场链接
          </el-form-item>

          <el-form-item
            v-if="detailsData.sourceConfig.type === 2"
            label="主题ID"
            :rules="rules.required"
            prop="sourceConfig.venueLink"
          >
            <el-input v-model.trim="detailsData.sourceConfig.venueLink" placeholder="请输入" clearable /> 注：请输入主题ID(整数)
          </el-form-item>
          <el-form-item label="拼多多推广位id" prop="sourceConfig.pid">
            <el-input v-model.trim="detailsData.sourceConfig.pid" placeholder="请输入" clearable />注：当前默认推广位是9104477_140707966  自定义推广位格式为：xxxx_xxxx
          </el-form-item>
        </div>

        <div v-if="detailsData.source===80">
          <!-- 唯品会 -->
          <el-form-item label="唯品会会场链接" :rules="rules.required" prop="sourceConfig.venueLink">
            <el-input v-model.trim="detailsData.sourceConfig.venueLink" placeholder="请输入" clearable />
          </el-form-item>
        </div>

        <!-- 苏宁易购 -->
        <div v-if="detailsData.source===130">
          <el-form-item label="苏宁会场链接" :rules="rules.required" prop="sourceConfig.venueLink">
            <el-input v-model.trim="detailsData.sourceConfig.venueLink" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="苏宁推广位id" prop="sourceConfig.pid">
            <el-input v-model.trim="detailsData.sourceConfig.pid" placeholder="请输入" clearable />
            注：当前默认推广位是665639 自定义推广位格式为：xxxxxxx  一段式
          </el-form-item>
        </div>

        <div v-if="detailsData.source===40">
          <!-- 考拉海购 -->
          <el-form-item label="考拉会场链接" :rules="rules.required" prop="sourceConfig.venueLink">
            <el-input v-model.trim="detailsData.sourceConfig.venueLink" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="考拉推广位id" prop="sourceConfig.pid">
            <el-input v-model.trim="detailsData.sourceConfig.pid" placeholder="请输入" clearable />注：当前默认推广位是10005010 自定义推广位格式为：xxxxxxx  一段式
          </el-form-item>
        </div>

        <el-form-item>
          <el-button type="primary" @click="detailDialog=false">
            取消
          </el-button>
          <el-button type="primary" @click="submitForm">
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>

import * as cpsVenuneConfigApi from '@/api/cpsVenuneConfig'
import { VENUE_PAGE, VENUE_PAGE_BLANK } from '@/apiConfig'
import uploadImg from '@/components/UploadImg'

export const detailsDataConst = {
  id: '',
  title: '', // 会场标题'
  type: 0, // 支持功能   0=全部 1=跳转会场 2= 分享海报/口令'
  pageType: 1, // 页面功能  1=背景化中转页（用户点击触发跳转）, 2 = 直跳中转页
  backgroundColor: '', // 背景色值'
  backgroundColorOption: 0, // 0=不适用配置背景色  1-使用配置背景色 '
  source: 10, // 所属平台  参考db_rebate_config'
  linkText: '', // 链接指引文案'
  pwdText: '', // 推广口令文案'
  updateTime: '',
  sourceConfig: '', // 平台配置数据'
  imgBackground: '', // 会场背景图'
  imgPosterShare: '', // 分享海报'
  imgButtonJump: '', // 跳转会场按钮图片'
  imgButtonShare: '', // 分享海报按钮'
  imgButtonCopy: '' // 复制口令按钮',
}

export const sourceConfigConst = {
  venueId: '',
  venueLink: '',
  pid: '',
  type: 0,
  linkType: 0
}

export default {
  name: 'CouponList',
  components: {
    uploadImg
  },
  data() {
    return {
      detailDialog: false,
      detailDialogTitle: '修改',
      tableLoading: false,
      sourceArr: [
        { value: 10, name: '淘宝' },
        { value: 20, name: '京东' },
        { value: 30, name: '拼多多' },
        { value: 80, name: '唯品会' },
        { value: 130, name: '苏宁易购' },
        { value: 40, name: '考拉' }
      ],
      link: '',
      listQuery: {
        pageSize: 20,
        currentPage: 1,
        title: '',
        source: ''
      },
      detailsData: {},
      sourceConfig: {},
      tableData: {
        total: 0,
        records: []
      },
      fromItemVisible: true,
      rules: {
        required: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getPage()
    this.initDetail()
  },
  methods: {
    initDetail() {
      this.sourceConfig = {
        ...sourceConfigConst
      }
      this.detailsData = {
        ...detailsDataConst,
        sourceConfig: this.sourceConfig
      }
    },
    getSourceName(source) {
      const sourceObj = this.sourceArr.find((e) => e.value === source)
      if (sourceObj) {
        return sourceObj.name
      }
    },
    copyLink(id, pageType) {
      // 权限判断
      const self = this
      let pageUrl
      if (pageType === 2) {
        pageUrl = VENUE_PAGE_BLANK + id
      } else {
        pageUrl = VENUE_PAGE + id
      }
      this.$copyText(pageUrl).then(
        function(e) {
          self.$message.success('复制成功')
        },
        function(e) {
          self.$message.error('Can not copy')
        }
      )
    },

    /** 打开编辑页面 */
    openEditWin(operation, row) {
      if (operation === 'edit') {
        this.detailDialog = true
        this.detailDialogTitle = '编辑'
        this.getDetail(row.id)
      } else if (operation === 'create') {
        this.detailDialog = true
        this.detailDialogTitle = '新增'
        this.initDetail()
      }
    },
    getDetail(id) {
      this.initDetail()
      cpsVenuneConfigApi.getById({ id: id }).then((res) => {
        if (res.code === 0) {
          this.detailsData = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    submitForm() {
      this.detailsData
      this.$refs['saveForm'].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          this.$message.error('数据校验失败，请检查')
          return false
        }
      })
    },
    deleteConfig(id) {
      this.$alert('确定要删除吗', '提示', {
        confirmButtonText: '确定',
        callback: (action) => {
          this.doDelete(id)
        }
      })
    },
    doDelete(id) {
      cpsVenuneConfigApi.deleteItem({ id: id }).then((res) => {
        if (res.code == 0) {
          this.$message.success('删除成功')
          this.getPage()
        } else {
          this.$message.error(res.msg)
        }
        // 赋值
      })
    },
    save() {
      const data = {
        ...this.detailsData
      }
      cpsVenuneConfigApi.save(data).then((res) => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.getPage()
          this.detailDialog = false
        } else {
          this.$message.error(res.msg)
        }
        // 赋值
      })
    },

    getPage() {
      this.tableLoading = true
      cpsVenuneConfigApi.getPage(this.listQuery).then((res) => {
        if (res.code != 0) {
          this.$message.error(res.msg)
          this.tableLoading = false
          return
        }
        // 赋值
        this.tableData = res.data
        this.tableLoading = false
      })
    },

    /** 处理每页数量变更事件 */
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getPage()
    },

    /** */
    pageTypeFormat(row, column) {
      if (row.pageType === 2) {
        return '直跳中转页'
      } else {
        return '背景化中转页（用户点击触发跳转）'
      }
    },
    radioSwitch() {
      if (this.detailsData.pageType === 2) {
        this.fromItemVisible = false
      } else {
        this.fromItemVisible = true
      }
    },
    /** 处理页码改变时间 */
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getPage()
    }
  }
}
</script>
