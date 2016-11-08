// js/services/comment.js
angular.module('commentService', [])

    // super simple service
    // each function returns a promise object 
    .factory('comment', function($http) {
        return {
            get : function() {
                return $http.get('/api/comment');
            },
            post : function(commentData) {
                return $http.post('/api/comment', commentData);
            },
			delete : function(id) {
                return $http.delete('/api/comment/' + id);
            }
        }
    });