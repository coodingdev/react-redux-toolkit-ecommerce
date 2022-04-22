
export const currencyFormate = (value) => {
    return new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN'
}).format(value)
    }