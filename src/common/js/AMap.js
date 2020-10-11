export default class Map {
  constructor(container) {
    let _this = this;
    this.map = new AMap.Map(container, {
      zoom: 4
    });
    
    AMap.plugin([
        'AMap.ToolBar',
    ], function(){
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        _this.map.addControl(new AMap.ToolBar({
            // 简易缩放模式，默认为 false
            liteStyle: true
        }));
    });

    this.SimpleMarker = null;
    this.polylines = []
  }

  loadMarker(callback) {
    let self = this;
    if (self.SimpleMarker) {
      callback(self.SimpleMarker);
    } else {
      AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
        self.SimpleMarker = SimpleMarker;
        callback(SimpleMarker);
      })
    }
  }

  addStartMarker(position) {
    // 创建一个 Icon
    var startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 34),
        // 图标的取图地址
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        // 图标所用图片大小
        imageSize: new AMap.Size(135, 40),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-9, -3)
    });

    // 将 icon 传入 marker
    var startMarker = new AMap.Marker({
        position: new AMap.LngLat(position.split(',')[0],position.split(',')[1]),
        icon: startIcon,
        offset: new AMap.Pixel(-13, -30)
    });
    this.map.add(startMarker);
    return startMarker;
  }

  addEndMarker(position) {
    // 创建一个 icon
    var endIcon = new AMap.Icon({
        size: new AMap.Size(25, 34),
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        imageSize: new AMap.Size(135, 40),
        imageOffset: new AMap.Pixel(-95, -3)
    });

    // 将 icon 传入 marker
    var endMarker = new AMap.Marker({
        position: new AMap.LngLat(position.split(',')[0],position.split(',')[1]),
        icon: endIcon,
        offset: new AMap.Pixel(-13, -30)
    });
    this.map.add(endMarker);
    return endMarker;
  }

  addDriverMarker(position) {
    // 创建一个 icon
    var icon = new AMap.Icon({
      size: new AMap.Size(38, 38),
      image: 'http://yizhuxing.oss-cn-beijing.aliyuncs.com/1577676163489car.png',
      imageSize: new AMap.Size(38, 38),
      imageOffset: new AMap.Pixel(-3, -3)
    });

    // 将 icon 传入 marker
    var marker = new AMap.Marker({
        position: new AMap.LngLat(position.split(',')[0],position.split(',')[1]),
        icon: icon,
        offset: new AMap.Pixel(-13, -30)
    });
    this.map.add(marker);debugger
    return marker;
  }

  setMarkerPosition(marker, lnglat) {
    marker.setPosition(new AMap.LngLat(lnglat.split(',')[0],lnglat.split(',')[1]));
  }

  drawDrivingPath(start, end) {
    let _this = this;
    var driving = new AMap.Driving({
      policy: AMap.DrivingPolicy.LEAST_TIME
    })
  
    let startLngLat = new AMap.LngLat(start.split(',')[0],start.split(',')[1]);
    let endLngLat = new AMap.LngLat(end.split(',')[0],end.split(',')[1]);debugger
    driving.search(startLngLat, endLngLat, function (status, result) {
      if (status === 'complete') {
        let path = [];
        result.routes[0].steps.forEach(item => {
          item.path.forEach(pathItem => {
            path.push(new AMap.LngLat(pathItem.lng, pathItem.lat));
          })
        });
        var polyline = new AMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: '#ffeeff',
          borderWeight: 3,
          strokeColor: "#3366FF", 
          strokeOpacity: 1,
          strokeWeight: 6,
          strokeStyle: "solid",
          strokeDasharray: [10, 5],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 50,
        })

        _this.map.add(polyline);
        _this.polylines.push(polyline);
      }
    })
  }

  setFitView() {
   var newCenter = this.map.setFitView();
   newCenter.getCenter();
  }

  remove(marker) {
    this.map.remove(marker);
  }

  claerAllPolylines() {
    this.map.remove(this.polylines);
    this.polylines = [];
  }

  setMapStyle(style) {
    this.map.setMapStyle(`amap://styles/${style}`);
  }
}