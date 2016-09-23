(function () {
    var mod = angular.module("Pets", []);

    mod.constant("Constants", {
        "serviceUrl": "http://agl-developer-test.azurewebsites.net/people.json",
        "petTypes": {
            "dog": "Dog",
            "cat": "Cat",
            "fish": "Fish"
        }
    }
    );
    mod.controller("PetsController", PetsController);

    PetsController.$inject = ["$scope", "$http", "Constants", "$filter"];

    function PetsController($scope, $http, Constants, $filter) {
        $scope.getPetsData = getPetsData;
        $scope.getCatsOfOwner = getCatsOfOwner;
        $scope.isDataAvailable = false;
        $scope.isLoading = false;
        $scope.errorMessage = "";
        $scope.ownersAndTheirPets = [];
        getPetsData();

        function getPetsData() {
            $scope.isLoading = true;
            $http.get(Constants.serviceUrl)
                .then(function (response) {
                    $scope.isDataAvailable = true;
                    $scope.isLoading = false;
                    $scope.ownersAndTheirPets = response.data;
                    $scope.errorMessage = "";
                    console.log(response.data);

                }, function (response) {
                    $scope.isLoading = false;
                    $scope.errorMessage = "There has been an error. Please try again."
                });

        }

        function getCatsOfOwner(ownerGender) {
            var ownerWithCats = $filter('filter')($scope.ownersAndTheirPets, function (owner, index, dataset) {
                owner.pets = $filter('filter')(owner.pets, function (pet) {
                    return pet.type === Constants.petTypes.cat;
                });
                return owner;
            });
            var catsAccordingToOwnerGender = $filter('filter')(ownerWithCats, function(owner, index, dataset) {
                return owner.gender === ownerGender && owner.pets;
            })
                
            return catsAccordingToOwnerGender.reduce(function (accum, item) {
                return accum.concat(item.pets);
            }, []);

        }
    }
})();