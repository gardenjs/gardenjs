
<script> 
import {initRouter} from '../src/router.js'
import LeftRightLayout from '../src/layouts/left-right.layout.svelte'
import Nav from '../src/components/Nav.svelte'
import ComponentPage from '../src/components/ComponentPage.svelte'
import Component from './components/Component.svelte'

const components = [
  {name: 'Component', component: Component, route: '/component', filename: './components/Component.svelte', das: {'name':'A Component','description':'only for testing purpose'}}
]

const routes = {
  '/component': Component
}

let navitems = [
  {href: '/component', text: 'Component', page: Component}
]

let baseurl = '/components'
let selected = ''
let das = {}

initRouter(routes, baseurl, (component) => { 
  selected = component 
  if (component) das = components.find(c => c.component == component).das
  else das = {}
})

let selectedItem
$: {
  selectedItem = navitems.find(item => item.page === selected)
}

</script>

<LeftRightLayout>
  <div slot="left" class="full">
    <Nav items={navitems} active={selectedItem} />
  </div>
  <div slot="right" class="full">
    <ComponentPage component={selected} das={das}/>
  </div>
</LeftRightLayout>
