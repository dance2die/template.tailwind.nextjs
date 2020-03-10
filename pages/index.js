import Head from "next/head";

const Home = () => (
  <div className="container">
    <Head>
      <title>Create Next App + TailWind</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="w-screen">
      <header>
        <h2 className="bg-pink-500 font-serif font-bold text-white p-4 text-2xl">
          ~Welcome to Next.js 9.3.0 + Tailwind CSS~
        </h2>
      </header>
      <section>
        body content
      </section>
    </main>
  </div>
);

export default Home;
