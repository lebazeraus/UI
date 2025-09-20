export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatError: (error) => {
        return error?.data?.data?.data ||
          error?.data?.data?.error ||
          error?.data?.data?.message ||
          error?.data?.message ||
          error?.data?.data ||
          error?.data?.error ||
          error?.message ||
          error?.data?.detail?.[0]?.msg ||
          error
      }
    }
  }
})
