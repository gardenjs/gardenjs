import chokidar from 'chokidar'

export function watch(directories, options = {}, onChange) {
  directories.forEach((dir) => doWatch(dir, options, onChange))
}

let waitForUpdate = false

const handleChange = (options, onChange) => (path) => {
  if (waitForUpdate) {
    return
  }
  if (watchFileType(path, options)) {
    waitForUpdate = true
    onChange()
    setTimeout(() => (waitForUpdate = false), 400)
  }
}

function doWatch(dir, options, onChange) {
  const onChangeFunc = handleChange(options, onChange)
  chokidar
    .watch(dir)
    .on('change', onChangeFunc)
    .on('add', onChangeFunc)
    .on('addDir', onChangeFunc)
    .on('unlink', onChangeFunc)
    .on('unlinkDir', onChangeFunc)
}

function watchFileType(filename, options) {
  let watchFile = true
  if (options.include) {
    watchFile &= options.include.some((pattern) =>
      filename.match(pattern + '$')
    )
  }
  if (options.exclude) {
    watchFile &= !options.exclude.some((pattern) => filename.match(pattern))
  }
  if (watchFile) {
    console.log('watch file changed:', filename)
  }
  return watchFile
}
