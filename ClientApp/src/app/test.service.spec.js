"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var test_service_1 = require("./test.service");
describe('TestService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(test_service_1.TestService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=test.service.spec.js.map