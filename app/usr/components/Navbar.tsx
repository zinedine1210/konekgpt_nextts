export default function Navbar() {
    return (
      <nav className='w-full py-2 bg-blue-500 px-5 text-white'>
        <div className='flex items-center justify-between'>
          <div>
            <h1>Web Title</h1>
          </div>
  
          <div className='flex items-center gap-5'>
            <button className='w-10 h-10 rounded-full bg-white'></button>
          </div>
        </div>
      </nav>
    )
  }
  