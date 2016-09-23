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

    beforeEach(module('Pets'));

    var $controller;
    var $httpBackend;

    beforeEach(inject(function (_$controller_, _$httpBackend_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
    }));

    it('is fetch data function defined', function () {
        var $scope = {};
        var controller = $controller('PetsController', { $scope: $scope });
        expect($scope.getPetsData).toBeDefined();
        expect(typeof $scope.getPetsData).toEqual('function');
    });

    it('is get cats of owner function returning cats array', function () {
        var $scope = {};
        var controller = $controller('PetsController', { $scope: $scope });
        $scope.ownersAndTheirPets = sampleData;
        var catsArray = $scope.getCatsOfOwner("Male")
        expect(catsArray.length).not.toEqual(0);
        expect(catsArray[0].name).toEqual("Garfield");
    });

    it('should return owners and their pets list', function (done) {

        var $scope = {};
        var controller = $controller('PetsController', { $scope: $scope });

        $httpBackend
            .when('GET', serviceUrl)
            .respond(200, sampleData);
        $scope.getPetsData();

        $httpBackend.flush();
        expect($scope.isDataAvailable).toBe(true);
        expect($scope.ownersAndTheirPets).toEqual(sampleData);
        done();
    });

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

describe('Constants', function () {
    beforeEach(module('Pets'));

    var $constants;
    beforeEach(inject(function (_Constants_) {
        $constants = _Constants_;
    }));

    it('is constants object defined', function () {
        var $scope = {};
        expect($constants).toBeDefined();
        expect(typeof $constants).toEqual('object');
        expect($constants.serviceUrl).toBeDefined();
        expect($constants.petTypes.cat).toEqual("Cat");
    });

});