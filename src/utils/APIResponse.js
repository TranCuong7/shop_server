const sendErrorResponse = (res, { status = 500, messages }) => {
  return res.status(status).json({ messages: messages })
}

const sendResponse = (res, { status = 500, messages = null, data = null, itemCount = null, pageCount = null, currentPage = null }) => {
  return res.status(status).json({
    ...(messages != null ? { messages: messages } : {}),
    ...(data != null ? { data: data } : {}),
    ...(itemCount != null ? { itemCount } : {}),
    ...(pageCount != null ? { pageCount } : {}),
    ...(currentPage != null ? { currentPage } : {})
  })
}

const json = (res, status, message, data = null) => {
  return res.status(status).json({ status, message, data })
}

const jsonDelete = (res, status, message) => {
  return res.status(status).json({ status, message })
}

module.exports = {
  sendResponse,
  sendErrorResponse,
  json,
  jsonDelete
}
