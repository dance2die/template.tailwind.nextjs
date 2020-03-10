import Head from 'next/head'

const Home = () => (
  <div>
    <Head>
      <title>Create Next App + TailWind</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <main className='w-screen h-screen flex flex-col'>
      <header className='text-center'>
        <h2 className='w-full bg-pink-500 font-serif font-bold text-white p-8 text-3xl'>
          ~Welcome to Next.js 9.3.0 + Tailwind CSS~
        </h2>
      </header>
      <section className='flex-1 flex justify-center items-center'>
        <h2 className='text-6xl'>This is the Body Content</h2>
      </section>
    </main>
  </div>
)

export default Home
