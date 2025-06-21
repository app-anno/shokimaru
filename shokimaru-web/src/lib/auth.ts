import { headers } from 'next/headers'

export async function getSession() {
  const headersList = await headers()
  const authHeader = headersList.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return null
  }

  const base64Credentials = authHeader.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
  const [username] = credentials.split(':')

  return {
    user: {
      username,
    },
  }
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    throw new Error('認証が必要です')
  }
  return session
}