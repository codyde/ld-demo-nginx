export default function Release () {
return (
    <div className="grid h-1/2 grid-cols-4 place-items-center">
      <div className="grid grid-cols-5 col-span-5 space-x-4">
        <div className={`App-fade text-white shadow-2xl bg-ldgray px-1 xl:px-8 xl:py-5`}>
          <p className="text-base xl:text-3xl 2xl:text-4xl my-5 place-items-center">
            Build
          </p>
        </div>
        <div className={`App-fade text-white shadow-2xl bg-ldgray px-1 xl:px-8 xl:py-5`}>
          <p className="text-base xl:text-3xl 2xl:text-4xl my-5 place-items-center">
            Push
          </p>
        </div>
        <div className={`App-fade text-white shadow-2xl bg-ldgray px-1 xl:px-8 xl:py-5`}>
          <p className="text-base xl:text-3xl 2xl:text-4xl my-5 place-items-center">
            Deploy
          </p>
        </div>
        <div className={`App-fade text-white shadow-2xl bg-ldgray border-ldpurple border-4 px-1 xl:px-8 xl:py-5`}>
          <p className="text-base xl:text-3xl 2xl:text-4xl my-5 place-items-center">
            Release
          </p>
        </div>
        <div className={`App-fade text-white shadow-2xl bg-ldgray px-1 xl:px-8 xl:py-5`}>
          <p className="text-base xl:text-3xl 2xl:text-4xl my-5 place-items-center">
            Consume
          </p>
        </div>
      </div>
    </div>
)
}