import { query } from './utils';
import calculator from './components/calculator';
import log from './components/log';
import output from './components/output';

calculator(query('[data-calculator-form]'));
output(query('[data-calculator-output]'));
log(query('[data-log]'));
