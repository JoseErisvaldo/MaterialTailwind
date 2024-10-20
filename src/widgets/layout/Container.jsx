

export default function Container ({children})  {
  return(
    <div className="rounded border ml-5 mr-5 h-screen w-screen p-5">
      {children}
    </div>
  )
}