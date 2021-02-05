import {firstUpperCase} from '../src/first-upper-case.js'
import {jasmineSum} from '../src/temp.js'

describe('duza litera', function() {
    it('powinna byc z przodu', function() {
        expect(firstUpperCase('aEd')).toBe('AEd');
    })
})

describe('Suma', function() {
    it('powinna być 3', function() {
        expect(jasmineSum(1,2)).toBe(3);
    })

    it('powinna być 4', function() {
        expect(jasmineSum(2,2)).toBe(4);
    })

})

