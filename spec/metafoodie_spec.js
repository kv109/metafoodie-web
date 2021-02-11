import {firstUpperCase} from '../src/first-upper-case.js'
import {jasmineSum} from '../src/temp.js'
// import {preloader} from '../src/preloader.js'
import {mapRender} from '../src/map-render.js'

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

// describe('Preloader', function() {
//     it('should generate proper html', function() {
//         expect(preloader('miki')).toBe('<p class="provider-name">Miki</p><div class="results-preloader-container"><img class="results-preloader" src="img/preloader-arrow.svg" alt="Trwa ładowanie wyników..."></div>')
//     })
// })

describe('mapa', function() {
    // jasmine.getFixtures().load('../dist/index.html');
    it('powinna się kurwa generować', function() {
        mapRender(10,10,10);
        expect(markers).toBe(null);
    })
})