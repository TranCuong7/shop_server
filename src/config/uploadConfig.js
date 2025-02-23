const fs = require('fs').promises

const UPLOAD_DIRS = {
  TEMP: 'uploads/temp',
  PROCESSED: 'uploads/processed'
}

const ensureDirectories = async () => {
  for (const dir of Object.values(UPLOAD_DIRS)) {
    try {
      await fs.access(dir)
    } catch {
      await fs.mkdir(dir, { recursive: true })
    }
  }
}

module.exports = { UPLOAD_DIRS, ensureDirectories }
