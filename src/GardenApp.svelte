<script> 
import {initRouter} from '../src/router.js'
import ComponentPage from '../src/components/ComponentPage.svelte'
import Sidebar from './components/sidebar/Sidebar.svelte'
import Topbar from '../src/components/topbar/Topbar.svelte'
import FullScreenLayout from '../src/layouts/FullScreenLayout.svelte'
import LeftRightLayout from '../src/layouts/LeftRightLayout.svelte'
import TopBottomLayout from '../src/layouts/TopBottomLayout.svelte'

let baseurl = '/garden'
let componentname = ''

export let routes
export let navtree
export let dasmap 

let das = {}
let historystate

initRouter(routes, baseurl, (routeobj, state) => {
  if (!routeobj) {
    das = {}
    componentname = ''
  } else {
    componentname = routeobj.fullname
    das = dasmap[componentname] || {}
    historystate = state
  }
})

let showSidebar = true

function handleTopbarOut(evt) {
  showSidebar = evt.detail.active
}

</script>

<FullScreenLayout>
  <TopBottomLayout>
    <div slot="top" class="flexfix">
      <Topbar active={showSidebar} on:out={handleTopbarOut} />
    </div>
    <div slot="bottom" class="full flexgrow">
      <LeftRightLayout>
        <div slot="left" class="flexfix">
          <Sidebar show={showSidebar} rootnode={navtree} />
        </div>
        <div slot="right" class="pane__container">
          <ComponentPage componentname={componentname} das={das} historystate={historystate}/>
        </div>
      </LeftRightLayout>
    </div>
  </TopBottomLayout>
</FullScreenLayout>

<style>
  .full {
    height: 100%;
    width: auto;
    overflow-y: auto;
  }
  .flexgrow {
    flex-grow: 1;
  }
  .pane__container {
    display: flex;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
  }
</style>