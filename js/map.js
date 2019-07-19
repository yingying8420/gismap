var layervisible;
var doGl;
require([
	"esri/Map",
	"src/TiandiImageLayer",
	"src/TiandiImageAnnoLayer",
	"esri/views/SceneView",
	"esri/layers/MapImageLayer",
	"esri/layers/FeatureLayer",
	"esri/layers/IntegratedMeshLayer",
	"esri/layers/GraphicsLayer",

	"esri/tasks/QueryTask",
	"esri/tasks/support/Query",
	"esri/tasks/FindTask",
	"esri/tasks/support/FindParameters",

	"esri/widgets/Legend",
	"esri/widgets/Expand",
	"esri/widgets/LayerList",
	"esri/widgets/DirectLineMeasurement3D",
	"esri/widgets/AreaMeasurement3D"
], function (
	Map, TiandiImageLayer, TiandiImageAnnoLayer, SceneView, MapImageLayer, FeatureLayer, IntegratedMeshLayer, GraphicsLayer,
	QueryTask, Query, FindTask, FindParameters,
	Legend, Expand, LayerList, DirectLineMeasurement3D, AreaMeasurement3D
) {
	//天地图影像图层
	var TiandiImageLayer = new TiandiImageLayer();
	TiandiImageLayer.listMode = "hide";
	//天地图标注图层
	var TiandiImageAnnoLayer = new TiandiImageAnnoLayer();
	TiandiImageAnnoLayer.listMode = "hide";

	/**-------------百灌图层------------------**/
	var url_first = "https://gis.gwpdi.com:6443/arcgis/rest/services";
	var url_second_plan = "/Plan";
	var url_second_actual = "/Plan";
	var url_third = "/BG_Service/MapServer";

	var url_zdfw = 15;
	var url_landclass = 14;
	var url_irrigation = 13;
	var url_building = 12;
	var url_pool = 11;
	var url_channel = 10;
	var url_electric = 9;
	var url_oilgas_pipeline = 8;
	var url_railway = 7;
	var url_highway = 6;
	var url_villageTraffic = 5;
	var url_roaddrainage = 4;
	var url_wall = 3;
	var url_waterPipeline = 2;
	var url_grave = 1;
	var url_groundobjects = 0;

	var url_plan = url_first + url_second_plan + url_third + "/";
	var layer_plan_zdfw = new FeatureLayer({
		url: url_plan + url_zdfw,
		title: "plan_征地范围",
		outFields: ["*"]
	});
	var layer_plan_landclass = new FeatureLayer({
		url: url_plan + url_landclass,
		title: "plan_土地",
		outFields: ["*"]
	});
	var layer_plan_irrigation = new FeatureLayer({
		url: url_plan + url_irrigation,
		title: "plan_高效节水灌溉",
		outFields: ["*"]
	});
	var layer_plan_building = new FeatureLayer({
		url: url_plan + url_building,
		title: "plan_房屋及附属设施",
		outFields: ["*"]
	});
	var layer_plan_pool = new FeatureLayer({
		url: url_plan + url_pool,
		title: "plan_水池垃圾池沼气池",
		outFields: ["*"]
	});
	var layer_plan_channel = new FeatureLayer({
		url: url_plan + url_channel,
		title: "plan_灌溉渠道",
		outFields: ["*"]
	});
	var layer_plan_electric = new FeatureLayer({
		url: url_plan + url_electric,
		title: "plan_输变电设施低压",
		outFields: ["*"]
	});
	var layer_plan_oilgas_pipeline = new FeatureLayer({
		url: url_plan + url_oilgas_pipeline,
		title: "plan_油气管道设施",
		outFields: ["*"]
	});
	var layer_plan_railway = new FeatureLayer({
		url: url_plan + url_railway,
		title: "plan_铁路",
		outFields: ["*"]
	});
	var layer_plan_highway = new FeatureLayer({
		url: url_plan + url_highway,
		title: "plan_公路设施",
		outFields: ["*"]
	});
	var layer_plan_villageTraffic = new FeatureLayer({
		url: url_plan + url_villageTraffic,
		title: "plan_农村道路",
		outFields: ["*"]
	});
	var layer_plan_roaddrainage = new FeatureLayer({
		url: url_plan + url_roaddrainage,
		title: "plan_道路排水涵",
		outFields: ["*"]
	});
	var layer_plan_wall = new FeatureLayer({
		url: url_plan + url_wall,
		title: "plan_围墙",
		outFields: ["*"]
	});
	var layer_plan_waterPipeline = new FeatureLayer({
		url: url_plan + url_waterPipeline,
		title: "plan_供水管道",
		outFields: ["*"]
	});
	var layer_plan_grave = new FeatureLayer({
		url: url_plan + url_grave,
		title: "plan_坟墓",
		outFields: ["*"]
	});
	var layer_plan_groundobjects = new FeatureLayer({
		url: url_plan + url_groundobjects,
		title: "plan_独立地物",
		outFields: ["*"]
	});

	var url_actual = url_first + url_second_actual + url_third + "/";
	var layer_actual_zdfw = new FeatureLayer({
		url: url_actual + url_zdfw,
		title: "actual_征地范围",
		outFields: ["*"]
	});
	var layer_actual_landclass = new FeatureLayer({
		url: url_actual + url_landclass,
		title: "actual_土地",
		outFields: ["*"]
	});
	var layer_actual_irrigation = new FeatureLayer({
		url: url_actual + url_irrigation,
		title: "actual_高效节水灌溉",
		outFields: ["*"]
	});
	var layer_actual_building = new FeatureLayer({
		url: url_actual + url_building,
		title: "actual_房屋及附属设施",
		outFields: ["*"]
	});
	var layer_actual_pool = new FeatureLayer({
		url: url_actual + url_pool,
		title: "actual_水池垃圾池沼气池",
		outFields: ["*"]
	});
	var layer_actual_channel = new FeatureLayer({
		url: url_actual + url_channel,
		title: "actual_灌溉渠道",
		outFields: ["*"]
	});
	var layer_actual_electric = new FeatureLayer({
		url: url_actual + url_electric,
		title: "actual_输变电设施低压",
		outFields: ["*"]
	});
	var layer_actual_oilgas_pipeline = new FeatureLayer({
		url: url_actual + url_oilgas_pipeline,
		title: "actual_油气管道设施",
		outFields: ["*"]
	});
	var layer_actual_railway = new FeatureLayer({
		url: url_actual + url_railway,
		title: "actual_铁路",
		outFields: ["*"]
	});
	var layer_actual_highway = new FeatureLayer({
		url: url_actual + url_highway,
		title: "actual_公路设施",
		outFields: ["*"]
	});
	var layer_actual_villageTraffic = new FeatureLayer({
		url: url_actual + url_villageTraffic,
		title: "actual_农村道路",
		outFields: ["*"]
	});
	var layer_actual_roaddrainage = new FeatureLayer({
		url: url_actual + url_roaddrainage,
		title: "actual_道路排水涵",
		outFields: ["*"]
	});
	var layer_actual_wall = new FeatureLayer({
		url: url_actual + url_wall,
		title: "actual_围墙",
		outFields: ["*"]
	});
	var layer_actual_waterPipeline = new FeatureLayer({
		url: url_actual + url_waterPipeline,
		title: "actual_供水管道",
		outFields: ["*"]
	});
	var layer_actual_grave = new FeatureLayer({
		url: url_actual + url_grave,
		title: "actual_坟墓",
		outFields: ["*"]
	});
	var layer_actual_groundobjects = new FeatureLayer({
		url: url_actual + url_groundobjects,
		title: "actual_独立地物",
		outFields: ["*"]
	});

	/*permitsLayer，这个是这个链接：https://gis.gwpdi.com:6443/arcgis/rest/services/BaiGuan_TestTif/MapServer即那个项目区带状底图影像*/
	var permitsLayer = new MapImageLayer({
		url: url_first + "/BaiGuan_TestTif/MapServer",
		title: "带状底图影像",
		listMode: "hide"
	});
	/*meshlayer，这个是这个链接：https://gis.gwpdi.com:6443/arcgis/rest/services/Hosted/fuba/SceneServer就是那个无人机三维模型*/
	var meshlayer = new IntegratedMeshLayer({
		url: url_first + "/Hosted/fuba/SceneServer",
		listMode: "hide"
	});

	var resultsLayer = new GraphicsLayer({
		listMode: "hide"
	});

	var map = new Map({
		layers: [TiandiImageLayer, TiandiImageAnnoLayer, permitsLayer,
			layer_plan_zdfw,
			layer_actual_zdfw,
			layer_plan_landclass,
			layer_actual_landclass,
			layer_plan_irrigation,
			layer_actual_irrigation,
			layer_plan_building,
			layer_actual_building,
			layer_plan_pool,
			layer_actual_pool,
			layer_plan_channel,
			layer_actual_channel,
			layer_plan_electric,
			layer_actual_electric,
			layer_plan_oilgas_pipeline,
			layer_actual_oilgas_pipeline,
			layer_plan_railway,
			layer_actual_railway,
			layer_plan_highway,
			layer_actual_highway,
			layer_plan_villageTraffic,
			layer_actual_villageTraffic,
			layer_plan_roaddrainage,
			layer_actual_roaddrainage,
			layer_plan_wall,
			layer_actual_wall,
			layer_plan_waterPipeline,
			layer_actual_waterPipeline,
			layer_plan_grave,
			layer_actual_grave,
			layer_plan_groundobjects,
			layer_actual_groundobjects,
			meshlayer, resultsLayer
		],
		ground: "world-elevation"
	});

	var view = new SceneView({
		container: "app",
		map: map,
		center: [106.539749, 23.923348],
		zoom: 14,
		popup: {
			dockEnabled: true,
			dockOptions: {
				position: "top-right",
				breakpoint: false
			}
		}
	});

	// add the toolbar for the measurement widgets
	view.ui.add("topbar", "top-right");
	view.ui.move(['zoom', 'navigation-toggle', 'compass'], 'bottom-right');

	view.when(function () {
		view.ui.add("optionsDiv", "bottom-left");
		var layerList = new LayerList({
			view: view
		});

		// Add widget to the top right corner of the view
		view.ui.add(layerList, "top-right");
	});

	/**-------------测量距离、测量面积---------------**/
	var activeWidget = null;
	document.getElementById("distanceButton").addEventListener("click", function () {
		setActiveWidget(null);
		if (!this.classList.contains("active")) {
			setActiveWidget("distance");
		} else {
			setActiveButton(null);
		}
	});

	document.getElementById("areaButton").addEventListener("click", function () {
			setActiveWidget(null);
			if (!this.classList.contains("active")) {
				setActiveWidget("area");
			} else {
				setActiveButton(null);
			}
		});

	function setActiveWidget(type) {
		switch (type) {
			case "distance":
				activeWidget = new DirectLineMeasurement3D({
					view: view
				});

				// skip the initial 'new measurement' button
				activeWidget.viewModel.newMeasurement();

				view.ui.add(activeWidget, "top-right");
				setActiveButton(document.getElementById("distanceButton"));
				break;
			case "area":
				activeWidget = new AreaMeasurement3D({
					view: view
				});

				// skip the initial 'new measurement' button
				activeWidget.viewModel.newMeasurement();

				view.ui.add(activeWidget, "top-right");
				setActiveButton(document.getElementById("areaButton"));
				break;
			case null:
				if (activeWidget) {
					view.ui.remove(activeWidget);
					activeWidget.destroy();
					activeWidget = null;
				}
				break;
		}
	}

	function setActiveButton(selectedButton) {
		// focus the view to activate keyboard shortcuts for sketching
		view.focus();
		var elements = document.getElementsByClassName("active");
		for (var i = 0; i < elements.length; i++) {
			elements[i].classList.remove("active");
		}
		if (selectedButton) {
			selectedButton.classList.add("active");
		}
	}

	/**------------图例------------**/
	const legend = new Expand({
		content: new Legend({
			view: view,
			style: "classic", // other styles include 'classic'
			title: "图例"
		}),
		view: view,

		expanded: false
	});

	view.ui.add(legend, "bottom-right");

	//点击视窗进行碰撞检测，检测点击的目标graphic

	view.on("click", function (evt) {
		view.hitTest(evt).then(function (response) {
			var clickLandType = '',
					clickNum = '';
			if (highlightSelect) {
				highlightSelect.remove();
			}

			if (response.results.length) {
				var graphic = response.results[0].graphic;

				view.whenLayerView(graphic.layer).then(function (layerView) {
					highlightSelect = layerView.highlight(graphic);
				});

				view.goTo({
					target: graphic,
				});
				graphic.layer.source.layerDefinition.name;
				clickLandType = graphic.layer.source.layerDefinition.name
				clickNum = graphic.attributes.CODE
				console.log(clickLandType);
				console.log(clickNum);
				// alert(2)
				console.log(document.getElementsByClassName('mapLayer'));
				// document.getElementsByClassName('mapLayer').style.display == 'block'
				// document.getElementsByClassName('mapLayer').style.display = 'block'
			}

		})
	});

	var highlightSelect;
	/*
	  单击一条数据高亮
	  isPlanAct:1计划0实际
	  fType:tab页签类型td(土地),fw(房屋),fm(坟墓),fs(附属)
	  sType:附属类型category字段,
	  mapCode:点击数据的mapCode
	*/
	doGl = function (isPlanAct, fType, sType, mapCode) {
		if (highlightSelect) {
			highlightSelect.remove();
		}
		var urlStr = url_actual;
		var layerStr = "actual";
		if (isPlanAct == "1") { //计划
			urlStr = url_plan;
			layerStr = "plan";
		}

		if (fType == "td") {
			highlightExt(urlStr + url_landclass, eval("layer_" + layerStr + "_landclass"), mapCode);
		}
		if (fType == "fw") {
			highlightExt(urlStr + url_building, eval("layer_" + layerStr + "_building"), mapCode);
		}
		if (fType == "fm") {
			highlightExt(urlStr + url_grave, eval("layer_" + layerStr + "_grave"), mapCode);
		}
		if (fType == "fs") {
			if (sType == "02") { //围墙
				highlightExt(urlStr + url_wall, eval("layer_" + layerStr + "_wall"), mapCode);
			} else {
				highlightExt(urlStr + url_building, eval("layer_" + layerStr + "_building"), mapCode);
				highlightExt(urlStr + url_groundobjects, eval("layer_" + layerStr + "_groundobjects"), mapCode);
			}
		}
	}

	var peakResults;

	function highlightExt(urlStr, operLayer, mapCode) {
		var qTask = new QueryTask({
			url: urlStr
		});

		var params = new Query({
			returnGeometry: true,
			outFields: ["*"]
		});
		params.where = "CODE ='" + mapCode + "'";

		qTask.execute(params).then(function (response) {
			peakResults = response.features.map(function (feature) {
				return feature;
			});
			view.whenLayerView(operLayer).then(function (layerView) {
				highlightSelect = layerView.highlight(
					peakResults
				);
			});
			view.goTo(peakResults);
		}).catch(promiseRejected);
	}
	// Called each time the promise is rejected
	function promiseRejected(error) {
		console.error("错误信息: ", error.message);
	}

	layervisible = function (operLayer, visibleB) {
		eval(operLayer).visible = visibleB;
	}

});