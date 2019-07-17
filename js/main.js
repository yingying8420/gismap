/**
 * 
 */
var vm = new Vue({
  el: '#app',
  data() {
    return {
      baseURL: 'http://192.168.18.247:8080/bsirrigationlandacquisition-backend/fweb-security/',
      showButton: true,
      showSlider: false,
      // 查询筛选字段
      gisSearchData: {
        thingsType: '',
        areaId: '',
        isPlanAct: '',
        ownerId: '',
        processStatus: []
      },
      treeData: [],
      treeProps: {
        children: "children",
        label: "areaName",
        value: ""
      },
      ownerShow: true
    }
  },
  methods: {
    // 隐藏筛选按钮
    handleHideBtn() {
      this.showSlider = false
      this.showButton = true
    },
    // 显示边栏
    handleChangeBtn() {
      this.showSlider = true
      this.showButton = false
    },
    // 区域树节点点击取值
    treenodeclick(node) {
      this.gisSearchData.areaName = node.areaName
      this.gisSearchData.areaId = node.id
    },
    // 加载区域数据
    loadAreaData() {
      axios({
          method: 'post',
          url: this.baseURL + 'area/querytreeinfo',
          data: {
            areaId: 0
          }
        })
        .then((res) => {
          console.log(res.data.result.data_);

          this.recursiveTreeData(res.data.result.data_)
        }).catch((err) => {
          console.error(err)
        });
    },
    // tree数据递归替换属性
    recursiveTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].areaName) {
          data[i].id = data[i].id;
          data[i].parentId = data[i].parentAreaId;
          data[i].name = data[i].areaName;
        }
        if (data[i].children.length > 0) {
          this.recursiveTreeData(data[i].children);
        }
      }
      return (this.treeData = data);
    },
    // 计划实际切换隐藏产权人
    handleChangePlan(e) {
      console.log(e);
      if (e == 1) {
        this.ownerShow = false
        this.gisSearchData.ownerId = ""
      } else {
        this.ownerShow = true
      }
    },
    // 征地状态Checkbox
    checkProcess(e) {
      console.log(e);
      this.gisSearchData.processStatus = e
    },
    // 查询
    searchForm() {
      var thisData = this.gisSearchData
      axios({
          method: 'post',
          url: this.baseURL + '/LandInfo/info/pages?page=1&rows=999',
          data: {
            isPlanAct: this.gisSearchData.isPlanAct,
            areaId: this.gisSearchData.areaId,
            // ids: "10",
            // acType: this.landjhdata.acType,
            ownerId: this.gisSearchData.ownerId,
            processStatus: this.gisSearchData.processStatus
          }
        })
        .then((res) => {
          console.log(res.data.result);
        }).catch((err) => {
          console.error(err);
        });
    },
    // 重置
    resetForm(form) {
      this.$refs[form].resetFields();
      this.gisSearchData.areaName = ''
      this.gisSearchData.areaId = ''
    }
  },
  mounted() {
    this.loadAreaData()
  }
})