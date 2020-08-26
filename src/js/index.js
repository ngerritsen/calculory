import { query } from './utils';
import calculator from './components/calculator';
import log from './components/log';
import * as logService from './service/logService';

calculator(query('[data-calculator-form]'));
log(query('[data-log]'));

logService.init();
