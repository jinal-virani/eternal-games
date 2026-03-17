function Skeleton({ count = 0 }) {
  return (
      <div className="bg-[#d9f6f8] grid grid">
        {Array(count).fill(1).map((card, index) => (
                <div key={index} className="border border-gray-300 shadow rounded-md p-4  max-w-sm w-full mx-auto  m-10 py-10">
                  <div className="animate-pulse flex-col justify-center items-center space-x-4">
                    <div className="rounded-lg bg-slate-700 h-40 w-40 ml-24 mb-8"></div>
                    <div className="flex-1 pl-12 space-y-6 py-1">
                      <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
            )
        )}
      </div>
  )
}
export default Skeleton
