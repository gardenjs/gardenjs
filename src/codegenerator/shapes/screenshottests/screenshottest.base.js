import puppeteer from 'puppeteer'
import { routes } from '../.garden/base'
import { dasmap } from '../.garden/importmap'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({ toMatchImageSnapshot })

describe('Component Screenshot Test', () => {
  let browser
  let page
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true })

    const url = 'http://localhost:3010/.garden/gardenframe/'
    page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
    await page.setViewport({ width: 600, height: 800 })
    await page.addStyleTag({
      path: 'garden/screenshottests/disable_animations.css',
    })
  })
  afterAll(async () => {
    await page.close()
    await browser.close()
  })

  for (const [route, { name, fullname: componentName }] of Object.entries(
    routes
  )) {
    const das = dasmap[componentName]
    describe(`Component ${name} at route: ${route}`, () => {
      for (const example of das.examples) {
        const title = example.title
        it(title, async () => {
          await page.evaluate(
            (data) => {
              window.postMessage(data, '*')
            },
            { selectedExample: title, componentName }
          )
          const body = await page.$('body')
          const screenshot = await body.screenshot()
          expect(screenshot).toMatchImageSnapshot()
        })
      }
    })
  }
})
