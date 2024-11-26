<template>
  <div id="content">
    <div id="viewDiv" class="h-full" :style="style"></div>
  </div>
</template>

<script setup lang="ts">
import { setDefaultOptions, loadModules } from 'esri-loader'

const emit = defineEmits(['getLocation'])

// Define props to use in the component
const props = defineProps({
  isGetLocation: {
    type: Boolean,
    default: false,
  },
  location: {
    type: Object,
    default: {} as Object,
  },
  style: {
    type: String,
    default: 'height: calc(100vh - 110px);',
  },
})

const { t } = useI18n()

// Initialize the map and its layers/widgets
const init = () => {
  setDefaultOptions({ version: '4.26' })
  loadModules([
    'esri/views/MapView',
    'esri/WebMap',
    'esri/Map',
    'esri/Basemap',
    'esri/Graphic',
    'esri/layers/WebTileLayer',
    'esri/layers/TileLayer',
    'esri/layers/BaseElevationLayer',
    'esri/layers/ElevationLayer',
    'esri/layers/VectorTileLayer',
    'esri/layers/GraphicsLayer',
    'esri/widgets/BasemapToggle',
    'esri/widgets/Home',
    'esri/widgets/Compass',
    'esri/widgets/ScaleBar',
    'esri/widgets/Expand',
    'esri/widgets/LayerList',
    'esri/widgets/Legend',
    'esri/symbols/PictureMarkerSymbol',
  ])
    .then(
      ([
        MapView,
        WebMap,
        Map,
        Basemap,
        Graphic,
        WebTileLayer,
        TileLayer,
        BaseElevationLayer,
        ElevationLayer,
        VectorTileLayer,
        GraphicsLayer,
        BasemapToggle,
        Home,
        Compass,
        ScaleBar,
        Expand,
        LayerList,
        Legend,
        PictureMarkerSymbol,
      ]) => {
        const initialViewParams = {
          zoom: 12,
          center: props.location
            ? [props.location.lon, props.location.lat]
            : [21.028511, 105.804817],
          // container: this.$el, // use same container for views
          container: 'viewDiv', // use same container for views
          ui: {
            components: ['attribution'],
          },
          popup: {
            dockEnabled: true,
            dockOptions: {
              // Ignore the default sizes that trigger responsive docking
              breakpoint: false,
            },
            visibleElements: {
              featureNavigation: false,
            },
          },
          highlightOptions: {
            // color: [255, 255, 0, 1],
            fillOpacity: 0,
          },
        }
        const worldImagery = new VectorTileLayer({
          url: 'https://vector.wemap.asia/styles/osm-bright/style.json',
          // copyright: 'FIMO JSC',
          attributes: '123',
        })
        const adminSea = new TileLayer({
          url: 'https://tiles.arcgis.com/tiles/EaQ3hSM51DBnlwMq/arcgis/rest/services/VietnamLabels/MapServer',
        })
        const googleBaseMap = new WebTileLayer({
          // urlTemplate: 'https://mts{subDomain}.google.com/vt?lyrs=y&x={col}&y={row}&z={level}&s=Gal&apistyle=s.e%3Ag.f',
          urlTemplate:
            'https://mts{subDomain}.google.com/vt?lyrs=s&x={col}&y={row}&z={level}',
          subDomains: ['0', '1', '2', '3'],
          // copyright: 'FIMO JSC',
          opacity: 1,
        })
        const satellite = new Basemap({
          baseLayers: [googleBaseMap, adminSea],
          title: 'Satellite',
          id: 'Satellite',
          thumbnailUrl: '/images/satellite.jpg',
        })
        const WeMap = new Basemap({
          // baseLayers: [tileLayer, adminBasemap, adminSea],
          baseLayers: [worldImagery, adminSea],
          title: 'WeMap',
          id: 'WeMap',
          thumbnailUrl: '/images/topo.jpg',
        })
        const ExaggeratedElevationLayer = BaseElevationLayer.createSubclass({
          properties: {
            exaggeration: 2,
          },
          load() {
            this._elevation = new ElevationLayer({
              url: '//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
            })
            this.addResolvingPromise(this._elevation.load())
          },
          // Fetches the tile(s) visible in the view
          fetchTile(level: any, row: any, col: any, options: any) {
            return this._elevation
              .fetchTile(level, row, col, options)
              .then((data: any) => {
                const { exaggeration } = this

                for (let i = 0; i < data.values.length; i++) {
                  data.values[i] = data.values[i] * exaggeration
                }
                return data
              })
          },
        })

        const map2d = new Map({
          basemap: WeMap, // Basemap layer service
          // ground: 'world-elevation' // Elevation service
          ground: {
            layers: [new ExaggeratedElevationLayer()],
          },
          popup: {
            dockEnabled: true,
            dockOptions: {
              buttonEnabled: false,
              breakpoint: false,
            },
          },
        })
        const mapView = new MapView(initialViewParams)
        mapView.map = map2d

        const graphicsLayer = new GraphicsLayer({ listMode: 'hide' })
        map2d.add(graphicsLayer)
        mapView.on('click', (event: any) => {
          const latitude = event.mapPoint.latitude
          const longitude = event.mapPoint.longitude
          if (props.isGetLocation)
            emit('getLocation', { lat: latitude, lon: longitude })
        })
        mapView.when(() => {})
        // Watch for changes to `props.location` and update the map
        watch(
          props,
          () => {
            const location = props.location
            if (location && location.lat && location.lon) {
              graphicsLayer.removeAll()
              const point = {
                type: 'point', // autocasts as new Point()
                longitude: location.lon,
                latitude: location.lat,
              }
              const iconSymbol = new PictureMarkerSymbol({
                url: '/images/position.png',
                width: 32,
                height: 32,
              })
              const graphicIcon = new Graphic({
                geometry: point,
                symbol: iconSymbol,
              })
              graphicsLayer.add(graphicIcon)
              mapView.goTo(
                {
                  center: [location.lon, location.lat],
                  zoom: 14,
                },
                { duration: 2000 },
              )
            }
          },
          { immediate: true },
        )
      },
    )

    .catch(() => {
      ElMessage.error(t('message.errors.error'))
    })
}

onMounted(() => {
  init()
})
</script>

<style scoped>
@import 'https://js.arcgis.com/4.26/@arcgis/core/assets/esri/themes/light/main.css';
#content {
  width: 100%;
  /* height: calc(100vh - 110px); */
}
</style>
