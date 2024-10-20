import { Card } from "@material-tailwind/react";
import BarChart from "../../data/charts/BarChart";
import LineChart from "../../data/charts/LineChart";
import ContainerChildren from "../../widgets/layout/ContainerChildren";
import PiwChart from "../../data/charts/PieChart";

export default function Home () {
  return(
    <ContainerChildren title={'Dashboard'} filter={'Filtrar'} exportCSV={'exportCSV'}>
      <div className="grid grid-cols-3 gap-5">
        <div className="h-full">
          <LineChart /> 
        </div>
        <div className="h-full">
          <BarChart />
        </div>
        <div className="h-full">
          <PiwChart />
        </div>
        
      </div>
    </ContainerChildren>
  )
}