import fswatch from 'node-watch'

export function watch(directories, options = {}, onChange) {
  directories.forEach(dir => doWatch(dir, options, onChange)) 
}

let waitForUpdate = false

function doWatch(dir, options, onChange) {
  fswatch(dir, {recursive: true}, (_evt, filename) => {
    if (waitForUpdate) {
      return
    }
    if (watchFileType(filename, options)) {
      waitForUpdate = true
      onChange()
      setTimeout(() => waitForUpdate = false, 400);
    }
  })
}

function watchFileType(filename, options) {
  let watchFile = true
  if (options.include) {
    watchFile &= options.include.some(pattern => filename.match(pattern + "$")) 
  }
  if (options.exclude) {
    watchFile &= !options.exclude.some(pattern => filename.match(pattern)) 
  }
  if (watchFile) {
    console.log('watch file changed:', filename)
  }
  return watchFile
}
