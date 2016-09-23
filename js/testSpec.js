// Test suite for the controller
describe('PetsController', function () {

    var sampleData = [
        {
            "name": "Bob",
            "gender": "Male",
            "age": 23,
            "pets": [
                {
                    "name": "Garfield",
                    "type": "Cat"
                },
                {
                    "name": "Fido",
                    "type": "Dog"
                }
            ]
        },
        {
            "name": "Jennifer",
            "gender": "Female",
            "age": 18,
            "pets": [
                {
                    "name": "Garfield",
                    "type": "Cat"
                }
            ]
        },
        {
            "name": "Steve",
            "gender": "Male",
            "age": 45,
            "pets": null
        },
        {
            "name": "Fred",
            "gender": "Male",
            "age": 40,
            "pets": [
                {
                    "name": "Tom",
                    "type": "Cat"
                },
                {
                    "name": "Max",
                    "type": "Cat"
                },
                {
                    "name": "Sam",
                    "type": "Dog"
                },
                {
                    "name": "Jim",
                    "type": "Cat"
                }
            ]
        },
        {
            "name": "Samantha",
            "gender": "Female",
            "age": 40,
            "pets": [
                {
                    "name": "Tabby",
                    "type": "Cat"
                }
            ]
        },
        {
            "name": "Alice",
            "gender": "Female",
            "age": 64,
            "pets": [
                {
                    "name": "Simba",
                    "type": "Cat"
                },
                {
                    "name": "Nemo",
                    "type": "Fish"
                }
            ]
        }
    ];

    var serviceUrl = "http://agl-developer-test.azurewebsites.net/people.json";

    // Gets the angular module before each test spec is run
    beforeEach(module('Pets'));

    var $controller;
    var $httpBackend;

    // Injecting the controller and dependencies(if any) before each test spec is run
    beforeEach(inject(function (_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
    }));

    // Test spec to check if the 'getPetsData' function is defined.
    it('is fetch data function defined', function () {
        var $scope = {};
        var controller = $controller('PetsController', { $scope: $scope });
        expect($scope.getPetsData).toBeDefined();
        expect(typeof $scope.getPetsData).toEqual('function');
    });

    // Test spec to check if the 'getCatsOfOwner' function returns the cats array as expected
    it('is get cats of owner function returning cats array', function () {
        var $scope = {};
        var controller = $controller('PetsController', { $scope: $scope });
        $scope.ownersAndTheirPets = sampleData;
        var catsArray = $scope.getCatsOfOwner("Male")
        expect(catsArray.length).not.toEqual(0);
        expect(catsArray[0].name).toEqual("Garfield");
    });

    // Test spec to ensure the 'getPetsData' function makes http call to the server and validate the response
    it('should return owners and their pets list', function (done) {

        var $scope = {};
        var controller = $controller('PetsController', { $scope: $scope });

        // Mocks the actual $http service call
        $httpBackend
            .when('GET', serviceUrl)
            .respond(200, sampleData);
        $scope.getPetsData();

        $httpBackend.flush();
        expect($scope.isDataAvailable).toBe(true);
        expect($scope.ownersAndTheirPets).toEqual(sampleData);
        done();
    });

    //Test spec to ensure proper error handling in case of failure in service call.
    it('should show error message on service call failure', function (done) {

        var $scope = {};
        var controller = $controller('PetsController', { $scope: $scope });

        $httpBackend
            .when('GET', serviceUrl)
            .respond(500, {});
        $scope.getPetsData();

        $httpBackend.flush();
        expect($scope.errorMessage).toEqual("There has been an error. Please try again.");
        done();
    });


});

// Test suite for the constants
describe('Constants', function () {
    beforeEach(module('Pets'));

    var $constants;
    beforeEach(inject(function (_Constants_) {
        $constants = _Constants_;
    }));

    // Test spec to ensure the Constants object is defined
    it('is constants object defined', function () {
        var $scope = {};
        expect($constants).toBeDefined();
        expect(typeof $constants).toEqual('object');
        expect($constants.serviceUrl).toBeDefined();
        expect($constants.petTypes.cat).toEqual("Cat");
    });

});
