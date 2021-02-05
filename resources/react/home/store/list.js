const LIST_SEARCH = 'LIST_SEARCH';
const LIST_TOGGLE = 'LIST_TOGGLE';


exports.search = w => ({type: LIST_SEARCH, w});
exports.toggle = id => ({type: LIST_TOGGLE, id});

exports.init = {search: '', exploded: {}};

exports.handlers = {
    [LIST_SEARCH]: (s, {w}) => ({...s, search: w}),
    [LIST_TOGGLE]: (s, {id}) => ({...s, exploded: {...s.exploded, [id]: !s.exploded[id]}}),
}

exports.getSearch = s => s.list.search;
exports.getIsExploded = id => s => !!s.list.exploded[id];

