import { createRoot } from 'react-dom/client'
import './index.css'
import './print.css'
import './assets/dataConsistency' // Auto-run data validation in dev mode
import Layout from './Layout'
import { BrowserRouter} from 'react-router'
import { ThemeEngine } from './components/theme'
import { LangEngine } from './components/language'
import { FlashsEngine } from './components/flashs'
import { RetexDisplayEngine } from './components/retex'
import { registerSW } from 'virtual:pwa-register'
import { AnimatedRoutes } from './components/AnimatedRoutes'

// Register service worker
if ('serviceWorker' in navigator) {
  registerSW({
    immediate: true,
    onNeedRefresh() {
      console.log('New content available, please refresh.');
    },
    onOfflineReady() {
      console.log('App ready to work offline');
    },
  });
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LangEngine>
      <ThemeEngine>
        <FlashsEngine>
          <RetexDisplayEngine>
            <Layout>
              <AnimatedRoutes />
            </Layout>
          </RetexDisplayEngine>
        </FlashsEngine>
      </ThemeEngine>
    </LangEngine>
  </BrowserRouter>,
)
