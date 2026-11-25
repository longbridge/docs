import { describe, expect, test } from 'bun:test'
import { commonProperties, isProductionHost, readCookieFrom, sensorsServerUrl, stripDeviceIdDomainSuffix } from '../src/lib/sensors-core'

describe('sensorsServerUrl', () => {
  test('正式域名报 production', () => {
    expect(isProductionHost('longbridge.com')).toBe(true)
    expect(isProductionHost('www.longbridge.com')).toBe(true)
    expect(sensorsServerUrl('longbridge.com')).toBe('https://event-tracking.lbkrs.com/sa?project=production')
  })
  test('canary 和本地报 default', () => {
    expect(isProductionHost('longbridge.xyz')).toBe(false)
    expect(isProductionHost('notlongbridge.com')).toBe(false)
    expect(sensorsServerUrl('longbridge.xyz')).toBe('https://event-forward.longbridge.xyz/sa?project=default')
    expect(sensorsServerUrl('localhost')).toBe('https://event-forward.longbridge.xyz/sa?project=default')
  })
})

describe('stripDeviceIdDomainSuffix', () => {
  test('去掉域名后两段后缀', () => {
    expect(stripDeviceIdDomainSuffix('abc123-longbridge.com', 'longbridge.com')).toBe('abc123')
    expect(stripDeviceIdDomainSuffix('abc123-longbridge.xyz', 'www.longbridge.xyz')).toBe('abc123')
  })
  test('没有后缀原样返回', () => {
    expect(stripDeviceIdDomainSuffix('abc123', 'longbridge.com')).toBe('abc123')
    expect(stripDeviceIdDomainSuffix('abc123-longbridge.com', '')).toBe('abc123-longbridge.com')
  })
})

describe('readCookieFrom', () => {
  test('读取和解码', () => {
    expect(readCookieFrom('a=1; device_id=x%2Dy; b=2', 'device_id')).toBe('x-y')
    expect(readCookieFrom('my_device_id=1', 'device_id')).toBeUndefined()
    expect(readCookieFrom('device_id=%E0%A4%A', 'device_id')).toBeUndefined()
  })
})

describe('commonProperties', () => {
  test('有主站设备号时带 web_deviceId', () => {
    expect(commonProperties({ cookie: 'device_id=abc-longbridge.com', hostname: 'longbridge.com', userAgent: 'UA' })).toEqual({
      platform_type: 'web',
      user_agent: 'UA',
      site: 'longbridge.com',
      web_deviceId: 'abc',
    })
  })
  test('没有设备号时不带该字段', () => {
    expect(commonProperties({ cookie: '', hostname: 'longbridge.com', userAgent: 'UA' })).toEqual({
      platform_type: 'web',
      user_agent: 'UA',
      site: 'longbridge.com',
    })
  })
})
