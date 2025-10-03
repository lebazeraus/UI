export default defineNuxtPlugin((nuxtApp) => {
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
      },
      back: (options) => {
        const { back, current } = nuxtApp.$router.options.history.state

        if (!back || (back === current)) {
          navigateTo(options?.returnUltimately || '/', { replace: true })
        } else {
          navigateTo(back, { replace: true })
        }
      }
    }
  }
})
