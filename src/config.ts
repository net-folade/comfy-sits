export interface BusinessConfig {
  brand: string
  whatsappNumber: string
  tiktokUrl: string
  instagramUrl: string
  domain: string
  openGraphImage: string
  location: string
  operatingHours: string
  deliveryCoverage: string
  responseTime: string
}

export const DOCUMENTED_WHATSAPP_PLACEHOLDER = '233123456789'

export const BUSINESS: Readonly<BusinessConfig> = {
  brand: 'Comfy Sits',
  whatsappNumber: '',
  tiktokUrl: '',
  instagramUrl: '',
  domain: '',
  openGraphImage: '',
  location: '',
  operatingHours: '',
  deliveryCoverage: '',
  responseTime: '',
}

export const BRAND = BUSINESS.brand
export const CART_STORAGE_KEY = 'comfysits-cart'

export const isValidWhatsAppNumber = (value: string): boolean => {
  const digits = value.replace(/[^0-9]/g, '')
  return /^\d{8,15}$/.test(digits) && digits !== DOCUMENTED_WHATSAPP_PLACEHOLDER
}

export const optionalUrl = (value: string): string | null => {
  if (!value.trim()) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}
