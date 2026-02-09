import { calculatePlatformFee, calculatePayoutAmount, formatAmountForStripe, formatAmountFromStripe } from '@/lib/stripe'

describe('Stripe Utilities', () => {
  describe('calculatePlatformFee', () => {
    it('should calculate 10% platform fee by default', () => {
      expect(calculatePlatformFee(10000)).toBe(1000) // $100 -> $10 fee
      expect(calculatePlatformFee(5000)).toBe(500)  // $50 -> $5 fee
    })

    it('should calculate custom platform fee', () => {
      expect(calculatePlatformFee(10000, 0.15)).toBe(1500) // 15% fee
      expect(calculatePlatformFee(10000, 0.05)).toBe(500)  // 5% fee
    })

    it('should round to nearest cent', () => {
      expect(calculatePlatformFee(10001)).toBe(1000) // $100.01 -> $10.001 -> $10.00
    })
  })

  describe('calculatePayoutAmount', () => {
    it('should calculate payout amount after platform fee', () => {
      expect(calculatePayoutAmount(10000)).toBe(9000) // $100 - $10 fee = $90
      expect(calculatePayoutAmount(5000)).toBe(4500)   // $50 - $5 fee = $45
    })

    it('should work with custom commission rates', () => {
      expect(calculatePayoutAmount(10000, 0.15)).toBe(8500) // $100 - $15 fee = $85
    })
  })

  describe('formatAmountForStripe', () => {
    it('should convert dollars to cents', () => {
      expect(formatAmountForStripe(100)).toBe(10000)
      expect(formatAmountForStripe(50.50)).toBe(5050)
      expect(formatAmountForStripe(0.99)).toBe(99)
    })

    it('should round to nearest cent', () => {
      expect(formatAmountForStripe(100.999)).toBe(10100)
    })
  })

  describe('formatAmountFromStripe', () => {
    it('should convert cents to dollars', () => {
      expect(formatAmountFromStripe(10000)).toBe(100)
      expect(formatAmountFromStripe(5050)).toBe(50.50)
      expect(formatAmountFromStripe(99)).toBe(0.99)
    })
  })
})
