import puppeteer from 'puppeteer'
import {routes} from '../garden/base'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({ toMatchImageSnapshot })

describe('Component Screenshot Test', () => {
  let browser
  let page
  beforeAll(async () => {
    browser = await puppeteer.launch({headless: true})

    const url = 'http://localhost:3010/garden/gardenframe/'
    page = await browser.newPage()
    await page.goto(url, {waitUntil: 'networkidle0', timeout: 60000})
    await page.setViewport({width: 600, height: 800})
  })
  afterAll(async () => {
    await page.close()
    await browser.close()
  })

  for (const [route, {fullname: componentname, das}] of Object.entries(routes)) {
    describe(`Component at route: ${route}`, () => {
      for (const selectedExample of das.examples) {
        const story = selectedExample.story
        it(`Story: '${story}'`, async () => {
          await page.evaluate((data) => {
            window.postMessage(data, '*')
          }, {selectedExample, das, componentname})
          const body = await page.$('body')
          const screenshot = await body.screenshot()
          expect(screenshot).toMatchImageSnapshot()
        })
      }
    })
  }
})

