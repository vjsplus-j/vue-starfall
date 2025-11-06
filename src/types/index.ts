/**
 * Vue Starfall - Type Definitions
 * @author 李飞恒
 * @copyright Copyright © 2025 李飞恒. All rights reserved.
 * @license Apache-2.0
 */

export interface LoginFormData {
  username: string
  password: string
  [key: string]: any
}

export interface LoginThemeProps {
  title?: string
  subtitle?: string
  loading?: boolean
  errorMessage?: string
  modelValue?: LoginFormData
}
