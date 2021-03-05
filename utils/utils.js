const validateParams = (params) => {
  const match = params.toString().match(/[a-z]/ig)
  if (!match) {
    return true
  } else {
    return false
  }
}

module.exports.validateParams = validateParams