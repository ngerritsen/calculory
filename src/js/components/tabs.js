import { queryAll, addClass, query, removeClass } from '../utils/dom';

const ACTIVE_TRIGGER_CLASSNAME = 'tabs__trigger--active';
const ACTIVE_TAB_CLASSNAME = 'tabs__tab--active';

export default function tabs(element) {
  function init() {
    queryAll('[data-tab-trigger]').forEach((trigger) => {
      trigger.addEventListener('click', activate);
    });
  }

  function activate(event) {
    event.preventDefault();

    const trigger = event.currentTarget;
    const name = trigger.getAttribute('data-tab-trigger');
    const tab = query(`[data-tab="${name}"]`, element);

    deactivateTriggers();
    deactivateTabs();

    addClass(trigger, ACTIVE_TRIGGER_CLASSNAME);
    addClass(tab, 'tabs__tab--active');
  }

  function deactivateTriggers() {
    queryAll('[data-tab-trigger]').forEach((trigger) => {
      removeClass(trigger, ACTIVE_TRIGGER_CLASSNAME);
    });
  }

  function deactivateTabs() {
    queryAll('[data-tab]').forEach((trigger) => {
      removeClass(trigger, ACTIVE_TAB_CLASSNAME);
    });
  }

  init();
}