const NAV_EDIT = 'NAV_EDIT';


exports.edit = (id) => ({type: NAV_EDIT, id});

exports.init = {edit: null};

exports.handlers = {
    [NAV_EDIT]: (s, {id}) => ({...s, edit: id}),
}

exports.getEditId = s => s.nav.edit;
