import { Button } from "@material-tailwind/react";


export default function ContainerChildren ({children,title,filter,exportCSV})  {
  return(
    <div className="">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-body">{title}</h1>
        </div>
        <div className="flex gap-3">
          <Button color="blue">{filter}</Button>
          <Button color="blue">{exportCSV}</Button>
        </div>
      </div>
      {children}
    </div>
  )
}