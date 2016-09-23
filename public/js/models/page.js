angular
    .module('PageBuilder')
    .factory('Page', Page);

Page.$inject = ['$resource'];

function Page($resource) {
    var url = 'http://localhost:3000/api'

    var PageResource = $resource(
    url + '/pages/:id',
    {id: '@_id'},
    {
        'get':       { method: 'GET' },
        'save':      { method: 'POST' },
        'query':     { method: 'GET', isArray: true},
        'remove':    { method: 'DELETE' },
        'delete':    { method: 'DELETE' }
    });
 return PageResource;
}