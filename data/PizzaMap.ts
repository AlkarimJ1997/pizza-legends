import { s001, v001, f001 } from './pizzas';

type PizzaName = 's001' | 'v001' | 'f001';

const Pizzas: Record<PizzaName, PizzaConfig> = {
	s001,
	v001,
	f001,
};

export default Pizzas;
