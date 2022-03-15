<script> 
import {initRouter} from '../src/router.js'
import ComponentPage from './components/stage/Stage.svelte'
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
    <div slot="top" class="is-flexfix">
      <Topbar active={showSidebar} on:out={handleTopbarOut} />
    </div>
    <div slot="bottom" class="is-full is-flexgrow">
      <LeftRightLayout>
        <div slot="left" class="is-flexfix">
          <Sidebar show={showSidebar} rootnode={navtree} />
        </div>
        <div slot="right" class="main">
          <ComponentPage componentname={componentname} das={das} historystate={historystate}/>
        </div>
      </LeftRightLayout>
    </div>
  </TopBottomLayout>
</FullScreenLayout>

<style>
.main {
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>