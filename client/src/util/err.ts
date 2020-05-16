export async function tryCatch(fn) {
  let data, error
  try {
    data = await fn()
  } catch (err) {
    console.error(err)
    error = err
  } finally {
    return [data, error]
  }
}
