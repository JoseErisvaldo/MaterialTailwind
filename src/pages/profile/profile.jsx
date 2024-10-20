import { ProfileCard } from "../../components/profile";
import ContainerChildren from "../../widgets/layout/ContainerChildren";

export default function Profile () {
  return(
    <ContainerChildren title={'Produtos'} filter={'Filtrar'} exportCSV={'exportCSV'}>
      <div>
        <ProfileCard/>
      </div>
    </ContainerChildren>
  )
}