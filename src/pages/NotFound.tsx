export default function NotFound() {
  return (
    <main className="h-screen grid min-h-full place-items-center bg-black px-6 py-24 sm:py-32 lg:px-8 ">
      <div className="text-center">
        <p className="text-base font-semibold text-main">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-main sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-white">
          존재하지 않는 페이지입니다.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-main text-black px-3.5 py-2.5 text-sm font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            Go back home
          </a>
        </div>
      </div>
    </main>
  );
}
