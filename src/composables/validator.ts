export const validateEmail = (rule: any, value: string, callback: any) => {
  const regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,})+$/
  if (!value) {
    callback(new Error('Please input the Email'))
  } else if (!value.match(regex)) {
    callback(new Error('Email is not valid'))
  } else {
    callback()
  }
}
