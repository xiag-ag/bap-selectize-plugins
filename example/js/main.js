$('select[name="C"]').selectize({
    plugins: ['caret_button'],
    valueField: 'id',
    labelField: 'title',
    searchField: 'title',
    maxItems: 1,
    openOnFocus: false,
    createOnBlur: true,
    selectOnTab: true,
    placeholder: '- select -'
});