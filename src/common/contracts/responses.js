module.exports.SuccessResponse = class SuccessResponse {
  constructor(content) {
    this.error = null;
    this.content = content;
  }

  static create(content = {}) {
    return new SuccessResponse(content);
  }
};

module.exports.FailResponse = class FailResponse {
  constructor(errorProps) {
    const error = {
      msg: errorProps.msg,
      reason: errorProps.reason,
      url: errorProps.url,
      ip: errorProps.ip,
      validationErrors: errorProps.validationErrors
    };
    this.error = error;
    this.content = null;
  }

  static create({ msg, reason, url, ip, validationErrors = [] }) {
    return new FailResponse({ msg, reason, url, ip, validationErrors });
  }
};
