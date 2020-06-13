import { crudControllers } from "../../utils/crud";
import { Expense } from "../../db/models";

export default crudControllers(Expense)