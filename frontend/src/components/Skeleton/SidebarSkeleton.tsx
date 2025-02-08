
function SidebarSkeleton() {
    const users = Array(8).fill(null)
  return (
    <aside className=" h-full w-20 md:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-200 w-full p-5">
        <div className="flex items-center gap-2 ">
          <div className="size-8 skeleton">

          </div>
          <h2 className=" hidden md:block font-semibold text-lg h-4 w-28 skeleton"></h2>
        </div>
        {/* TODO: implement the online user functionalutyt */}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map(() => (
          <button
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-200 transition-colors
              
            
            `}
            key={Math.random()}

            
          >
            <div className="relative mx-auto md:mx-0">
              <div
                
                className="size-12 object-cover rounded-full skeleton"
              />
              
                <span className="absolute bottom-0 right-0 skeleton size-3 rounded-full ring-2 ring-zinc-900" />
             
            </div>
            <div className="flex flex-col gap-4">
      <div className="skeleton h-3 w-28"></div>
      <div className="skeleton h-3 w-20"></div>
    </div>
          </button>
        ))}
      </div>
    </aside>
  )
}

export default SidebarSkeleton