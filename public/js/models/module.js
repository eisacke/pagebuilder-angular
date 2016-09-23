angular
    .module('PageBuilder')
    .factory('Module', Module);

Module.$inject = ['$resource'];

function Module($resource) {
    var url = 'http://localhost:3000/api'

    var ModuleResource = $resource(
    url + '/modules/:id',
    {id: '@_id'},
    {
        'get':       { method: 'GET' },
        'save':      { method: 'POST' },
        'update':    { method: 'PUT' },
        'query':     { method: 'GET', isArray: true},
        'remove':    { method: 'DELETE' },
        'delete':    { method: 'DELETE' },
        'saveOrder': { 
            url: url + '/modules/saveOrder',
            method: 'POST' 
        },
    });
    return ModuleResource;
}