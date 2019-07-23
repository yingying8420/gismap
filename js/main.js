/**
 * 
 */
var vm = new Vue({
  el: '#app',
  data() {
    return {
      baseURL: 'http://192.168.18.247:8080/bsirrigationlandacquisition-backend/fweb-security/',
      // baseURL: 'http://192.168.18.221:8080/fweb-security/fweb-security/',
      // baseURL: 'http://192.168.1.146:8686/fweb-security/fweb-security/',
      isLoading: false,
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
      // 产权人
      thisOwnerId: '',
      thisOwnerData: [],
      treeData: [],
      treeProps: {
        children: "children",
        label: "areaName",
        value: ""
      },
      ownerShow: true,
      landCheckList: ['1', '0'],
      houseCheckList: ['1', '0'],
      fenceCheckList: ['1', '0'],
      graveCheckList: ['1', '0'],
      independentCheckList: ['1', '0'],
      resultLandData: [],
      resultHouseData: [],
      resultFSSSData: [],
      resultLessTreeData: [],
      resultGraveData: [],
      childLandInfoData: [],
      showBottomTableResult: false,
      thisName: 'first',
      jhTableData: [],
      showTableButton: true,
      landInfoData: [],
      houseInfoData: [],
      fsssInfoData: [],
      lessTreeInfoData: [],
      graveInfoData: [],
      landTableSearch: {
        id: '',
        name: '',
        landType: '',
        landUse: ''
      },
      landTreeProps: {
        children: "children",
        label: "name",
        value: ""
      },
      landTypeTree: [],
      landUse: []
    }
  },
  watch: {
    // 监听计划和实际的切换
    gisSearchData: {
      handler(newVal, oldval) {
        // console.log(newVal);
        if (newVal.isPlanAct) {
          if (newVal.isPlanAct == 1) {
            this.ownerShow = false
            this.thisOwnerId = ""
          } else {
            this.ownerShow = true
          }
        } else {
          this.ownerShow = true
        }
      },
      deep: true
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
      }).then((res) => {
        // console.log(res.data.result.data_);
        if (res.data != "" && res.data != undefined && res.data.statusCode == "200") {
          this.recursiveTreeData(res.data.result.data_)
        }

      }).catch((err) => {
        console.error(err)
      });

    },
    // 区域树数据递归替换属性
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
    // 产权人接口
    getOwnerData() {
      axios({
        method: 'get',
        url: this.baseURL + "/PropertyOwnerInfo/info/dropdownquery",
        params: {

        }
      }).then((res) => {
        console.log(res.data.result.data_);
        if (res.data != '' && res.data != undefined && res.data.statusCode == 200) {
          this.thisOwnerData = res.data.result.data_
        }
      }).catch((err) => {
        console.error(err);
      });
    },
    // 产权人点击取值
    handleOwnerId(val) {
      console.log(val);
      this.ownerId = val
    },
    // 征地状态Checkbox
    checkProcess(e) {
      console.log(e);
      this.gisSearchData.processStatus = e
    },
    // 土地筛选接口
    getLandRes() {
      axios({
        method: 'post',
        url: this.baseURL + 'LandInfo/info/pages?page=1&rows=9999',
        data: {
          isPlanAct: this.gisSearchData.isPlanAct,
          areaId: this.gisSearchData.areaId,
          ownerId: this.thisOwnerId,
          processStatus: this.gisSearchData.processStatus
        }
      }).then((res) => {
        if (res.data != "" && res.data != undefined && res.data.statusCode == "200") {
          // console.log(res.data.result)
          this.showBottomTableResult = true
          this.isLoading = false
          this.loading = false
          this.resultLandData = res.data.result.data_
          // this.resultLandData.forEach(ele => {
          //   ele.startStationNumberId = ele.startStationNumberId + "+000"
          //   ele.endStationNumberId = ele.endStationNumberId + "+000"
          // });
        } else {
          this.isLoading = false
          this.loading = false
          this.resultLandData = []
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    // 房屋筛选接口
    getHouseRes() {
      axios({
        method: 'post',
        url: this.baseURL + 'HouseInfo/info/pages?page=1&rows=9999',
        data: {
          isPlanAct: this.gisSearchData.isPlanAct,
          areaId: this.gisSearchData.areaId,
          ownerId: this.thisOwnerId,
          processStatus: this.gisSearchData.processStatus
        }
      }).then((res) => {
        // console.log(res.data.result.data_);
        if (res.data != "" && res.data != undefined && res.data.statusCode == "200") {
          // console.log('House !!!');
          this.resultHouseData = res.data.result.data_
        } else {
          this.resultHouseData = []
        }
      }).catch((err) => {
        console.error(err);
      });
    },
    // 附属设施筛选接口
    getFSSSRes() {
      axios({
        method: 'post',
        url: this.baseURL + 'LandAffiliatedInfo/info/pages?page=1&rows=9999',
        data: {
          isPlanAct: this.gisSearchData.isPlanAct,
          areaId: this.gisSearchData.areaId,
          ownerId: this.thisOwnerId,
          processStatus: this.gisSearchData.processStatus
        }
      }).then((res) => {
        // console.log(res.data.result.data_);
        if (res.data != "" && res.data != undefined && res.data.statusCode == "200") {
          // console.log('House !!!');
          this.resultFSSSData = res.data.result.data_
        } else {
          this.resultFSSSData = []
        }
      }).catch((err) => {
        console.error(err);
      });
    },
    // 零星果木筛选接口
    getLessTreeRes() {
      axios({
        method: 'post',
        url: this.baseURL + 'SporadicFruitInfo/info/pages?page=1&rows=9999',
        data: {
          isPlanAct: this.gisSearchData.isPlanAct,
          areaId: this.gisSearchData.areaId,
          ownerId: this.thisOwnerId,
          processStatus: this.gisSearchData.processStatus
        }
      }).then((res) => {
        // console.log(res.data.result.data_);
        if (res.data != "" && res.data != undefined && res.data.statusCode == "200") {
          // console.log('House !!!');
          this.resultLessTreeData = res.data.result.data_
        } else {
          this.resultLessTreeData = []
        }
      }).catch((err) => {
        console.error(err);
      });
    },
    // 坟墓选接口
    getGraveRes() {
      axios({
        method: 'post',
        url: this.baseURL + 'TombInfo/info/pages?page=1&rows=9999',
        data: {
          isPlanAct: this.gisSearchData.isPlanAct,
          areaId: this.gisSearchData.areaId,
          ownerId: this.thisOwnerId,
          processStatus: this.gisSearchData.processStatus
        }
      }).then((res) => {
        console.log(res.data.result.data_);
        if (res.data != "" && res.data != undefined && res.data.statusCode == "200") {
          // console.log('House !!!');
          this.resultGraveData = res.data.result.data_
        } else {
          this.resultGraveData = []
        }
      }).catch((err) => {
        console.error(err);
      });
    },
    // 点击查询
    searchForm() {
      this.loading = true
      this.isLoading = true
      this.getLandRes()
      this.getHouseRes()
      this.getFSSSRes()
      this.getLessTreeRes()
      this.getGraveRes()
    },
    //获得是否有子集
    load(tree, treeNode, resolve) {
      axios({
          method: "get",
          url: this.baseURL + "LandInfo/info/getLandInfoByPreEntityID",
          params: {
            id: tree.id
          }
        })
        .then(res => {
          if (res.data != "" && res.data != undefined && res.data.statusCode == "200") {
            this.childLandInfoData = res.data.result.data_;
            setTimeout(() => {
              resolve(res.data.result.data_);
            }, 500);
          } else {
            this.childLandInfoData = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 重置
    resetForm(form) {
      this.$refs[form].resetFields();
      this.gisSearchData.areaName = ''
      this.gisSearchData.areaId = ''
      this.thisOwnerId = ''
    },
    // 收起右下查询结果表格
    hideBottomTableResult() {
      this.showBottomTableResult = false
      this.showTableButton = true
    },
    // 显示右下查询结果表格
    handleChangeTableBtn() {
      this.showTableButton = false
      this.showBottomTableResult = true
    },
    // 单选土地查询结果
    thisLandRowsChange(currentRow, oldRow) {
      this.showLandInfoTableResult = true
      this.landInfoData = currentRow
      // doGl(this.landInfoData.isPlanAct, 'td', this.landInfoData.category, this.landInfoData.mapCode)
    },
    // 单选房屋查询结果
    thisHouseRowsChange(currentRow, oldRow) {
      this.showLandInfoTableResult = true
      this.houseInfoData = currentRow
      // doGl(this.houseInfoData.isPlanAct, 'td', this.houseInfoData.category, this.houseInfoData.mapCode)
    },
    // 单选附属设施查询结果
    thisFSSSRowsChange(currentRow, oldRow) {
      this.showLandInfoTableResult = true
      this.fsssInfoData = currentRow
      // doGl(this.houseInfoData.isPlanAct, 'td', this.houseInfoData.category, this.houseInfoData.mapCode)
    },
    // 单选零星果木查询结果
    thisLessTreeRowsChange(currentRow, oldRow) {
      this.showLandInfoTableResult = true
      this.lessTreeInfoData = currentRow
      // doGl(this.houseInfoData.isPlanAct, 'td', this.houseInfoData.category, this.houseInfoData.mapCode)
    },
    // 单选坟墓查询结果
    thisGraveRowsChange(currentRow, oldRow) {
      this.showLandInfoTableResult = true
      this.graveInfoData = currentRow
      // doGl(this.houseInfoData.isPlanAct, 'td', this.houseInfoData.category, this.houseInfoData.mapCode)
    },

    // 图例（土地）
    handleTDCheck(val) {
      // console.log(val);
      if (val == '1') {
        layervisible('layer_plan_landclass', true)
        layervisible('layer_actual_landclass', false)
      } else if (val == '0') {
        layervisible('layer_plan_landclass', false)
        layervisible('layer_actual_landclass', true)
      } else if (val == '') {
        layervisible('layer_plan_landclass', false)
        layervisible('layer_actual_landclass', false)
      } else {
        layervisible('layer_plan_landclass', true)
        layervisible('layer_actual_landclass', true)
      }

      // console.log(layervisible());

    },
    // 图例（房屋）
    handleHouseCheck(val) {
      // console.log(val);
      if (val == '1') {
        layervisible('layer_plan_building', true)
        layervisible('layer_actual_building', false)
      } else if (val == '0') {
        layervisible('layer_plan_building', false)
        layervisible('layer_actual_building', true)
      } else if (val == '') {
        layervisible('layer_plan_building', false)
        layervisible('layer_actual_building', false)
      } else {
        layervisible('layer_plan_building', true)
        layervisible('layer_actual_building', true)
      }
    },
    // 图例（围墙）
    handleWQCheck(val) {
      // console.log(val);
      if (val == '1') {
        layervisible('layer_plan_wall', true)
        layervisible('layer_actual_wall', false)
      } else if (val == '0') {
        layervisible('layer_plan_wall', false)
        layervisible('layer_actual_wall', true)
      } else if (val == '') {
        layervisible('layer_plan_wall', false)
        layervisible('layer_actual_wall', false)
      } else {
        layervisible('layer_plan_wall', true)
        layervisible('layer_actual_wall', true)
      }
    },
    // 图例（坟墓）
    handleMMMMCheck(val) {
      // console.log(val);
      if (val == '1') {
        layervisible('layer_plan_grave', true)
        layervisible('layer_actual_grave', false)
      } else if (val == '0') {
        layervisible('layer_plan_grave', false)
        layervisible('layer_actual_grave', true)
      } else if (val == '') {
        layervisible('layer_plan_grave', false)
        layervisible('layer_actual_grave', false)
      } else {
        layervisible('layer_plan_grave', true)
        layervisible('layer_actual_grave', true)
      }
    },
    // 图例（独立地物）
    handleDLDWCheck(val) {
      console.log(val);
      if (val == '1') {
        layervisible('layer_plan_groundobjects', true)
        layervisible('layer_actual_groundobjects', false)
      } else if (val == '0') {
        layervisible('layer_plan_groundobjects', false)
        layervisible('layer_actual_groundobjects', true)
      } else if (val == '') {
        layervisible('layer_plan_groundobjects', false)
        layervisible('layer_actual_groundobjects', false)
      } else {
        layervisible('layer_plan_groundobjects', true)
        layervisible('layer_actual_groundobjects', true)
      }
    },
    // 加载地类树接口
    getLandType() {
      axios({
        method: 'get',
        url: this.baseURL + 'sortdict/querysorttree?parentId=M-0014-02',
        params: {

        }
      }).then((res) => {
        console.log(res.data.result.data_);
        if (res.data != "" && res.data != undefined && res.data.statusCode == "200") {
          this.replaceTreeData(res.data.result.data_)
        }
      }).catch((err) => {
        console.error(err);
      });
    },
    // 地类树数据递归替换属性
    replaceTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].areaName) {
          data[i].id = data[i].id;
          data[i].parentId = data[i].parentId;
          data[i].name = data[i].name;
        }
        if (data[i].children.length > 0) {
          this.replaceTreeData(data[i].children);
        }
      }
      return (this.landTypeTree = data);
    },
    // 地类树节点点击取值
    landTreeNodeclick(node) {
      this.landTableSearch.name = node.name
      this.landTableSearch.id = node.id
      console.log(node);
    },
  },
  mounted() {
    this.loadAreaData()
    this.getLandType()
    this.getOwnerData()
  }

})