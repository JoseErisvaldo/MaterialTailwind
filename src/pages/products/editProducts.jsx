import { useParams } from "react-router-dom";
import EditProduct from "../../components/products/EditProduct";
import ContainerChildren from "../../widgets/layout/ContainerChildren";

export default function EditProducts () {
  const {id} = useParams()
  return(
    <ContainerChildren title={'Editar produto'} filter={'Filtrar'} exportCSV={'exportCSV'}>
      <div>
        <EditProduct productId={id}/>
      </div>
    </ContainerChildren>
  )
}