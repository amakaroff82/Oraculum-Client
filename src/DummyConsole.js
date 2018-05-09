// prevents errors/security problems in production by stubbing out the console object

export default () => {
  const noOp = () => {
    /* no-op function */
  };

  window.console = {
    log: noOp,
    warn: noOp,
    error: noOp,
    info: noOp,
  };
};
