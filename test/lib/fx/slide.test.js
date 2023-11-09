import assert from 'assert'
import { calculateSlideWindow } from '../../../lib/fx/slide'

describe('slide', () => {
    it('should return full text if sliceLength is bigger than the title', () => {
        assert.equal(calculateSlideWindow(0, "Amazing Title", 20), "Amazing Title")
    })

    it('should return sliced text for frame 0', () => {
        assert.equal(calculateSlideWindow(0, "ABCDEFGHIJKLMNOPQRFTUVWXYZ", 5), "ABCDE")
    })

    it('should return sliced text for intermediate frame', () => {
        assert.equal(calculateSlideWindow(10, "ABCDEFGHIJKLMNOPQRFTUVWXYZ", 5), "KLMNO")
    })

    it('should return sliced text for ending window without overflow', () => {
        assert.equal(calculateSlideWindow(21, "ABCDEFGHIJKLMNOPQRFTUVWXYZ", 5), "VWXYZ")
    })

    it('should return sliced text for ending window with overflow', () => {
        assert.equal(calculateSlideWindow(21, "ABCDEFGHIJKLMNOPQRFTUVWXYZ", 10), "VWXYZABCDE")
    })
})