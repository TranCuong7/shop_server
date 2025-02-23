const cron = require('node-cron')
const fs = require('fs')
const path = require('path')

const tmpDir = path.join(__dirname, '../', 'storage', 'tmp')

function startCronJobs() {
  cron.schedule('00 00 * * *', async () => {
    try {
      const files = await fs.promises.readdir(tmpDir)
      for (let file of files) {
        const filePath = path.join(tmpDir, file)
        try {
          await fs.promises.unlink(filePath)
        } catch (err) {
          console.error(`CRON JOB Lỗi khi xoá file: ${filePath}`, err)
        }
      }
    } catch (err) {
      console.error('CRON JOB Lỗi trong quá trình dọn dẹp thư mục tmp:', err)
    }
  })
}

module.exports = { startCronJobs }
