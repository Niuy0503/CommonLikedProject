<template>
  <div>
    <!-- 搜索头部 -->
    <SearchHead :option="SearchHead.option" @search="search" />
    <!-- 表格 -->
    <UserTable :table-data="tableData" :loading="loading" :show-details.sync="dialogVisible" @userInfo="sendUserInfo" />
    <!-- 分页 -->
    <Pagination :total-count="totalCount" :page-index="page.pageIndex" :total-page="totalPage" @prevPage="changePage" />
    <!-- 弹窗 -->
    <Details :dialog-visible.sync="dialogVisible" :user-info="userInfo" :work-order="workOrder" @dialogVisibleClose="dialogVisibleClose" />
  </div>
</template>

<script>
import SearchHead from './components/searchHead.vue'
import Pagination from './components/pagination.vue'
import UserTable from './components/userTable.vue'
import { getUserWorkApi } from '@/api'
import Details from './components/details.vue'
export default {
  name: 'User',
  components: { SearchHead, Pagination, UserTable, Details },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10,
        userName: '',
        roleId: '',
        isRepair: null
      },
      totalCount: 0,
      totalPage: 0,
      tableData: [],
      SearchHead: {
        option: {
          searchBox: {
            show: true,
            text: '人员搜索',
            placeholder: '请输入',
            dataField: 'userName'
          },
          selectionBox: {
            show: true,
            text: '角色',
            placeholder: '请选择',
            option: ['运营员', '维修员'],
            value: [false, true],
            dataField: 'isRepair'
          }
        }
      },
      loading: false,
      dialogVisible: false,
      userInfo: {},
      workOrder: []
    }
  },
  created() {
    this.getUserWork()
  },
  methods: {
    async getUserWork() {
      try {
        this.loading = true
        const { data } = await getUserWorkApi(this.page)
        this.page.pageIndex = data.pageIndex
        this.page.pageSize = data.pageSize
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage
        this.tableData = data.currentPageRecords
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    changePage(type) {
      if (type === 'prev') {
        this.page.pageIndex--
      } else {
        this.page.pageIndex++
      }
      this.getUserWork()
    },
    search(data) {
      this.page.userName = data.userName
      this.page.isRepair = data.isRepair
      this.page.pageIndex = 1
      this.getUserWork()
    },
    sendUserInfo(data) {
      console.log(data)
      this.userInfo = data.data
      this.workOrder = data.res
    },
    dialogVisibleClose(){
      this.dialogVisible=false
      this.userInfo= {}
      this.workOrder=[]
    }
  }
}
</script>

<style>

</style>
