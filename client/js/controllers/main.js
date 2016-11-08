// js/controllers/main.js

angular.module('commentController', [])

    .controller('mainController', function ($scope, $http, comment) {

		console.log("in controller");

		$scope.msg = {};

		$scope.getName = function () {

			console.log("func get called");

			comment.get()
				.success(function (data) {
					$scope.comments = data;
					console.log('got the data!::', $scope.comments);
					//googlechart

					$scope.myChartObject = {};
					var datColumns = [];

					$scope.myChartObject.type = "ColumnChart";


					console.log("$scope.comments.length", $scope.comments.length);


					/* angular.forEach($scope.comments,function(value,key){
						jsonData.push({
							name:value.name,
							value:
						}) 
					});*/

					for (var i = 0; i < $scope.comments.length; i++) {
						var jsonData = [];
						if ($scope.comments[i].sentimentValue == "positive") {
							sentValue = "1";
						}
						else if ($scope.comments[i].sentimentValue == "neutral") {
							sentValue = "0";
						}
						else {
							sentValue = "-1";
						}
						jsonData.push({
							"name": $scope.comments[i].name,
							"values": sentValue
						});
						console.log("dataObj:::", jsonData);
						if (angular.isDefined(jsonData)) {
							angular.forEach(jsonData, function (
								value, key) {
								datColumns.push({
									c: [{
										v: value.name
									}, {
											v: value.values
										}]
								});
							});

						}
						console.log("datColumns", datColumns);
					}

					$scope.myChartObject.data = {
						"cols": [
							{ label: "Name", type: "string" },
							{ label: "Sentimence Score", type: "number" }
						], "rows": datColumns
					};

					$scope.myChartObject.options = {
						'title': 'Sample graph'
					};

				})
				.error(function (data) {
					console.log('Error: ' + data);
				});
		};

        // when submitting the add form, send the text to the node API

		$scope.post = function () {

			if (!$.isEmptyObject($scope.msg)) {

				comment.post($scope.msg)
					.success(function (data) {
						$scope.msg = {};
						$scope.comments = data;
						console.log(data);

						//googlechart

						$scope.myChartObject = {};
						var datColumns = [];

						$scope.myChartObject.type = "ColumnChart";


						console.log("$scope.comments.length", $scope.comments.length);


						/* angular.forEach($scope.comments,function(value,key){
							jsonData.push({
								name:value.name,
								value:
							}) 
						});*/

						for (var i = 0; i < $scope.comments.length; i++) {
							var jsonData = [];
							if ($scope.comments[i].sentimentValue == "positive") {
								sentValue = "1";
							}
							else {
								sentValue = "-1";
							}
							jsonData.push({
								"name": $scope.comments[i].name,
								"values": sentValue
							});
							console.log("dataObj:::", jsonData);
							if (angular.isDefined(jsonData)) {
								angular.forEach(jsonData, function (
									value, key) {
									datColumns.push({
										c: [{
											v: value.name
										}, {
												v: value.values
											}]
									});
								});

							}
							console.log("datColumns", datColumns);
						}

						$scope.myChartObject.data = {
							"cols": [
								{ label: "Name", type: "string" },
								{ label: "Sentimence Score", type: "number" }
							], "rows": datColumns
						};

						$scope.myChartObject.options = {
							'title': 'Sample graph'
						};




					})
					.error(function (data) {
						console.log('Error: ' + data);
					});
			};


		};

		$scope.delete = function (id) {
            comment.delete(id)
                // if successful creation, call our get function to get all the new comment
                .success(function (data) {
                    $scope.comments = data; // assign our new list of comment

					//googlechart

					$scope.myChartObject = {};
					var datColumns = [];

					$scope.myChartObject.type = "ColumnChart";


					console.log("$scope.comments.length", $scope.comments.length);


					/* angular.forEach($scope.comments,function(value,key){
						jsonData.push({
							name:value.name,
							value:
						}) 
					});*/

					for (var i = 0; i < $scope.comments.length; i++) {
						var jsonData = [];
						if ($scope.comments[i].sentimentValue == "positive") {
							sentValue = "1";
						}
						else {
							sentValue = "-1";
						}
						jsonData.push({
							"name": $scope.comments[i].name,
							"values": sentValue
						});
						console.log("dataObj:::", jsonData);
						if (angular.isDefined(jsonData)) {
							angular.forEach(jsonData, function (
								value, key) {
								datColumns.push({
									c: [{
										v: value.name
									}, {
											v: value.values
										}]
								});
							});

						}
						console.log("datColumns", datColumns);
					}

					$scope.myChartObject.data = {
						"cols": [
							{ label: "Name", type: "string" },
							{ label: "Sentimence Score", type: "number" }
						], "rows": datColumns
					};

					$scope.myChartObject.options = {
						'title': 'Sample graph'
					};

                });
        };

    });

