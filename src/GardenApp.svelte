
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
// export let componentmap 

let das = {}
let historystate

initRouter(routes, baseurl, (routeobj, state) => {
  if (!routeobj) {
    das = {}
    componentname = ''
  } else {
    das = routeobj.das || {}
    componentname = routeobj.fullname
    historystate = state
  }
})

let showSidebar = true

function handleTopbarOut(evt) {
  console.log('side', evt.detail)
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
        <div slot="left" class="flexfix bg-primary">
          <Sidebar show={showSidebar} rootnode={navtree} />
        </div>
        <div slot="right" class="full flexgrow pane__container">
          <ComponentPage componentname={componentname} das={das} historystate={historystate}/>
        </div>
      </LeftRightLayout>
    </div>
  </TopBottomLayout>
</FullScreenLayout>
