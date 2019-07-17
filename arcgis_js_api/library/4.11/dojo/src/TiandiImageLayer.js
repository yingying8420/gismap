define(["dojo/_base/declare", "dojo/_base/lang", "esri/config", "esri/layers/BaseTileLayer", "esri/request"],
	function (declare, lang, esriConfig, BaseTileLayer, esriRequest) {
		return BaseTileLayer.createSubclass({
			properties: {
				urlTemplate: null
			},
			getTileUrl: function (level, row, col) {
				var url = "http://t" + col % 8 + ".tianditu.gov.cn/DataServer?T=img_w&tk=1b0a9985dc738b91b190888cea15c7ee&x=" + col + "&y=" + row + "&l=" + level;
				return url;

			},
			fetchTile: function (level, row, col) {
				var url = this.getTileUrl(level, row, col);
				return esriRequest(url, {
						responseType: "image"
					})
					.then(function (response) {

						var image = response.data;
						var width = this.tileInfo.size[0];
						var height = this.tileInfo.size[0];

						var canvas = document.createElement("canvas");
						var context = canvas.getContext("2d");
						canvas.width = width;
						canvas.height = height;

						context.drawImage(image, 0, 0, width, height);

						return canvas;
					}.bind(this));
			}
		});
	}
)