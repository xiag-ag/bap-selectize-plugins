'use strict';

Selectize.define('disabled_options', function () {
    var onOptionSelect = this.onOptionSelect;

    this.onOptionSelect = function (e) {
        var $option = $(e.currentTarget),
            isDisabled = $option.is('.disabled') || $option.is(':disabled');

        if (isDisabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        return onOptionSelect.apply(this, arguments);
    };
});
