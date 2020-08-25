import { query } from './utils';
import calculator from './components/calculator';
import log from './components/log';

calculator(query('[data-calculator-form]'));
log(query('[data-log]'));
