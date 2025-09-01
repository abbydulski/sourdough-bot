import Chat from '../components/Chat'
import Head from 'next/head'

export default function Home({ theme, setTheme }) {
  return (
    <>
      <Head>
        <title>Sourdough Schedule Bot</title>
        <meta name="description" content="Plan your perfect sourdough baking schedule" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-stone-700 dark:to-stone-800"></div>
          <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30 bg-gradient-to-br from-yellow-200 to-amber-300 dark:from-stone-700 dark:to-stone-800"></div>
        </div>
        <div className="relative bg-gradient-to-br from-white/60 to-white/30 dark:from-stone-800/60 dark:to-stone-900/30 rounded-[28px] p-[1px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)]">
          <div className="rounded-[27px]">
            <Chat theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </main>
    </>
  )
}