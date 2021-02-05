const NAV_EDIT = 'NAV_EDIT';
const NAV_HOME = 'NAV_HOME';


exports.edit = (id) => ({type: NAV_EDIT, id});
exports.home = () => ({type: NAV_HOME});

exports.init = {edit: null};

exports.handlers = {
    [NAV_EDIT]: (s, {id}) => ({...s, edit: id}),
    [NAV_HOME]: (s) => ({...s, edit: null}),
}

exports.getEditId = s => s.nav.edit;
