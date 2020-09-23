import {default as chai} from 'chai'
const expect = chai.expect
import {setRoutes, findRoute} from '../src/router.js'

const Home = 'home'
const About = 'about'
const routes = {
  '/(home)?': Home,
  '/about': About
}
setRoutes(routes)

describe('router', () => {
  describe('find page for route returns component for matching route', () => {
    it('tbd', () => {
      expect(findRoute('/')).to.equal(Home)
      expect(findRoute('/home')).to.equal(Home)
      expect(findRoute('/about')).to.equal(About)
      expect(findRoute('/ABOUT')).to.equal(About)
    })
  })
})


