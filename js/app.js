(function () {
    
    var mod = angular.module("Pets", []);

    /* Initialization of Constants */
    mod.constant("Constants", {
        "serviceUrl": "http://agl-developer-test.azurewebsites.net/people.json",
        "petTypes": {
            "dog": "Dog",
            "cat": "Cat",
            "fish": "Fish"
        }
    }
    );
    
    /* Controller Declaration */
    mod.controller("PetsController", PetsController);

    /* Dependency injection */
    PetsController.$inject = ["$scope", "$http", "Constants", "$filter"];

    /* Controller Definition */
    function PetsController($scope, $http, Constants, $filter) {
        $scope.getPetsData = getPetsData;
        $scope.getCatsOfOwner = getCatsOfOwner;
        $scope.isDataAvailable = false;
        $scope.isLoading = false;
        $scope.errorMessage = "";
        $scope.ownersAndTheirPets = [];
        getPetsData();
        
         /**
          * Function that gets the owner and their pets data from the server
          */
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

         /**
          * Creates an array of cats according to the gender of the owner
          * @param {String} ownerGender
          * @returns {Array}
          */
        function getCatsOfOwner(ownerGender) {
            
            // Creates an array of cats alone for every owner (filtering out all other pet types) in the master data set
            var ownerWithCats = $filter('filter')($scope.ownersAndTheirPets, function (owner, index, dataset) {
                owner.pets = $filter('filter')(owner.pets, function (pet) {
                    return pet.type === Constants.petTypes.cat;
                });
                return owner;
            });
            
            // Filters out the owners who do not own any pet
            var catsAccordingToOwnerGender = $filter('filter')(ownerWithCats, function(owner, index, dataset) {
                return owner.gender === ownerGender && owner.pets;
            })
                
            // Returns the final list of all cats owned by all the owners of a particular gender
            return catsAccordingToOwnerGender.reduce(function (accum, item) {
                return accum.concat(item.pets);
            }, []);

        }
    }
})();
