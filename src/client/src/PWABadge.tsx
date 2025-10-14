import { Button } from './components/ui/button'
import { useRegisterSW } from 'virtual:pwa-register/react'

function PWABadge() {
  // periodic sync is disabled, change the value to enable it, the period is in milliseconds
  // You can remove onRegisteredSW callback and registerPeriodicSync function
  const period = 0

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(period, swUrl, r)
      }
      else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target as ServiceWorker
          if (sw.state === 'activated')
            registerPeriodicSync(period, swUrl, r)
        })
      }
    },
  })

  function close() {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <div className="" role="alert" aria-labelledby="toast-message">
      { (offlineReady || needRefresh)
      && (
        <div className="fixed right-0 w-fit top-30 m-12 p-10 border text-left z-1 shadow-lg bg-white">
          <div className="mb-6">
            { offlineReady
              ? <span id="toast-message">App ready to work offline</span>
              : <span id="toast-message">New content available, click on reload button to update.</span>}
          </div>
          <div className="w-full flex justify-center gap-6">
            { needRefresh && <Button className="bg-lime-600 text-white" onClick={() => updateServiceWorker(true)}>Reload</Button> }
            <Button onClick={() => close()}>Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PWABadge

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(period: number, swUrl: string, r: ServiceWorkerRegistration) {
  if (period <= 0) return

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine)
      return

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        'cache': 'no-store',
        'cache-control': 'no-cache',
      },
    })

    if (resp?.status === 200)
      await r.update()
  }, period)
}
