import { crudControllers } from "../../utils/crud";
import model from "../../db/models";


const { Expense } = model

export default crudControllers(Expense);
