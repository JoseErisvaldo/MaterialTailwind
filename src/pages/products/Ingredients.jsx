import CreateIngredients from "../../components/products/CreateIngredients";
import { TableIngredients } from "../../components/products/TableIngredients";
import ContainerChildren from "../../widgets/layout/ContainerChildren";

export default function Ingredients () {
  return(
    <ContainerChildren title={'Ingredientes'} filter={'Filtrar'} exportCSV={'exportCSV'}>
      <div>
        <CreateIngredients />
        <TableIngredients />
      </div>
    </ContainerChildren>
  )
}